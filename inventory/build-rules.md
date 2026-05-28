# Build-Regeln + Synergie-Checkliste

> **GITIGNORED.** Lokal nur.
>
> Diese Checkliste vor jedem Build-Vorschlag durchgehen — verhindert die haeufigsten Fehler.
> Stand: 2026-05-28

---

## SCHRITT 1: ITEM-EXISTENZ-CHECK

Fuer jedes Item im Build:

- [ ] Steht es in `items-database.md`?
- [ ] Wenn nein: gegen SBT-DB pruefen `curl https://raw.githubusercontent.com/SkullAndBonesTools/SkullAndBonesData/main/data/items.json | node -e "..."`
- [ ] `obtainable[]` Array nicht leer ODER `blueprint:` gesetzt? (sonst nicht beschaffbar)
- [ ] **Niemals empfehlen:** Pacea, Cargo Hold Expansion, Light Armor, Spirit Collar, Sea Fire Works, Long Gun Grinder, Front Powder Kegs, etc. (siehe items-database.md "Tippfehler-Items")

---

## SCHRITT 2: SLOT-TYPEN-CHECK

Fuer jeden Slot pruefen ob das Item-Typ erlaubt ist:

| Slot | Erlaubte SBT-Item-Typen |
|---|---|
| Bow | `longGun`, `bombard`, `culverin`, `demicannon`, `torpedo`, `ballista`, `seaFire` |
| Side (Port/Starboard) | `longGun`, `bombard`, `culverin`, `demicannon`, `torpedo` |
| Stern | `longGun`, `bombard`, `culverin`, `demicannon`, `torpedo` |
| Aux | `mortar`, `rocket`, `ballista`, `springloader` |

**Schwere Fehler die ich frueher gemacht habe:**
- [ ] Kein Mortar (Eye of Heaven, Leopold III, Roaring Meg) in Stern/Broadside!
- [ ] Kein Rocket (The Termites III, The Warhammer, Storm Vigil-Rocket) in Bow/Side/Stern!
- [ ] Kein Ballista (Alecto) in Side/Stern (nur Bow oder Aux)!

---

## SCHRITT 3: TOP-DECK / ALL-DECK-MATH

Burst-Berechnung:
- All-Deck (Culverin, Demi-Cannon) → **volle Slot-Geschuetzanzahl × DMG**
- Top-Deck-only (Long Gun, Bombard, Torpedo) → **NUR top-Geschuetze × DMG**

### Geschuetz-Tabelle pro Schiff (gilt fuer Top-Deck-only-Items)

| Schiff | Bow (top) | Side (top) | Stern (top) | Aux |
|---|---|---|---|---|
| Brigantine | 2 | 4 | 2 | 2 |
| Frigate | 2 | 6 | 2 | 2 |
| Corvette | 2 | 7 | 2 | 2 |
| Snow | 2 | 4 | 2 | 2 |

### Beispiel-Tests

- Soulsnatcher (Bombard, Top-Deck) auf Frigate-Broadside: 6 × 3280 = 19.680 (NICHT 13 × 3280!)
- Hullcarver (Culverin, All-Deck) auf Brigantine-Broadside: 8 × 1307 = 10.456 (volle 8 Geschuetze)
- Carronade (Culverin, All-Deck) auf Corvette-Broadside: 14 × 1510 = 21.140
- Divine Thunder (Long Gun, Top-Deck) auf Frigate-Bow: 2 × 2265 = 4.530 (NICHT 6 × 2265!)

---

## SCHRITT 4: FURNITURE-SLOT-CHECK

- [ ] Genau EIN Item mit `type: majorFurniture` im Major-Slot?
- [ ] Vier Items mit `type: offensiveFurniture` oder `utilityFurniture` in den Minor-Slots?
- [ ] Keine Doppelung?

**Major Furniture (kann nur 1 ausgeruestet sein):** Drowned Organ, Floodwarden Station, Royal Ramming Works, Iron Capstan, First Aid Station, Gunner's Quadrant, Scoping Station, Megaphone, Munitions Mixer, War Drums, Bilgefire Barrels, Hull Marker's Table, Freeman's Embrace, Rigging Station, Rope Locker, Signal Gong, Spiteful Spikes Station, Cannonball Carving Station, Drowned One's Toll, Pain Piper, Bloody Red, Mark of the Wolf, etc.

