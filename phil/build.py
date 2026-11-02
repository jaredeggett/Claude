#!/usr/bin/env python3
"""Build Phil's labeled photos, README and interactive page from labels.json.

Usage:
    python3 phil/build.py [overview_original.jpg closeup_original.jpg]

With original photos given, they are resized into phil/images/. Without them,
the existing phil/images/overview.jpg and closeup.jpg are used. Edit
labels.json (coordinates are in the photo's listed `size`) and re-run.
"""
import html
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
IMG = ROOT / "images"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
LONG_SIDE = 1600

ROLE_COLORS = {  # marker ring colors on the burned-in images
    "brain": (124, 92, 255),
    "eyes": (0, 170, 200),
    "hands": (245, 217, 10),
    "maker": (255, 120, 40),
    "test": (230, 60, 90),
    "power": (120, 200, 90),
}


def prepare_images(sources):
    IMG.mkdir(exist_ok=True)
    for name, src in sources.items():
        im = Image.open(src).convert("RGB")
        im.thumbnail((LONG_SIDE, LONG_SIDE), Image.LANCZOS)
        im.save(IMG / f"{name}.jpg", quality=82, optimize=True)


def burn_labels(photo):
    im = Image.open(IMG / photo["source"]).convert("RGB")
    sw, sh = photo["size"]
    kx, ky = im.width / sw, im.height / sh
    r = max(16, int(im.width * 0.016))
    font = ImageFont.truetype(FONT, int(r * 1.05))
    d = ImageDraw.Draw(im)
    for g in photo["groups"]:
        for it in g["items"]:
            x, y = it["x"] * kx, it["y"] * ky
            ring = ROLE_COLORS[it["role"]]
            d.ellipse([x - r - 4, y - r - 4, x + r + 4, y + r + 4], fill=ring)
            d.ellipse([x - r, y - r, x + r, y + r], fill=(20, 22, 28))
            d.text((x, y), str(it["n"]), font=font, fill="white", anchor="mm")
    out = IMG / photo["source"].replace(".jpg", "-labeled.jpg")
    im.save(out, quality=82, optimize=True)
    return out.name


def build_readme(data, labeled):
    roles = data["roles"]
    lines = [
        "# Phil: the hardware-engineering robot",
        "",
        "Phil is an AI agent with a body: a rolling wire cart that holds a computer",
        "running Claude, cameras so it can see, and programmers, radios and I/O boards",
        "so it can flash, probe and switch real hardware on its own. These photos are",
        "labeled so anyone can tell what each part is and what it does for Phil.",
        "",
        "Open `index.html` for the interactive version (tap a number to see what it is).",
        "",
        "## How Phil is organized",
        "",
        "| Role | What it does |",
        "| --- | --- |",
    ]
    for r in roles.values():
        lines.append(f"| **{r['name']}** | {r['blurb']} |")
    for photo in data["photos"]:
        lines += ["", f"## {photo['title']}", "", photo["caption"], "",
                  f"![{photo['title']}](images/{labeled[photo['id']]})", ""]
        for g in photo["groups"]:
            lines += [f"### {g['name']}", "", "| # | Part | Role | What it is |",
                      "| --- | --- | --- | --- |"]
            for it in g["items"]:
                name = it["name"] + (" *(confirm)*" if it.get("confirm") else "")
                lines.append(f"| {it['n']} | {name} | {roles[it['role']]['name']} | {it['desc']} |")
            lines.append("")
    lines += [
        "## Updating the labels",
        "",
        "Items marked *(confirm)* were identified from the photo only. Edit",
        "`labels.json` (x/y are pixel positions in the photo size listed there)",
        "and run `python3 phil/build.py` to regenerate the labeled images,",
        "this README and `index.html`.",
        "",
    ]
    (ROOT / "README.md").write_text("\n".join(lines))


