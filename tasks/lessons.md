# Lessons Learned

_Updated after corrections or insights during development_

## Patterns & Rules
- Always verify calculation accuracy after any JS changes
- Keep the calculator functional offline (no required external API calls)
- Source citations must link to real, verifiable publications
- Test slider sync behavior when modifying event listeners

## Design System Rules
- **3-tier section hierarchy**: Tier 1 (input) = `bg-alt`, Tier 2 (output) = white + green top accent, Tier 3 (info) = white, no accent
- **Color discipline**: `--color-accent` (green) for all UI chrome (borders, buttons, links). `--color-highlight` (terracotta) for data emphasis ONLY (probability bars). Never mix them.
- **Inner cards** all share the same base: `bg` background, `border`, `radius-md`, `space-md` padding. No exceptions.
- When adding a new section, classify it into a tier FIRST, then apply the correct styles.

## CSS Gotchas
- **WebKit slider thumb alignment**: Custom track height (e.g. 6px) + input height (44px) requires explicit `margin-top: -9px` on `::-webkit-slider-thumb`. Firefox auto-centers. Always test both.
- **CSS animation vs transition conflict**: If an element has both `transition: box-shadow` and an `animation` that sets `box-shadow`, the transition will interfere. Exclude `box-shadow` from `transition` when animation is active.
- **Pulse keyframes**: Must include the default `box-shadow` value in keyframes (not just the pulse glow), otherwise the animation replaces the resting shadow entirely.
- **Gradient visibility**: `rgba()` opacity below 10% is essentially invisible on light backgrounds. Start at 10-15% for subtle radial gradients on `#FAF8F5`.
- **Inline styles in JS**: Use hex values, not `var()` — CSS custom properties don't resolve in inline `style` attributes.

## JavaScript Gotchas
- **`fetch()` fails on `file://`**: CORS blocks `fetch('sources.json')` when opened as a local file. Any code that depends on fetch MUST have a `.catch()` fallback. Attach event handlers OUTSIDE the `.then()` chain so they work regardless.
- **IntersectionObserver + dynamic content**: If content is dynamically rendered (e.g. funnel chart bars from `updateSimulation()`), the observer may fire before the content exists. Use `setTimeout` or `MutationObserver` to handle timing.
- **Slider `max` vs `value` ordering**: Browsers silently clamp `value` to `max`. When restoring from URL params, always set `max` BEFORE setting `value`.

## Process Lessons
- **Visual QA is mandatory**: Never ship UI changes without opening in a browser. CSS that looks correct in code can have invisible bugs (wrong opacity, conflicting transitions, missing vendor prefixes).
- **Test on localhost, not file://**: Always use `python3 -m http.server 8000` for local testing. `file://` breaks fetch, service workers, and module imports.
- **Design consistency >> individual features**: A cohesive visual language (tiers, card hierarchy, color rules) matters more than any single feature. Establish the rules FIRST, then implement against them.
- **Gradient/animation subtlety**: When adding subtle visual effects, err on the side of MORE visible initially. It's easier to tone down than to debug "I can't see anything."

## Mistakes to Avoid
- Don't attach event handlers inside `.then()` callbacks without also attaching in `.catch()` — breaks graceful degradation
- Don't assume CSS opacity percentages will be visible — test on actual background colors
- Don't add accent borders to only SOME sections without a documented rule for which sections get them
- Don't use terracotta (`--color-highlight`) for UI chrome — it's reserved for data visualization
- Don't skip `margin-top` on WebKit slider thumbs — they WILL be misaligned on Chrome/Safari
