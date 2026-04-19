# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Single-page Japanese-language web app for "エコール送迎管理" — a welfare facility that tracks daily transportation, meals (給食), attendance/absence, vehicle inspection, alcohol checks, purchasing, case records, and distance logs for staff and ~59 service users across 童里夢 / 奏楽 / ぱぁとなぁ groups.

The entire application is **one static HTML file**: `ecole_firebase.html` (~4000 lines). It embeds CSS, HTML, and JS (Firebase v10 Firestore + Gemini API) inline. There is no build step, no package manager, no test suite.

Deployed via GitHub Pages at `https://fukuzawa1994-code.github.io/dorimyu-kanri/ecole_firebase.html`. Edits are commonly made directly through **github.dev** (see HANDOVER.md for the working convention).

## Architecture — what requires cross-file reading

Because everything is in one file, "architecture" here means knowing where things live inside `ecole_firebase.html` and how they interact.

### Three layers inside the single file
1. **Styles + HTML screens** (top of file → ~L665). Each screen is a `<div class="scr" id="scr-XXX">`; `goScr('XXX')` toggles the `.on` class to show one at a time. Inline `onclick` handlers call functions on `window.*`, so any function that handlers reference **must be attached to `window`** or the UI silently breaks.
2. **Firebase module script** starts at L666 (`<script type="module">`). Firebase config and `db` instance are initialized here.
3. **Master-data constants + render/submit functions + a single `onSnapshot` at the bottom** (~L4021) that subscribes to the `logs` collection and triggers re-renders.

### Firestore collections
- `logs` — single append-only event stream. Almost every user action (transport updates, alcohol checks, meal-location changes, purchases, case notes, distance entries, etc.) writes a document here with a `bin`/`kind` discriminator. The top-level `onSnapshot` populates the `logs` array and drives render functions.
- `staff_accounts` — per-staff account docs keyed by name (passwords hashed via `hashPassword`, sessions via `generateToken` / `checkSession`).
- `purchases` — purchase-request documents (separate from logs).

### Master data lives in big `const` blocks
These are the source of truth for users/staff/routes and are edited frequently. Line numbers drift; grep for the name:
- `MASTER` (routes) — L748
- `ALCOHOL_STAFF` — L808
- `STAFF_MASTER` (7 categories, ~89 staff) — L828
- `SOGAKU_MASTER` — L2696
- `USER_MASTER` (59 service users) — L2703
- `DEFAULT_TRANSPORT` — L2740
- `PAATONAA_SCHEDULE` (weekday patterns) — L2816
- `TRANSPORT_STAFF` — L2884
- `ACCOUNTS` — L2894
- `MEAL_LOCATIONS` — L3761 (`['童里夢','奏楽','たんぽぽ','エコール']`)
- `STAFF_KYUSHOKU` — L3764

### Key behavioral rules encoded in code
- **Meal resolution** goes through `getMealPlan(userName, dateStr)` (L2062) and `aggregateMeals` (L2146). These apply weekday rules, ぱぁとなぁ affiliation rules, and per-day meal-location overrides — any change to "who eats what, where" must go through these functions, not ad-hoc site logic.
- **ぱぁとなぁ** residents are detected via `isPaatonaaResident` / `getPaatonaaUserJigyosho`; their transport/meals differ by weekday per `PAATONAA_SCHEDULE`.
- **Sundays and Mondays** are treated as 法人休日 (no 給食) in `renderKyushoku`.
- **Printing** (inspection PDF, case monthly, transport monthly, distance monthly, alcohol monthly) all go through `openPrintWindow` (L1513), which uses an iframe to dodge popup blockers and prints A4 landscape.

## Editing conventions (from HANDOVER.md — important)

The HANDOVER.md file at the repo root is the **authoritative running log** of in-progress work, known bugs, and remaining tasks. Read it before starting substantive work. Its guidance, to internalize:

- **Edit extremely carefully.** The user's repeated instruction is 「超ゆっくり・丁寧に壊れないように」. Past incidents have silently deleted live functions (e.g. `doVacationSubmit`, `setVacType` were once wiped out by a loose replacement, producing a white-screen bug that wasn't caught for a while).
- **Use precise string matches** for replacements; **never use loose regex**. Prefer small, surgical `Edit` calls over rewrites.
- After editing, verify `window.doLogin` and other critical `window.*` handlers still exist. A function missing from `window` = broken screen.
- Keep per-edit size changes small (HANDOVER suggests ±500 bytes as a gut-check).
- One logical task → one commit. Commit messages are written in Japanese, matter-of-fact, and often reference the behavior change + affected line ranges.

## Common commands

There is no build / test / lint pipeline — this is a static HTML file.

- **Run locally:** open `ecole_firebase.html` in a browser. It talks to production Firestore directly.
- **Deploy:** push to `main`. GitHub Pages serves it.
- **Commit style:** Japanese commit messages. See `git log` for tone.
- **Line lookup:** `grep -n 'function foo'` (or the Grep tool). Line numbers in HANDOVER.md are snapshots and drift — always re-verify.

## Secrets note

Firebase and Gemini API keys are committed inline in `ecole_firebase.html` (this is the project's intentional convention for a small internal tool). Do not "fix" this by extracting them unless the user asks — it will break the deployed app.
