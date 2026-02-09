// Calculate euploid rate based on maternal age and grade
function calculateEuploidRate(age, grade = null) {
    let baseRate;
    if (age <= 30) baseRate = 75;
    else if (age <= 33) baseRate = 70;
    else if (age <= 35) baseRate = 65;
    else if (age <= 37) baseRate = 60;
    else if (age <= 38) baseRate = 55;
    else if (age <= 40) baseRate = 45;
    else if (age <= 42) baseRate = 35;
    else baseRate = 25;

    // Grade adjustments to euploidy rate
    if (grade === 'AA') return Math.min(90, baseRate * 1.15); // AA embryos ~15% higher euploidy
    if (grade === 'BA') return Math.min(85, baseRate * 1.05); // BA/BB embryos ~5% higher
    if (grade === 'BC') return baseRate * 0.85; // Lower grades ~15% lower euploidy

    return baseRate;
}

// Calculate pregnancy success rate based on grade
function getImplantationRateForGrade(grade, baseRate) {
    if (grade === 'AA') return Math.min(0.70, baseRate * 1.12); // AA: ~12% higher implantation
    if (grade === 'BA') return baseRate; // BA/BB: baseline
    if (grade === 'BC') return baseRate * 0.85; // BC/CC: ~15% lower
    return baseRate;
}

