# IVF Outcome Calculator — Worklog

## Phase 0: Project Setup
- [x] Init git repo
- [x] Create tasks/todo.md and tasks/lessons.md
- [x] Decompose ivf_simulator.html into index.html, style.css, script.js
- [x] Verify decomposed site works identically
- [ ] Create GitHub repo and push initial commit

## Phase 1: Visual Redesign (/frontend-design skill)
- [x] Define design system (CSS variables, fonts, colors)
- [x] Restructure HTML layout (header, stage indicator, input sections, results)
- [x] Restyle all components (inputs, cards, funnel chart, probability bars)
- [x] Add page load animations and micro-interactions
- [x] Mobile responsiveness (768px, 480px breakpoints)
- [x] Medical disclaimer banner

## Phase 2: Source Citations
- [x] Create sources.json with all citation data (7 groups, 19 sources, 10 verified PMIDs)
- [x] Add citation UI (superscript [1]-[7] links next to help text)
- [x] Add citation tooltips on hover (shows author, year, journal)
- [x] Add Sources & References section at page bottom (loaded from sources.json)

## Phase 3: Robustness Enhancements
- [x] 3A: Glossary/tooltips for medical terms (MII, ICSI, PGT-A, PGT-M, Euploid, Blastocyst)
- [x] 3B: URL parameter sharing (14 params encoded to URL) + Share/Reset/Print buttons
- [x] 3C: Print-friendly CSS (hides sliders, white bg, page breaks, URL footer)
- [x] 3D: Fresh vs. frozen transfer toggle (adjusts implantation rate +/- 5%)
- [ ] 3E: Side-by-side comparison mode (deferred to v2)

## Phase 4: Accessibility (WCAG 2.1 AA)
- [x] ARIA landmarks (role="main", aria-label on 10 sections)
- [x] aria-live="polite" on 6 results containers
- [x] aria-valuemin/max/now on all range inputs (updated dynamically)
- [x] Keyboard accessible glossary terms (tabindex="0")
- [x] Visible focus indicators (:focus-visible, 2px accent outline)
- [x] for/id label associations on all 13 inputs
- [x] .sr-only screen-reader-only utility class

## Phase 5: SEO & Deployment
- [x] Meta tags (description, keywords, canonical URL)
- [x] Open Graph meta tags (title, description, url, type, site_name)
- [x] Twitter Card meta tags
- [x] Schema.org JSON-LD (WebApplication, HealthApplication)
- [x] Deployment files (CNAME, robots.txt, sitemap.xml)
- [x] DNS setup instructions (docs/dns-setup.md)
- [x] README.md
- [ ] Create GitHub repo, push, enable Pages

## Phase 6: QA Verification
- [ ] HTML validation (balanced tags, no duplicate IDs)
- [ ] CSS validation (all classes used have styles)
- [ ] JavaScript validation (syntax check, DOM ID matching)
- [ ] Calculation accuracy verification
- [ ] Citation integrity (JSON valid, all refs match)
- [ ] Accessibility check (ARIA attributes, focus indicators)
- [ ] Performance check (total size < 100KB)

## JS Inline Color Fixes
- [x] rgba(255,255,255,0.3) → rgba(51, 51, 52, 0.15) (grade breakdown border)
- [x] #2d3748 → #333334 (cumulative results text)
- [x] #c53030 → #C4553A (cumulative results probability)
- [x] #718096 → #6B6B6C (cumulative results marginal increase)

---

## File Size Summary
| File | Before | After |
|------|--------|-------|
| index.html | 321 lines | 373 lines |
| style.css | 1,027 lines | 1,437 lines |
| script.js | 412 lines | 679 lines |
| sources.json | - | 431 lines |
| **Total** | **1,760** | **2,920 lines** |

## v1.1 Updates
- [x] Font size bump (body 15→16px, help text 12→13px, descriptions 13→14px)
- [x] PGT-A skip toggle (hides euploidy slider, sets rate to 100%)
- [x] PGT-M skip toggle (hides PGT-M slider + Genetic Inheritance section)
- [x] AMH-based egg count estimator (La Marca formula: age + AMH)
- [x] URL param sharing for new toggles (dopgta, dopgtm)
- [x] Cache-busting version strings on CSS/JS imports

