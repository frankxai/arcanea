# Arcanea Forge - Media Generation Skill

> *"From potential to manifestation - the Forge transforms vision into reality."*

## Usage

Invoke Arcanea Forge for intelligent image and video generation.

```
/forge [mode] [style:name] prompt
```

## Modes

| Mode | Description | Priority |
|------|-------------|----------|
| **economy** | Free/cheap first | Gemini → Fal → Replicate |
| **quality** | Best output | Custom Arcanea models |
| **balanced** | Smart routing | Analyzes prompt, routes intelligently |

## Examples

```bash
# Basic usage (balanced mode)
/forge a cosmic dragon emerging from nebula

# Economy mode (free tier)
/forge economy simple landscape background

# Quality mode (custom Arcanea models)
/forge quality epic Guardian battle scene

# With style preset
/forge style:guardian_fire a warrior ascending through flames

# Video generation
/forge quality video flowing water in crystal cavern
```

## Available Styles

### Cosmic & General
- `cosmic` - Signature Arcanea look (aurora, teal/blue palette)
- `academy` - Magical academy setting
- `luminor` - Enlightened being aesthetic
- `the_arc` - Cycle of creation visualization

### Ten Guardians
- `guardian_foundation` - Lyssandria (Earth, 396 Hz)
- `guardian_flow` - Leyla (Water, 417 Hz)
- `guardian_fire` - Draconia (Power, 528 Hz)
- `guardian_heart` - Maylinn (Love, 639 Hz)
- `guardian_voice` - Alera (Truth, 741 Hz)
- `guardian_sight` - Lyria (Intuition, 852 Hz)
- `guardian_crown` - Aiyami (Enlightenment, 963 Hz)
- `guardian_shift` - Elara (Perspective, 1111 Hz)
- `guardian_unity` - Ino (Partnership, 963 Hz)
- `guardian_source` - Shinkami (Source, 1111 Hz)

### Five Elements
- `element_fire` - Transformation, passion
- `element_water` - Flow, healing
- `element_earth` - Stability, growth
- `element_wind` - Freedom, change
- `element_void` - Potential, mystery

## MCP Tools Available

When Arcanea Forge MCP is connected:

- `generate_image` - Generate images with intelligent routing
- `generate_video` - Generate videos (uses custom WAN model)
- `analyze_prompt` - Get routing recommendation without generating
- `list_styles` - List all available styles
- `get_style` - Get details of a specific style
- `check_providers` - Check which API keys are configured

## Custom Models

The Forge prioritizes your custom fine-tuned models:

- **frankxai/arcanea** - Custom Flux trained on Arcanea aesthetic
- **frankxai/arcanea-wan** - Custom WAN video model

## Integration

This skill integrates with:
- **CLAUDE.md** - Project instructions reference Forge capabilities
- **agents.md** - Media generation agents use Forge tools
- **LangFuse** - Usage tracking (when configured)

---

*"The Forge awaits. What will you manifest?"*