**Wichtige Klarstellung (Items die haeufig falsch als Major gelistet wurden):**
- Bombard Works I = `offensiveFurniture` (Minor)
- Culverin Works I = `offensiveFurniture` (Minor)
- Demi-Cannon Works I = `offensiveFurniture` (Minor)
- Mortar Works I = `offensiveFurniture` (Minor)
- Rocket Works I = `offensiveFurniture` (Minor)
- Torpedo Works I = `offensiveFurniture` (Minor)
- Iron Cladding Station I = `offensiveFurniture` (Minor)
- Tuning Station I = `offensiveFurniture` (Minor)
- Maintenance Forge I = `utilityFurniture` (Minor)
- Hubac Tuning Rack = `utilityFurniture` (Minor)
- Mortar Powderbench = `offensiveFurniture` (Minor)
- Rocket Powderbench = `offensiveFurniture` (Minor)
- Brazing Furnace I = `offensiveFurniture` (Minor)

---

## SCHRITT 5: TRIGGER-VALIDIERUNG

Fuer jede Furniture/Armor pruefen ob ihre Trigger-Bedingung im Build erfuellt ist:

### Drowned Organ (Major)
- [ ] Ist mindestens 1 Mending-Weapon im Build? (Soulsnatcher, Atma's Toll, andere Mending-Bombards/Demicannons)
- [ ] **Wenn nein:** Drowned Organ NICHT empfehlen — alle 3 Effekte (+20% Mending Damage, +Secondary, +Max Hull) sind Mending-konditional.
- [ ] **Empfehlung:** First Aid Station, Iron Capstan oder Gunner's Quadrant als Alternative.

### Floodbound (Armor) / Floodwarden Station (Major)
- [ ] Ist mindestens 1 Flooding-Quelle im Build?
- [ ] Flooding-Quellen: Carronade (Flooding I), Rahma's Ambition (Flooding II), Leopold III (Flooding II), Farscourge III (Flooding I), Endless Requiem (Flooding II), Storm Vigil-Rocket (Flooding II), Heavenly Lance (Flooding II)
- [ ] **Faustregel:** 2+ Flooding-Quellen fuer konstanten Heal-Stream.
- [ ] **Wenn keine:** Floodbound + Floodwarden Station NICHT empfehlen. Alternative: Royal Custodian (Refortify) oder Black Prince (Resolute).

### Needle Shield (Brackish Bite)
- [ ] Wird im Build aktiv gebracen?
- [ ] Ist eine Punctured-Quelle auf Angreifern aktiv? (Royal Ramming Works = appliziert Punctured auf gerammtes Ziel; Hullcarver-Pulverize = appliziert Punctured auf getroffenes Ziel — aber auf Angreifer braucht's Royal Ramming Works oder Needle-Shield-Selbstapply)
- [ ] **Faustregel:** Needle Shield + Royal Ramming Works + Bracing-Playstyle. Sonst nicht empfehlen.

### Wrathful Ward (Venomous Vengeance)
- [ ] Bracing-Phasen in Rotation eingeplant?
- [ ] **Faustregel:** Anchor- oder Tank-Builds, wo bracen Teil der Rotation ist.

### Phoenix Crest (Revile + Gloat)
- [ ] Bracing-Playstyle + Encounter mit mehreren Gegnern?
- [ ] **Faustregel:** Mob-Cleanup-Builds, nicht Solo-Boss.

### Iron Capstan (Major)
- [ ] Anchor-Playstyle in Rotation? (Anchor setzen, halten, dabei bracen)
- [ ] **Faustregel:** Tank-Builds, Megafort-Engagements, Aggro-Hold-Szenarien.

### Wyrmhide (Entrenched + Bastion)
- [ ] Anchor-Playstyle? Wenn Side-Pivot-Build: NICHT empfehlen.

### Royal Custodian (Refortify)
- [ ] Repair-Kit-Nutzung in Rotation erwaehnt?
- [ ] **Faustregel:** universell einsetzbar, weil Repair-Kit Standard-Slot ist.

### Black Prince (Resolute)
- [ ] Build erwartet Low-HP-Phasen (Boss-Burst, Hostile Takeover)?
- [ ] **Faustregel:** Notnagel-Defense fuer Risiko-Builds.

### Buccaneer's Oath (Blood and Gold)
- [ ] Build erzeugt Kills regelmaessig (Mob-Cleanup)?
- [ ] **Faustregel:** Mob-Build, nicht Solo-Boss.

### Hull Marker's Table (Major)
- [ ] Cannonball-Ammo im Build?
- [ ] **Faustregel:** Standard-Cannonball-Builds.

### Royal Ramming Works (Major)
- [ ] Ram-Playstyle in Rotation? (Approach + Ram)
- [ ] **Faustregel:** Brigantine + Bullhorn-Perk, oder andere Ram-Builds.

### Scoping Station (Major)
- [ ] Build bleibt 320m+? Long-Range-Sniper-Setup?
- [ ] **Faustregel:** Long-Range-Long-Gun-Builds.

---

## SCHRITT 6: ROTATION-CHECK

- [ ] Erwaehnt die Rotation **aktives Bracen** wenn Bracing-Armor/Furniture im Build (Wrathful Ward, Needle Shield, Phoenix Crest, Tanashah)?
- [ ] Erwaehnt die Rotation **Anchor setzen** wenn Anchor-Item im Build (Iron Capstan, Wyrmhide)?
- [ ] Erwaehnt die Rotation **Repair-Kit-Timing** wenn Royal Custodian im Build?
- [ ] Erwaehnt die Rotation **Ram-Action** wenn Royal Ramming Works im Build?
- [ ] Erwaehnt die Rotation **Side-Pivot** wenn beide Broadsides aktiv?
- [ ] Macht die Reihenfolge Sinn? Approach → Schliessen → Trigger → Salve → Pivot → Heal-Loop

---

## SCHRITT 7: QUELLEN-CHECK

- [ ] Sind alle Quellen-Angaben aus SBT `obtainable[]` ODER `blueprint:`?
- [ ] **Falsch:** "Vendor" ohne weitere Spezifikation (zu vage)
- [ ] **Korrekt:** "Blueprint Outpost Fort Louis (Craft)", "Williams' Rotating Store (Weekly)", "The Helm Vendor (permanent)", "Smuggler Pass Pinnacle Store (Y2 Saison-Name)", "Legacy Cache 1/3", "Crazed Nian Strongbox", etc.

### Saison-zu-Quelle-Mapping (kanonisch)

| SBT season | Wo beschaffbar |
|---|---|
| `release` | Standard-Vendor / Outpost-Blueprint / Legacy Cache |
| `shatteredSeas` | Y3S1 Smuggler Pass (Free Track) / Williams' Y3S1 Seasonal Item |
| `oathsOfWar` (Y2S2) | Smuggler Pass Pinnacle Store (Y2 Oaths of War) / Williams' Rotating Store (Weekly, wenn rotiert) |
| `intoTheDragonsWake` (Y2S1) | Smuggler Pass Pinnacle Store (Y2 Into the Dragon's Wake) / Williams' Rotating Store |
| `shadowsOfTheDeep` (Y2S3) | Smuggler Pass Pinnacle Store (Y2 Shadows of the Deep) / Williams' Rotating Store |
| `ascentIntoChaos` (Y2S4) | Smuggler Pass Pinnacle Store (Y2 Ascent Into Chaos) / Williams' Seasonal |
| `chorusOfHavoc` (Y2S5?) | The Helm Seasonal (alt) / Legacy Cache / Chorus Fleet Strongbox |
| `gutsAndGlory` | Faction War Effort Reward |
| `ragingTides` (Y1) | Smuggler Pass Pinnacle Store (Y1) / Williams' Rotating Store / La Peste's Strongbox |
| `eyeOfTheBeast` (Y2S3) | Smuggler Pass Pinnacle Store (Y2 Eye of the Beast) — Corvette-Saison |

---

## SCHRITT 8: BUILD-IDENTITAET-CHECK

Macht das Build-Konzept logisch Sinn?

- **Tank-Build:** Anchor + Bracing + Damage-Reduction + Threat-Hold
  - Iron Capstan (Anchor) + Wrathful Ward/Phoenix Crest (Bracing) + Grit/Tenacity-Perk ausnutzen
  - Bow/Broadside: All-Deck-Items fuer volle Geschuetzzahl
- **Heal-Build:** Mending + Drowned Organ + Floodbound/Royal Custodian/Black Prince
  - Soulsnatcher Pflicht (einzige Mending-Bombard im Y3S1-Pool)
  - Drowned Organ + ≥1 Flooding-Quelle = Triple-Heal moeglich
- **DPS-Burst-Build:** Hullcarver-Culverin-Spam + Royal Ramming Works + Needle Shield
  - Bracing-Phasen nach Ram fuer Needle-Shield-Trigger
- **Flooding-Build:** Carronade-Spam + Floodbound + Floodwarden Station + zusaetzliche Flooding-Quellen
  - 3+ Flooding-Sources fuer konstanten Stack-Aufbau
- **Long-Range-Build:** Divine Thunder + Lange Kartouwe + Scoping Station + Long-Gun-Bows
  - Aber: Long Guns sind Top-Deck-only → halbe Geschuetzanzahl auf Side. Trade-off mit All-Deck-Culverin.

---

## HAEUFIGE FEHLERMUSTER (aus echten Fehlern gelernt)

### Fehler 1: Drowned Organ ohne Mending
- **Symptom:** Build hat Hullcarver/Carronade/Long Guns, aber kein Soulsnatcher
- **Effekt:** Drowned Organ tot → Major-Slot verschwendet
- **Fix:** Floodwarden Station (wenn Flooding-Quellen) oder Gunner's Quadrant (unkonditional)

### Fehler 2: Floodbound ohne Flooding
- **Symptom:** Build hat Soulsnatcher (Burning) + Mons Meg III (kein Status) + Hullcarver (Piercing)
- **Effekt:** Floodbound's Tide of Restoration triggert nicht
- **Fix:** Royal Custodian (Refortify) oder Black Prince (Low-HP)

### Fehler 3: Bombard auf Side mit voller Geschuetzzahl gerechnet
- **Symptom:** "Soulsnatcher Burst: 13 × 3280 = 42.640" auf Frigate
- **Effekt:** Falsche Math — real sind es 6 × 3280 = 19.680
- **Fix:** Top-Deck-only beachten, halbe Geschuetzzahl in Berechnungen

### Fehler 4: Mortar/Rocket auf Stern/Side
- **Symptom:** "Standard Mortar auf Stern", "The Termites III auf Starboard"
- **Effekt:** Geht im Spiel gar nicht — Aux-only Items.
- **Fix:** Aux-Slot benutzen oder Item durch Stern/Side-faehiges ersetzen

### Fehler 5: Major-Item in Minor-Slot
- **Symptom:** "Minor × 4: Megaphone · Gunner's Quadrant · Iron Capstan · Maintenance Forge I"
- **Effekt:** 3 Major-Items als Minor gelistet = falsche Slot-Belegung
- **Fix:** Nur 1 Major-Item, restliche Slots mit offensive/utilityFurniture

### Fehler 6: "Wrathful Ward Hit-Streak"
- **Symptom:** Falsche Beschreibung des Trigger-Effekts
- **Effekt:** Spieler erwartet automatischen Reflect, weiss aber nicht dass er bracen muss
- **Fix:** "Beim Bracing-Hit triggert Noxious Cloud (10s CD)"

### Fehler 7: Tippfehler-Items wie "Lrange Barrel" / "Hubok"
- **Symptom:** Items existieren nicht in SBT-DB
- **Effekt:** Spieler sucht im Spiel und findet nichts
- **Fix:** Korrekte Schreibweise (Langrage Barrels, Hubac Tuning Rack)

### Fehler 8: Quellen-Angabe zu vage
- **Symptom:** "Vendor permanent" ohne weitere Info
- **Effekt:** Spieler weiss nicht wo
- **Fix:** Spezifizieren: "Blueprint Outpost Fort Louis (Craft)", "Williams' Rotating Store (Weekly)"

### Fehler 9: Resolve als Frigate-Perk
- **Symptom:** "Bei 10 Grit-Stacks triggert Resolve"
- **Effekt:** Resolve existiert in aktueller SBT-DB nicht mehr separat — wahrscheinlich in Grit integriert
- **Fix:** Vorsicht — Effekt nicht garantieren ohne Verifikation

### Fehler 10: Furniture-Synergie nicht konkret begruendet
- **Symptom:** "Drowned Organ verstaerkt Mending-Damage" ohne zu erwaehnen dass es Mending-Weapon braucht
- **Effekt:** Spieler equipt es ohne Soulsnatcher und wundert sich
- **Fix:** Trigger-Bedingung explizit in Build-Beschreibung erwaehnen
