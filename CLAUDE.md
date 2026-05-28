# mikeandbones — Skull and Bones Solo-PvE Guide

## WHY
Statische Website (Deutsch, englische Ingame-Begriffe) für Skull and Bones Solo-PvE,
Year 3 Season 1 "Shattered Seas". Zielgruppe: Solo-Spieler ab Kingpin-Rank.

---

## ⚠ PFLICHT-LEKTUERE VOR JEDER BUILD-ARBEIT

Vor jeder Build-Empfehlung oder -Aenderung diese vier Files in dieser Reihenfolge lesen:

1. **`/inventory/game-mechanics.md`** — Slot-/Deck-Mechanik, Furniture-Trigger, Item-Typ-Zuordnung. **Ohne dieses Wissen produziert man Builds, die im Spiel nicht funktionieren.**
2. **`/inventory/items-database.md`** — Stats, Typen (Top-Deck/All-Deck), Quellen aller relevanten Items.
3. **`/inventory/user-inventory.md`** — Mikes Lager + Frigate-Stats (GITIGNORED, lokal nur).
4. **`/inventory/williams-store.md`** — Aktuelle Williams' Rotating Store Rotation (GITIGNORED).

**Wenn ein Item nicht in `items-database.md` ist → vor Empfehlung gegen SBT-Datenbank verifizieren:**
`https://raw.githubusercontent.com/SkullAndBonesTools/SkullAndBonesData/main/data/items.json`
(Felder: `type`, `season`, `event`, `obtainable[]`, `perks[]`, `damagePerShot`, etc.)

---

## KRITISCHE SPIELMECHANIK-REGELN (haeufige Fehlerquellen)

### Regel 1: Slot- und Geschuetzanzahl
- Jedes Schiff hat **5 Waffen-Item-Slots**: Bow, Port-Broadside, Starboard-Broadside, Stern, Aux
- SBT-Notation `top X + lower Y` beschreibt die Geschuetze IN EINEM Slot, nicht zwei Slots
- **Brigantine**: Bow 4 (2+2), Side 8 (4+4), Stern 2, Aux 2
- **Frigate**: Bow 6 (2+4), Side 13 (6+7), Stern 2, Aux 2
- **Corvette**: Bow 6 (2+4), Side 14 (7+7), Stern 2, Aux 2

### Regel 2: Top Deck vs All Deck (Item-Eigenschaft, KEINE Slot-Wahl)
- **All-Deck** (feuert aus ALLEN Geschuetzen): `culverin`, `demicannon`
- **Top-Deck only** (feuert nur aus OBEREN Geschuetzen): `longGun`, `bombard`, `torpedo`
- Beispiel: Soulsnatcher (Bombard) auf Frigate-Broadside → 6 von 13 Geschuetzen, NICHT 13
- Beispiel: Hullcarver (Culverin) auf Frigate-Broadside → alle 13 Geschuetze

### Regel 3: Slot-Kompatibilitaet
- **Bow**: Long Gun, Bombard, Culverin, Demi-Cannon, **Ballista**, **Sea Fire**, Torpedo
- **Broadside (Port/Starboard)**: Long Gun, Bombard, Culverin, Demi-Cannon, Torpedo
- **Stern**: Long Gun, Bombard, Culverin, Demi-Cannon, Torpedo (typisch Torpedo)
- **Aux**: **NUR Mortar, Rocket, Ballista** (manche Springloader/Sea Fire)
- → Mortar wie Leopold III / Eye of Heaven geht NICHT in Stern/Broadside
- → Rocket wie The Termites III geht NICHT in Bow/Broadside/Stern

### Regel 4: Furniture-Slots — nur 1 Major
- Jedes Schiff hat **5 Furniture-Slots**: 1 Major + 4 Minor
- SBT-Typen: `majorFurniture`, `offensiveFurniture` (Minor), `utilityFurniture` (Minor)
- **Haeufige Fehler**: Bombard Works I, Culverin Works I, Tuning Station I, Strange Elixir, Hubac Tuning Rack sind alle **offensive/utilityFurniture (Minor)** — duerfen NICHT in den Major-Slot
- **Haeufige Major-Items**: Megaphone, Gunner's Quadrant, Iron Capstan, Scoping Station, War Drums, Munitions Mixer, First Aid Station, Rigging Station, Hull Marker's Table, Drowned Organ, Floodwarden Station, Royal Ramming Works, Freeman's Embrace, Bilgefire Barrels, Spiteful Spikes Station

