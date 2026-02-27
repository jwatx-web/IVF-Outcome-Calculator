# Test Coverage Analysis

**Date:** 2026-02-27
**Current Coverage:** 0% — No test framework, no test files, no `package.json`

---

## Executive Summary

The IVF Outcome Calculator has **zero automated tests**. The entire codebase — 1,170 lines of JavaScript containing critical medical/statistical calculations — relies entirely on manual QA. This is a significant risk for a tool that influences real-world fertility decisions.

Below is a prioritized breakdown of what to test, why it matters, and specific test cases for each area.

---

## Priority 1: Core Calculation Functions (Critical)

These are pure functions with no DOM dependencies. They are the easiest to test and the most important to get right, since incorrect math directly misleads users about their fertility outcomes.

### 1.1 `binomialProbability(n, k, p)` — Lines 30-41

**Risk:** This is the statistical engine behind every outcome probability. A bug here silently corrupts all results.

**What to test:**
- Known values: `P(3, 1, 0.5)` should equal `0.375`
- Edge cases: `P(n, 0, p)` should equal `(1-p)^n`
- Edge cases: `P(n, n, p)` should equal `p^n`
- Boundary: `p = 0` should return `1` when `k = 0`, `0` otherwise
- Boundary: `p = 1` should return `1` when `k = n`, `0` otherwise
- Sum of all `P(n, k, p)` for `k = 0..n` should equal `1.0` (within floating point tolerance)
- Large n values (e.g., n=20) — tests the `factorial()` implementation doesn't overflow or lose precision
- **Bug risk:** The recursive `factorial()` inside will stack overflow for large `n`. Consider testing `n >= 25`

### 1.2 `calculateEuploidRate(age, grade)` — Lines 1-19

**Risk:** Age-based euploidy rates directly determine expected usable embryos. Wrong rates = wrong medical expectations.

**What to test:**
- Base rates at each age bracket boundary:
  - `age=30` → `75`, `age=31` → `70`, `age=34` → `65`, `age=36` → `60`
  - `age=38` → `55`, `age=39` → `45`, `age=41` → `35`, `age=43` → `25`
- Grade modifiers:
  - `(30, 'AA')` → `min(90, 75 * 1.15)` = `86.25`
  - `(30, 'BA')` → `min(85, 75 * 1.05)` = `78.75`
  - `(30, 'BC')` → `75 * 0.85` = `63.75`
  - `(43, 'AA')` → `min(90, 25 * 1.15)` = `28.75`
- Cap validation: AA grade at young age should cap at `90`, BA at `85`
- No grade (`null`/`undefined`) returns base rate only
- Boundary: exact age thresholds (30, 31, 33, 34, 35, 37, 38, 40, 42, 43)

### 1.3 `getImplantationRateForGrade(grade, baseRate)` — Lines 22-27

**Risk:** Affects per-transfer success rate calculation.

**What to test:**
- AA grade: `(AA, 0.50)` → `min(0.70, 0.50 * 1.12)` = `0.56`
- AA cap: `(AA, 0.65)` → `min(0.70, 0.65 * 1.12)` = `0.70` (capped)
- BA grade: `(BA, 0.50)` → `0.50` (passthrough)
- BC grade: `(BC, 0.50)` → `0.425`
- Unknown grade: `(null, 0.50)` → `0.50` (passthrough)

### 1.4 `estimateEggsFromAMH(age, amh)` — Lines 576-581

**Risk:** Users rely on this to set their egg retrieval expectations from lab results.

**What to test:**
- Known clinical ranges: age 35, AMH 2.0 → should produce reasonable egg estimate (verify against clinical literature)
- Boundary: result clamped between 1 and 40
- Low AMH: `(40, 0.1)` → should clamp to minimum (1)
- High AMH: `(25, 10.0)` → should clamp to maximum (40)
- AMH = 0: function uses `Math.log(0)` = `-Infinity` — **likely bug**, should test and handle
- Negative AMH: nonsensical but should handle gracefully

---

## Priority 2: Simulation Pipeline Logic (High)

The `updateSimulation()` function (lines 65-398) is a ~330-line monolith mixing calculations with DOM updates. To test it properly, the calculation logic needs to be extracted from the DOM manipulation.

### 2.1 Pipeline Arithmetic (Lines 67-76)

**What to test:**
- `matureEggs = round(eggsRetrieved * maturityRate)`
- `fertilizedEggs = round(matureEggs * fertilizationRate)`
- `blastocysts = round(fertilizedEggs * blastocystRate)`
- Rounding accumulation: 12 eggs × 80% × 75% × 50% — verify each intermediate step rounds independently (as code does), not as a single multiplication
- Zero eggs: should early-return with all zeros
- Edge: 1 egg with low rates — does it produce 0 or 1 blastocyst?

