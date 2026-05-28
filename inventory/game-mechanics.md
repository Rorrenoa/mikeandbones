# Skull and Bones Y3S1 — Spielmechanik-Master-Doku

> **GITIGNORED.** Lokal nur.
>
> Diese Datei ist die **Quelle der Wahrheit** fuer alle nicht-offensichtlichen
> Spielmechaniken die Build-Empfehlungen beeinflussen. Vor jeder Build-Arbeit
> ZWINGEND lesen — sonst produziert man Builds die im Spiel nicht funktionieren.
>
> Recherche-Quellen (verifiziert): Ubisoft DevBlog (Loadout Customisation),
> Skull & Bones Fandom Wiki, Game8 Furniture/Armor-Listen, IGGM Y3S1 Endgame-Guide,
> u4gm/mmoexp/utnfl Build-Guides, Reddit r/SkullAndBonesGame, SkullAndBonesTools-DB.
>
> Stand: 2026-05-28

---

## 1. SCHIFFS-SLOT-MECHANIK

Jedes Schiff hat **GENAU 5 Waffen-Item-Slots**:
- 1× **Bow** (Front)
- 1× **Port Broadside** (links)
- 1× **Starboard Broadside** (rechts)
- 1× **Stern** (Heck/Aft)
- 1× **Auxiliary** (oben/Aux)

Plus 5 Furniture-Slots: 1× Major + 4× Minor.

Die SBT-Notation `"top X + lower Y"` beschreibt die Geschuetze IN EINEM Slot, nicht zwei separate Item-Slots.

### Geschuetzanzahl pro Schiff (Stand SBT 2026-05-28)

| Schiff | Bow (top+lower) | Side (top+lower) | Stern | Aux | Furniture (Major+Minor) |
|---|---|---|---|---|---|
| **Brigantine** | 4 (2+2) | 8 (4+4) | 2 | 2 | 1+4 |
| **Frigate** | 6 (2+4) | 13 (6+7) | 2 | 2 | 1+4 |
| **Corvette** | 6 (2+4) | 14 (7+7) | 2 | 2 | 1+4 |
| Snow | 4 (2+2) | 8 (4+4) | 2 | 2 | 1+4 |
| Schooner | 2 (2+0) | 4 (2+2) | 2 | 2 | 1+3 |
| Galleon | 6 | 17 (?) | 2 | — (kein Aux!) | 1+4 |
| Sambuk | ? | ? | 2 | 2 | 1+3 |
| Padewakang | ? | ? | 2 | 2 | 1+3 |
| Garuda | ? | ? | 2 | 2 | 1+3 |
| Sloop | ? | 3-5 (klein) | 2 | 2 | 1+3 |

(Bei Unklarheit: `/tmp/sbt-ships.json` ziehen via `curl https://raw.githubusercontent.com/SkullAndBonesTools/SkullAndBonesData/main/data/ships.json`)

---

## 2. TOP DECK VS ALL DECK (KRITISCH FUER BURST-MATH)

Die **Top-Deck/All-Deck-Eigenschaft ist Item-bezogen**, nicht Slot-bezogen. Eine Long Gun bleibt Long Gun, auch wenn man sie in einen Side-Slot steckt.

### All-Deck-Waffen (feuern aus ALLEN Geschuetzen eines Slots)
- **`culverin`** → Hullcarver, Carronade, Basilisk III, Culverin V, Tearing Culverin I-III, Fire Culverin I-III, Grindstone Culverin I
- **`demicannon`** → Zamzama III, Phoenix Talons, Demi-Cannon V, Iron Demi-Cannon

### Top-Deck-only-Waffen (feuern NUR aus oberen Geschuetzen)
- **`longGun`** → Divine Thunder, Lange Kartouwe, Farscourge III, Blightbearer, Storm Vigil (Long-Gun-Variante), Heavenly Thunder, Long Gun I-V, Fire Long Gun III
- **`bombard`** → Soulsnatcher, Dardanelles Gun, Mons Meg III, Bombard I-V, Fire Bombard I-III
- **`torpedo`** → Heavenly Lance, Rahma's Ambition, Endless Requiem, Rahma's Legacy

