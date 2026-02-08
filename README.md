# IVF Outcome Calculator

A comprehensive, client-side calculator that estimates cumulative probabilities across all five stages of an IVF cycle -- from egg retrieval through live birth. Built as a single-page application with zero external dependencies.

**Live site:** [https://ivf-outcome-calculator.com](https://ivf-outcome-calculator.com)

---

## Features

- **5-Stage IVF Modeling** -- Calculates probabilities through each sequential stage: egg retrieval, fertilization, blastocyst development, transfer, and live birth.
- **Binomial Probability Engine** -- Uses binomial distribution to compute the likelihood of achieving at least one success across multiple embryos at each stage.
- **Embryo Grading Integration** -- Adjusts blastocyst development and implantation rates based on embryo morphology grading (AA, AB, BA, BB, etc.).
- **PGT-A and PGT-M Support** -- Accounts for preimplantation genetic testing, including aneuploidy screening (PGT-A) and single-gene disorder testing (PGT-M), with associated attrition rates.
- **Age-Adjusted Success Rates** -- All baseline probabilities are adjusted for maternal age using published clinical data, reflecting the well-documented decline in oocyte quality and implantation potential with age.

## Tech Stack

- **HTML / CSS / JavaScript** -- Pure vanilla implementation with no frameworks, libraries, or build tools.
- **Zero Dependencies** -- No npm packages, no CDN links, no external requests at runtime.
- **Works Offline** -- Once loaded, the calculator functions entirely in the browser with no server communication required.
- **Static Hosting** -- Deployed to GitHub Pages with a custom domain.

## Data Sources

The probability models and baseline rates used in this calculator are derived from:

- **SART (Society for Assisted Reproductive Technology)** -- National summary reports on IVF outcomes by age group and clinic type.
- **CDC (Centers for Disease Control and Prevention)** -- Annual Assisted Reproductive Technology reports providing fertilization rates, transfer outcomes, and live birth rates.
- **Published Fertility Studies** -- Peer-reviewed literature on blastocyst development rates, embryo grading correlation with implantation, PGT-A/PGT-M attrition, and age-related fertility decline.

Rates are approximations based on population-level data and may not reflect individual clinical circumstances.

## Medical Disclaimer

This calculator is provided for **educational and informational purposes only**. It is not a medical device and does not constitute medical advice, diagnosis, or treatment. The probabilities generated are statistical estimates based on population-level data and do not predict individual outcomes.

IVF success depends on many factors not captured by this tool, including but not limited to: specific clinical protocols, underlying diagnoses, uterine receptivity, sperm quality parameters, laboratory conditions, and individual biological variation.

**Always consult with your reproductive endocrinologist or fertility specialist** for personalized guidance regarding your treatment plan and expected outcomes.

## License

This project is released under the [MIT License](LICENSE).

You are free to use, modify, and distribute this software, provided the original copyright notice and license terms are included.

---

Built with care for the fertility community.