## v1.2 Updates
- [x] Mobile padding fix (body 8→16px at 480px breakpoint)
- [x] Stage timeline: all 5 stages on single row on mobile (no wrap)
- [x] "Leave at 0" help text moved above grade inputs
- [x] Removed PGT-A skip toggle (redundant — euploidy slider auto-calculates)
- [x] Removed "Live Birth (Expected)" from funnel chart (confusing vs overall probability)
- [x] AMH formula recalibrated: log-AMH regression (age 38/AMH 3.0 → 12 eggs, was 8)
- [x] Cache-busting bumped to ?v=1.3

## v1.3 Updates
- [x] Fixed funnel bug: "Tested for Genetics" capped at blastocyst count (was showing 300%)
- [x] Default grade inputs changed from 5/1/0 to 0/0/0 (matches "Leave at 0" instruction)
- [x] AMH toggle restyled as bordered pill button (was subtle text link, easy to miss)
- [x] TrumpRx-level spacing overhaul (space-md 24→32px, space-lg 48→56px, space-xl 72→80px)
- [x] Increased spacing: input groups 28px, funnel stages 20px, probability bars 20px, funnel bars 48px
- [x] Cache-busting bumped to ?v=1.4

## v1.4 Updates (Design Audit)
- [x] Replaced editable number inputs with value displays for consistency (Eggs Retrieved, Embryo Count)
- [x] Fixed value-display mobile alignment (left-align at 480px breakpoint)
- [x] Reduced body padding from 32px to 16px
- [x] Tightened section heading margin from 32px to 20px
- [x] Lightened toggle-group padding (16px vertical, 32px horizontal)
- [x] Added accent top border to results and outcomes sections
- [x] Fixed disclaimer banner over-padding (32px → 20px horizontal)
- [x] Cache-busting bumped to ?v=1.5

## Deferred to v2
- [ ] 3E: Side-by-side comparison mode
- [ ] Advanced AMH model (FSH + AFC inputs, simple/advanced mode toggle)
- [ ] Multiple cycles estimator (cumulative success across 2-6 cycles)
- [ ] Donor eggs pathway (different success model, recipient age less important)
- [ ] Inheritance pattern selector (autosomal dominant, X-linked recessive/dominant)
- [ ] Egg freezing calculator (age at freeze, thaw survival rates)
- [ ] PGT-SR for structural rearrangements (balanced translocations)
- [ ] ICSI decision tree (male factor severity assessment)

