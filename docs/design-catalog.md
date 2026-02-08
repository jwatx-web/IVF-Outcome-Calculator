# IVF Outcome Calculator — Design Element Catalog

**Purpose:** Documents every design element on the site with standardized rules.
Each element has a consistent pattern. When adding new UI, reference this catalog.

---

## 1. Page Layout

### Container
- **Class:** `.container`
- **Max Width:** 880px
- **Margin:** 0 auto (centered)
- **Animation:** fadeIn 0.5s ease-out

### Content Area
- **Class:** `.content`
- **Role:** `main`
- **Padding:** 0 (sections handle their own padding)

---

## 2. Section Boxes

All content sections follow ONE of three patterns:

### Pattern A — Data Display Section (Primary)
**Use for:** Computed results, charts, data visualizations, genetics info
**Sections:** `.results-section`, `.chart-section`, `.pregnancy-outcomes`, `.genetics-section`

| Property | Value |
|----------|-------|
| Background | `var(--color-white)` (#FFFFFF) |
| Border | `1px solid var(--color-border)` |
| Border Top | `3px solid var(--color-accent)` |
| Border Radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-md)` (32px) |
| Margin Bottom | `var(--space-lg)` (56px) |

### Pattern B — Input/Form Section (Secondary)
**Use for:** User input areas, form controls
**Sections:** `.input-section`, `.pregnancy-section`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg-alt)` (#F2EFEB) |
| Border | `1px solid var(--color-border)` |
| Border Top | None |
| Border Radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-md)` (32px) |
| Margin Bottom | `var(--space-lg)` (56px) |

### Pattern C — Informational Section
**Use for:** References, disclaimers, static content
**Sections:** `.references-section`

| Property | Value |
|----------|-------|
| Background | `var(--color-white)` (#FFFFFF) |
| Border | `1px solid var(--color-border)` |
| Border Top | None |
| Border Radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-md)` (32px) |
| Margin Bottom | `var(--space-lg)` (56px) |

### Decision Rule
> If the section **shows computed/dynamic data** → Pattern A (accent top border)
> If the section **collects user input** → Pattern B (alt background)
> If the section is **static informational content** → Pattern C (white, no accent)

---

## 3. Section Headings

