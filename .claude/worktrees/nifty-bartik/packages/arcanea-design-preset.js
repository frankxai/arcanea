/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                cosmic: {
                    void: '#0b0e14',      // Deep background
                    deep: '#121826',      // Card background
                    surface: '#1a2332',   // Elevated surface
                    highlight: '#242f42', // Hover state
                    overlay: '#364562',   // Dropdowns/Tooltips
                },
                crystal: {
                    DEFAULT: '#7fffd4', // Aquamarine / Primary Brand
                    dim: '#5ce6b8',
                    bright: '#99ffe0',
                    glow: 'rgba(127, 255, 212, 0.5)',
                },
                fire: {
                    DEFAULT: '#ff6b35',
                    dim: '#d94e1f',
                    bright: '#ff8c5a',
                    glow: 'rgba(255, 107, 53, 0.5)',
                },
                water: {
                    DEFAULT: '#78a6ff',
                    dim: '#5a8ce6',
                    bright: '#9dbfff',
                },
                void: {
                    DEFAULT: '#9966ff',
                    dim: '#7a4dcc',
                },
                gold: {
                    DEFAULT: '#ffd700',
                    dim: '#ccac00',
                },
                text: {
                    primary: '#e6eefc',   // Almost white
                    secondary: '#9bb1d0', // Blue-grey
                    muted: '#708094',     // Darker grey
                }
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                crimson: ['Crimson Pro', 'serif'],
                inter: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'cosmic-mesh': "radial-gradient(ellipse at 20% 50%, rgba(127, 255, 212, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(153, 102, 255, 0.03) 0%, transparent 50%)",
                'gradient-crystal': 'linear-gradient(135deg, #7fffd4 0%, #00bfff 100%)',
                'gradient-fire': 'linear-gradient(135deg, #ff6b35 0%, #ffa500 100%)',
                'gradient-void': 'linear-gradient(135deg, #9966ff 0%, #4b0082 100%)',
                'gradient-gold': 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
            },
            boxShadow: {
                'glow-sm': '0 0 10px rgba(127, 255, 212, 0.2)',
                'glow-md': '0 0 20px rgba(127, 255, 212, 0.3)',
                'glow-lg': '0 0 40px rgba(127, 255, 212, 0.4)',
                'glow-fire': '0 0 20px rgba(255, 107, 53, 0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
                    '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
                }
            }
        },
    },
    plugins: [],
}
