# IVF Outcome Simulator

A comprehensive, interactive tool for calculating expected outcomes at every stage of the IVF process, from egg retrieval through to live birth.

## Overview

This simulator helps you understand the probabilities and expected outcomes throughout your IVF journey. It uses statistical modeling (binomial probability) combined with published medical success rates to give you realistic expectations at each stage.

**Important Disclaimer:** This tool is for informational and educational purposes only. It cannot predict individual outcomes. Always consult with your fertility specialist for medical advice specific to your situation.

## What It Does

The simulator models five key stages of IVF:

1. **Egg Retrieval** - Starting point with total eggs collected
2. **Fertilization** - Maturity rates and fertilization success
3. **Blastocyst Development** - Embryo development to day 5/6
4. **Genetic Testing** - PGT-A (chromosomal) and PGT-M (specific genetic conditions)
5. **Transfer & Live Birth** - Implantation and pregnancy success

For each stage, you can adjust parameters to match your specific situation, and the simulator calculates:
- Expected outcomes at each stage
- Probability distributions
- Most likely scenarios
- Cumulative success rates

## Key Features

### 🔢 Comprehensive Stage Modeling
- Track embryo attrition through all five stages
- See exactly where drop-offs typically occur
- Adjust any parameter to model different scenarios

### 📊 Visual Funnel Chart
- Color-coded visualization of the complete journey
- Shows count and percentage at each stage
- Makes it easy to understand the entire process at a glance

### 🧬 Embryo Grading Support
- Input specific grades for your embryos (AA, AB, BA, BB, BC, CC)
- Grade-specific euploidy rates (higher grades = better chromosomal health)
- Grade-specific implantation rates (higher grades = better pregnancy success)
- Weighted calculations based on your actual embryo distribution

### 🎯 Genetic Disease Screening (PGT-M)
- Calculates outcomes for recessive genetic conditions
- Default 75% usable rate when both parents are carriers
- Adjustable for different inheritance patterns

### 💡 Probability Distributions
- See the likelihood of every possible outcome (0 to all embryos usable)
- Identifies most likely scenarios
- Shows ranges and confidence intervals

### 📈 Cumulative Success Tracking
- Calculate success probability after multiple transfers
- See how each additional transfer improves your chances
- Plan for multiple transfer attempts

## How to Use

### Getting Started

1. Open `ivf_simulator.html` in any modern web browser
2. Start with default values or input your specific information
3. Adjust sliders to see how different scenarios affect outcomes

### Input Parameters

#### Stage 1-3: Early Development

**Eggs Retrieved** (1-40)
- Total eggs collected during your retrieval procedure
- Default: 12 eggs

**Mature Egg Rate** (50-95%)
- Percentage of eggs that are mature (MII stage) and ready for fertilization
- Typical range: 75-85%
- Default: 80%

**Fertilization Rate** (50-95%)
- Percentage of mature eggs that successfully fertilize
- ICSI (intracytoplasmic sperm injection): 70-80%
- Conventional IVF: 60-75%
- Default: 75%

**Blastocyst Development Rate** (30-70%)
- Percentage of fertilized eggs that develop to day 5/6 blastocyst stage
- Typical range: 40-60%
- Younger egg age tends toward higher end
- Default: 50%

#### Stage 4: Genetic Testing

**Maternal Age** (25-45 years)
- Automatically adjusts euploidy (chromosomally normal) rates
- Younger age = higher euploidy rate
- This is one of the most important factors

**Embryo Grading** (Optional but recommended)
- **Grade AA/AB**: Highest quality - excellent inner cell mass and trophectoderm
- **Grade BA/BB**: Good quality - at least one excellent component
- **Grade BC/CB/CC**: Fair/poor quality - may have fragmentation or uneven cells

When you input grades, the simulator calculates:
- Grade-specific euploidy rates (AA embryos ~15% higher than average)
- Grade-specific implantation rates (AA embryos ~12% higher than baseline)
- Weighted averages based on your embryo distribution

**PGT-A Success Rate** (10-90%)
- Percentage of embryos that are euploid (chromosomally normal)
- Auto-calculated based on maternal age, but you can override
- Age 35: ~65%, Age 38: ~55%, Age 40: ~45%, Age 42: ~35%

**PGT-M Success Rate** (10-100%)
- For genetic disease screening
- Recessive conditions (both parents carriers): 75% usable
  - 25% unaffected (homozygous dominant)
  - 50% carriers (heterozygous)
  - 25% affected (homozygous recessive) - unusable
- Adjust for different inheritance patterns

#### Stage 5: Transfer & Pregnancy

**Implantation Success Rate** (20-80%)
- Percentage of transfers that result in positive pregnancy
- High-quality euploid embryos at age 38: 40-60%
- Default: 50%

**Live Birth Rate After Implantation** (50-95%)
- Accounts for miscarriage risk
- Typical range: 70-80% after positive pregnancy
- Default: 75%

### Understanding the Results