// Binomial probability
function binomialProbability(n, k, p) {
    function factorial(num) {
        if (num <= 1) return 1;
        return num * factorial(num - 1);
    }

    function choose(n, k) {
        return factorial(n) / (factorial(k) * factorial(n - k));
    }

    return choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// Clamp grade inputs so total never exceeds the testing count
function clampGradesToLimit(limit) {
    const inputs = [gradeAAInput, gradeBAInput, gradeBCInput];
    let remaining = limit;

    // Clamp each grade input in order, preserving as much as possible
    inputs.forEach(input => {
        const current = parseInt(input.value) || 0;
        const clamped = Math.min(current, Math.max(0, remaining));
        if (clamped !== current) input.value = clamped;
        remaining -= clamped;
    });

    // Update max attribute on each input dynamically
    inputs.forEach((input, i) => {
        const others = inputs
            .filter((_, j) => j !== i)
            .reduce((sum, inp) => sum + (parseInt(inp.value) || 0), 0);
        input.max = Math.max(0, limit - others);
    });
}

function updateSimulation() {
    // Early stage inputs
    const eggsRetrieved = parseInt(document.getElementById('eggsRetrieved').value);
    const maturityRate = parseFloat(document.getElementById('maturityRate').value) / 100;
    const fertilizationRate = parseFloat(document.getElementById('fertilizationRate').value) / 100;
    const blastocystRate = parseFloat(document.getElementById('blastocystRate').value) / 100;

    // Calculate early stage outcomes
    const matureEggs = Math.round(eggsRetrieved * maturityRate);
    const fertilizedEggs = Math.round(matureEggs * fertilizationRate);
    const blastocysts = Math.round(fertilizedEggs * blastocystRate);

    // Update early stage displays
    document.getElementById('matureEggs').textContent = matureEggs;
    document.getElementById('fertilizedEggs').textContent = fertilizedEggs;
    document.getElementById('blastocysts').textContent = blastocysts;

    // Guard: 0 blastocysts — zero out all results and return early
    if (blastocysts === 0) {
        document.getElementById('totalEmbryos').textContent = 0;
        document.getElementById('embryoCountValue').textContent = 0;
        document.getElementById('blastocystLimit').textContent = 0;
        document.getElementById('expectedValue').textContent = '0.0';
        document.getElementById('mostLikely').textContent = '0';
        document.getElementById('combinedProb').textContent = '0%';
        document.getElementById('perTransferSuccess').textContent = '0%';
        document.getElementById('expectedTransfers').textContent = '\u2014';
        document.getElementById('atLeast1Birth').textContent = '0.0%';
        document.getElementById('atLeast2Births').textContent = '0.0%';
        document.getElementById('noSuccess').textContent = '100.0%';
        document.getElementById('gradeBreakdown').style.display = 'none';
        document.getElementById('funnelChart').innerHTML = '';
        document.getElementById('probabilityBars').innerHTML = '';
        document.getElementById('interpretation').textContent = 'No blastocysts expected with current parameters. Try increasing eggs retrieved or development rates.';
        document.getElementById('atLeast1Description').textContent = 'No blastocysts expected from the current pipeline parameters.';
        document.getElementById('atLeast2Description').textContent = '';
        embryoCountSlider.disabled = true;
        return;
    }

    // Constrain embryoCount slider to blastocyst count
    const blastocystMax = Math.max(1, blastocysts);
    embryoCountSlider.max = blastocystMax;
    embryoCountSlider.disabled = false;
    embryoCountSlider.setAttribute('aria-valuemax', blastocystMax);
    if (parseInt(embryoCountSlider.value) > blastocysts) {
        embryoCountSlider.value = blastocysts;
        document.getElementById('embryoCountValue').textContent = blastocysts;
    }

    // Read embryoCount (the user's chosen testing count)
    const embryoCount = parseInt(document.getElementById('embryoCount').value);

    // Clamp grades to embryoCount (not blastocysts) — grades must sum to testing count
    clampGradesToLimit(embryoCount);

    // Get grade counts (already clamped above)
    const gradeAA = parseInt(document.getElementById('gradeAA').value) || 0;
    const gradeBA = parseInt(document.getElementById('gradeBA').value) || 0;
    const gradeBC = parseInt(document.getElementById('gradeBC').value) || 0;
    const totalGraded = gradeAA + gradeBA + gradeBC;

    const doPgtM = document.getElementById('doPgtM').checked;
    const euploidRate = parseFloat(document.getElementById('euploidRate').value) / 100;
    const pgtmRate = doPgtM ? parseFloat(document.getElementById('pgtmRate').value) / 100 : 1.0;
    const implantationRate = parseFloat(document.getElementById('implantationRate').value) / 100;
    const liveBirthRate = parseFloat(document.getElementById('liveBirthRate').value) / 100;

    // testedCount = embryoCount (capped at blastocysts, already enforced by slider max)
    const testedCount = embryoCount;

    // Sync displays
    document.getElementById('totalEmbryos').textContent = totalGraded;
    document.getElementById('blastocystLimit').textContent = embryoCount;

    // Use grade-specific calculations if grades are provided
    let expectedUsableByGrade = {};
    let weightedImplantationRate = implantationRate;
    let expectedValue;
    let combinedProb;

    if (totalGraded > 0 && totalGraded === embryoCount) {
        // Calculate for each grade
        const maternalAge = parseInt(document.getElementById('maternalAge').value);

        const gradeAAEuploid = calculateEuploidRate(maternalAge, 'AA') / 100;
        const gradeBAEuploid = calculateEuploidRate(maternalAge, 'BA') / 100;
        const gradeBCEuploid = calculateEuploidRate(maternalAge, 'BC') / 100;

        expectedUsableByGrade.AA = gradeAA * gradeAAEuploid * pgtmRate;
        expectedUsableByGrade.BA = gradeBA * gradeBAEuploid * pgtmRate;
        expectedUsableByGrade.BC = gradeBC * gradeBCEuploid * pgtmRate;

        expectedValue = expectedUsableByGrade.AA + expectedUsableByGrade.BA + expectedUsableByGrade.BC;
        expectedValue = Math.min(expectedValue, testedCount); // Can't exceed tested count

        // Calculate weighted average implantation rate
        if (expectedValue > 0) {
            const aaImplant = getImplantationRateForGrade('AA', implantationRate);
            const baImplant = getImplantationRateForGrade('BA', implantationRate);
            const bcImplant = getImplantationRateForGrade('BC', implantationRate);

            weightedImplantationRate = (
                expectedUsableByGrade.AA * aaImplant +
                expectedUsableByGrade.BA * baImplant +
                expectedUsableByGrade.BC * bcImplant
            ) / expectedValue;
        }

        // Show grade breakdown
        document.getElementById('gradeBreakdown').style.display = 'block';
        document.getElementById('gradeBreakdownContent').innerHTML = `
            ${gradeAA > 0 ? `<div>• AA/AB: ${expectedUsableByGrade.AA.toFixed(1)} expected usable (${(gradeAAEuploid * pgtmRate * 100).toFixed(0)}% pass rate)</div>` : ''}
            ${gradeBA > 0 ? `<div>• BA/BB: ${expectedUsableByGrade.BA.toFixed(1)} expected usable (${(gradeBAEuploid * pgtmRate * 100).toFixed(0)}% pass rate)</div>` : ''}
            ${gradeBC > 0 ? `<div>• BC/CC: ${expectedUsableByGrade.BC.toFixed(1)} expected usable (${(gradeBCEuploid * pgtmRate * 100).toFixed(0)}% pass rate)</div>` : ''}
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(51, 51, 52, 0.15);">
                <strong>Weighted avg implantation: ${(weightedImplantationRate * 100).toFixed(0)}%</strong>
            </div>
        `;

        combinedProb = expectedValue / embryoCount;
    } else {
        // Use simple average calculation
        combinedProb = euploidRate * pgtmRate;
        expectedValue = Math.min(embryoCount * combinedProb, testedCount);
        document.getElementById('gradeBreakdown').style.display = 'none';
    }

    const perTransferSuccess = weightedImplantationRate * liveBirthRate;

    // Calculate probabilities for each outcome
    const probabilities = [];
    let maxProb = 0;
    let maxProbIndices = [];

    for (let k = 0; k <= embryoCount; k++) {
        const prob = binomialProbability(embryoCount, k, combinedProb);
        probabilities.push({ count: k, probability: prob });

        if (prob > maxProb) {
            maxProb = prob;
            maxProbIndices = [k];
        } else if (Math.abs(prob - maxProb) < 0.001) {
            maxProbIndices.push(k);
        }
    }

    // Calculate pregnancy outcomes
    let probAtLeast1Birth = 0;
    let probAtLeast2Births = 0;
    let probNoSuccess = 0;

    for (let k = 0; k <= embryoCount; k++) {
        const probKEmbryos = probabilities[k].probability;

        if (k === 0) {
            probNoSuccess += probKEmbryos;
        } else {
            // Probability of at least 1 success with k embryos
            const probAtLeast1WithK = 1 - Math.pow(1 - perTransferSuccess, k);
            probAtLeast1Birth += probKEmbryos * probAtLeast1WithK;

            // Probability of no success with k embryos
            probNoSuccess += probKEmbryos * Math.pow(1 - perTransferSuccess, k);

            // Probability of at least 2 successes
            if (k >= 2) {
                let probAtLeast2WithK = 0;
                for (let j = 2; j <= k; j++) {
                    probAtLeast2WithK += binomialProbability(k, j, perTransferSuccess);
                }
                probAtLeast2Births += probKEmbryos * probAtLeast2WithK;
            }
        }
    }

    // Draw funnel chart
    const funnelData = [
        { label: 'Eggs Retrieved', count: eggsRetrieved, rate: '100%' },
        { label: 'Mature Eggs (MII)', count: matureEggs, rate: `${(maturityRate * 100).toFixed(0)}%` },
        { label: 'Fertilized', count: fertilizedEggs, rate: `${(fertilizationRate * 100).toFixed(0)}%` },
        { label: 'Blastocysts', count: blastocysts, rate: `${(blastocystRate * 100).toFixed(0)}%` },
        { label: 'Tested for Genetics', count: testedCount, rate: blastocysts > 0 ? `${Math.round(testedCount / blastocysts * 100)}%` : '0%' },
        { label: 'Usable Embryos (Expected)', count: expectedValue.toFixed(1), rate: testedCount > 0 ? `${Math.round(expectedValue / testedCount * 100)}%` : '0%' }
    ];

    const maxCount = eggsRetrieved;
    let funnelHtml = '';

    funnelData.forEach((stage, index) => {
        const percentage = (parseFloat(stage.count) / maxCount * 100);
        const colors = [
            'linear-gradient(90deg, #2F4A73 0%, #4A6FA5 100%)',
            'linear-gradient(90deg, #3A5A85 0%, #5A80B5 100%)',
            'linear-gradient(90deg, #456A97 0%, #6A90C5 100%)',
            'linear-gradient(90deg, #507AA9 0%, #7AA0D5 100%)',
            'linear-gradient(90deg, #5B8ABB 0%, #8AB0E5 100%)',
            'linear-gradient(90deg, #669ACD 0%, #9AC0F0 100%)',
            'linear-gradient(90deg, #71AADF 0%, #AAD0FA 100%)'
        ];

        funnelHtml += `
            <div class="funnel-stage">
                <div class="funnel-label">
                    <span>${stage.label}</span>
                    <span><span class="funnel-count">${stage.count}</span> <span class="funnel-rate">(${stage.rate})</span></span>
                </div>
                <div class="funnel-bar-container">
                    <div class="funnel-bar" style="width: ${percentage}%; background: ${colors[index % colors.length]}">
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('funnelChart').innerHTML = funnelHtml;

    // Update display
    document.getElementById('expectedValue').textContent = expectedValue.toFixed(1);
    document.getElementById('combinedProb').textContent = (combinedProb * 100).toFixed(0) + '%';
    document.getElementById('perTransferSuccess').textContent = (perTransferSuccess * 100).toFixed(0) + '%';
    document.getElementById('expectedTransfers').textContent = (1 / perTransferSuccess).toFixed(1);

    if (maxProbIndices.length === 1) {
        document.getElementById('mostLikely').textContent = maxProbIndices[0];
    } else {
        document.getElementById('mostLikely').textContent =
            maxProbIndices[0] + '-' + maxProbIndices[maxProbIndices.length - 1];
    }

    // Update pregnancy outcomes
    document.getElementById('atLeast1Birth').textContent = (probAtLeast1Birth * 100).toFixed(1) + '%';
    document.getElementById('atLeast2Births').textContent = (probAtLeast2Births * 100).toFixed(1) + '%';
    document.getElementById('noSuccess').textContent = (probNoSuccess * 100).toFixed(1) + '%';

    // Update descriptions
    const medianUsableEmbryos = Math.round(expectedValue);
    document.getElementById('atLeast1Description').textContent =
        `Starting from ${eggsRetrieved} eggs retrieved, with an expected ${expectedValue.toFixed(1)} usable embryos and a ${(perTransferSuccess * 100).toFixed(0)}% success rate per transfer, you have a ${(probAtLeast1Birth * 100).toFixed(1)}% chance of achieving at least one live birth from this cycle.`;

    document.getElementById('atLeast2Description').textContent =
        probAtLeast2Births > 0.01
            ? `If you get ${medianUsableEmbryos}+ usable embryos, there's a possibility of having embryos left for a second child. Overall probability: ${(probAtLeast2Births * 100).toFixed(1)}%.`
            : `Very low probability with expected embryo count. Consider banking embryos from multiple cycles for family planning.`;

    // Draw probability bars
    const barsContainer = document.getElementById('probabilityBars');
    barsContainer.innerHTML = '';

    probabilities.forEach(item => {
        const barDiv = document.createElement('div');
        barDiv.className = 'probability-bar';

        const percentage = (item.probability * 100).toFixed(1);
        const isHighlight = maxProbIndices.includes(item.count);

        barDiv.innerHTML = `
            <div class="bar-label">
                <span>${item.count} usable embryo${item.count !== 1 ? 's' : ''}</span>
                <span>${percentage}%</span>
            </div>
            <div class="bar-container">
                <div class="bar-fill ${isHighlight ? 'highlight' : ''}"
                     style="width: ${percentage}%">
                </div>
            </div>
        `;

        barsContainer.appendChild(barDiv);
    });

    // Update interpretation
    const atLeast1 = 1 - probabilities[0].probability;
    const mostLikelyMin = Math.min(...maxProbIndices);
    const mostLikelyMax = Math.max(...maxProbIndices);
    const mostLikelyLabel = mostLikelyMin === mostLikelyMax
        ? `${mostLikelyMin}`
        : `${mostLikelyMin}-${mostLikelyMax}`;
    const mostLikelyProb = maxProbIndices.reduce((sum, k) => sum + probabilities[k].probability, 0);

    document.getElementById('interpretation').textContent =
        `Your most likely outcome is ${mostLikelyLabel} usable embryo${mostLikelyMax !== 1 ? 's' : ''} ` +
        `(${(mostLikelyProb * 100).toFixed(0)}% chance). ` +
        `Overall, you have a ${(atLeast1 * 100).toFixed(0)}% chance of at least 1 usable embryo.`;

    // Update bento profile card
    const bentoAge = document.getElementById('bentoAge');
    if (bentoAge) bentoAge.textContent = document.getElementById('maternalAge').value;
    const bentoEggs = document.getElementById('bentoEggs');
    if (bentoEggs) bentoEggs.textContent = eggsRetrieved;
    const bentoBlasts = document.getElementById('bentoBlasts');
    if (bentoBlasts) bentoBlasts.textContent = blastocysts;

    // Update bento hero insight
    const heroInsight = document.getElementById('bentoHeroInsight');
    if (heroInsight) {
        heroInsight.textContent = `Starting from ${eggsRetrieved} eggs, you can expect approximately ${expectedValue.toFixed(1)} usable embryos with a ${(combinedProb * 100).toFixed(0)}% per-embryo pass rate.`;
    }
}

// Event listeners for all inputs
const eggsRetrievedSlider = document.getElementById('eggsRetrieved');
const maturityRateSlider = document.getElementById('maturityRate');
const fertilizationRateSlider = document.getElementById('fertilizationRate');
const blastocystRateSlider = document.getElementById('blastocystRate');
const embryoCountSlider = document.getElementById('embryoCount');
const maternalAgeSlider = document.getElementById('maternalAge');
const euploidRateSlider = document.getElementById('euploidRate');
const pgtmRateSlider = document.getElementById('pgtmRate');

const gradeAAInput = document.getElementById('gradeAA');
const gradeBAInput = document.getElementById('gradeBA');
const gradeBCInput = document.getElementById('gradeBC');

// Pipeline sliders: reset testing count to "all" when pipeline changes
function updatePipelineAndResetTestingCount() {
    const eggs = parseInt(eggsRetrievedSlider.value);
    const mat = parseFloat(maturityRateSlider.value) / 100;
    const fert = parseFloat(fertilizationRateSlider.value) / 100;
    const blast = parseFloat(blastocystRateSlider.value) / 100;
    const blastocysts = Math.round(Math.round(Math.round(eggs * mat) * fert) * blast);
    const testingCount = Math.max(1, blastocysts);
    embryoCountSlider.max = testingCount;
    embryoCountSlider.value = testingCount;
    document.getElementById('embryoCountValue').textContent = testingCount;
    updateSimulation();
}

eggsRetrievedSlider.addEventListener('input', function() {
    document.getElementById('eggsRetrievedValue').textContent = this.value;
    // Remove onboarding pulse on first interaction
    const pristine = this.closest('.pristine');
    if (pristine) pristine.classList.remove('pristine');
    updatePipelineAndResetTestingCount();
});

maturityRateSlider.addEventListener('input', function() {
    document.getElementById('maturityRateValue').textContent = this.value;
    updatePipelineAndResetTestingCount();
});

fertilizationRateSlider.addEventListener('input', function() {
    document.getElementById('fertilizationRateValue').textContent = this.value;
    updatePipelineAndResetTestingCount();
});

blastocystRateSlider.addEventListener('input', function() {
    document.getElementById('blastocystRateValue').textContent = this.value;
    updatePipelineAndResetTestingCount();
});

function syncGradeCounts() {
    // Clamp grades to the current testing count (embryoCount slider)
    const embryoCount = parseInt(embryoCountSlider.value) || 1;
    clampGradesToLimit(embryoCount);
    updateSimulation();
    if (typeof updateGradeDisplays === 'function') {
        updateGradeDisplays();
        updateStepperStates();
    }
}

gradeAAInput.addEventListener('input', syncGradeCounts);
gradeBAInput.addEventListener('input', syncGradeCounts);
gradeBCInput.addEventListener('input', syncGradeCounts);

// Stepper button controls for grade inputs
function updateGradeDisplays() {
    document.getElementById('gradeAADisplay').textContent = gradeAAInput.value;
    document.getElementById('gradeBADisplay').textContent = gradeBAInput.value;
    document.getElementById('gradeBCDisplay').textContent = gradeBCInput.value;
    updateGradeProgressBar();
}

function updateGradeProgressBar() {
    const aa = parseInt(gradeAAInput.value) || 0;
    const ba = parseInt(gradeBAInput.value) || 0;
    const bc = parseInt(gradeBCInput.value) || 0;
    const limit = parseInt(embryoCountSlider.value) || 1;

    const aaPercent = (aa / limit) * 100;
    const baPercent = (ba / limit) * 100;
    const bcPercent = (bc / limit) * 100;

    document.getElementById('gradeFillAA').style.width = aaPercent + '%';
    document.getElementById('gradeFillBA').style.width = baPercent + '%';
    document.getElementById('gradeFillBC').style.width = bcPercent + '%';
}

document.querySelectorAll('.stepper-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = this.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;

        const max = parseInt(input.max) || 20;
        const min = parseInt(input.min) || 0;
        let val = parseInt(input.value) || 0;

        if (this.classList.contains('stepper-inc')) {
            val = Math.min(max, val + 1);
        } else {
            val = Math.max(min, val - 1);
        }

        input.value = val;
        syncGradeCounts();
        updateGradeDisplays();
        updateStepperStates();
        encodeParamsToURL();
    });
});

