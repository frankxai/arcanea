<div align="center">

<img src="assets/premium/arcanea-wordmark.png" alt="Arcanea" width="520" />

# Erschaffe lebendige Welten mit KI-Agenten

Aus einer Idee wird eine zusammenhängende Welt aus Geschichten, Figuren, Regeln, Medien und Aufgaben, die über einzelne Sitzungen hinaus wachsen kann.

[Arcanea entdecken](https://arcanea.ai/) · [English](README.md) · [Community](https://arcanea.ai/community) · [Mitwirken](CONTRIBUTING.md)

</div>

![Goldene, konzentrische Tore um ein türkisfarbenes Licht vor dunklem Hintergrund](assets/premium/arcanea-hero-premium.png)

## Der Anfang ist eine Welt

Arcanea ist ein kreatives KI-Universum für Menschen, die schreiben, gestalten und Welten bauen. Im Mittelpunkt steht Kontinuität: Eine Figur, ein Ort, eine Regel und eine Szene gehören zu derselben Welt, statt in voneinander getrennten Prompts zu verschwinden.

Auf [arcanea.ai](https://arcanea.ai/) führen Portale, Kanon-Leitfäden und verschiedene Schaffenswege in diese Welt. Einige Angebote sind dort ausdrücklich als **Preview** oder **Dev preview** gekennzeichnet.

## Arcanea erkunden

| Bereich | Einstieg |
| --- | --- |
| **Erleben** | [arcanea.ai](https://arcanea.ai/) öffnen und die verfügbaren Portale erkunden. |
| **Lesen** | Die [Arcanea-Bibliothek](book/README.md) und die [deutsche Sammlung](book-de/README.md) entdecken. |
| **Entwickeln** | Die [Web-App](apps/web/) und die [Pakete](packages/) in diesem öffentlichen Code-Spiegel ansehen. |
| **Austauschen** | Fragen und Ideen in den [Discussions](https://github.com/frankxai/arcanea/discussions) teilen. |

Arcaneas Zehn Tore, Fünf Elemente, Wächter und Schaffensränge bilden ein gemeinsames Vokabular. Die verbindlichen Namen und Beziehungen stehen im [Kanon](.arcanea/lore/CANON_LOCKED.md).

## Lokal entwickeln

Dieses Repository ist der öffentliche Code-Spiegel von arcanea.ai und ein Monorepo mit pnpm und Turborepo. Die aktive Web-App liegt in [`apps/web`](apps/web/).

```bash
git clone https://github.com/frankxai/arcanea.git
cd arcanea
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev:web
```

Für Anmeldung und KI-Funktionen sind zusätzliche Dienste und Umgebungsvariablen nötig. Die Vorlage steht in [`apps/web/.env.example`](apps/web/.env.example). Öffentliche Seiten lassen sich auch ohne diese Zugangsdaten erkunden.

## Projekte und Mitwirkung

Zum Ökosystem gehören [arcanea-code](https://github.com/frankxai/arcanea-code), [arcanea-orchestrator](https://github.com/frankxai/arcanea-orchestrator), [arcanea-claw](https://github.com/frankxai/arcanea-claw) und [oh-my-arcanea](https://github.com/frankxai/oh-my-arcanea).

Wer mitwirken möchte, beginnt bei [CONTRIBUTING.md](CONTRIBUTING.md). Die öffentliche Einsicht in den Code bedeutet nicht, dass sämtliche Inhalte frei weiterverwendet werden dürfen. Es gelten der [Lizenzhinweis](LICENSE) und gegebenenfalls eigene Lizenzen einzelner Komponenten.
