# KINUAMI Homepage Image Generation Prompts

Use these prompts with Midjourney, NanoBanana Pro, or similar AI image generators to create the missing hero images.

---

## Hero Section - Triptych Layout

The hero uses a three-panel layout:
- **Left Panel**: Lifestyle/bathing scene
- **Center Panel**: Existing animated GIF (no generation needed)
- **Right Panel**: Bathroom environment

---

## Prompt 1: Hero Left Panel - Solo Bathing

**Purpose:** Lifestyle shot showing peaceful bathing moment with dense foam

```
Japanese woman enjoying shower moment, eyes gently closed with peaceful expression,
dense luxurious white foam covering shoulders and upper body,
warm natural morning light streaming through frosted window,
soft steam rising in background creating atmospheric depth,
minimal modern Japanese bathroom with cream and white tones,
editorial fashion photography style, medium format camera look,
shallow depth of field with subject in sharp focus,
warm color temperature, natural skin tones,
aspect ratio 3:4, shot from slight angle
--ar 3:4 --style raw --s 250
```

**Alternative - Male Version:**
```
Japanese man in peaceful shower moment, eyes closed relaxed expression,
dense white foam on shoulders and chest,
warm golden hour light from bathroom window,
steam creating soft atmospheric haze,
minimal spa-like bathroom, cream tiles and natural wood accents,
editorial photography, medium format aesthetic,
shallow depth of field, warm natural tones,
aspect ratio 3:4
--ar 3:4 --style raw --s 250
```

---

## Prompt 2: Hero Right Panel - Bathroom Environment

**Purpose:** Atmospheric bathroom scene establishing sanctuary mood

```
Minimal Japanese bathroom interior, early morning light through window,
small bonsai tree on natural wood stool in foreground,
white rectangular subway tiles with subtle texture,
soft steam wisps catching light in the air,
cream and sage green color accents,
natural materials - wood, stone, ceramic,
zen sanctuary aesthetic, peaceful atmosphere,
architectural interior photography, no people,
warm natural lighting with soft shadows,
aspect ratio 3:4
--ar 3:4 --style raw --s 250
```

**Alternative - More Steam/Atmosphere:**
```
Japanese bathroom sanctuary, morning light filtering through,
steam-filled air creating dreamy atmosphere,
glimpse of natural wood bench and white ceramic,
bonsai silhouette visible through steam,
cream and warm white color palette,
spa-like tranquility, zen minimalism,
architectural photography with atmospheric depth,
no people, focus on ambiance,
aspect ratio 3:4
--ar 3:4 --style raw --s 250
```

---

## Image Specifications

| Property | Value |
|----------|-------|
| Aspect Ratio | 3:4 (portrait) |
| Resolution | Minimum 1200x1600px |
| Format | WebP or JPG |
| File Size | Under 500KB optimized |
| Color Profile | sRGB |

---

## File Naming Convention

Save generated images to `/public/images/hero/`:

```
/public/images/hero/
├── hero-lifestyle.webp     (Left panel)
├── hero-environment.webp   (Right panel)
└── hero-lifestyle-alt.webp (Alternative if needed)
```

---

## Style Notes

**Match the existing aesthetic:**
- Warm, natural color temperature
- Soft, diffused lighting (not harsh)
- Cream/white/sage palette
- Japanese minimalist influence
- Editorial photography feel
- Dense, luxurious foam texture

**Avoid:**
- Cold, clinical lighting
- Overly saturated colors
- Busy backgrounds
- Generic stock photo feel
- Harsh shadows

---

## After Generation

1. Optimize images with tools like Squoosh or ImageOptim
2. Convert to WebP format for web performance
3. Place in `/public/images/hero/` directory
4. Update `HeroEditorial.tsx` with correct paths