function updateStepperStates() {
    const inputs = [gradeAAInput, gradeBAInput, gradeBCInput];
    const total = inputs.reduce((sum, inp) => sum + (parseInt(inp.value) || 0), 0);
    const limit = parseInt(embryoCountSlider.value) || 1;

    document.querySelectorAll('.stepper-inc').forEach(btn => {
        btn.disabled = total >= limit;
    });
    document.querySelectorAll('.stepper-dec').forEach(btn => {
        const input = document.getElementById(btn.dataset.target);
        btn.disabled = (parseInt(input.value) || 0) <= 0;
    });
}

// Initial stepper state
updateGradeDisplays();
updateStepperStates();

embryoCountSlider.addEventListener('input', function() {
    document.getElementById('embryoCountValue').textContent = this.value;
    updateSimulation();
    updateGradeDisplays();
    updateStepperStates();
});

maternalAgeSlider.addEventListener('input', function() {
    document.getElementById('maternalAgeValue').textContent = this.value;
    const calculatedEuploid = calculateEuploidRate(parseInt(this.value));
    document.getElementById('euploidRate').value = calculatedEuploid;
    document.getElementById('euploidRateValue').textContent = calculatedEuploid;
    updateSimulation();
});

euploidRateSlider.addEventListener('input', function() {
    document.getElementById('euploidRateValue').textContent = this.value;
    updateSimulation();
});