## v1.5 Updates (Critical QA)
- [x] Grade inputs dynamically clamped to blastocyst count (can't exceed pipeline output)
- [x] New `clampGradesToBlastocysts()` function — clamps values + updates max attributes
- [x] `syncGradeCounts()` rewritten with blastocyst awareness (computes pipeline, clamps before syncing)
- [x] `embryoCount` slider max dynamically set to blastocyst count
- [x] `expectedValue` capped at `testedCount` in both grade-specific and simple-average paths
- [x] `testedCount` computed earlier (before grade-specific block) for proper capping
- [x] `embryoCount` read AFTER sync (was reading stale pre-sync value)
- [x] "Total embryos: X / Y blastocysts" display shows constraint limit
- [x] Cache-busting bumped to ?v=1.6

## v1.6 Updates (Slider Desync Fix)
- [x] `totalEmbryos` display always shows `totalGraded` (was showing raw slider value when grades=0)
- [x] `embryoCount` slider disabled when grades are entered (prevents desync with grade-specific calculation)
- [x] Blastocysts=0 edge case guard — zeroes all results, shows helpful message, disables slider
- [x] CSS disabled state for range inputs (opacity + muted thumb)
- [x] Cache-busting bumped to ?v=1.7

## v1.7 Updates (Stage 4 Flow Redesign)
- [x] Reordered HTML: testing count slider BEFORE grade inputs
- [x] Re-enabled embryoCount slider as primary user input (max = blastocysts)
- [x] Grades now clamp to embryoCount (not blastocysts) — prevents overcount
- [x] Removed grade→slider auto-sync (slider drives grades, not vice versa)
- [x] Pipeline changes reset testing count to "all blastocysts"
- [x] Renamed `clampGradesToBlastocysts` → `clampGradesToLimit` for clarity
- [x] Display: "Total graded: X / Y sent for testing"
- [x] Cache-busting bumped to ?v=1.8

## v1.8 Updates (URL Share Fix)
- [x] Fixed URL restore bug: slider value clamped by stale max in `restoreParamsFromURL()`
- [x] Bump slider `max` before setting `value` to prevent browser silent clamping
- [x] Cache-busting bumped to ?v=1.9

## v2.0 UI Improvements (Design Spec)
- [x] Task 4: Fix footnote close bug — added click-to-toggle, outside-click close, Escape key close
- [x] Task 8: Medical disclaimer — non-dismissible, terracotta left border, 14px font, darker text
- [x] Task 2: Design consistency audit — unified stat cards across results & pregnancy, standardized disclaimer padding
- [x] Task 9: Font size & spacing — bumped all 13px→14px, 12px→13px, h2 26→28px, labels 14→15px
- [x] Task 5: Slider onboarding animation — pulse keyframes on eggs slider thumb, removed on first input
- [x] Task 1: Radiant background gradients — subtle radial gradients (5% green top-left, 3.5% terracotta bottom-right)
- [x] Task 3: WCAG audit — prefers-reduced-motion, slider 44px touch targets, track pseudo-elements, contrast verified
- [x] Task 6: Viewport animations — IntersectionObserver for number tick-up + staggered bar fills
- [x] Task 7: Embryo grading UX — stepper buttons with quality indicators + segmented progress bar

## v2.1 QA Fixes
- [x] Fix 1: Design consistency — 3-tier section hierarchy (input=bg-alt, output=white+green top, info=white)
- [x] Fix 2: Disclaimer border changed from terracotta to green accent (consistent with site)
- [x] Fix 3: Slider thumb alignment — added margin-top: -9px for WebKit centering
- [x] Fix 4: Slider pulse animation — fixed box-shadow conflict, excluded box-shadow from transition
- [x] Fix 5: Footnotes — restructured loadCitations() so click handlers work even when fetch fails (file://)
- [x] Fix 6: Stepper padding — added margin-top: var(--space-sm) to grade-stepper-grid
- [x] Fix 7: Viewport tick-up — wired mostLikely, atLeast1Birth, atLeast2Births, noSuccess; added percentDecimal format
- [x] Fix 8: Background gradients — increased opacity (5%→8% green, 3.5%→5% terracotta) and spread
- [x] Chart sections promoted to Tier 2 (green top accent border)
- [x] Pregnancy section changed to Tier 1 (bg-alt, matching other input sections)
- [x] References section changed to Tier 3 (white bg)
- [x] Cache-busting bumped to ?v=2.1

## Review Notes
_Phase 0-5 complete. v2.1 QA fixes applied._

---

## Backlog (Queued)

### Design & Tooling
- [ ] Develop a design principles document or skill for later use

### SEO
- [ ] Maximize SEO visibility — audit and improve site SEO

### Legal
- [ ] Ensure full legal compliance — assess need for privacy policy, terms of use, data usage page

### Analytics
- [ ] Add site analytics (e.g. Google Analytics)

### UX Improvements
- [ ] Add detailed description tooltips for medical terms (e.g. what is a blastocyst, what does "live birth per transfer" mean)
- [ ] Assess feasibility of eggs retrieval slider not starting at 12 (appear as blank slate to start)

### Housekeeping
- [ ] File cleanup and archive (e.g. handoff files, old docs)

### Bug Fixes
- [ ] Fix bug: "Understanding the Results" always says "between 1-4 embryos" regardless of input
