# Cold Storage Monitoring System — Notes

Running notes from Jared's dictation. Started 2026-11-18.

## Concept

A temperature sensor / monitoring system for walk-in cold storage, built on
the architecture of the "Olink" (spelling as dictated — to confirm).

- One consistent design that works for both a walk-in fridge and a walk-in
  freezer.

## Components

### Door contact sensor
- Contact sensor on each walk-in door.
- Communicates over LoRa (must be within LoRa range).

### Speaker boxes
- Multiple speaker boxes.
- Triggered by the opening and closing of the doors.
- Announce when a door has been open longer than a set number of minutes.

### Temperature sensors
- Temperature sensors placed inside the fridge and freezer.

### Compressor amp readings
- Current (amp) measurement on the compressor to show how hard it is working.

## Things to check

- Can the speaker announcements happen with nothing in the middle —
  specifically, without internet in the path between the door sensor and
  the speaker?
- Or does it need to be the backup battery one (etc.)?

## Open questions (not yet answered)

- "Olink": exact product name and spelling, and which parts of its
  architecture carry over.
- Door-open threshold: how many minutes before an announcement, and is it
  different for fridge vs. freezer?
- How many speaker boxes, and where do they go?
- What "the backup battery one" refers to (which unit or model).