pgtmRateSlider.addEventListener('input', function() {
    document.getElementById('pgtmRateValue').textContent = this.value;
    updateSimulation();
});

// ============================================================
// PGT-M Toggle
// ============================================================
const doPgtMToggle = document.getElementById('doPgtM');
doPgtMToggle.addEventListener('change', function() {
    const pgtmGroup = document.getElementById('pgtmGroup');
    const geneticsSection = document.getElementById('geneticInheritanceSection');
    if (this.checked) {
        pgtmGroup.style.display = '';
        if (geneticsSection) geneticsSection.style.display = '';
    } else {
        pgtmGroup.style.display = 'none';
        if (geneticsSection) geneticsSection.style.display = 'none';
    }
    updateSimulation();
});

// ============================================================
// AMH Egg Estimator
// ============================================================
function estimateEggsFromAMH(age, amh) {
    // Log-AMH regression calibrated to multi-study clinical data
    // Captures diminishing returns at higher AMH levels
    const lnEggs = 2.856 - 0.028 * age + 0.631 * Math.log(amh);
    return Math.max(1, Math.min(40, Math.round(Math.exp(lnEggs))));
}

const amhToggle = document.getElementById('amhToggle');
const amhPanel = document.getElementById('amhPanel');
const amhAgeInput = document.getElementById('amhAge');
const amhLevelInput = document.getElementById('amhLevel');
const amhResult = document.getElementById('amhResult');

