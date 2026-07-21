# Kinetiq — Egghead Labs demo

A concept product landing page for **Kinetiq**, a *battery-free kinetic
presentation clicker* by Egghead Labs. Every click harvests the kinetic energy
of the press itself, so the device never needs batteries or charging — it can't
die mid-presentation.

**Live path:** intended to be served at **`eggheadlabs.net/demo`**
(the site lives in [`demo/`](./demo) so it maps to the `/demo` route).

## Run locally

It's a static site — no build step.

```bash
cd demo
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `demo/index.html` directly in a browser.

## Structure

```
demo/
  index.html   # the landing page
  styles.css   # all styling (dark, kinetic teal + egg-yolk yellow)
  script.js    # nav shadow, interactive "harvest a click" device, pre-order form
```

## How the product works (the pitch)

Kinetiq contains a miniature electrodynamic generator — the same principle as a
bicycle dynamo. Pressing a button snaps a magnet across a coil, the abrupt
change in magnetic flux induces a voltage pulse (~300 µJ), and that pulse powers
a low-energy 2.4 GHz radio that fires the Next / Back command. No battery, no
charging, no e-waste. This mirrors real battery-free kinetic switch technology
(e.g. EnOcean's energy-harvesting switches).

## Deploying to `eggheadlabs.net/demo`

Any static host works. Publish the contents of `demo/` under the `/demo` path,
e.g.:

- **Netlify / Cloudflare Pages / GitHub Pages:** point the site root at this
  repo and the folder resolves at `/demo`, or deploy `demo/` to the `/demo`
  base path.
- **Nginx:** `location /demo/ { alias /var/www/kinetiq/demo/; }`

## A note on the domain

The request was to host this at `eggheadlabs.net/demo` and to check that
domain's history. At the time this was built (July 2026):

- `eggheadlabs.net` did **not** resolve (no live DNS / site).
- It had no dedicated web-search footprint. The "Egghead Labs" name elsewhere
  on the web maps only to unrelated things (an anime social account,
  `egghead.io` developer courses, `eggheads.ai` microlearning, and the defunct
  1990s retailer *Egghead Software*).
- Historical snapshots could not be verified — the Wayback Machine
  (`archive.org`) is blocked by this environment's network policy.

So this demo is treated as a **fresh** home for `eggheadlabs.net/demo` rather
than a recreation of any prior design.

---

*Kinetiq is a concept demo. No payment is taken and no email is stored by the
pre-order form.*