def build_html(data):
    roles = data["roles"]
    e = html.escape
    role_key = "".join(
        f'<li class="role" data-role="{k}"><span class="dot"></span>'
        f'<b>{e(r["name"])}</b><span>{e(r["blurb"])}</span></li>'
        for k, r in roles.items())
    sections = []
    for photo in data["photos"]:
        sw, sh = photo["size"]
        spots, legend = [], []
        for g in photo["groups"]:
            rows = []
            for it in g["items"]:
                n = it["n"]
                spots.append(
                    f'<button class="spot" data-n="{n}" data-role="{it["role"]}" '
                    f'style="left:{it["x"] / sw * 100:.2f}%;top:{it["y"] / sh * 100:.2f}%" '
                    f'aria-label="{n}: {e(it["name"])}">{n}</button>')
                flag = '<span class="confirm">confirm</span>' if it.get("confirm") else ""
                rows.append(
                    f'<li class="item" id="item-{n}" data-n="{n}" data-role="{it["role"]}">'
                    f'<span class="tape">{n}</span><div class="body">'
                    f'<div class="name">{e(it["name"])} {flag}'
                    f'<span class="tag">{e(roles[it["role"]]["name"])}</span></div>'
                    f'<p>{e(it["desc"])}</p></div></li>')
            legend.append(f'<h3>{e(g["name"])}</h3><ol class="items">{"".join(rows)}</ol>')
        sections.append(f'''
<section class="photo" id="{photo["id"]}">
  <header class="photo-head"><h2>{e(photo["title"])}</h2><p>{e(photo["caption"])}</p></header>
  <div class="split">
    <figure class="frame" style="aspect-ratio:{sw}/{sh}">
      <img src="images/{photo["source"]}" alt="{e(photo["title"])}: {e(photo["caption"])}" width="{sw}" height="{sh}">
      {"".join(spots)}
    </figure>
    <div class="legend">{"".join(legend)}</div>
  </div>
</section>''')
    page = TEMPLATE.replace("{{ROLES}}", role_key).replace("{{SECTIONS}}", "".join(sections))
    (ROOT / "index.html").write_text(page)