### 2.2 Expected Value Calculation

**What to test (ungrouped path — line 193-194):**
- `combinedProb = euploidRate * pgtmRate`
- `expectedValue = min(embryoCount * combinedProb, testedCount)`
- PGT-M off (`pgtmRate = 1.0`): expected value = `embryoCount * euploidRate`

**What to test (graded path — lines 154-196):**
- Grade-specific euploidy rates are calculated correctly per grade
- Expected usable per grade: `gradeCount * gradeEuploidRate * pgtmRate`
- Total expected value = sum of grade-specific values, capped at `testedCount`
- Weighted implantation rate formula correctness
- Edge: all grades are 0 (falls through to ungrouped path)
- Edge: grades don't sum to embryoCount (falls through to ungrouped path)

### 2.3 Probability Distribution (Lines 200-215)

**What to test:**
- Probabilities array length = `embryoCount + 1`
- Sum of all probabilities ≈ 1.0
- Most likely outcome identification (single peak vs. plateau)
- When `combinedProb = 0.5` and `embryoCount = 4`, most likely should be 2

### 2.4 Pregnancy Outcome Calculations (Lines 218-243)

**What to test:**
- `probAtLeast1Birth + probNoSuccess` ≈ 1.0 (conservation check — **note: this may NOT hold due to the weighted sum structure; verify**)
- `perTransferSuccess = weightedImplantationRate * liveBirthRate`
- With 0 usable embryos: `probNoSuccess = 1.0`, `probAtLeast1Birth = 0`
- With 1 embryo at 100% success rate: `probAtLeast1Birth = 1.0`
- `probAtLeast2Births <= probAtLeast1Birth` (always)
- With `perTransferSuccess = 0`: all birth probabilities = 0

---

## Priority 3: Input Validation & State Management (Medium)

### 3.1 `clampGradesToLimit(limit)` — Lines 44-63

**What to test:**
- Grades [3, 2, 1] with limit 4 → should clamp to [3, 1, 0]
- Grades [0, 0, 0] with limit 5 → unchanged
- Grades [5, 5, 5] with limit 5 → should clamp to [5, 0, 0]
- Limit 0 → all grades become 0
- Max attributes updated correctly: each input's max = limit - sum of others

### 3.2 `updatePipelineAndResetTestingCount()` — Lines 415-426

**What to test:**
- Correctly chains: `round(round(round(eggs * mat) * fert) * blast)`
- Sets embryoCountSlider max and value to blastocyst count
- Minimum blastocyst count = 1 (Math.max)

### 3.3 Frozen/Fresh Transfer Toggle (Lines 971-991)

**What to test:**
- Switching to Frozen: implantation rate increases by 5%, capped at 80
- Switching to Fresh: implantation rate decreases by 5%, floored at 20
- Toggle at boundaries (rate = 80 → frozen stays 80; rate = 20 → fresh stays 20)
- Repeated toggles don't drift (fresh → frozen → fresh returns to original ±5)

---

## Priority 4: URL Sharing & State Persistence (Medium)

### 4.1 `encodeParamsToURL()` — Lines 780-793

**What to test:**
- All 15 parameters are encoded
- Checkbox values encoded as '1' or '0'
- URL format is valid

### 4.2 `restoreParamsFromURL()` — Lines 795-829

**What to test:**
- Round-trip: encode → decode produces identical state
- Empty URL string returns false
- Missing parameters are skipped (partial restore)
- Slider max is adjusted before value (per lessons.md bug)
- Invalid values (non-numeric, out-of-range) — graceful handling?
- **Potential bug:** No validation that restored values are within slider min/max ranges

### 4.3 `paramConfig` Completeness

**What to test:**
- Every slider/input in the HTML has a corresponding paramConfig entry
- No duplicate keys
- All referenced DOM IDs exist in index.html

---

## Priority 5: Data Integrity (Medium)

### 5.1 `sources.json` Validation

**What to test:**
- JSON is valid and parseable
- All citation groups have required fields (number, data_summary, sources)
- All sources have required fields (author, title, journal, year)
- PMIDs are valid format (numeric)
- DOIs are valid format
- No duplicate citation numbers
- Citation numbers referenced in HTML (`#ref-N`) all exist in sources.json

### 5.2 HTML/JS ID Consistency