#### Expected Outcomes Box
- **Expected Usable Embryos**: Statistical average based on your inputs
- **Most Likely Outcome**: The single most probable number (or range)
- **Per Embryo Success Rate**: Combined probability of passing all genetic tests

#### Funnel Chart
Shows the complete journey with color-coded bars:
- Each stage displays count and percentage
- Width of bars shows attrition at each stage
- Final stage shows expected live births

#### Probability Distribution
- Bar chart showing likelihood of each possible outcome
- Most likely outcome(s) highlighted in pink
- Helps you understand the range of realistic scenarios

#### Overall Success Probability
Three key metrics:
1. **At least 1 live birth**: Your overall chance of success from this cycle
2. **2+ live births possible**: Probability of having embryos for multiple children
3. **No successful pregnancy**: Risk that all transfers fail

#### Cumulative Success Tracker
Shows how success probability increases with each transfer:
- After 1 transfer: X%
- After 2 transfers: Y% (+Z%)
- And so on...

Very useful for planning how many transfers you might need.

## Example Scenarios

### Scenario 1: Your Current Situation
- **Age 38**, both parents carriers for Stargardt's disease
- **6 embryos**: 5 grade AA, 1 grade BA
- Expected outcome: ~2.8 usable embryos
- Overall success: ~76% chance of at least one live birth

### Scenario 2: Younger Patient, Standard IVF
- **Age 32**, no genetic concerns (PGT-M set to 100%)
- **15 eggs retrieved** → ~12 mature → ~9 fertilized → ~5 blastocysts
- With ~70% euploidy rate: ~3.5 usable embryos
- Overall success: ~85%+ chance of success

### Scenario 3: Lower Retrieval Count
- **Age 40**, 8 eggs retrieved
- Standard rates → ~3 blastocysts
- With ~45% euploidy rate: ~1.4 usable embryos
- Shows importance of potentially multiple cycles

## Technical Details

### Statistical Methods

The simulator uses:
- **Binomial probability distribution** for calculating outcome likelihoods
- **Weighted averages** for grade-specific calculations
- **Independent event probabilities** for multi-stage processes
- **Cumulative probability** for multiple transfer attempts

### Grade-Specific Adjustments

**Euploidy Rate Modifiers:**
- AA/AB: +15% (e.g., 55% → 63%)
- BA/BB: +5% (e.g., 55% → 58%)
- BC/CC: -15% (e.g., 55% → 47%)

**Implantation Rate Modifiers:**
- AA/AB: +12% (e.g., 50% → 56%)
- BA/BB: baseline (e.g., 50%)
- BC/CC: -15% (e.g., 50% → 42.5%)

### Age-Based Euploidy Rates
- Age ≤30: 75%
- Age 31-33: 70%
- Age 34-35: 65%
- Age 36-37: 60%
- Age 38: 55%
- Age 39-40: 45%
- Age 41-42: 35%
- Age >42: 25%

These are based on published medical literature and may vary by individual.

## Limitations & Considerations

### What This Tool Can't Do
- **Predict individual outcomes** - Averages don't determine your specific result
- **Replace medical advice** - Always consult your fertility specialist
- **Account for all variables** - Each person's situation is unique
- **Guarantee accuracy** - Based on population averages, not your specific clinic's data

### Important Factors Not Modeled
- Sperm quality variations
- Uterine factors (lining thickness, receptivity)
- Immune factors
- Underlying medical conditions
- Specific clinic success rates
- Time between egg retrieval and transfer
- Fresh vs. frozen transfer differences

### When Results May Be Less Accurate
- Very small sample sizes (1-2 embryos)
- Unusual circumstances (specific medical conditions)
- Non-standard protocols
- Donor eggs/sperm (different age considerations)

## Interpreting Probabilities

### Understanding Percentages
- **75% success** = 3 out of 4 people succeed, but you could be the 1 in 4
- **Low probability ≠ impossible** - Unlikely things happen!
- **High probability ≠ guaranteed** - Even 90% means 1 in 10 don't succeed

### Planning Based on Results
- **>70% success**: Good odds, but have backup plans
- **40-70% success**: Moderate odds, consider multiple cycles
- **<40% success**: May want to discuss additional options with doctor

### Multiple Transfers
The cumulative success tracker is particularly valuable:
- Shows how persistence improves odds
- Helps plan emotionally and financially
- Demonstrates value of having multiple usable embryos

## Best Practices

### Getting Accurate Results
1. **Use your actual numbers when available** (egg count, grades, etc.)
2. **Ask your clinic for their specific success rates** - may differ from defaults
3. **Update as you progress** - Input actual results at each stage
4. **Consider multiple scenarios** - Adjust parameters to see best/worst cases

### Using This Tool Effectively
- **Don't fixate on single numbers** - Look at ranges and probabilities
- **Understand the funnel** - See where typical drop-offs occur
- **Plan for realistic scenarios** - Not best case or worst case
- **Share with your partner** - Helps align expectations
- **Bring questions to your doctor** - Use this as a conversation starter

## Frequently Asked Questions