TEMPLATE = r'''<title>Meet Phil</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>
/* Layout: lab-notebook page. Photo on the left with numbered pins, label-tape legend on the right; stacks on phones. */
:root {
  --bg: #f3f4f6; --panel: #ffffff; --fg: #16181d; --muted: #5b6270; --line: #d9dce3;
  --tape: #f5d90a; --tape-fg: #16181d; --pin: #16181d; --pin-fg: #ffffff; --hl: #2f6bff;
  --brain: #7c5cff; --eyes: #00a3c4; --hands: #d9b800; --maker: #f07828; --test: #e03c5a; --power: #4fa83c;
  --display: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #121419; --panel: #1b1e25; --fg: #e8eaef; --muted: #9aa1ae; --line: #2d313b;
  --pin: #0d0f13; --hl: #6f9bff; color-scheme: dark } }
:root[data-theme="dark"] {
  --bg: #121419; --panel: #1b1e25; --fg: #e8eaef; --muted: #9aa1ae; --line: #2d313b;
  --pin: #0d0f13; --hl: #6f9bff; color-scheme: dark }
* { box-sizing: border-box }
body { background: var(--bg); color: var(--fg); font: 15px/1.55 var(--display);
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 32px 64px }
.wrap { max-width: 1240px; margin: 0 auto; display: grid; gap: 48px }
.intro { display: grid; gap: 20px; max-width: 75ch }
.eyebrow { font: 600 12px/1 var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--muted) }
h1 { font-size: clamp(40px, 7vw, 72px); line-height: .95; margin: 0; font-weight: 800; letter-spacing: -.02em; text-wrap: balance }
h1 .tape { font-size: .5em; vertical-align: middle; margin-left: .3em }
.lede { font-size: 18px; margin: 0; color: var(--fg) }
.roles { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; max-width: none }
.role { display: grid; grid-template-columns: auto 1fr; column-gap: 10px; align-items: baseline; background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 10px 12px; cursor: pointer }
.role span:last-child { grid-column: 2; color: var(--muted); font-size: 13.5px }
.role.on { border-color: var(--hl) }
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--c) }
[data-role="brain"] { --c: var(--brain) } [data-role="eyes"] { --c: var(--eyes) } [data-role="hands"] { --c: var(--hands) }
[data-role="maker"] { --c: var(--maker) } [data-role="test"] { --c: var(--test) } [data-role="power"] { --c: var(--power) }
.hint { font-size: 13.5px; color: var(--muted); margin: 0 }
.photo { display: grid; gap: 18px }
.photo-head h2 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -.01em }
.photo-head p { margin: 4px 0 0; color: var(--muted) }
.split { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 28px; align-items: start }
#overview .split { grid-template-columns: minmax(0, .9fr) minmax(0, 1fr) }
.frame { position: relative; margin: 0; width: 100%; max-width: 100%; border-radius: 6px; overflow: hidden; background: var(--line); position: sticky; top: calc(env(safe-area-inset-top, 0px) + 16px) }
.frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block }
.spot { position: absolute; transform: translate(-50%, -50%); width: 30px; height: 30px; border-radius: 50%;
  border: 3px solid var(--c); background: var(--pin); color: var(--pin-fg); font: 600 12px/1 var(--mono);
  display: grid; place-items: center; cursor: pointer; padding: 0; box-shadow: 0 1px 4px rgba(0,0,0,.45); transition: transform .15s }
.spot:hover, .spot.on { transform: translate(-50%, -50%) scale(1.3); z-index: 2; outline: 3px solid var(--hl); outline-offset: 1px }
.spot:focus-visible { outline: 3px solid var(--hl) }
.dim .spot:not(.on) { opacity: .25 }
.legend { min-width: 0; display: grid; gap: 6px }
.legend h3 { font: 600 12px/1 var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin: 14px 0 4px }
.legend h3:first-child { margin-top: 0 }
.items { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px }
.item { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 12px; padding: 10px 12px; background: var(--panel);
  border: 1px solid var(--line); border-radius: 6px; cursor: pointer; scroll-margin: 24px; transition: border-color .15s }
.item.on { border-color: var(--hl); box-shadow: 0 0 0 1px var(--hl) }
.dim .item:not(.on) { opacity: .45 }
.tape { display: inline-grid; place-items: center; background: var(--tape); color: var(--tape-fg); font: 600 14px/1 var(--mono);
  height: 26px; min-width: 40px; padding: 0 6px; clip-path: polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%) }
.name { font-weight: 600; display: flex; flex-wrap: wrap; gap: 6px 8px; align-items: center }
.tag { font: 500 11px/1 var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); display: inline-flex; gap: 5px; align-items: center; margin-left: auto }
.tag::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--c) }
.confirm { font: 600 10.5px/1 var(--mono); text-transform: uppercase; letter-spacing: .06em; color: var(--test); border: 1px solid currentColor; border-radius: 3px; padding: 3px 5px }
.item p { margin: 4px 0 0; color: var(--muted); font-size: 14px }
footer { color: var(--muted); font-size: 13.5px; border-top: 1px solid var(--line); padding-top: 16px }
@media (max-width: 820px) {
  .split, #overview .split { grid-template-columns: 1fr }
  .frame { position: relative; top: 0 }
  .spot { width: 24px; height: 24px; font-size: 10.5px; border-width: 2px }
}
@media (prefers-reduced-motion: reduce) { .spot, .item { transition: none } }
</style>
<div class="wrap">
  <header class="intro">
    <div class="eyebrow">Hardware lab · rolling test cart</div>
    <h1>Meet Phil <span class="tape">AI robot</span></h1>
    <p class="lede">Phil is an AI agent with a body. The cart holds a computer running Claude, cameras so he can see, and programmers, radios and I/O boards so he can wire up, flash and test real hardware with as little human help as possible. Every part is grouped by the job it does for him.</p>
    <ul class="roles">{{ROLES}}</ul>
    <p class="hint">Tap a number on a photo, or a part in the list, to find it. Tap a role above to show only those parts.</p>
  </header>
  {{SECTIONS}}
  <footer>Parts tagged <b>confirm</b> were identified from the photo only. Labels live in <code>phil/labels.json</code>; run <code>python3 phil/build.py</code> to rebuild this page and the labeled images.</footer>
</div>
<script>
(() => {
  const spots = [...document.querySelectorAll('.spot')];
  const items = [...document.querySelectorAll('.item')];
  const roles = [...document.querySelectorAll('.role')];
  let role = null;
  function select(n, scroll) {
    role = null; roles.forEach(r => r.classList.remove('on'));
    document.body.classList.remove('dim');
    spots.forEach(s => s.classList.toggle('on', s.dataset.n === n));
    items.forEach(i => i.classList.toggle('on', i.dataset.n === n));
    if (scroll) { const el = document.getElementById('item-' + n); el && el.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
  }
  spots.forEach(s => s.addEventListener('click', () => select(s.dataset.n, true)));
  items.forEach(i => {
    i.addEventListener('click', () => {
      select(i.dataset.n, false);
      const s = spots.find(x => x.dataset.n === i.dataset.n);
      const f = s && s.closest('.frame');
      if (f && f.getBoundingClientRect().bottom < 0 || f && f.getBoundingClientRect().top > innerHeight) f.scrollIntoView({ block: 'center' });
    });
    i.addEventListener('mouseenter', () => spots.forEach(s => s.classList.toggle('on', s.dataset.n === i.dataset.n || (role && s.dataset.role === role))));
  });
  roles.forEach(r => r.addEventListener('click', () => {
    role = role === r.dataset.role ? null : r.dataset.role;
    roles.forEach(x => x.classList.toggle('on', x.dataset.role === role));
    document.body.classList.toggle('dim', !!role);
    spots.forEach(s => s.classList.toggle('on', !!role && s.dataset.role === role));
    items.forEach(i => i.classList.toggle('on', !!role && i.dataset.role === role));
  }));
})();
</script>
'''


def main():
    data = json.loads((ROOT / "labels.json").read_text())
    if len(sys.argv) == 3:
        prepare_images({"overview": sys.argv[1], "closeup": sys.argv[2]})
    labeled = {p["id"]: burn_labels(p) for p in data["photos"]}
    build_readme(data, labeled)
    build_html(data)
    print("built", ", ".join(labeled.values()), "README.md, index.html")


if __name__ == "__main__":
    main()