### Konsequenzen der Top-Deck/All-Deck-Mechanik

**Beispiel Brigantine-Side-Slot (top 4 + lower 4 = 8 Geschuetze):**
| Item | Typ | Feuernde Geschuetze | Burst (Beispiel-DMG) |
|---|---|---|---|
| Hullcarver (Culverin All-Deck) | culverin | 8 | 8 × 1307 = 10.456 |
| Carronade (Culverin All-Deck) | culverin | 8 | 8 × 1510 = 12.080 |
| Soulsnatcher (Bombard Top-Deck) | bombard | 4 | 4 × 3280 = 13.120 |
| Blightbearer (Long Gun Top-Deck) | longGun | 4 | 4 × 2050 = 8.200 |
| Rahma's Ambition (Torpedo) | torpedo | 4 | 4 × 816 = 3.264 |

**Beispiel Frigate-Side-Slot (top 6 + lower 7 = 13 Geschuetze):**
| Item | Typ | Feuernde Geschuetze | Burst |
|---|---|---|---|
| Hullcarver (Culverin) | culverin | 13 | 13 × 1307 = 16.991 |
| Carronade (Culverin) | culverin | 13 | 13 × 1510 = 19.630 |
| Soulsnatcher (Bombard) | bombard | 6 | 6 × 3280 = 19.680 |
| Mons Meg III (Bombard) | bombard | 6 | 6 × 3075 = 18.450 |
| Divine Thunder (Long Gun) | longGun | 6 | 6 × 2265 = 13.590 |

**Beispiel Corvette-Side-Slot (top 7 + lower 7 = 14 Geschuetze):**
| Item | Typ | Feuernde Geschuetze | Burst |
|---|---|---|---|
| Hullcarver | culverin | 14 | 14 × 1307 = 18.298 |
| Carronade | culverin | 14 | 14 × 1510 = 21.140 |
| Soulsnatcher | bombard | 7 | 7 × 3280 = 22.960 |
| Blightbearer | longGun | 7 | 7 × 2050 = 14.350 |

→ **Faustregel:** Bombard hat hoeheres Single-Shot-DMG, aber nur halbe Geschuetzzahl auf Side. Bei Frigate (6 vs 13) und Corvette (7 vs 14) etwa gleich starker Burst. Bei Brigantine (4 vs 8) Bombard knapp besser als Culverin per Single-Shot, gleichgut per Burst.

---

## 3. SLOT-WAFFEN-KOMPATIBILITAET

| Slot | Erlaubte Item-Typen |
|---|---|
| **Bow** (frontWeapon) | longGun, bombard, culverin, demicannon, torpedo, **ballista** (nur Bow!), **seaFire** (nur Bow!) |
| **Port Broadside** | longGun, bombard, culverin, demicannon, torpedo |
| **Starboard Broadside** | longGun, bombard, culverin, demicannon, torpedo |
| **Stern** | longGun, bombard, culverin, demicannon, torpedo (oft Torpedo) |
| **Auxiliary** | **mortar, rocket, ballista, springloader** (Aux-only!) |

→ **Mortar (Eye of Heaven, Leopold III, Roaring Meg) gehoert IMMER in Aux.** Nicht in Stern/Broadside.
→ **Rocket (The Termites III, The Warhammer, Storm Vigil-Variante) gehoert IMMER in Aux.**
→ **Ballista (Alecto, Ballista I-V) geht in Bow ODER Aux** (laut Community typischerweise Aux fuer Solo-PvE).
→ **Sea Fire (Sea Fire 1-3, Deluxe Sea Fire) nur in Bow.**
→ **Springloader (Little Grace I-III) typisch Aux.**

---

## 4. FURNITURE-MATRIX

Jedes Schiff hat **1 Major-Slot + 4 Minor-Slots**. Item-Typen aus SBT:
- `majorFurniture` → nur in Major-Slot
- `offensiveFurniture` → nur in Minor-Slot
- `utilityFurniture` → nur in Minor-Slot

### Major Furniture (Auswahl mit Trigger-Bedingungen)

