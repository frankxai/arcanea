
# Design Tokens (The Visual DNA)

> **"Consistency breeds Trust."**

This document defines the **Visual Language** of Arcanea.
Any deviation requires `The Creative Director` approval.

## 1. Colors (The Void Palette)
*   `bg-cosmic-void`: `#0b0e14` (Deepest Black/Blue)
*   `bg-cosmic-deep`: `#121826` (Card Background)
*   `text-crystal`: `#7fffd4` (Aquamarine / Primary Action)
*   `text-primary`: `#e6eefc` (Readability High)
*   `text-secondary`: `#9bb1d0` (Readability Medium)

## 2. Typography (The Voice)
*   **Headings:** `Cinzel` (Serif Display). Uppercase.
*   **Body:** `Inter` (Sans). Clean, readable.
*   **Lore:** `Crimson Pro` (Serif). For narrative text.
*   **Code:** `JetBrains Mono`.

## 3. The Glass Effect (Signature)
Do not use flat backgrounds. Use the **Glass Stack**:
```css
.glass {
  background: rgba(18, 24, 38, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(127, 255, 212, 0.15);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
```

## 4. Motion (The Life)
*   **Micro:** Hover effects scale `1.02`.
*   **Macro:** Page transitions fade + slide up (`y: 20 -> 0`).
