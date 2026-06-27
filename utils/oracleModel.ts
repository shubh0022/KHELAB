import { AthleteData } from "../data/athletes";
import { CountryData } from "../data/countries";

export interface MatchSimulationResult {
  athleteId: string;
  name: string;
  countryId: string;
  probability: number;
  simulatedTimeResult?: string;
  injuryRiskScore: number;
}

export interface SimulationOptions {
  gdpMultiplier?: number; // 0.5 to 2.0
  recoveryMultiplier?: number; // 0.5 to 2.0
  frictionMultiplier?: number; // 0.5 to 2.0
}

/**
 * AI Model Oracle simulator.
 * Simulates machine learning inference for sports analytics.
 */
export const KhelabOracle = {
  /**
   * Predicts victory probabilities for athletes in a simulated competition.
   * Uses simulated Random Forest/XGBoost weights based on rank, peak velocity, movement efficiency.
   * Incorporates real-time parameter multipliers (e.g. frictionMultiplier, recoveryMultiplier).
   */
  simulateCompetition(athletes: AthleteData[], options?: SimulationOptions): MatchSimulationResult[] {
    const friction = options?.frictionMultiplier ?? 1.0;
    const recovery = options?.recoveryMultiplier ?? 1.0;

    const scored = athletes.map((athlete) => {
      // Base score derived from rank (lower rank is better) and movement efficiency
      const rankScore = Math.max(0, 100 - athlete.rank * 10);
      const bioScore = (athlete.biomechanics.movementEfficiency + (athlete.biomechanics.enduranceIndex || 80)) / 2;
      const ageWeight = athlete.age >= 25 && athlete.age <= 29 ? 1.15 : 0.95; // prime athletic age

      // Friction decreases performance slightly for speed athletes
      const speedImpact = athlete.biomechanics.peakVelocityMs ? (athlete.biomechanics.peakVelocityMs * (1 - friction) * 1.5) : 0;
      // Recovery improves injury index impact
      const adjustedInjury = Math.max(0, athlete.injuryRisk * (2.0 - recovery));

      // Random jitter simulation (like wind or drift)
      const randomJitter = Math.random() * 8;

      const rawScore = (rankScore * 0.35 + bioScore * 0.45 + (100 - adjustedInjury) * 0.20) * ageWeight + speedImpact + randomJitter;

      return {
        athleteId: athlete.id,
        name: athlete.name,
        countryId: athlete.countryId,
        rawScore,
        injuryRiskScore: Math.round(adjustedInjury)
      };
    });

    // Sum scores to normalize probabilities
    const totalScore = scored.reduce((sum, item) => sum + item.rawScore, 0);

    return scored
      .map((item) => ({
        athleteId: item.athleteId,
        name: item.name,
        countryId: item.countryId,
        probability: Math.round((item.rawScore / totalScore) * 100),
        injuryRiskScore: item.injuryRiskScore
      }))
      .sort((a, b) => b.probability - a.probability);
  },

  /**
   * Simulates long-term medal predictions for a country up to 2048 using LSTM time series projection.
   * Incorporates economic (GDP) and population scaling, plus real-time funding boost multipliers.
   */
  predictMedalsTimeline(country: CountryData, options?: SimulationOptions): { year: number; projectedGold: number; projectedTotal: number }[] {
    const funding = options?.gdpMultiplier ?? 1.0;
    const historical = [...country.historicalMedals].sort((a, b) => a.year - b.year);
    const timeline: { year: number; projectedGold: number; projectedTotal: number }[] = [];

    // Historical anchor points
    historical.forEach((h) => {
      timeline.push({
        year: h.year,
        projectedGold: h.gold,
        projectedTotal: h.gold + h.silver + h.bronze
      });
    });

    // Project cycles: 2028, 2032, 2036, 2040, 2044, 2048
    let currentGoldTrend = historical[historical.length - 1].gold;
    let currentTotalTrend = historical[historical.length - 1].gold + historical[historical.length - 1].silver + historical[historical.length - 1].bronze;

    // Growth rates are adjusted based on growth potential and GDP trends, scaled by interactive funding slider
    const annualGrowth = ((country.growthPotential - 50) / 150) * funding; // positive or negative scaled by funding

    for (let year = 2028; year <= 2048; year += 4) {
      const gdpScale = 1 + (Math.log10(country.gdpUsd * funding) / 50); // slight multiplier for larger GDPs
      currentGoldTrend = Math.max(0, currentGoldTrend * (1 + annualGrowth * gdpScale));
      currentTotalTrend = Math.max(0, currentTotalTrend * (1 + annualGrowth * gdpScale));

      timeline.push({
        year,
        projectedGold: Math.round(currentGoldTrend),
        projectedTotal: Math.round(currentTotalTrend)
      });
    }

    return timeline;
  },

  /**
   * Generates intelligent AI commentary in multiple languages, displaying biomechanical telemetry.
   */
  generateCommentary(eventDescription: string, language: "en" | "hi" | "gu" | "fr" | "es", metrics?: { velocity?: number; efficiency?: number }): string {
    const telemetryText = metrics 
      ? ` [Release Velocity: ${metrics.velocity?.toFixed(1) || "N/A"} m/s, Biomechanical Efficiency: ${metrics.efficiency || 95}%]`
      : "";

    const commentaries = {
      en: `KHELAB AI Commentary: ${eventDescription} secures victory in an extraordinary demonstration of biomechanical pacing and tactical excellence!${telemetryText}`,
      hi: `खेलैब एआई कमेंट्री: बायोमैकेनिकल गति और सामरिक उत्कृष्टता के एक असाधारण प्रदर्शन में ${eventDescription} ने जीत हासिल की!${telemetryText}`,
      gu: `ખેલૈબ એઆઈ કોમેન્ટ્રી: બાયોમિકેનિકલ ગતિ અને વ્યુહાત્મક શ્રેષ્ઠતાના અસાધારણ પ્રદર્શનમાં ${eventDescription} એ વિજય મેળવ્યો છે!${telemetryText}`,
      fr: `Commentaire IA KHELAB: ${eventDescription} remporte la victoire dans une démonstration extraordinaire de rythme biomécanique et d'excellence tactique!${telemetryText}`,
      es: `Comentario IA de KHELAB: ¡${eventDescription} asegura la victoria en una demostración extraordinaria de ritmo biomécanique y excelencia táctica!${telemetryText}`
    };

    return commentaries[language] || commentaries.en;
  },

  /**
   * Evaluates user query to simulate advanced sports science NLP inference.
   * Generates highly detailed report analysis with markdown layout formatting.
   */
  evaluateOracleQuery(query: string, countryId: string, athleteId: string): string {
    const q = query.toLowerCase();
    
    // 1. Athlete specific queries
    if (q.includes("neeraj") || q.includes("chopra") || (q.includes("javelin") && athleteId === "neeraj_chopra")) {
      return `### KHELAB Sports Science Report: Neeraj Chopra (Javelin Throw)

#### Biomechanical Performance Blueprint
- **Optimal Release Angle**: Calculated at **34.2° - 35.8°** (current projection shows absolute path efficiency).
- **Run-Up Velocity**: Peak run-up speed targets **8.8 m/s** to transfer kinetic energy into block-leg stability.
- **Force Vector Index**: Joint load extension reaches **980 Newtons** during plant phase, requiring extreme adductor recovery.

| Biomechanical Metric | Target Value | Current Status | Efficiency |
| :--- | :--- | :--- | :--- |
| Block Leg Plant Angle | 165° | 162.4° | 98.4% |
| Release Velocity | 31.8 m/s | 31.4 m/s | 98.7% |
| Hip Rotation Angle | 45° | 43.1° | 95.8% |

#### 2028 Victory Projection
Under current simulator coefficients (recovery = 1.0, friction = 0.12), Neeraj Chopra maintains a **68% Gold probability** and **90% podium retention rate**. If physical recovery scores improve by 15%, gold probability rises to **74%**.`;
    }

    if (q.includes("biles") || q.includes("simone") || (q.includes("gymnastics") && athleteId === "simone_biles")) {
      return `### KHELAB Sports Science Report: Simone Biles (Artistic Gymnastics)

#### Biomechanical Vault & Floor Blueprint
- **Explosive Launch Velocity**: Target takeoff velocity is **25.5 m/s** producing high rotational torque.
- **Takeoff Force Output**: Yields **1450 Newtons** of relative vertical reaction force, highest index ever recorded in gymnastics.
- **Landing Impact Vector**: Hip/spine hyperextension angle must lock at **48°** to prevent knee adduction fatigue.

| Diagnostic Vector | Benchmark Value | Active Output | Status |
| :--- | :--- | :--- | :--- |
| Relative Takeoff Force | 1400 N | 1450 N | Normal - Peak |
| Spine Flexion Angle | 48° | 47.5° | Stable |
| Landing G-Force | 8.2 G | 8.4 G | High Strain |

#### 2028 Victory Projection
Simone Biles possesses a **72% Gold probability** in artistic gymnastics. Retaining stability in landing vectors under low friction coefficients increases joint resilience score by 12%.`;
    }

    if (q.includes("marchand") || q.includes("leon") || (q.includes("swimming") && athleteId === "leon_marchand")) {
      return `### KHELAB Aquatic Diagnostics: Leon Marchand (Swimming)

#### Underwater Hydrodynamics & Dolphin Kicking
- **Gliding Stride Efficiency**: Streamlined breaststroke glide efficiency registered at **97%**.
- **Dolphin Kick Frequency**: Paces at **2.4 Hz** under-water, sustaining kick distance up to **14.8m** before breakout.
- **Reaction Time**: Block release reaction time averaged at **620ms** (sprint start acceleration phase).

| Hydrodynamic Vector | Target Metric | Active Output | Efficiency |
| :--- | :--- | :--- | :--- |
| Underwater Kick Distance | 15.0m max | 14.8m | 98.6% |
| Glide Viscosity Resistance | 0.08 μ | 0.09 μ | Nominal |
| Aerobic VO2 Utilization | 98% index | 97.8% | Optimal |

#### 2028 Victory Projection
Leon Marchand maintains a dominant **85% Gold probability** in the 400m IM. Reducing pool drag parameters slightly (lowering surface friction multiplier) secures world record pace margin.`;
    }

    if (q.includes("lyles") || q.includes("noah") || (q.includes("sprint") && athleteId === "noah_lyles")) {
      return `### KHELAB Velocity Diagnostics: Noah Lyles (100m/200m Sprint)

#### Velocity Pacing & Stride Telemetry
- **Stride Frequency**: Peak rate reaches **4.9 Hz** (steps per second) during top velocity phase.
- **Top Running Speed**: Reaches **12.1 m/s** (~43.6 km/h) at the 60m-80m acceleration zone.
- **Starting Block Drive**: Drive phase horizontal force vector registers **1100 Newtons**.

| Stride Telemetry Metric | Target Metric | Active Output | Efficiency |
| :--- | :--- | :--- | :--- |
| Stride Frequency | 4.9 Hz | 4.85 Hz | 99.0% |
| Block Reaction Time | 140 ms | 142 ms | 98.6% |
| Stride Length | 2.45m | 2.41m | 98.3% |

#### 2028 Victory Projection
Noah Lyles holds a **60% Gold probability** and **85% overall podium rate**. Starting block acceleration decay is the primary risk factor (impacted negatively by high air friction coefficients).`;
    }

    if (q.includes("manu") || q.includes("bhaker") || (q.includes("shooting") && athleteId === "manu_bhaker")) {
      return `### KHELAB Precision Diagnostics: Manu Bhaker (10m/25m Pistol)

#### Heart-Rate & Postural Micro-Stability
- **Cardiovascular Control**: Resting heart rate drops to **48 bpm** during target lock phase.
- **Wrist Lock Angle**: Mechanical alignment locked at **180°** with zero angular drift.
- **Release Time Window**: Trigger release occurs within a **125ms** optimal stability window.

| Micro-Stability Vector | Benchmark Value | Active Output | Accuracy |
| :--- | :--- | :--- | :--- |
| Angular Deviation | < 0.02° | 0.015° | 99.4% |
| Trigger Release Latency | 125 ms | 128 ms | 97.6% |
| Heart Rate Stabilization | 48 bpm | 50 bpm | Optimal |

#### 2028 Victory Projection
Manu Bhaker maintains a **45% Gold probability** and **75% Podium probability** for the 2028 LA Games. Precision parameters are sensitive to high humidity and biomechanical stress coefficients.`;
    }

    // 2. Country specific queries
    if (q.includes("india") || q.includes("ind")) {
      return `### KHELAB Strategic Country Report: India (IND)

#### Strategic Sports Power Index (SPI) Analysis
- **Current Rank**: 17th globally (2024 results normalized).
- **Growth Potential**: **94%** (highest active trajectory index).
- **Core Strongholds**: Shooting, Wrestling, Athletics (Javelin), Hockey, Boxing.
- **Structural Bottlenecks**: Grassroots infrastructure funding distribution, lack of sports science inclusion in swimming & cycling.

#### 2028 Medal Simulation Projections
- **Base Projection**: **10 - 15 total medals** (Targeting 2-3 Golds).
- **Optimized Projection (GDP Funding Multiplier @ 1.5x)**: **18 - 24 total medals** (Targeting 4-5 Golds).
- **Biome Adaptations**: Training programs should focus on Subtropical Clay & Open Field environments, with specialized high-altitude conditioning for middle-distance runners.`;
    }

    if (q.includes("china") || q.includes("chn")) {
      return `### KHELAB Strategic Country Report: China (CHN)

#### Strategic Sports Power Index (SPI) Analysis
- **Current Rank**: 2nd globally (dominating indoor systems and closed arenas).
- **Growth Potential**: **88%**.
- **Core Strongholds**: Diving, Table Tennis, Weightlifting, Badminton, Gymnastics.
- **Strategic Target**: Track sprints, open-water swimming sprint endurance.

#### 2028 Medal Simulation Projections
- **Base Projection**: **85 - 95 total medals** (Targeting 38-42 Golds).
- **Optimized Projection**: **100+ medals** if indoor biome systems receive additional sports science support.`;
    }

    if (q.includes("usa") || q.includes("united states")) {
      return `### KHELAB Strategic Country Report: United States (USA)

#### Strategic Sports Power Index (SPI) Analysis
- **Current Rank**: 1st globally.
- **Growth Potential**: **85%**.
- **Core Strongholds**: Swimming, Athletics, Gymnastics, Basketball.
- **Strategic Risks**: Rapid rise of specialized Chinese academies and European combat sports programs.

#### 2028 Medal Simulation Projections
- **Base Projection**: **110 - 125 total medals** (Targeting 40-45 Golds).
- **Optimized Projection**: **130+ medals** under maximized recovery and biomechanical optimization.`;
    }

    // 3. Fallback/General prompt evaluation
    return `### KHELAB Sports Intelligence Query Result
Your query: "*${query}*" was parsed successfully through the Khelab Oracle AI layer.

#### Quick Diagnostics Matrix
- **Active Country Target**: **${countryId}** (Sports Power Index: Calculated)
- **Active Athlete Target**: **${athleteId}** (Skeletal Telemetry: Active)
- **Environmental Friction Multiplier**: Evaluated

#### General Recommendation
To maximize Olympic performance output for the **${countryId}** program, direct funding towards biomechanical feedback systems (precision wearables, skeletal motion cameras) and high-performance recovery regimens. Current projection models suggest a significant correlation between biomechanical movement efficiency and gold medal outcomes in 2028.

*For detailed statistics on specific athletes, ask for them by name (e.g. "Neeraj Chopra", "Leon Marchand", or "Simone Biles").*`;
  }
}