| Item | Konditional? | Trigger |
|---|---|---|
| **Drowned Organ** | JA — Mending-Weapon | +20% Damage auf Mending-Weapons bei Hull <60%; +1% Secondary/1% missing Hull (max +30%); +1% Max Hull pro Mending-Weapon. Ohne Mending-Weapon im Build = tot. |
| **Floodwarden Station** | JA — Flooding | Consecutive Flooding-Hits → bis +20% Flooding-Damage-Stack. Pflicht: Flooding-Quelle im Build. |
| **Royal Ramming Works** | JA — Ramming | Ram = 50% Punctured auf Target + 20% Slow + 15% Piercing-Damage-Bonus 20s. |
| **Iron Capstan** | JA — Anchor | Waehrend Anchored: -15% Incoming Damage + 100% Threat-Hold. |
| **First Aid Station** | SEMI — Hull <33% | passiver Heal-AoE bei Selbst/Ally niedriger HP. |
| **Gunner's Quadrant** | NEIN | +Weakpoint-Crit-Range, wirkt auf ALLE Waffen, kein Trigger. |
| **Scoping Station** | SEMI — Range | Marked-Status auf Targets ab 320m Distanz → +100% Weakpoint-Damage. |
| **Megaphone** | SEMI — Hit-Streak | Consecutive Hits → -15% Reload. |
| **Munitions Mixer** | JA — Ammo-Typ | +Ammo-Damage-Buff, abhaengig vom Ammo-Slot im Build. |
| **War Drums** | JA — Trim | Waehrend Trim/Sail-Boost: -50% Brace-Stamina, +200 Armor. |
| **Bilgefire Barrels** | SEMI — Broadside | +Secondary auf Broadside-Waffen + Status-Effect-Recharge-Chance (30s CD). Beste Synergie mit Ablaze/DOT-Builds. |
| **Hull Marker's Table** | JA — Cannonball-Ammo | 5% Chance auf Broadside-Hit-Trigger mit Cannonball-Ammo. |
| **Freeman's Embrace** | unverifiziert | Spike-Burst-Synergie (Y1S3-Origin). |
| **Drowned One's Toll**, **Pain Piper**, **Bloody Red**, **Mark of the Wolf**, **Teulings Guidance**, etc. | div. | bei Bedarf gegen SBT-DB pruefen. |

### Minor Furniture — offensiveFurniture (Damage-Buff)

| Item | Wirkung | Quelle |
|---|---|---|
| Bombard Works I | +Bombard-Damage (~19% elemental) | Blueprint Outpost Fort Louis |
| Culverin Works I | +Culverin-Damage | Blueprint Outpost Khmoy Estate |
| Demi-Cannon Works I | +Demi-Cannon-Damage | Blueprint Outpost Sunken Goldmine |
| Mortar Works I | +Mortar-Damage | Blueprint Outpost Three Brothers |
| Rocket Works I | +Rocket-Damage | Blueprint Outpost Rangnok Cave |
| Torpedo Works I | +Torpedo-Damage | Blueprint Outpost Lost City of Prei |
| Iron Cladding Station I | +Armor | Blueprint Outpost Royal Burial Ground |
| Tuning Station I | +Reload | The Helm Seasonal / Legacy Cache / Williams' Black Market BP |
| Mortar Powderbench | +Mortar-Burst | Williams' Y3S1 Seasonal |
| Rocket Powderbench | +Rocket-Burst | Williams' Y3S1 Seasonal |
| Ballista Furnace I | +Ballista-Damage | (kein aktiver Drop, alter Helm) |
| Brazing Furnace I | +Fire-Damage | The Helm (Blueprint) |
| Springloader Furnace I | +Springloader-Damage | (kein aktiver Drop, alter Helm) |
| Maintained Arsenal I | +Sustained-Damage | (alter Helm) |
| Mortar Grinder I, Rocket Grinder I | +Crit/Reload | (alter Helm) |
| Strange Elixir | Crit-Pivot | (alter Helm) |
| Langrage Barrels | Anti-Crew | (utility, manche Quellen mappen es als offensive) |

### Minor Furniture — utilityFurniture (Repair, Speed, Crew)