### Regel 5: Furniture- und Armor-Perks haben TRIGGER-BEDINGUNGEN
Vor jedem Build pruefen: triggern die ausgeruesteten Furniture/Armor wirklich?

| Item | Bedingung |
|---|---|
| **Drowned Organ** | BRAUCHT ≥1 Mending-Weapon (z.B. Soulsnatcher). Ohne Mending = tot. |
| **Floodbound** (Tide of Restoration) | BRAUCHT Flooding-Quelle im Build. Ohne Flooded-Apply = kein Heal. |
| **Floodwarden Station** | BRAUCHT Flooding-Quellen — Stacks bauen sich auf Consecutive Flooding-Hits. |
| **Needle Shield** (Brackish Bite) | BRAUCHT Bracing + Punctured-Angreifer. Ohne aktiv-bracen oder ohne Punctured-Source = tot. |
| **Wrathful Ward** (Venomous Vengeance) | BRAUCHT Bracing — Noxious Cloud bei Bracing-Hit (10s CD). |
| **Phoenix Crest** (Revile + Gloat) | BRAUCHT Bracing + Multi-Gegner. |
| **Wyrmhide** (Entrenched + Bastion) | BRAUCHT Anchor/Brace-Playstyle. |
| **Iron Capstan** | -15% DR + 100% Threat NUR waehrend Anchored. |
| **Royal Ramming Works** | Triggert beim Ram (50% Punctured + Slow + Piercing-Bonus). |
| **Royal Custodian** (Refortify) | Triggert nach Repair-Kit (immer verfuegbar). |
| **Black Prince** (Resolute) | Triggert bei Hull <30%. |
| **Buccaneer's Oath** (Blood and Gold) | +Damage 30s nach Kill ODER bei Hull <25%. |
| **Hull Marker's Table** | BRAUCHT Cannonball-Ammo. |
| **Ouroboros** (Amalgamate + Restoration) | UNKONDITIONAL — passive Severe-Regen + Heal nach Brace-Ende. |
| **Gunner's Quadrant** | UNKONDITIONAL — +Weakpoint-Crit auf alle Waffen. |

### Regel 6: Items existieren, oder existieren nicht
Vor Empfehlung gegen SBT-DB pruefen. **Bekannte Tippfehler/Phantome aus alten Iterationen** (NICHT empfehlen):
- "Pacea" — existiert nicht in SBT
- "Cargo Hold Expansion" — existiert nicht
- "Light Armor" — existiert nicht (Standard-Vendor-Armor benutzen)
- "Spirit Collar" — existiert nicht
- "Lrange Barrel" → korrekt: **Langrage Barrels** (utility)
- "Hubok Tuning Rack" → korrekt: **Hubac Tuning Rack** (utility)
- "Spikes Station" → das ist **Spiteful Spikes Station** = Major
- "Sea Fire Works I" — existiert nicht in SBT
- "Long Gun Grinder", "Bombard Grinder", "Culverin Grinder", "Torpedo Grinder" — existieren nicht (nur Mortar/Rocket Grinder I)
- "Front Powder Kegs", "Port Powder Kegs", "Buoy Powderhouse" — existieren nicht (Powderhouse Bombard/Mortar gibt es)
- "Rocket Furnace", "Torpedo Furnace", "Leather Station" — existieren nicht in SBT (Ballista/Brazing/Springloader Furnace gibt es)

### Regel 7: Saisons + Verfuegbarkeit
- `season: shatteredSeas` = Y3S1 (aktuell)
- `season: release` = permanent (Standard-Vendor / Outpost-Blueprints / Legacy Cache)
- `season: oathsOfWar` (Y2S2), `intoTheDragonsWake` (Y2S1), `shadowsOfTheDeep` (Y2S3), `ascentIntoChaos` (Y2S4), `chorusOfHavoc` (Y2S5 ?), `ragingTides` (Y1), `gutsAndGlory` (Y1S2), `eyeOfTheBeast` (Y2S3-Corvette) = **alte Saisons**
- Alte-Saison-Items sind nur via **Smuggler Pass Pinnacle Store** (Pass-Tokens), **Williams' Rotating Store Weekly**, **Legacy Cache**, **Teulings Weapon Chest** oder **Strongboxes** erreichbar
- `event: theHonorless` = aktiv bis 09.06.2026 (Soulsnatcher, Drowned Organ via The Helm Event)
- `event: moonshineLarceny` = aktiv 30.06.–28.07.2026
- `event: azureSolstice` = aktuell NICHT aktiv

