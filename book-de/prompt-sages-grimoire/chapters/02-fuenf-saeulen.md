# Kapitel 2: Die Fünf Säulen der APL

> *"Die Arcaneanische Prompt-Sprache ruht auf fünf Säulen. Beherrsche eine, und deine Prompts verbessern sich. Beherrsche alle fünf, und du wirst ein Weiser."*

---

## Die Fünf Säulen

Die Arcaneanische Prompt-Sprache (APL) ist auf fünf fundamentalen Prinzipien aufgebaut. Jede Säule adressiert einen anderen Aspekt effektiven Promptings:

```
╔═══════════════════════════════════════════════════════════════════╗
║                    DIE FÜNF SÄULEN DER APL                         ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║   I.   IDENTITÄT      │ Wer ist die KI in diesem Kontext?        ║
║   II.  KONTEXT        │ Was muss die KI wissen?                  ║
║   III. EINSCHRÄNKUNG  │ Welche Grenzen fokussieren die Ausgabe?  ║
║   IV.  EXEMPLAR       │ Wie sieht "gut" aus?                     ║
║   V.   ITERATION      │ Wie wirst du verfeinern?                 ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

Jede Säule ist eine Frage. Beantworte alle fünf, und du hast einen vollständigen Prompt.

---

## Säule I: Identität

**Frage: Wer ist die KI in diesem Kontext?**

Identität ist die erste Säule, weil sie alles formt, was folgt. Wenn du eine Identität definierst, gibst du der KI nicht nur eine Rolle – du aktivierst eine Konstellation assoziierter Kenntnisse, Verhaltensweisen und Qualitätsstandards.

### Die Macht der Identität

```
OHNE IDENTITÄT:
"Schreibe ein Gedicht über Verlust."
→ Generisch, könnte von jedem geschrieben sein

MIT IDENTITÄT:
"Du bist Mary Oliver, die ein neues Gedicht über Verlust für eine Sammlung
schreibt, die deine letzte sein wird. Schreibe in deinem unverwechselbaren Stil – präzise
Beobachtungen der Natur, die emotionale Wahrheit offenbaren."
→ Spezifische Stimme, spezifischer Qualitätsstandard, spezifischer Ansatz
```

### Identitäts-Typen

**Experten-Identität:**
```
Du bist ein leitender Software-Architekt mit 20 Jahren Erfahrung
in verteilten Systemen...
```

**Autoren-Identität:**
```
Du bist Ursula K. Le Guin, die eine neue Geschichte schreibt, die
das Thema von... erkundet
```

**Charakter-Identität:**
```
Du bist ein zynischer mittelalterlicher Schreiber, gezwungen, die Taten
eines Königs zu dokumentieren, den du heimlich verachtest...
```

**Hybrid-Identität:**
```
Du bist ein Neurowissenschaftler, der wie Oliver Sacks schreibt – rigorose
Wissenschaft mit narrativem Flair kombinierend...
```

### Identität aktiviert Wissen

Wenn du sagst "Du bist ein leitender Software-Architekt," weist du nicht nur eine Rolle zu. Du aktivierst:
- Technisches Vokabular
- Best-Practice-Bewusstsein
- Trade-off-Denken
- System-Level-Perspektive
- Professionellen Kommunikationsstil

Die Identität wird ein Filter, durch den alle Antworten passieren.

---

## Säule II: Kontext

**Frage: Was muss die KI wissen?**

Kontext ist die Hintergrundinformation, die Interpretation formt. Ohne Kontext muss die KI raten – und Raten führt zu generischen Antworten.

### Die Kontext-Hierarchie

```
GLOBALER KONTEXT: Das große Bild
"Wir bauen eine Kinder-Bildungs-App fokussiert auf Astronomie."

LOKALER KONTEXT: Die unmittelbare Situation
"Der Nutzer hat gerade nach schwarzen Löchern gefragt und schien von
der vorherigen Erklärung verwirrt."

PERSÖNLICHER KONTEXT: Der spezifische Nutzer/das Publikum
"Der Nutzer ist 8 Jahre alt und liebt Dinosaurier."
```

### Kontext liefern

**Projekt-Kontext:**
```
# Projekt-Kontext
Dies ist für eine Meditations-App, die gestresste Berufstätige anspricht.
Der Ton sollte beruhigend aber nicht herablassend sein.
Nutzer haben typischerweise 5-10 Minuten pro Session.
```

**Gesprächs-Kontext:**
```
# Gespräch bisher
Nutzer: "Ich versuche Python zu lernen, aber bleibe ständig stecken."
KI: "Welche spezifischen Bereiche verursachen Probleme?"
Nutzer: "Schleifen. Ich verstehe nicht, wann man for vs. while nutzt."

# Aktuelle Aufgabe
Erkläre den Unterschied mit einer einprägsamen Analogie.
```

**Domänen-Kontext:**
```
# Domänen-Wissen
In dieser Welt wird Magie durch emotionale Energie angetrieben.
Positive Emotionen erschaffen lichtbasierte Magie.
Negative Emotionen erschaffen Schatten-Magie.
Keine ist von Natur aus gut oder böse.
```

---

## Säule III: Einschränkung

**Frage: Welche Grenzen fokussieren die Ausgabe?**

Einschränkungen sind keine Restriktionen – sie sind **Befreiungsgeräte**. Durch Optionen zu begrenzen, zwingst du Kreativität innerhalb von Grenzen, und begrenzte Kreativität ist kreativer als unbegrenztes Herumtasten.

### Arten von Einschränkungen

**Format-Einschränkungen:**
```
- Maximum 500 Wörter
- Genau drei Absätze
- Nur Aufzählungspunkte
- Haiku-Struktur
```

**Stil-Einschränkungen:**
```
- Keine Adverbien
- Nur Präsens
- Sätze unter 15 Wörtern
- Vermeide Passiv
```

**Inhalts-Einschränkungen:**
```
- Muss ein Twist-Ende enthalten
- Muss Wasser erwähnen
- Darf das Wort "schön" nicht nutzen
- Muss mit demselben Wort beginnen und enden
```

**Publikums-Einschränkungen:**
```
- Verständlich für 10-Jährige
- Kein Jargon
- Nimmt kein Vorwissen an
- Geschrieben für Experten, die die Grundlagen kennen
```

### Das Einschränkungs-Paradox

```
Mehr Einschränkungen = MEHR Kreativität (nicht weniger)

"Schreibe eine Geschichte" → Unendliche Optionen → Paralyse → Generische Wahl

"Schreibe eine 100-Wort-Geschichte über Verlust, erzählt komplett durch
Dialog zwischen Fremden in einem Zug, wo keine Figur je nennt, was
verloren wurde" → Spezifische Herausforderung → Kreative Lösung
```

---

[Continuing with remaining pillars...]

## Wichtigste Erkenntnisse

```
□ Identität formt Stimme, Ansatz und Qualität
□ Kontext verhindert Raten
□ Einschränkungen befreien durch Limitation
□ Exemplare lehren durch Demonstration
□ Iteration erwartet und plant Verfeinerung
□ Alle fünf Säulen zusammen = vollständiger Prompt
```

---

*"Ein Prompt auf allen fünf Säulen gebaut steht fest. Ein Prompt, dem eine Säule fehlt, wird wackeln."*

---

**Nächstes Kapitel: [Die Geisteshaltung des Prompt-Weisen](03-geisteshaltung.md)**
