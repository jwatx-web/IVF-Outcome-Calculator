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

## Deferred to v2
- [ ] 3E: Side-by-side comparison mode
- [ ] Advanced AMH model (FSH + AFC inputs, simple/advanced mode toggle)
- [ ] Multiple cycles estimator (cumulative success across 2-6 cycles)
- [ ] Donor eggs pathway (different success model, recipient age less important)
- [ ] Inheritance pattern selector (autosomal dominant, X-linked recessive/dominant)
- [ ] Egg freezing calculator (age at freeze, thaw survival rates)
- [ ] PGT-SR for structural rearrangements (balanced translocations)
- [ ] ICSI decision tree (male factor severity assessment)

## Review Notes
_Phase 0-5 complete. Phase 6 QA in progress. v1.3 fixes deployed._
