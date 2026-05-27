# mikeandbones — Skull and Bones Solo-PvE Guide

## WHY
Statische Website (Deutsch, englische Ingame-Begriffe) für Skull and Bones Solo-PvE,
Year 3 Season 1 "Shattered Seas". Zielgruppe: Solo-Spieler ab Kingpin-Rank.

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

## Commands
- Lokales Testing: `python -m http.server 8000` im Repo-Root, dann http://localhost:8000
- Deploy: `git push origin main` (GitHub Pages serviert automatisch)

## Inventar + Rotating Store (Pflicht-Lektuere vor Build-Empfehlungen)
- `/inventory/user-inventory.md` — was Mike (User) im Lager hat. GITIGNORED. Quelle der Wahrheit fuer "verfuegbar weil bereits besessen".
- `/inventory/williams-store.md` — aktuelle Williams' Rotating Store + Black Market Rotation. GITIGNORED.
- `/inventory/INVENTORY-LOG.md` — optional, Change-Log.
- **Bei jeder Build-Empfehlung:** beide Files lesen. Items die NICHT im Lager UND NICHT im Williams' Store UND NICHT permanent erreichbar sind, NICHT empfehlen.
- Mike updated diese Files manuell wenn sich was aendert. Daten koennen veraltet sein — bei Diskrepanz nachfragen.
- Verifiziere unsichere Items zusaetzlich gegen SBT: `https://raw.githubusercontent.com/SkullAndBonesTools/SkullAndBonesData/main/data/items.json` — Felder `season`, `event`, `obtainable[]` zeigen Verfuegbarkeit.

## Was NICHT tun
- Keine SPA, kein Client-Side-Routing.
- Kein HTML im Client aus JSON generieren.
- Kein Tippy.js (archiviert).
- Keine Bild-Hotlinks (immer lokal ablegen).
- Keine Kommentare die *was* der Code tut erklären. Nur *warum*, wenn nicht-offensichtlich.
- Keine erfundenen Game-Mechaniken.
