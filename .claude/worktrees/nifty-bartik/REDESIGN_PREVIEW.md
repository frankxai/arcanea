
# Arcanea 2026 Redesign Preview: The "Arcane" Evolution

The Arcanea visual interface has been upgraded to a **Hyper-Immersive 3D Experience**.

## 🚀 How to View the Redesign

1.  Open your terminal in `c:\Users\frank\Arcanea`
2.  Run the development server:
    ```bash
    npx next dev --webpack
    ```
3.  Open your browser to: `http://localhost:3000`

## ✨ New Features (Version 3.0)
- **Living 3D Background**: A procedurally generated starfield (`ThreeScene.js`) that reacts to time.
- **"Aura" 3D Mascot**: A pulsing, distortion-field AI sphere (`Mascot3D.js`) floating in the hero section.
- **Glassmorphism 2.0**: Enhanced frosted glass cards with dynamic hover states.
- **Interactive Lighting**: Mouse-tracking radial gradients that illuminate the dark void.
- **Performance Optimized**: Uses `React Three Fiber` for GPU-accelerated graphics instead of heavy video files.

## 📂 Key Files
- `pages/index.js`: The main logic integrating 2D DOM and 3D Canvas.
- `src/components/ThreeScene.js`: The background starfield logic.
- `src/components/Mascot3D.js`: The detailed AI sphere shader.

*Note: If you see a blank screen initially, give the 3D engine a moment to compile shaders.*