amhToggle.addEventListener('click', function(e) {
    e.preventDefault();
    amhPanel.style.display = amhPanel.style.display === 'none' ? '' : 'none';
});

function updateAMHEstimate() {
    const amh = parseFloat(amhLevelInput.value);
    const age = parseInt(amhAgeInput.value);
    if (!amh || !age) {
        amhResult.textContent = '';
        return;
    }
    const estimated = estimateEggsFromAMH(age, amh);
    amhResult.textContent = 'Estimated ~' + estimated + ' eggs based on AMH ' + amh.toFixed(1) + ' ng/mL at age ' + age;
    // Update eggs retrieved slider
    eggsRetrievedSlider.value = estimated;
    document.getElementById('eggsRetrievedValue').textContent = estimated;
    updateSimulation();
}

amhLevelInput.addEventListener('input', updateAMHEstimate);

// Sync AMH age ↔ Maternal Age bidirectionally
amhAgeInput.addEventListener('input', function() {
    maternalAgeSlider.value = this.value;
    document.getElementById('maternalAgeValue').textContent = this.value;
    const calculatedEuploid = calculateEuploidRate(parseInt(this.value));
    euploidRateSlider.value = calculatedEuploid;
    document.getElementById('euploidRateValue').textContent = calculatedEuploid;
    updateAMHEstimate();
});

// When maternal age slider changes, sync to AMH age input
const originalMaternalAgeHandler = maternalAgeSlider.oninput;
maternalAgeSlider.addEventListener('input', function() {
    amhAgeInput.value = this.value;
});

const implantationRateSlider = document.getElementById('implantationRate');
const liveBirthRateSlider = document.getElementById('liveBirthRate');

implantationRateSlider.addEventListener('input', function() {
    document.getElementById('implantationRateValue').textContent = this.value;
    updateSimulation();
});