| Item | Wirkung |
|---|---|
| Maintenance Forge I | +Self-Repair (passiv) |
| Double-Planked Hull I | +Hull HP |
| Joinery Workshop I | +Repair-Kit-Effizienz |
| Boatswain's Call I | +Crew-Speed |
| Gunpowder Bench I | +Reload |
| Volatile Fuel I | +Damage |
| Sticky Fuel Station I | +Burning-Duration |
| Spiked War Horn I | +Brace-Recovery |
| Sterile Galley I | +Crew-Resistance |
| Storage Compartment I | +Cargo |
| Flag Painting Station I | +Notoriety |
| Lightened Mast I | +Speed |
| Beam Supports | +Hull |
| Braced Gunwales | +Brace |
| Scupper Station I | +Brace-Recovery |
| Hubac Tuning Rack | +Reload (chorusOfHavoc-Drop) |
| Smoked Canisters | Anti-Boarding |
| Debris Locker | Salvage-Buff |

### Tippfehler/Phantome aus alten Iterationen (NICHT empfehlen)

- "Pacea", "Cargo Hold Expansion", "Light Armor", "Spirit Collar" — existieren nicht in SBT
- "Lrange Barrel" → korrekt **Langrage Barrels**
- "Hubok Tuning Rack" → korrekt **Hubac Tuning Rack**
- "Spikes Station" — das ist **Spiteful Spikes Station** = Major (nicht Minor!)
- "Sea Fire Works I", "Long Gun Grinder", "Bombard Grinder", "Culverin Grinder", "Torpedo Grinder", "Rocket Furnace", "Torpedo Furnace", "Leather Station", "Buoy Powderhouse", "Front Powder Kegs", "Port Powder Kegs" — existieren NICHT in der SBT-DB

---

## 5. ARMOR-TRIGGER-MATRIX

| Armor | Konditional? | Trigger |
|---|---|---|
| **Floodbound** (Tide of Restoration) | JA | 20% des Brace-Damage gegen Flooded-Targets in 150m wird zu Hull-Heal. Ohne Flooding-Quelle = tot. |
| **Needle Shield** (Brackish Bite) | JA | Beim Bracing-Hit von Punctured-Angreifer: +5-15% Armor + +3-9% Piercing-Damage 30s. ZWEI Bedingungen: aktiv bracen UND Angreifer ist Punctured (Royal Ramming Works applies / Hullcarver Pulverize). |
| **Wrathful Ward** (Venomous Vengeance) | JA — Bracing | Beim Bracing-Hit: Noxious Cloud 5.000 Poison + Stamina-Drain auf Angreifer (10s CD). |
| **Phoenix Crest** (Revile + Gloat) | JA — Bracing + Multi-Gegner | Brace-Hits applizieren Taunted, +100% Brace-Recovery pro Taunted-Ship (max 10). |
| **Wyrmhide** (Entrenched + Bastion) | JA — Anchor | Anchor/Brace-skalierte Defense. |
| **Tanashah** (Dark Meditation + Reinforced) | JA — Bracing | -10% Status-Effect-Dauer/s waehrend Bracing; -25% Damage von Punctured. |
| **Buccaneer's Oath** (Blood and Gold) | SEMI — Kill / Low-HP | +25% Damage 30s nach Kill ODER +6-10% Damage bei Hull <25%. |
| **Royal Custodian** (Refortify) | SEMI — Repair-Kit | +35% Armor 12s nach Repair-Kit-Nutzung. Trigger immer verfuegbar. |
| **Black Prince** (Resolute) | JA — Low-HP | -50% Damage Reduction wenn Hull <30%. |
| **Ouroboros** (Amalgamate + Restoration) | NEIN | +15% Hull-Heal nach Brace-Ende + 100 Severe-Damage-Regen/s passive. Kein Trigger. |
| **Silver Sentinel** (Vigilance) | unverifiziert | Keine belastbare Y3S1-Quelle. Vor Empfehlung pruefen. |

### Status-Effekte (was triggert was)