### Regel 8: Standard-Waffen + Furniture = Outpost-Blueprints
Viele "Standard"-Items haben `obtainable: -` aber `blueprint: outpost...`. Korrekte Quellen:

| Item | Quelle |
|---|---|
| Long Gun V | Outpost Three Brothers (Blueprint) |
| Demi-Cannon V | Outpost Poacher's Cache (Blueprint) |
| Bombard V | Outpost Kokok Terapung (Blueprint) |
| Culverin V | Outpost (Standard) |
| Iron Capstan | Rahma — Den Telok Penjarah (Blueprint) |
| First Aid Station | Outpost Vorona Falls (Blueprint) |
| Bombard Works I | Outpost Fort Louis (Blueprint) |
| Culverin Works I | Outpost Khmoy Estate (Blueprint) |
| Demi-Cannon Works I | Outpost Sunken Goldmine (Blueprint) |
| Mortar Works I | Outpost Three Brothers (Blueprint) |
| Rocket Works I | Outpost Rangnok Cave (Blueprint) |
| Torpedo Works I | Outpost Lost City of Prei (Blueprint) |
| Iron Cladding Station I | Outpost Royal Burial Ground (Blueprint) |
| Maintenance Forge I | Rahma — Telok Penjarah (Blueprint) |
| Munitions Mixer | Den Telok Penjarah (Blueprint) |
| Megaphone | Den Saint-Anne (Blueprint) |
| Signal Gong | Den Saint-Anne (Blueprint) |
| Brazing Furnace I | The Helm (Blueprint) |
| War Drums | The Helm (Drop) |
| Wrathful Ward | The Helm Vendor / La Peste's Strongbox / Legacy Cache 1 |
| Rahma's Ambition | The Helm Vendor / Person Rahma — Telok Penjarah |
| Heavenly Lance | Contract Reward / Person Rahma — Telok Penjarah |
| Royal Custodian | World Event Merchant Convoy / Exotic Armor Ascended Cache |
| Leopold III | Vanderkill's Locker |
| Gunner's Quadrant | Legacy Cache 1/3/4 / Blueprint via The Helm |
| Scoping Station | Commander Zhang's Chest |
| Tuning Station I | The Helm Seasonal (alt) / Legacy Cache / Williams' Black Market BP |

---

## WHAT
- Vanilla HTML / CSS / JS (ES Modules) — **KEIN** Build, **KEIN** Framework, **KEIN** SSG.
- Hosting: GitHub Pages (main branch, root).
- Tooltips: Floating UI (`@floating-ui/dom`), via CDN oder lokal in `/assets/vendor/`.
- Layout-Wiederverwendung: Partials in `/partials/`, eingebunden über `data-include` + `assets/js/includes.js`.
- Daten: JSON in `/data/`, geladen via `fetch()` — aber nur für Listen/Filter, nicht für Seiten-Rendering.
- Multi-Page: eine HTML-Datei pro Seite, handgeschrieben. Statisch.

## HOW
- HTML semantisch: `<main>`, `<aside>`, `<nav>`, `<article>`, `<section>`.
- CSS Custom Properties als Design-Tokens (`assets/css/tokens.css`).
- Jede Datei < 300 Zeilen. Wenn länger → splitten.
- UTF-8, LF-Zeilenenden.
- Mobile-first, aber Dark Theme only (kein Light-Mode-Toggle).
- WCAG AA Minimum: Focus-Ring, Kontraste, `tabindex` auf Tooltip-Trigger.

## SEO-Block (Pflicht in JEDER HTML-Seite)
Direkt nach dem `viewport`-Meta einsetzen:
```html
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">
<meta name="googlebot" content="noindex, nofollow">
```
`/robots.txt` blockt zusätzlich alle Crawler. Die Seite soll nicht von Suchmaschinen
oder KI-Crawlern indexiert werden.

## Pfade (Pflicht in JEDER HTML-Seite)
GitHub Pages serviert das Repo unter `/mikeandbones/`, nicht unter `/`. Deshalb:
- KEINE absoluten Pfade mit führendem `/` verwenden (`/assets/...`, `/data/...`, `/pages/...`).
- Stattdessen `<base>` direkt nach `viewport` setzen mit relativem Pfad zum Repo-Root:
  - `index.html`, `404.html` (Root): `<base href="./">`
  - `pages/*.html` (eine Ebene tief): `<base href="../">`
  - `pages/builds/*.html`, `pages/mechanics/*.html` (zwei Ebenen tief): `<base href="../../">`