liveBirthRateSlider.addEventListener('input', function() {
    document.getElementById('liveBirthRateValue').textContent = this.value;
    updateSimulation();
});

// Initial calculation
updateSimulation();

// ============================================================
// Citations: Load sources.json and build references + tooltips
// ============================================================
function loadCitations() {
    // Set up click/dismiss handlers for citation links — works even if fetch fails
    function setupCitationHandlers() {
        document.querySelectorAll('.cite-ref a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const thisTooltip = this.querySelector('.cite-tooltip');
                if (thisTooltip) {
                    const wasActive = thisTooltip.classList.contains('active');
                    document.querySelectorAll('.cite-tooltip.active').forEach(t => t.classList.remove('active'));
                    if (!wasActive) thisTooltip.classList.add('active');
                } else {
                    // No tooltip (fetch failed) — scroll to reference anchor
                    const href = this.getAttribute('href');
                    if (href) {
                        const target = document.querySelector(href);
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.cite-ref')) {
                document.querySelectorAll('.cite-tooltip.active').forEach(t => t.classList.remove('active'));
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.cite-tooltip.active').forEach(t => t.classList.remove('active'));
            }
        });
    }

    fetch('sources.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load sources.json');
            return response.json();
        })
        .then(data => {
            const citations = data.citations;
            const refList = document.getElementById('referencesList');
            if (!refList) return;

            // Build an ordered array of citation groups by number
            const groups = Object.values(citations).sort((a, b) => a.number - b.number);

            // Build tooltip map: refNumber -> short citation text
            const tooltipMap = {};

            let html = '';
            groups.forEach(group => {
                const num = group.number;
                html += `<div id="ref-${num}" class="reference-item">`;
                html += `<div class="reference-group-title"><span class="reference-number">[${num}]</span> ${group.data_summary.split('.')[0]}.</div>`;

                group.sources.forEach((src, idx) => {
                    const authorShort = src.author.split(',')[0];
                    const doiLink = src.doi ? ` <a href="https://doi.org/${src.doi}" target="_blank" rel="noopener">DOI: ${src.doi}</a>` : '';
                    const pubmedLink = src.pmid ? ` <a href="https://pubmed.ncbi.nlm.nih.gov/${src.pmid}/" target="_blank" rel="noopener">PMID: ${src.pmid}</a>` : '';
                    const volumePages = [src.volume, src.pages].filter(v => v).join(', ');

                    html += `<div style="margin-left: 20px; margin-top: 4px;">`;
                    html += `${src.author} (${src.year}). &ldquo;${src.title}.&rdquo; <em>${src.journal}</em>`;
                    if (volumePages) html += `, ${volumePages}`;
                    html += `.`;
                    if (doiLink) html += doiLink;
                    if (pubmedLink) html += ` ${pubmedLink}`;
                    html += `</div>`;

                    // Use first source for tooltip
                    if (idx === 0) {
                        tooltipMap[num] = `${authorShort} et al. (${src.year}). ${src.journal}`;
                    }
                });

                html += `</div>`;
            });

            refList.innerHTML = html;

            // Add tooltips to citation superscripts
            document.querySelectorAll('.cite-ref a').forEach(link => {
                const href = link.getAttribute('href');
                if (!href) return;
                const match = href.match(/#ref-(\d+)/);
                if (!match) return;
                const refNum = parseInt(match[1]);
                if (tooltipMap[refNum]) {
                    const tooltip = document.createElement('span');
                    tooltip.className = 'cite-tooltip';
                    tooltip.textContent = tooltipMap[refNum];
                    link.appendChild(tooltip);
                }
            });

            // Attach handlers after tooltips are created
            setupCitationHandlers();
        })
        .catch(err => {
            console.warn('Citations could not be loaded:', err);
            const refSection = document.getElementById('referencesSection');
            if (refSection) {
                refSection.innerHTML = '<h2>Sources & References</h2><p style="color: #6B6B6C; font-size: 14px;">Citations could not be loaded. See sources.json for full reference list.</p>';
            }
            // Still set up handlers so clicks don't navigate away
            setupCitationHandlers();
        });
}

loadCitations();

// ============================================================
// URL Parameter Sharing (Phase 3B)
// ============================================================
const paramConfig = [
    { key: 'eggs', sliderId: 'eggsRetrieved', numId: null, valueId: 'eggsRetrievedValue' },
    { key: 'mii', sliderId: 'maturityRate', numId: null, valueId: 'maturityRateValue' },
    { key: 'fert', sliderId: 'fertilizationRate', numId: null, valueId: 'fertilizationRateValue' },
    { key: 'blast', sliderId: 'blastocystRate', numId: null, valueId: 'blastocystRateValue' },
    { key: 'count', sliderId: 'embryoCount', numId: null, valueId: 'embryoCountValue' },
    { key: 'age', sliderId: 'maternalAge', numId: null, valueId: 'maternalAgeValue' },
    { key: 'euploid', sliderId: 'euploidRate', numId: null, valueId: 'euploidRateValue' },
    { key: 'pgtm', sliderId: 'pgtmRate', numId: null, valueId: 'pgtmRateValue' },
    { key: 'gradeAA', sliderId: null, numId: 'gradeAA', valueId: null },
    { key: 'gradeBA', sliderId: null, numId: 'gradeBA', valueId: null },
    { key: 'gradeBC', sliderId: null, numId: 'gradeBC', valueId: null },
    { key: 'implant', sliderId: 'implantationRate', numId: null, valueId: 'implantationRateValue' },
    { key: 'lbr', sliderId: 'liveBirthRate', numId: null, valueId: 'liveBirthRateValue' },
    { key: 'frozen', sliderId: null, numId: 'frozenTransfer', valueId: null, isCheckbox: true },
    { key: 'dopgtm', sliderId: null, numId: 'doPgtM', valueId: null, isCheckbox: true }
];

