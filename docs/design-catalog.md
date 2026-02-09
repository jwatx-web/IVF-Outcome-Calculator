# IVF Outcome Calculator — Design Element Catalog

**Purpose:** Documents every design element on the site with standardized rules.
Each element has a consistent pattern. When adding new UI, reference this catalog.

**Theme:** Oura-inspired "Hopeful Medical Luxury" (Helsinki Blue + Playfair Display)

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

### Background
- **Desktop:** Sunrise aura — layered radial gradients (cool blue top-left, warm peach top-right)
- **Mobile (768px):** Simplified linear gradient (blue-tinted top fading to white)
- **Base Color:** `var(--color-bg)` (#FFFFFF)

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
| Border Radius | `var(--radius-md)` (24px) |
| Box Shadow | `var(--shadow-card)` |
| Padding | `var(--space-md)` (32px) |
| Margin Bottom | `var(--space-lg)` (56px) |

### Pattern B — Input/Form Section (Secondary)
**Use for:** User input areas, form controls
**Sections:** `.input-section`, `.pregnancy-section`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg-alt)` (#FAFAFA) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (24px) |
| Box Shadow | `var(--shadow-card)` |
| Padding | `var(--space-md)` (32px) |
| Margin Bottom | `var(--space-lg)` (56px) |

### Pattern C — Informational Section
**Use for:** References, disclaimers, static content
**Sections:** `.references-section`

| Property | Value |
|----------|-------|
| Background | `var(--color-white)` (#FFFFFF) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (24px) |
| Box Shadow | `var(--shadow-card)` |
| Padding | `var(--space-md)` (32px) |
| Margin Bottom | `var(--space-lg)` (56px) |

### Decision Rule
> If the section **shows computed/dynamic data** → Pattern A
> If the section **collects user input** → Pattern B (alt background)
> If the section is **static informational content** → Pattern C

---

## 3. Section Headings

### H1 — Page Title
- **Class:** `.header h1`
- **Font:** Playfair Display (var(--font-display))
- **Size:** 44px (desktop), 34px (tablet), 28px (mobile)
- **Weight:** 400
- **Line Height:** 1.15
- **Color:** `var(--color-text)` (#151619)
- **Letter Spacing:** -0.01em
- **Usage:** Only the main page title "IVF Outcome Calculator"

### H2 — Section Header
- **Font:** Playfair Display (var(--font-display))
- **Size:** 28px
- **Weight:** 400
- **Line Height:** 1.3
- **Color:** `var(--color-text)` (#151619)
- **Margin Bottom:** `var(--space-md)` (32px)
- **Text Align:** Left
- **Usage:** ALL top-level section headings — "Stage 1-3", "Stage 4", "Genetic Inheritance", "Expected Outcomes", "Complete IVF Journey Funnel", "Probability Distribution", "Stage 5", "Overall Success Probability", "Sources & References"

### H4 — Component Header
- **Font:** Playfair Display (var(--font-display))
- **Size:** 16px
- **Weight:** 400
- **Color:** `var(--color-text)` (#151619)
- **Margin Bottom:** `var(--space-xs)` (8px)
- **Usage:** Info box headers ("Understanding the Results")

### Decision Rule
> **H2** = Every top-level section box heading (all sections use H2)
> **H4** = Small component-level headers within a section (e.g. "Understanding the Results")

---

## 4. Cards

### Data Card (Standard)
**Use for:** Individual stat displays, genetics cards, result cards
**Classes:** `.stat-card`, `.genetics-card`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg)` (#FFFFFF) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (24px) |
| Box Shadow | `var(--shadow-card)` |
| Padding | `var(--space-md)` (32px) |
| Text Align | Center |
| Hover | border-color: rgba(47,74,115,0.3), box-shadow: var(--shadow-card-hover) |
| Transition | all 0.2s ease |

### Outcome Card (Info Card)
**Use for:** Pregnancy outcome probabilities with descriptions
**Class:** `.outcome-card`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg)` (#FFFFFF) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (24px) |
| Padding | `var(--space-md)` (32px) |
| Text Align | Left |
| Hover | border-color: rgba(47,74,115,0.3), box-shadow: var(--shadow-card-hover) |

### Form Input Card
**Use for:** Input controls within form sections
**Classes:** `.transfer-input`, `.toggle-group`

| Property | Value |
|----------|-------|
| Background | `var(--color-bg)` (#FFFFFF) |
| Border | `1px solid var(--color-border)` |
| Border Radius | `var(--radius-md)` (24px) |
| Padding | `var(--space-sm) var(--space-md)` (16px 32px) |
| Margin Bottom | `var(--space-md)` (32px) |

---

## 5. Data Numbers

### Large Display Number
**Use for:** Primary outcome numbers in centered data cards
**Classes:** `.stat-value`, `.genetics-prob`

| Property | Value |
|----------|-------|
| Font | Playfair Display (var(--font-display)) |
| Size | 36px (desktop), 28px (mobile) |
| Weight | 400 |
| Color | `var(--color-accent)` (#2F4A73) |
| Line Height | 1.1 |
| Margin Bottom | 6px |

### Inline Accent Number
**Use for:** Numbers alongside text (outcome probabilities)
**Class:** `.outcome-prob`

| Property | Value |
|----------|-------|
| Font | Playfair Display (var(--font-display)) |
| Size | 22px |
| Weight | 400 |
| Color | `var(--color-accent)` (#2F4A73) |

### Decision Rule
> Card is centered with a big number as focal point → **Large Display** (36px)
> Number sits alongside text in a row → **Inline Accent** (22px)

---

## 6. Body Text

### Input Label
- **Tag:** `<label>`
- **Font:** Inter (var(--font-body))
- **Size:** 15px
- **Weight:** 600
- **Color:** `var(--color-text)` (#151619)
- **Margin Bottom:** `var(--space-xs)` (8px)

### Help Text
- **Class:** `.help-text`
- **Font:** Inter (var(--font-body))
- **Size:** 14px
- **Weight:** 400
- **Color:** `var(--color-text-muted)` (#6B7280)
- **Line Height:** 1.5
- **Margin Top:** 8px

### Card Label (below numbers)
- **Class:** `.stat-label`, `.genetics-desc`
- **Font:** Inter (var(--font-body))
- **Size:** 14px
- **Weight:** 400
- **Color:** `var(--color-text-muted)` (#6B7280)
- **Line Height:** 1.4

### Card Title (bold text in card)
- **Class:** `.genetics-title`
- **Font:** Inter (var(--font-body))
- **Size:** 14px
- **Weight:** 600
- **Color:** `var(--color-text)` (#151619)
- **Margin Bottom:** 4px

### Header Subtitle
- **Element:** `.header p`
- **Font:** Inter (var(--font-body))
- **Size:** 17px
- **Weight:** 400
- **Color:** `var(--color-text-muted)` (#6B7280)
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
- **Font:** Inter, 16px, weight 700
- **Color:** `var(--color-accent)`

### Stepper Controls
- **Button Size:** 44x44px (WCAG touch target)
- **Value Font:** Playfair Display, 22px
- **Border:** 1px solid `var(--color-border)`, radius 8px
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
- **Border:** 1px solid `var(--color-border)`, radius 8px
- **Font:** Inter, 14px
- **Background:** white

---

## 8. Buttons

### Toolbar Button (Capsule)
- **Class:** `.btn.btn-secondary`
- **Font:** Inter, 0.875rem, weight 600
- **Padding:** 14px 32px
- **Border:** 2px solid `var(--color-accent)`, radius 999px (capsule)
- **Background:** transparent
- **Color:** `var(--color-accent)` (#2F4A73)
- **Hover:** accent bg, white text, scale 1.02
- **Active:** scale 0.98
- **Transition:** all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Copied State
- **Class:** `.btn-copied`
- **Background:** `var(--color-accent)`
- **Color:** white
- **Border:** accent

### AMH Toggle Link (Capsule)
- **Class:** `.amh-toggle`
- **Font:** Inter, 0.875rem, weight 600
- **Padding:** 10px 24px
- **Border:** 2px solid accent, radius 999px (capsule)
- **Background:** transparent
- **Hover:** accent bg, white text

---

## 9. Charts & Visualizations

### Funnel Chart
- **Container:** `.chart-section` (Pattern A section)
- **Bar Height:** 48px
- **Bar Radius:** 8px
- **Color:** Monochromatic Helsinki Blue (accent color at decreasing opacity: 1.0 → 0.34)
- **Label Font:** 14px, muted color
- **Count Font:** Inter, bold
- **Animation:** Width transition 0.5s ease, staggered 80ms per bar

### Probability Distribution Bars
- **Bar Height:** 28px
- **Bar Radius:** 8px
- **Default Color:** `var(--color-accent)`
- **Highlight Color:** `var(--color-highlight)` (#EF4444)
- **Label Font:** 14px, muted color
- **Animation:** Width transition 0.4s ease, staggered 60ms

### Info Box (within chart section)
- **Class:** `.info-box`
- **Background:** `var(--color-bg)`
- **Border Left:** 3px solid accent
- **Radius:** 8px
- **Padding:** 16px 32px

---

## 10. Special Elements

### Medical Disclaimer Banner
- **Class:** `.disclaimer-banner`
- **Background:** rgba(47,74,115,0.12)
- **Border:** 1px solid rgba(47,74,115,0.18) + 4px left accent
- **Radius:** 8px
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
- **Tooltip:** Dark bg (var(--color-text)), white text, 13px
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
--color-bg: #FFFFFF           (page background)
--color-bg-alt: #FAFAFA       (section alternate bg)
--color-text: #151619          (primary text — Oura Black)
--color-text-muted: #6B7280   (secondary/label text)
--color-accent: #2F4A73        (primary accent — Helsinki Blue)
--color-accent-light: #4A6FA5  (hover accent)
--color-accent-bg: rgba(47,74,115,0.08) (subtle accent background)
--color-border: rgba(0,0,0,0.05) (ghost borders)
--color-highlight: #EF4444     (highlight/emphasis — red)
--color-white: #FFFFFF

--font-display: 'Playfair Display', Georgia, 'Times New Roman', serif
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

--space-xs: 8px
--space-sm: 16px
--space-md: 32px
--space-lg: 56px
--space-xl: 80px

--radius-sm: 8px
--radius-md: 24px
--radius-lg: 32px
--radius-full: 999px

--shadow-card: 0 20px 40px -15px rgba(0, 0, 0, 0.05)
--shadow-card-hover: 0 25px 50px -12px rgba(0, 0, 0, 0.08)
--shadow-button: 0 8px 16px -4px rgba(0, 0, 0, 0.1)
```
