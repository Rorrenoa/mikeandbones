# /sources/ — Quellen-Snapshots

Diese Dateien sind **gespeicherte Snapshots externer Quellen** zum Stand des Sourcings.
Sie dienen als referenzierbare Wahrheit für die Builds und Mechanik-Seiten.

Bei Konflikten zwischen Snapshot und Live-Site gilt die Live-Site — aber der Snapshot
zeigt, worauf sich der Guide zum Schreibzeitpunkt stützte.

## Index

| Datei | Quelle | Gefetcht |
|---|---|---|
| `y3s1-patch-notes.md` | Ubisoft Y3S1 Patch Notes (offiziell) | 2026-05-26 |

## Konventionen

- Jede Snapshot-Datei hat im Kopf: Originale URL, Fetch-Datum, ggf. Patch-Datum.
- Strukturierte Markdown-Zusammenfassung (kein 1:1-HTML-Dump), aber numerische
  Werte und exakte Wordings übernehmen.
- Bei Patch-Updates: neue Datei `yYsX-patch-notes.md` anlegen, alte behalten.