function encodeParamsToURL() {
    const params = new URLSearchParams();
    paramConfig.forEach(cfg => {
        if (cfg.isCheckbox) {
            const el = document.getElementById(cfg.numId);
            if (el) params.set(cfg.key, el.checked ? '1' : '0');
            return;
        }
        const el = document.getElementById(cfg.sliderId || cfg.numId);
        if (el) params.set(cfg.key, el.value);
    });
    const newUrl = window.location.pathname + '?' + params.toString();
    history.replaceState(null, '', newUrl);
}

function restoreParamsFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.toString() === '') return false;

    let restored = false;
    paramConfig.forEach(cfg => {
        const val = params.get(cfg.key);
        if (val === null) return;

        if (cfg.isCheckbox) {
            const el = document.getElementById(cfg.numId);
            if (el) el.checked = val === '1';
            restored = true;
            return;
        }

        if (cfg.sliderId) {
            const slider = document.getElementById(cfg.sliderId);
            if (slider) {
                if (parseInt(val) > parseInt(slider.max)) slider.max = val;
                slider.value = val;
            }
        }
        if (cfg.numId) {
            const num = document.getElementById(cfg.numId);
            if (num) num.value = val;
        }
        if (cfg.valueId) {
            const display = document.getElementById(cfg.valueId);
            if (display) display.textContent = val;
        }
        restored = true;
    });
    return restored;
}

// Sync toggle visibility state with their checkboxes
function syncToggleVisibility() {
    const pgtmGroup = document.getElementById('pgtmGroup');
    const geneticsSection = document.getElementById('geneticInheritanceSection');
    if (!document.getElementById('doPgtM').checked) {
        pgtmGroup.style.display = 'none';
        if (geneticsSection) geneticsSection.style.display = 'none';
    }
}

// Restore params on page load (before initial updateSimulation already ran, so re-run)
if (restoreParamsFromURL()) {
    syncToggleVisibility();
    updateSimulation();
}

// Update URL on every input change
document.querySelectorAll('input[type="range"], input[type="number"], input[type="checkbox"]').forEach(input => {
    input.addEventListener('input', encodeParamsToURL);
    input.addEventListener('change', encodeParamsToURL);
});

// Share button
document.getElementById('shareBtn').addEventListener('click', function() {
    encodeParamsToURL();
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const btn = this;
        const originalText = btn.textContent;
        btn.textContent = 'Link Copied!';
        btn.classList.add('btn-copied');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('btn-copied');
        }, 2000);
    }).catch(() => {
        // Fallback for browsers without clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        const btn = this;
        const originalText = btn.textContent;
        btn.textContent = 'Link Copied!';
        btn.classList.add('btn-copied');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('btn-copied');
        }, 2000);
    });
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', function() {
    // Default values matching the HTML defaults
    const defaults = {
        eggsRetrieved: 12,
        maturityRate: 80, fertilizationRate: 75, blastocystRate: 50,
        embryoCount: 4,
        maternalAge: 38, euploidRate: 55, pgtmRate: 75,
        gradeAA: 0, gradeBA: 0, gradeBC: 0,
        implantationRate: 50, liveBirthRate: 75
    };

    Object.entries(defaults).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
    });

    // Reset value displays
    const displays = {
        eggsRetrievedValue: 12, embryoCountValue: 4,
        maturityRateValue: 80, fertilizationRateValue: 75, blastocystRateValue: 50,
        maternalAgeValue: 38, euploidRateValue: 55, pgtmRateValue: 75,
        implantationRateValue: 50, liveBirthRateValue: 75
    };

    Object.entries(displays).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });

    // Reset frozen transfer toggle
    const frozenToggle = document.getElementById('frozenTransfer');
    if (frozenToggle) frozenToggle.checked = true;

    // Reset PGT-M toggle to on
    document.getElementById('doPgtM').checked = true;
    document.getElementById('pgtmGroup').style.display = '';
    const geneticsSection = document.getElementById('geneticInheritanceSection');
    if (geneticsSection) geneticsSection.style.display = '';

    // Reset AMH panel
    document.getElementById('amhPanel').style.display = 'none';
    document.getElementById('amhLevel').value = '';
    document.getElementById('amhAge').value = 38;
    document.getElementById('amhResult').textContent = '';

    // Clear URL params
    history.replaceState(null, '', window.location.pathname);
    updateSimulation();
});

// Print button
document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});

// ============================================================
// Accessibility: Update aria-valuenow on all range inputs
// ============================================================
document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', function() {
        this.setAttribute('aria-valuenow', this.value);
    });
});