### Why don't my grades add up to the expected blastocyst count?
The grading section is optional and separate from the early stages. If you know your grades, input them manually. The simulator will use those for calculations.

### What if I have frozen embryos from a previous cycle?
You can model just the transfer stage by setting the early parameters to match your frozen embryos (e.g., if you have 4 frozen blasts, set that as your tested count).

### Can I use this for donor eggs?
Yes, but use the donor's age for the maternal age parameter, not your own.

### What's the difference between PGT-A and PGT-M?
- **PGT-A**: Tests for chromosomal abnormalities (aneuploidy)
- **PGT-M**: Tests for specific genetic conditions (like Stargardt's, cystic fibrosis, etc.)

### Should I do genetic testing?
This is a personal medical decision. Genetic testing can improve per-transfer success rates but adds cost and time. Discuss with your doctor.

### Why is my success rate different from my clinic's published rates?
Clinic rates are often reported per transfer of tested embryos, while this calculator shows end-to-end probability including all attrition stages.

### What if I want to model multiple cycles?
Run the simulator once per cycle, then combine results. For example, if two cycles each give 60% success, the combined probability is: 1 - (0.4 × 0.4) = 84%.

## Updates & Modifications

This simulator is a static HTML file that can be easily modified:
- All calculations are in JavaScript in the file
- Success rates can be updated in the `calculateEuploidRate()` and related functions
- Visual styling can be changed in the CSS section
- No server or database required - runs entirely in your browser

### Customizing Default Values
Look for these lines in the code to change defaults:
```javascript
value="12"  // eggs retrieved
value="80"  // maturity rate
value="75"  // fertilization rate
value="50"  // blastocyst rate
```

## Additional Resources

### Recommended Reading
- SART (Society for Assisted Reproductive Technology) - https://www.sart.org
- ASRM (American Society for Reproductive Medicine) - https://www.asrm.org
- Your clinic's specific success rate data
- Published studies on embryo grading and success rates

### Support
For questions about using this tool, consult the instructions above.
For medical questions about IVF, consult your fertility specialist.

## Version History

**Version 1.0** (Current)
- Complete 5-stage modeling from retrieval to live birth
- Embryo grading support with grade-specific adjustments
- PGT-M genetic disease screening
- Visual funnel chart
- Cumulative success tracking
- Probability distributions
- Responsive design

## License & Usage

This tool is provided free for personal, educational, and non-commercial use. 

**Medical Disclaimer:** This calculator is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Individual results may vary significantly from calculated probabilities.

---

## Quick Start Guide

1. **Open the file** - Double-click `ivf_simulator.html`
2. **Enter your age** - Adjust the maternal age slider
3. **Input your egg count** - If known, enter eggs retrieved
4. **Add embryo grades** - If available, input your specific grades
5. **Adjust any stage** - Fine-tune parameters based on your situation
6. **Review results** - Check the funnel chart and success probabilities
7. **Explore scenarios** - Try different values to understand possibilities

Good luck with your IVF journey! 🍀

---

## Deployment Guide - Making This Available Online

### Recommended Approach: GitHub Pages (Free & Easy)

**Time Required:** 15-30 minutes  
**Technical Difficulty:** Low (no coding required)  
**Cost:** Free (or ~$12/year for custom domain)

#### Step 1: Prepare Files
You need these two files:
- `ivf_simulator.html` → rename to `index.html`
- `README.md` (this file)

#### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com) and create free account
2. Click "New Repository" (green button)
3. Name it: `ivf-calculator` (or any name you like)
4. Make it **Public**
5. Check "Add a README file"
6. Click "Create repository"

#### Step 3: Upload Files
1. In your new repository, click "Add file" → "Upload files"
2. Drag and drop both files (`index.html` and `README.md`)
3. Click "Commit changes"

#### Step 4: Enable GitHub Pages
1. Go to repository Settings (gear icon)
2. Scroll to "Pages" in left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 1-2 minutes

Your site will be live at: `https://your-username.github.io/ivf-calculator`

#### Step 5: (Optional) Add Custom Domain
If you want a memorable URL like `ivfcalculator.com`:
1. Buy domain from [Namecheap](https://www.namecheap.com) or [Google Domains](https://domains.google) (~$12/year)
2. In GitHub Pages settings, add your custom domain
3. In your domain registrar, add DNS records pointing to GitHub
4. Wait 24 hours for DNS propagation

Detailed GitHub instructions: [docs.github.com/pages](https://docs.github.com/en/pages)

### Alternative: Netlify Drop (Even Easier)

**Time Required:** 5 minutes  
**No account needed initially**

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop `index.html` file
3. Get instant URL like: `random-name.netlify.app`
4. (Optional) Create account to claim site and customize URL

### Future Enhancements

Once deployed, you can add:
- **Analytics** - See how many people use it (Google Analytics, Plausible)
- **Feedback form** - Collect user suggestions
- **PWA features** - Make it installable as phone app
- **Save/Load** - Let users save their scenarios
- **Social sharing** - Generate shareable result images

---