### H1 — Page Title
- **Class:** `.header h1`
- **Font:** Instrument Serif (var(--font-display))
- **Size:** 44px (desktop), 34px (tablet), 28px (mobile)
- **Weight:** 400
- **Line Height:** 1.15
- **Color:** `var(--color-text)` (#333334)
- **Letter Spacing:** -0.01em
- **Usage:** Only the main page title "IVF Outcome Calculator"

### H2 — Major Section Header
- **Font:** Instrument Serif (var(--font-display))
- **Size:** 28px
- **Weight:** 400
- **Line Height:** 1.3
- **Color:** `var(--color-text)` (#333334)
- **Margin Bottom:** `var(--space-md)` (32px)
- **Text Align:** Left
- **Usage:** Major stages/results — "Expected Outcomes", "Stage 5: Transfer & Pregnancy Success", "Sources & References"

### H3 — Subsection Header
- **Font:** Instrument Serif (var(--font-display))
- **Size:** 22px
- **Weight:** 400
- **Line Height:** 1.3
- **Color:** `var(--color-text)` (#333334)
- **Margin Bottom:** 20px
- **Usage:** All other section headers — "Stage 1-3", "Stage 4", "Genetic Inheritance", "Complete IVF Journey Funnel", "Probability Distribution", "Overall Success Probability"

### H4 — Component Header
- **Font:** Instrument Serif (var(--font-display))
- **Size:** 16px
- **Weight:** 400
- **Color:** `var(--color-text)` (#333334)
- **Margin Bottom:** `var(--space-xs)` (8px)
- **Usage:** Info box headers ("Understanding the Results")

### Decision Rule
> **H2** = Starts a new major pipeline stage or major results area
> **H3** = Everything else (subsections, supporting data, charts)
> **H4** = Small component-level headers within a section

---

## 4. Cards

### Data Card (Standard)
**Use for:** Individual stat displays, genetics cards, result cards
**Classes:** `.stat-card`, `.genetics-card`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg)` (#FAF8F5) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-md)` (32px) |
| Text Align | Center |
| Hover | border-color: rgba(43,94,73,0.3), box-shadow: 0 2px 12px rgba(0,0,0,0.04) |
| Transition | all 0.2s ease |

### Outcome Card (Info Card)
**Use for:** Pregnancy outcome probabilities with descriptions
**Class:** `.outcome-card`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg)` (#FAF8F5) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-md)` (32px) |
| Text Align | Left |
| Hover | border-color: rgba(43,94,73,0.3) |

### Inline Summary Card
**Use for:** Compact stat summaries within input sections
**Class:** `.summary-stats`

| Property | Value |
|----------|-------|
| Background | `var(--color-white)` (#FFFFFF) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-sm) var(--space-md)` (16px 32px) |
| Margin Top | `var(--space-sm)` (16px) |

### Form Input Card
**Use for:** Input controls within form sections
**Classes:** `.transfer-input`, `.toggle-group`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg)` (#FAF8F5) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-sm) var(--space-md)` (16px 32px) |
| Margin Bottom | `var(--space-md)` (32px) |

---

## 5. Data Numbers

### Large Display Number
**Use for:** Primary outcome numbers in centered data cards
**Classes:** `.stat-value`, `.genetics-prob`

| Property | Value |
|----------|-------|
| Font | Instrument Serif (var(--font-display)) |
| Size | 36px (desktop), 28px (mobile) |
| Weight | 400 |
| Color | `var(--color-accent)` (#2B5E49) |
| Line Height | 1.1 |
| Margin Bottom | 6px |

### Medium Display Number
**Use for:** Compact inline stats
**Classes:** `.summary-stat-value`

| Property | Value |
|----------|-------|
| Font | Instrument Serif (var(--font-display)) |
| Size | 24px |
| Weight | 400 |
| Color | `var(--color-accent)` (#2B5E49) |

### Inline Accent Number
**Use for:** Numbers alongside text (outcome probabilities)
**Class:** `.outcome-prob`

| Property | Value |
|----------|-------|
| Font | Instrument Serif (var(--font-display)) |
| Size | 22px |
| Weight | 400 |
| Color | `var(--color-accent)` (#2B5E49) |

### Decision Rule
> Card is centered with a big number as focal point → **Large Display** (36px)
> Compact stat row within another section → **Medium Display** (24px)
> Number sits alongside text in a row → **Inline Accent** (22px)

---

## 6. Body Text

### Input Label
- **Tag:** `<label>`
- **Font:** DM Sans (var(--font-body))
- **Size:** 15px
- **Weight:** 600
- **Color:** `var(--color-text)` (#333334)
- **Margin Bottom:** `var(--space-xs)` (8px)

### Help Text
- **Class:** `.help-text`
- **Font:** DM Sans (var(--font-body))
- **Size:** 14px
- **Weight:** 400
- **Color:** `var(--color-text-muted)` (#6B6B6C)
- **Line Height:** 1.5
- **Margin Top:** 8px

### Card Label (below numbers)
- **Class:** `.stat-label`, `.genetics-desc`
- **Font:** DM Sans (var(--font-body))
- **Size:** 14px
- **Weight:** 400
- **Color:** `var(--color-text-muted)` (#6B6B6C)
- **Line Height:** 1.4

### Card Title (bold text in card)
- **Class:** `.genetics-title`
- **Font:** DM Sans (var(--font-body))
- **Size:** 14px
- **Weight:** 600
- **Color:** `var(--color-text)` (#333334)
- **Margin Bottom:** 4px

### Header Subtitle
- **Element:** `.header p`
- **Font:** DM Sans (var(--font-body))
- **Size:** 17px
- **Weight:** 400
- **Color:** `var(--color-text-muted)` (#6B6B6C)
- **Max Width:** 520px

---

## 7. Form Controls

### Range Slider
- **Track Height:** 6px, radius 3px, bg: `var(--color-border)`
- **Thumb:** 24px circle, bg: `var(--color-accent)`, shadow: 0 1px 4px rgba(0,0,0,0.15)
- **Touch Target:** 44px height (WCAG 2.5.5)
- **Hover:** Track darkens, thumb scales 1.15x
- **Disabled:** opacity 0.4, pointer-events none

### Value Display
- **Class:** `.value-display`
- **Min Width:** 60px
- **Text Align:** Right
- **Font:** DM Sans, 16px, weight 700
- **Color:** `var(--color-accent)`

### Stepper Controls
- **Button Size:** 44x44px (WCAG touch target)
- **Value Font:** Instrument Serif, 22px
- **Border:** 1px solid `var(--color-border)`, radius 6px
- **Button Hover:** accent-bg background
- **Button Active:** accent bg, white text

### Toggle Switch
- **Size:** 48x26px
- **Track:** `var(--color-border)` → `var(--color-accent)` when checked
- **Thumb:** 20px circle, white, shadow
- **Labels:** 14px, weight 500, muted color

### Number Inputs (AMH)
- **Width:** 100%
- **Padding:** 6px 10px
- **Border:** 1px solid `var(--color-border)`, radius 6px
- **Font:** DM Sans, 14px
- **Background:** white

---

## 8. Buttons

### Toolbar Button
- **Class:** `.btn.btn-secondary`
- **Font:** DM Sans, 13px, weight 600
- **Padding:** 8px 16px
- **Border:** 1px solid `var(--color-border)`, radius 6px
- **Background:** white
- **Hover:** bg alt, border accent, text accent
- **Active:** scale 0.98

### Copied State
- **Class:** `.btn-copied`
- **Background:** `var(--color-accent)`
- **Color:** white
- **Border:** accent

### AMH Toggle Link
- **Class:** `.amh-toggle`
- **Font:** DM Sans, 14px, weight 600
- **Padding:** 8px 16px
- **Border:** 1px solid accent, radius 6px
- **Background:** white
- **Hover:** accent-bg

---

## 9. Charts & Visualizations

### Funnel Chart
- **Container:** `.chart-section` (Pattern A section)
- **Bar Height:** 48px
- **Bar Radius:** 6px
- **Color:** Monochromatic teal (accent color at decreasing opacity: 1.0 → 0.34)
- **Label Font:** 14px, muted color
- **Count Font:** DM Sans, bold
- **Animation:** Width transition 0.5s ease, staggered 80ms per bar

### Probability Distribution Bars
- **Bar Height:** 28px
- **Bar Radius:** 6px
- **Default Color:** `var(--color-accent)`
- **Highlight Color:** `var(--color-highlight)` (#C4553A)
- **Label Font:** 14px, muted color
- **Animation:** Width transition 0.4s ease, staggered 60ms

### Info Box (within chart section)
- **Class:** `.info-box`
- **Background:** `var(--color-bg)`
- **Border Left:** 3px solid accent
- **Radius:** 6px
- **Padding:** 16px 32px

---

## 10. Special Elements

### Medical Disclaimer Banner
- **Class:** `.disclaimer-banner`
- **Background:** rgba(43,94,73,0.12)
- **Border:** 1px solid rgba(43,94,73,0.18) + 4px left accent
- **Radius:** 6px
- **Font:** 14px
- **Accent Text:** bold, accent color

### Stage Timeline
- **Class:** `.stage-indicator`
- **Layout:** Flex, space-between, connecting line
- **Circle:** 32px, accent bg when active
- **Label Font:** 13px, weight 500
- **Active Color:** accent

### Glossary Tooltips
- **Trigger:** `.glossary-term` (dotted underline, cursor help)
- **Tooltip:** Dark bg (#333334), white text, 13px
- **Max Width:** 280px, min 180px
- **Shadow:** 0 4px 12px rgba(0,0,0,0.2)
- **Position:** Above element with arrow

### Citation Tooltips
- **Trigger:** `.cite-ref a`
- **Tooltip:** Dark bg, 13px, max-width 320px
- **Interaction:** Click to toggle, Escape to dismiss

### References List
- **Item Padding:** 16px vertical
- **Separator:** 1px bottom border
- **Number Color:** accent, bold
- **Link Color:** accent, underline on hover

---

## CSS Variables Reference (Current)

```
--color-bg: #FAF8F5          (page background)
--color-bg-alt: #F2EFEB      (section alternate bg)
--color-text: #333334         (primary text)
--color-text-muted: #6B6B6C  (secondary/label text)
--color-accent: #2B5E49       (primary accent — teal/green)
--color-accent-light: #3A7A60 (hover accent)
--color-accent-bg: rgba(43,94,73,0.08) (subtle accent background)
--color-border: rgba(51,51,52,0.15) (standard borders)
--color-highlight: #C4553A    (highlight/emphasis — terracotta)
--color-white: #FFFFFF

--font-display: 'Instrument Serif', Georgia, serif
--font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif

--space-xs: 8px
--space-sm: 16px
--space-md: 32px
--space-lg: 56px
--space-xl: 80px

--radius-sm: 6px
--radius-md: 12px
--radius-lg: 20px
```

---

## Future Theme Migration Notes

When migrating to the Oura-inspired "Hopeful Medical Luxury" theme, swap these CSS variables:

| Current | New Theme |
|---------|-----------|
| `--font-display: Instrument Serif` | `--font-display: Playfair Display` |
| `--font-body: DM Sans` | `--font-body: Inter` |
| `--color-accent: #2B5E49` | `--color-accent: #2F4A73` (Helsinki Blue) |
| `--color-text: #333334` | `--color-text: #151619` (Oura Black) |
| `--radius-md: 12px` | `--radius-md: 24px` |
| `--radius-sm: 6px` | `--radius-sm: 16px` |
| Borders: 1px solid | Ghost borders: rgba(0,0,0,0.05) + shadows |
| Flat backgrounds | Aura mesh gradients + glassmorphism |
| Buttons: rounded rectangle | Buttons: capsule (999px radius) |

The standardized class structure from this catalog ensures a clean swap.