**What to test:**
- Every `document.getElementById('...')` in script.js has a matching `id="..."` in index.html
- No duplicate IDs in HTML
- All ARIA references are valid

---

## Priority 6: Accessibility (Lower, but important)

### 6.1 ARIA Attribute Updates

**What to test:**
- `aria-valuenow` updates when slider value changes
- `aria-valuetext` formats correctly per `sliderUnits` map
- `aria-valuemax` updates when embryoCount slider max changes

### 6.2 Keyboard Navigation

**What to test:**
- All interactive elements reachable via Tab
- Stepper buttons respond to click events
- Escape key dismisses citation tooltips
- Toggle switches work with Space/Enter

---

## Recommended Test Architecture

### Step 1: Introduce a Minimal Test Framework

Since this is a zero-dependency vanilla JS project, the lightest path is:

```
npm init -y
npm install --save-dev vitest jsdom
```

**Why Vitest:** Fast, modern, zero-config for vanilla JS, built-in jsdom support for DOM testing.

### Step 2: Extract Pure Functions into a Testable Module

Create `calc.js` (or similar) that exports the pure calculation functions:

```js
// calc.js
export function calculateEuploidRate(age, grade) { ... }
export function getImplantationRateForGrade(grade, baseRate) { ... }
export function binomialProbability(n, k, p) { ... }
export function estimateEggsFromAMH(age, amh) { ... }
export function computePipeline(eggs, maturityRate, fertRate, blastRate) { ... }
export function computeExpectedValue(embryoCount, euploidRate, pgtmRate) { ... }
export function computeProbabilities(embryoCount, combinedProb) { ... }
export function computePregnancyOutcomes(probabilities, perTransferSuccess) { ... }
```

This keeps the existing `script.js` working as-is (by inlining or importing) while making the core logic independently testable.

### Step 3: Test File Structure

```
tests/
├── calc.test.js              # Pure calculation functions
├── pipeline.test.js          # Pipeline arithmetic & expected values
├── probabilities.test.js     # Binomial distribution & pregnancy outcomes
├── input-validation.test.js  # Grade clamping, slider constraints
├── url-params.test.js        # Encode/decode round-trip tests
├── data-integrity.test.js    # sources.json validation, HTML/JS ID sync
└── accessibility.test.js     # ARIA attribute updates (jsdom)
```

### Step 4: CI Integration

Add a GitHub Actions workflow to run tests on every push/PR:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
```

---

## Estimated Impact

| Priority | Area | Risk if Untested | Effort to Test | Test Count (est.) |
|----------|------|-------------------|----------------|-------------------|
| P1 | Core calculations | **Critical** — wrong medical info | Low (pure functions) | ~40-50 |
| P2 | Simulation pipeline | **High** — cascading errors | Medium (needs extraction) | ~30-40 |
| P3 | Input validation | Medium — bad UX | Low-Medium | ~15-20 |
| P4 | URL sharing | Medium — broken sharing | Low | ~10-15 |
| P5 | Data integrity | Low-Medium — broken citations | Low | ~10 |
| P6 | Accessibility | Low — compliance risk | Medium (needs jsdom) | ~10-15 |
| | | | **Total** | **~115-140** |

---

## Known Bug Risks Found During Analysis

1. **`binomialProbability` with large n:** The recursive `factorial()` implementation will hit stack overflow and precision issues for `n > ~170` (JavaScript's max safe factorial). Current max is `n = 40` (slider max for eggs), but the function is called with `embryoCount` which maxes at `blastocysts`. Should still test at `n = 40`.

2. **`estimateEggsFromAMH` with AMH = 0:** `Math.log(0) = -Infinity`, causing `Math.exp(-Infinity) = 0`, which `Math.max(1, ...)` would catch. But worth verifying the edge case is handled correctly.

3. **`restoreParamsFromURL` with no validation:** Restored values are not validated against slider min/max ranges. A crafted URL could set `euploidRate=999` and the calculator would use it without clamping.

4. **`probAtLeast1Birth + probNoSuccess` may not equal 1.0:** The pregnancy calculation weights birth probabilities by embryo count probabilities, but should be verified that the total is conserved.

5. **Floating-point rounding in pipeline:** Each stage rounds independently (`Math.round`), so `12 × 0.80 × 0.75 × 0.50` could yield different results depending on rounding order. This is by design but worth documenting with tests.

---

## Recommendation

**Start with Priority 1.** The four pure calculation functions can be tested today with ~50 test cases, zero refactoring, and would cover the most critical medical accuracy risks. This alone would be a significant improvement from 0% coverage.