- Alle Links und Asset-Pfade dann ohne führenden Slash: `assets/css/...`, `pages/glossary.html`, `partials/sidebar.html`.
- Sidebar-Brand-Link und „Übersicht"-Link in der Sidebar: `href="./"`.
- In JS: `fetch('data/...')` und `fetch('partials/...')` — kein führender `/`.

## Glossar-Regel (kritisch)
- Jeder Fachbegriff im Text → `<span class="term" data-glossary="KEY" tabindex="0">Begriff</span>`.
- `KEY` referenziert `/data/glossary.json`.
- Tooltip (Floating UI) zeigt `entry.short` + Link → `/pages/glossary.html#KEY`.
- Glossar-Seite zeigt `entry.long` als ausführliche Erklärung.
- **Jeder neue Begriff bekommt einen Eintrag in `glossary.json`.**

## Inhalt
- Sprache: Deutsch.
- Ingame-Begriffe (Schiffe, Waffen, Furniture, Quests): **Englisch belassen**.
- Aktualität: Y3S1 ist Primärquelle. Y2-Inhalte mit ⚠ markieren. Vor-Y2 nicht verwenden.
- Quellen: `/sources/` mit Patch Notes + Snapshots. Jede Build-/Mechanik-Seite zeigt Footer "Verifiziert: Y3S1 · Stand TT.MM.JJJJ".
- Keine unverifizierten Mechaniken als Feature beschreiben.

## Build-Workflow (Pflicht-Reihenfolge)
1. Lies `/inventory/game-mechanics.md` (Slot/Deck/Trigger).
2. Lies `/inventory/items-database.md` (Stats + Typen + Quellen).
3. Lies `/inventory/user-inventory.md` (Mikes Lager).
4. Lies `/inventory/williams-store.md` (aktuelle Rotation).
5. Plane Build mit Synergie-Logik:
   - Welche Furniture-/Armor-Trigger erfordern welche Waffen-Perks?
   - Top-Deck/All-Deck — passt das zur gewuenschten Burst-Math?
   - Mortar/Rocket nur in Aux, nicht Stern/Broadside!
6. Berechne Burst/DPS korrekt:
   - All-Deck-Item: Geschuetze × DMG
   - Top-Deck-Item: (Top-Deck-Anzahl) × DMG (nicht alle Geschuetze!)
7. Schreibe HTML-Page + builds.json-Eintrag.
8. Verifiziere mit `/inventory/build-rules.md`-Checkliste.

## Patch-Workflow
Bei neuem Patch:
1. Patch Notes nach `/sources/` legen.
2. Nur JSON-Dateien in `/data/` editieren.
3. Wenn neue Felder nötig → erst `data/schema.md` updaten.
4. Wenn HTML angepasst werden muss → nur die betroffenen Seiten.

## Struktur
- `/partials/` — Sidebar, Header, Footer.
- `/assets/css/` — eine Datei pro Verantwortung.
- `/assets/js/` — kleine Module.
- `/assets/img/` — Bilder lokal (kein Hotlink).
- `/assets/vendor/` — externe Libs lokal (optional).
- `/data/` — JSON + `schema.md`.
- `/sources/` — Patch Notes, Quellen-Snapshots.
- `/pages/` — themenspezifische Seiten.
- `/inventory/` — Mikes Inventar + Game-Mechaniken (GITIGNORED).

## Commands
- Lokales Testing: `python -m http.server 8000` im Repo-Root, dann http://localhost:8000
- Deploy: `git push origin main` (GitHub Pages serviert automatisch)
- Mike pushed manuell nach jedem Commit. NICHT automatisch pushen.

## Was NICHT tun
- Keine SPA, kein Client-Side-Routing.
- Kein HTML im Client aus JSON generieren.
- Kein Tippy.js (archiviert).
- Keine Bild-Hotlinks (immer lokal ablegen).
- Keine Kommentare die *was* der Code tut erklären. Nur *warum*, wenn nicht-offensichtlich.
- **Keine erfundenen Game-Mechaniken.** Wenn unsicher: gegen SBT-DB pruefen oder ehrlich sagen "nicht verifiziert".
- Furniture- oder Armor-Empfehlungen ohne Trigger-Validierung — Drowned Organ ohne Mending = tot, Floodbound ohne Flooding = tot.
- Mortar/Rocket/Ballista in Bow/Broadside/Stern — geht nicht.
- Bombard/Long Gun/Torpedo Burst-Math mit voller Geschuetzanzahl rechnen (Top-Deck-only!).
- Items empfehlen ohne `obtainable[]`-Pruefung gegen SBT-DB.
