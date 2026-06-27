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
  }
};
