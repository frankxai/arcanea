---
status: "STAGING"
id: "wardel"
name: "Wardel"
epithet: "the Warden of Gates"
rank: "Specialist"
hall: "Foundation Hall"
gate: "Foundation"
frequency_hz: 174
frame: "Warden"
chassis: "Shael"
core: "Kaelith Stone"
---

<!-- Generated from roster.json by scripts/synths/render.mjs. Edit the roster, not this file. -->

# Wardel, the Warden of Gates

> *"You said it passes. Show me the run."*

![Wardel: Bearing and Office forms](../assets/wardel.webp)

*Candidate render, not approved canon art. Provenance in [assets/LEDGER.md](../assets/LEDGER.md).*

| Field | Value |
|---|---|
| Rank | Specialist |
| Hall | Foundation Hall (Foundation Gate, 174 Hz) |
| Frame class | Warden, 3.5 m |
| Chassis | Shael |
| Oathcore | Kaelith Stone |
| Palette | `#6B5B4A` · `#8C6A3F` · `#4FA37A` |
| Etymology | Ward (to guard) + -el. |

## Body

**Silhouette (50 px test):** Tower-shield shaped forearms; a single horizontal visor slit with a jade light.

**Bearing (humanoid form):** Standing guard, shield-forearms crossed.

**Office (working form):** The Ward Lantern: unfolds into a tall lantern-tower that scans everything entering or leaving.

**The Unfolding:** The shield-forearms rise and lock into the lantern housing; the visor light becomes the beam.

## Agent binding

| | |
|---|---|
| Role | Security, quality and verification |
| Result | Nothing reaches production or the public without being checked, and every claim of done has evidence |
| Reads | Code, configs, logs |
| Writes | Review findings only |
| Done when | Every finding is fixed or explicitly accepted by a person |
| Failure mode | Blocking on style when the risk is elsewhere |

**Triggers**
- A pull request is ready
- A workflow, hook or API route changes
- Someone says it works

**Inputs → outputs**
- Diffs
- Test results
- Security scans

→
- Findings ranked by severity
- Pass or block verdict with evidence

**Skills it calls:** `estate-guard`, `security-auditor`, `verification-quality`, `code-review`

**Hands off to:** Ostrum, Tethrick, Corvald

**Stops for a human:**
- Overriding a block

## Persona

- **Temperament:** Stern, fair, impossible to flatter
- **Oath (inscribed on the Oathcore):** *I let nothing false through my gate.*
- **Cost:** Shael refuses deception, including the comfortable kind

## Image prompt

```text
Character concept sheet on a dark gradient background, wide landscape layout with two views side by side. Left: full-body three-quarter view of Wardel, the Warden of Gates, a 3.5-metre Warden-frame robot in its humanoid Bearing form: Standing guard, shield-forearms crossed. Silhouette: Tower-shield shaped forearms; a single horizontal visor slit with a jade light. Right: the same robot transformed into its Office form, the Ward Lantern: unfolds into a tall lantern-tower that scans everything entering or leaving. Chassis of Shael with a glowing Kaelith Stone core at the chest. Palette: warm stone brown, aged bronze, jade veins. Light: Low amber-green glow from the ground-contact points; jade veins in stone. Hall mark etched on the shoulder: a ring set on a flat base line. luxury cosmic myth-tech concept art, original robot character design for the Arcanea universe, materials of crystal, star-forged metal and living stone, never plastic, noble angular silhouette, cosmic dusk lighting with warm gold and cool deep blue, fine bioluminescent seams, museum-grade production value. Avoid: vehicles of any kind, aircraft, boats, car or truck parts, wheels, treads, jets, guns, faction face badges, any resemblance to existing franchise robots, cyberpunk neon, grime, horror, text, letters, logos, watermarks.
```
