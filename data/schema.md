# Data Schema

Alle JSON-Dateien in `/data/` folgen diesem Schema. Felder die nicht zutreffen → `null` oder weglassen.

## glossary.json

Objekt mit `KEY: entry`-Paaren. KEY ist kebab-case, ohne Umlaute, eindeutig.

```jsonc
{
  "po8": {
    "term":  "Pieces of Eight",    // Anzeige-Name (Englisch, wie im Spiel)
    "short": "Endgame-Currency …", // 1–2 Sätze, fürs Tooltip
    "long":  "Pieces of Eight …",  // ausführliche Erklärung für Glossar-Seite
    "tags":  ["currency", "endgame"]   // optional
  }
}
```

## builds.json

Array von Build-Objekten.

```jsonc
{
  "id":   "brigantine-longcannons-intermediate", // eindeutig, kebab-case
  "name": "Brigantine Long Cannons + Torpedos (Intermediate)",
  "ship": "Brigantine",
  "tier": "beginner" | "intermediate" | "endgame",
  "tags": ["solo", "pve", "long-cannon", "torpedo"],
  "activities": ["world-events", "elite-ships", "convoys", "forts"],

  "slots": {
    "bow":       { "item": "Divine Thunder",    "rarity": "epic", "note": "Williams' Shop" },
    "broadside": { "item": "Rahma's Legacy x4", "rarity": "epic" },
    "stern":     { "item": "La Piqure III",     "rarity": "epic" },
    "auxiliary": { "item": "Leopold III",       "rarity": "rare" }
  },

  "armor":     { "item": "Pacea", "rarity": "epic" },
  "furniture": {
    "major": "Bombard Works",
    "minor": ["Tuning Station", "Hubok Tuning Rack", "Lrange Barrel", "Iron Cladding Station"]
  },
  "ammo":      ["Burning Heart", "Antipersonnel"],

  "rotation":  "1) Spyglass-Scan 800–1000m → 2) Bow-Opener Weak Point → 3) 90°-Side-Pass Torpedo-Broadside → 4) Leopold-AOE → 5) Reposition.",
  "materials": ["Williams' Shop (Divine Thunder)", "Telok-Penjarah-Vendoren (Rahma's Legacy)"],

  "sources":         ["sources/y3s1-patch-notes.md"],
  "lastUpdated":     "2026-05-26",   // ISO 8601 Datum
  "verifiedSeason":  "Y3S1"          // "Y2" oder älter → mit ⚠ auf Seite kennzeichnen
}
```

### Rarity-Werte

`common` (grün), `uncommon` (blau), `rare` (lila), `epic` (orange), `legendary` (gold).
Skull and Bones startet bei **Grün=Common** — anders als WoW!

### Tier-Werte

- `beginner` — AusrLvl 8–12, ohne Endgame-Drops
- `intermediate` — AusrLvl 12–14, mit Williams'-Shop / Quest-Items
- `endgame` — Kingpin 30+, WT3/4-Items, Mythic Modifications

## ships.json

Array von Ship-Objekten.

```jsonc
{
  "id":      "brigantine",
  "name":    "Brigantine",
  "size":    "MED",
  "perk":    "Bullhorn",
  "perkText":"+45% Ramming-Damage, appliziert Flooded, -80% Torn-Sails-Duration",
  "gunports":{ "bow": 1, "broadside": 4, "stern": 1, "auxiliary": 1 },
  "furniture":{ "major": 1, "minor": 4 },
  "speed":   20,
  "strengths":["Speed", "Ramming", "Flooding"],
  "weaknesses":["Squishy"]
}
```

## weapons.json

```jsonc
{
  "id":        "divine-thunder",
  "name":      "Divine Thunder",
  "type":      "long-gun",
  "element":   "lightning",
  "rarity":    "epic",
  "source":    "Williams' Rotating Shop / Dragon-Beast-Drop (monatlich)",
  "slots":     ["bow", "stern"],
  "verifiedSeason": "Y3S1"
}
```

## armor.json / furniture.json

Analog zu `weapons.json` mit Feldern `id`, `name`, `rarity`, `source`, `effect`, `verifiedSeason`.

## quests.json

```jsonc
{
  "id":   "a-nose-for-business",
  "name": "A Nose for Business",
  "giver":"Yanita Nara",
  "location":"Sainte-Anne, Le Pont Muet",
  "unlocks":["helm-empire", "sovereigns"],
  "requires":{ "infamy": "Kingpin" }
}
```

## manufactories.json

```jsonc
{
  "id":      "harufu",
  "name":    "Harufu",
  "region":  "Coast of Africa",
  "type":    "foundry",
  "po8PerHour":  null,
  "notes":   "Laut Community Top-Po8-Produzent.",
  "sources": ["sources/reddit-manufactory-ranking-2026-05.md"]
}
```

## patch-notes.json

```jsonc
{
  "season": "Y3S1",
  "name":   "Shattered Seas",
  "patchDate": "2026-05-11",
  "releaseDate":"2026-05-12",
  "additions":  ["Galleon", "Seasonal Mastery", "Mythic Modifications", "..."],
  "changes":    ["WT2 Affixes entfernt", "..."],
  "removals":   ["..."],
  "source":     "sources/y3s1-patch-notes.md"
}
```

## Felder die jede sachliche Daten-Entity tragen sollte

- `verifiedSeason` — auf welchem Patch-Stand verifiziert
- `lastUpdated` — ISO-Datum der letzten manuellen Prüfung
- `sources` — Pfade zu Quellen in `/sources/`

## item-links.json

Mapping von Item-Namen (wie sie in HTML-Tabellen stehen) auf `skullandbonestools.de`-Slugs.
Wird von `assets/js/item-links.js` geladen und wickelt erkannte Items automatisch in
externe Links mit ↗-Symbol. Der URL-Aufbau ist immer:

```
https://skullandbonestools.de/en/codex/item/{slug}
```

Struktur:
```jsonc
{
  "weapons": { "Item Name": "camelCaseSlug" },
  "armor":   { ... },
  "furniture": { ... },
  "ships":   { ... }
}
```

Items ohne Eintrag werden ohne Link gerendert (kein Fehler). Neue Items: Slug via
Google-Suche `site:skullandbonestools.de "Item Name"` verifizieren bevor eintragen,
weil Vercel direkt curl/WebFetch mit HTTP 429 blockt.