| Status | Quellen (Beispiele) |
|---|---|
| **Flooded** | Carronade (Flooding I), Rahma's Ambition (Flooding II), Leopold III (Flooding II), Eye of Heaven hat Flooding NICHT, Endless Requiem (Flooding II), Farscourge III (Flooding I), Storm Vigil (Flooding II) |
| **Punctured** | Hullcarver (Piercing III + Pulverize-Stack), Lange Kartouwe (Piercing I), Royal Ramming Works (50% on Ram), Needle Shield (passive on bracing), Farscourge III (Piercing I) |
| **Burning** | Soulsnatcher (Burning II), Zamzama III (Burning II), Phoenix Talons (Burning II), Alecto (Burning II), Fire-Variants, The Warhammer (Burning I) |
| **Stormstruck** | Divine Thunder (Heaven's Eye + Electric II), Eye of Heaven (Tempest-Arc + Electric II), Heavenly Lance (Electric III) |
| **Marked** | Scoping Station (>320m Range automatisch), bestimmte Bow-Waffen |
| **Taunted** | Phoenix Crest (Revile bei Brace-Hit) |
| **Toxic** | Blightbearer (Sickly + Toxic II) |

---

## 6. WAFFEN-PERKS

| Perk | Mechanik |
|---|---|
| **Haunting Mend** (Soulsnatcher) | 20% Damage→Hull-Heal als Lifesteal. +20% pro zusaetzlichem Target im Splash. Max 60% bei 3+ Targets. |
| **Pulverize** (Hullcarver) | 6 consecutive Hits → +12% Damage 25s. Gegen Punctured-Targets: +18%. Miss resettet Stack. |
| **Piercing III** | +30% Damage als Piercing-Type, +100% Weakpoint-Damage. Hullcarver hat das. |
| **Piercing II** | +20% Piercing, +50% Weakpoint. |
| **Piercing I** | +10% Piercing, +25% Weakpoint. |
| **Riptide** (Carronade) | +50% Damage als Severe-Damage gegen Flooded-Targets. |
| **Flooding I/II/III** | +10/20/30% Damage als Flooding-Type. Stackt Flooded-Status. |
| **Heaven's Eye** (Divine Thunder) | Weakpoint-Hit hat 35% Chance auf Lightning-Strike (3.000 Electric). |
| **Tempest** (Eye of Heaven) | Bei Target-Hit: Lightning-Arc zum naechsten Target in 150m, 2.500 Electric. |
| **Burning I/II** | +10/20% Damage als Burning (DOT). |
| **Sickly** (Blightbearer) | +0.5% Weapon Damage pro 1% fehlender Brace; +30% extra wenn Target Poisoned. |
| **Toxic II** | +20% Damage als Toxic (DOT, Stamina-Drain). |
| **Cataclysmic** (Rahma's Ambition) | +Damage pro simultanem Torpedo-Hit. |
| **Unison** (Dardanelles Gun) | Alle Waffen auf gleicher Schiffsseite feuern simultan. |
| **Siege** (Mons Meg III, Lange Kartouwe) | +50% Damage gegen **Structures** (Forts, Tuerme — NICHT Schiffe!). |
| **Raider** (Farscourge III, Zamzama III, Basilisk III) | +50% Vulnerable-Charge-Rate (Crew Attacks). |
| **Brackish Bite** (Needle Shield) | siehe Armor-Matrix. |
| **Eighteen Strikes** (Phoenix Talons) | 18 Hits in 1 Salve → 1.888 Burning, x2 gegen Ablaze-Targets. |
| **Triple Threat** (Alecto) | nicht eindeutig verifizierbar — vermutlich 3-Shot-Burst. |
| **Homing** (Endless Requiem) | Torpedo verfolgt Target. |
| **Quick Arming** (Endless Requiem) | Torpedo aktiviert schneller. |
| **Arming** (Heavenly Lance, Rahma's Ambition) | Torpedo aktiviert verzoegert. |
| **Explosive I-III** (Bombards) | Explosions-Burst-Radius. |
| **Provoking** (Phoenix Talons) | erzeugt Threat. |
| **Electric II/III** | +20/30% Damage als Electric. |

---

## 7. SCHIFFS-PERKS

| Perk | Schiff | Wirkung |
|---|---|---|
| **Bullhorn** | Brigantine | +45% Ramming-Damage, +Speed-Pursuit, +Flooding-Weapon-Damage gegen Flooded-Targets, -80% Torn-Sails-Duration |
| **Grit** | Frigate | Stack-Armor durch erhaltene Hits (max 10, +40 Armor/Stack) |
| **Colossal** | Frigate, Galleon, Corvette | +Hull HP / +Cargo |
| **Abundant Gunports** | Frigate, Galleon, Corvette | mehr Geschuetze pro Slot |
| **Flagbearer** | Corvette | Flag-Marks-Stacks bei Damage-Hits (max 20, 20s). Pro Stack +1% Damage (max +20%) ODER +2.5% Repair-Effektivitaet (max +50%). Aura 500m fuer Ally-S/M-Schiffe +5% Dmg/Heal. Bei 20 Stacks: +10% Weakpoint-Damage. |
| **Iron Thunder** | Galleon | +65% Damage 3s nach Vollsalve-Charge |
| **Tenacity** | Snow | Recovery 5% Brace-Strength/s waehrend Bracing, +50% Base Brace, +150% Brace-Recovery |
| **Fury** | Schooner | (DPS-Buff) |
| **Scorched** | Sambuk | Fire-Buff |
| **Detonate** | Padewakang | Explosive-Buff |
| **Outburst** | Sloop | Burst-Buff |
| **Deadeye** | Garuda | Crit-Buff (Reload-Synergie alle Slots) |

→ **Wichtig zu Frigate:** "Resolve" als separater Schiffs-Perk existiert in der aktuellen SBT-DB NICHT mehr — fruehe Builds erwaehnten ihn, er wurde aber wohl in Grit integriert oder umbenannt. Vorsicht.

---

## 8. UPGRADE-STATS (Schiff-Werte)

### Frigate (Y2S2 oathsOfWar Release-Schiff)
- Base HP: **100.000**, Brace: **30.000**, Brace-Recovery: 1/s, Stamina: 100
- Sail: halfSail 9, fullSail 12, travelSail 16 (kn)
- Cargo: 100 Slots / 160.000 Weight
- Materials fuer Build: Magnetite Ingot 16, Planetary Gearset 8, Worm Drive 8, Deep Iron 10, Precision Drilling Bit 6, Torsion Spring 6, Orca Intricate Apparatus 2, Gannet Dense Niter 2, 12.000 Silver
- Blueprint: Smuggler Pass 45 Reward (Y2S2 — heute via Founding Celebratory Chest / Pinnacle Store)

### Brigantine
- Base HP: **40.000**, Brace: **8.000**, fullSail 12, Archetype DPS, Perk: bullhorn

### Corvette (Y2S3 eyeOfTheBeast)
- Base HP: **80.000**, Brace: **16.000**, fullSail 12, Archetype Support, Perks: colossal + abundantGunports + flagbearer
- Materials: Black Aria Ship Part 7, White Aria Ship Part 7, Xanthous Stone 7, Deep Iron 10, Hubac Heirloom 4, Xanthous Gemstone 4, Eel Sturdy Ropes 1, Wyrm Volatile Napalm 1, 12.000 Silver
- Blueprint: Y2S3 Smuggler Pass Tier 45 (heute schwer beschaffbar fuer Neueinsteiger)

### Snow
- Base HP: 50.000, Brace: 25.000, fullSail 10, Archetype Tank, Perk: tenacity

---

## 9. SAISON-INDEX (welche Saison = welche Verfuegbarkeit)

| Saison-Tag | Jahr | Status | Beschaffung |
|---|---|---|---|
| `release` | — | permanent | Standard-Vendor / Outpost-Blueprint / Legacy Cache |
| `shatteredSeas` | Y3S1 | aktiv (Mai 2026) | Smuggler Pass Free Track, Williams' Y3S1 Seasonal Item |
| `gutsAndGlory` | Y3? | alt | Faction War Effort Reward / Legacy Cache |
| `chorusOfHavoc` | Y2S5? | alt | The Helm Seasonal / Legacy Cache / Chorus Fleet Strongbox |
| `ascentIntoChaos` | Y2S4 | alt | Smuggler Pass Pinnacle Store (Y2S4) / Williams' Seasonal (oathsOfWar-Period) |
| `intoTheDragonsWake` | Y2S2 (Y2S1?) | alt | Smuggler Pass Pinnacle Store (Y2 ITDW) / Williams' Rotating Store Weekly / Teulings Weapon Chest |
| `oathsOfWar` | Y2S2 | alt (Frigate-Saison!) | Smuggler Pass Pinnacle Store (Y2 OOW) / Williams' Seasonal |
| `shadowsOfTheDeep` | Y2S3 | alt | Smuggler Pass Pinnacle Store (Y2 SOTD) / Williams' Rotating Store Weekly |
| `eyeOfTheBeast` | Y2S3 (alt) | alt (Corvette-Saison!) | Smuggler Pass Pinnacle Store Y2S3 |
| `ragingTides` | Y1 | sehr alt | Smuggler Pass Pinnacle Store (Y1) / Williams' Rotating Store / La Peste's Strongbox |

### Events 2026

| Event | Aktiv | Items |
|---|---|---|
| **The Honorless** | 12.05.–09.06.2026 | Soulsnatcher, Drowned Organ (via The Helm Event) |
| **Moonshine Larceny** | 30.06.–28.07.2026 | Ashbreaker, Drowned Organ (alt-Reissue) |
| **Azure Solstice** | NICHT aktiv 2026 | Frostwail, Nashkar — NICHT empfehlen |
| **Darktide Lullaby** | NICHT aktiv 2026 | Drowned Organ (alt-Reissue) |

---

## 10. BUILD-SYNERGIE-CHECKLISTE

Vor jedem Build-Vorschlag dieser Checklist abarbeiten:

### Vor-Pruefung
- [ ] Existiert jedes Item in SBT-DB? (gegen `items.json` pruefen)
- [ ] Hat jeder Slot den richtigen Waffentyp? (Mortar nur Aux, Rocket nur Aux, etc.)
- [ ] Maximal 1 Major-Furniture, 4 Minor-Furniture?
- [ ] Sind alle Items aus Saison `release` ODER `shatteredSeas` ODER aus aktiven Quellen (Williams' Store / Smuggler Pinnacle Store / Honorless Event)?

### Top-Deck-Math
- [ ] Burst-Berechnung beruecksichtigt Top-Deck-Halbierung?
- [ ] All-Deck-Items (Culverin, Demi-Cannon) bekommen volle Geschuetzzahl?

### Furniture-Trigger
- [ ] Drowned Organ → ≥1 Mending-Weapon im Build? Wenn nein: andere Major.
- [ ] Floodwarden Station → ≥1 Flooding-Quelle? Wenn nein: andere Major.
- [ ] Royal Ramming Works → Ram-Playstyle? Wenn nein: andere Major.
- [ ] Iron Capstan → Anchor-Playstyle? Wenn nein: andere Major.
- [ ] Hull Marker's Table → Cannonball-Ammo? Wenn nein: andere Major.

### Armor-Trigger
- [ ] Floodbound → ≥1 Flooding-Quelle?
- [ ] Needle Shield → Bracing + Punctured-Source (Royal Ramming Works oder Hullcarver-Pulverize auf Angreifer)?
- [ ] Wrathful Ward / Phoenix Crest / Tanashah → Bracing-Playstyle?
- [ ] Wyrmhide → Anchor-Playstyle?
- [ ] Black Prince → Low-HP-Phasen geplant?
- [ ] Royal Custodian → Repair-Kit-Nutzung in Rotation eingeplant?

### Logik-Doublecheck
- [ ] Macht die Rotation Sinn mit den Trigger-Bedingungen?
- [ ] Erwaehnt die Rotation aktives Bracen wenn Bracing-Armor/Furniture im Build?
- [ ] Erwaehnt die Rotation aktiven Anchor wenn Anchor-Armor/Furniture im Build?
- [ ] Erwaehnt die Rotation Repair-Kit-Timing wenn Refortify im Build?

### Realismus
- [ ] Stimmen die DPS-/Burst-Zahlen mit SBT-DMG × korrekter Geschuetzzahl ueberein?
- [ ] Sind die Quellen-Angaben aus SBT `obtainable[]` Array?
- [ ] Wird "Vendor" nur fuer echte Vendor-Items genutzt, nicht fuer Outpost-Blueprints?