// ============================================================
// Fresh vs Frozen Transfer Toggle (Phase 3D)
// ============================================================
const frozenTransferToggle = document.getElementById('frozenTransfer');
if (frozenTransferToggle) {
    frozenTransferToggle.addEventListener('change', function() {
        const slider = document.getElementById('implantationRate');
        const display = document.getElementById('implantationRateValue');
        let currentVal = parseInt(slider.value);

        if (this.checked) {
            // Switched to Frozen: increase by 5%
            currentVal = Math.min(80, currentVal + 5);
        } else {
            // Switched to Fresh: decrease by 5%
            currentVal = Math.max(20, currentVal - 5);
        }

        slider.value = currentVal;
        display.textContent = currentVal;
        encodeParamsToURL();
        updateSimulation();
    });
}

// ============================================================
// Viewport-Entry Animations (Task 6)
// ============================================================
(function setupViewportAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Still add .in-view so bars render at full width
        document.querySelectorAll('.chart-section').forEach(s => s.classList.add('in-view'));
        const bentoEl = document.querySelector('.bento-grid');
        if (bentoEl) bentoEl.classList.add('in-view');
        return;
    }

    // Track which sections have had their initial animation
    const animated = new Set();

    // Observe chart sections — add .in-view class to trigger CSS bar animations
    // Use MutationObserver to handle dynamically-rendered bars
    document.querySelectorAll('.chart-section').forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated.has(entry.target)) {
                    animated.add(entry.target);
                    // Delay slightly to ensure bars render at 0% first
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                        // Add stagger delays to probability bars (dynamic count)
                        entry.target.querySelectorAll('.probability-bar .bar-fill').forEach((bar, i) => {
                            bar.style.transitionDelay = (i * 60) + 'ms';
                        });
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        observer.observe(section);
    });

    // Observe input section stat cards — tick up funnel numbers
    const inputStatGrid = document.querySelector('.input-section .stat-grid');
    if (inputStatGrid) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated.has(inputStatGrid)) {
                    animated.add(inputStatGrid);
                    tickUpNumber('matureEggs', 'integer', 600);
                    tickUpNumber('fertilizedEggs', 'integer', 600);
                    tickUpNumber('blastocysts', 'integer', 600);
                    observer.unobserve(inputStatGrid);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(inputStatGrid);
    }

    // Observe bento grid — tick up stat numbers
    const bentoGrid = document.querySelector('.bento-grid');
    if (bentoGrid) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated.has(bentoGrid)) {
                    animated.add(bentoGrid);
                    bentoGrid.classList.add('in-view');
                    tickUpNumber('expectedValue', 'decimal', 600);
                    tickUpNumber('combinedProb', 'percent', 600);
                    tickUpNumber('mostLikely', 'integer', 600);
                    observer.unobserve(bentoGrid);
                }
            });
        }, { threshold: 0.15 });
        observer.observe(bentoGrid);
    }

    // Observe pregnancy stats — tick up those numbers too
    const pregnancySection = document.querySelector('.pregnancy-section');
    if (pregnancySection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated.has(pregnancySection)) {
                    animated.add(pregnancySection);
                    tickUpNumber('perTransferSuccess', 'percent', 600);
                    tickUpNumber('expectedTransfers', 'decimal', 600);
                    observer.unobserve(pregnancySection);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(pregnancySection);
    }

    // Observe pregnancy outcomes — tick up probabilities
    const outcomesSection = document.querySelector('.pregnancy-outcomes');
    if (outcomesSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated.has(outcomesSection)) {
                    animated.add(outcomesSection);
                    tickUpNumber('atLeast1Birth', 'percentDecimal', 600);
                    tickUpNumber('atLeast2Births', 'percentDecimal', 600);
                    tickUpNumber('noSuccess', 'percentDecimal', 600);
                    observer.unobserve(outcomesSection);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(outcomesSection);
    }

    function tickUpNumber(id, format, duration) {
        const el = document.getElementById(id);
        if (!el) return;

        const text = el.textContent.trim();

        // Handle range format like "2-3" — don't animate, just leave as-is
        if (text.includes('-') && format === 'integer') return;

        let target;
        if (format === 'percent') {
            target = parseFloat(text);
            if (isNaN(target)) return;
            el.textContent = '0%';
        } else if (format === 'percentDecimal') {
            target = parseFloat(text);
            if (isNaN(target)) return;
            el.textContent = '0.0%';
        } else if (format === 'integer') {
            target = parseInt(text);
            if (isNaN(target)) return;
            el.textContent = '0';
        } else {
            target = parseFloat(text);
            if (isNaN(target)) return;
            el.textContent = '0.0';
        }

        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = target * eased;

            if (format === 'percent') {
                el.textContent = Math.round(current) + '%';
            } else if (format === 'percentDecimal') {
                el.textContent = (current).toFixed(1) + '%';
            } else if (format === 'integer') {
                el.textContent = Math.round(current);
            } else {
                el.textContent = current.toFixed(1);
            }

            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
})();

// --- Outcome Card Toggle ---
document.querySelectorAll('.outcome-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const card = btn.closest('.outcome-card');
        card.classList.toggle('expanded');
        btn.textContent = card.classList.contains('expanded') ? 'Hide' : 'Learn more';
    });
});

// --- References Toggle ---
(function() {
    const btn = document.getElementById('toggleReferences');
    const section = document.querySelector('.references-section');
    if (!btn || !section) return;

    btn.addEventListener('click', function() {
        section.classList.toggle('expanded');
        btn.textContent = section.classList.contains('expanded') ? 'Hide' : 'Show';
    });
})();
