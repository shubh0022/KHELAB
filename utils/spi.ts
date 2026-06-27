import { CountryData } from "../data/countries";

/**
 * Calculates the Sports Power Index (SPI) for a country.
 * Formula:
 * SPI = MedalScore + GDPFactor + PopulationFactor + GrowthFactor + EfficiencyFactor
 * 
 * Where:
 * - MedalScore = 3 * Gold + 2 * Silver + 1 * Bronze (of the latest year 2024)
 * - GDPFactor = Measures medals per Billion USD of GDP. High medals + lower GDP increases this.
 * - PopulationFactor = Measures medals per Million inhabitants. High medals + lower population increases this.
 * - GrowthFactor = Medal growth rate from 2008 to 2024.
 * - EfficiencyFactor = Athlete quality and peak performance metrics.
 */
export function calculateCountrySPI(country: CountryData): number {
  const latestMedals = country.historicalMedals.find((m) => m.year === 2024) || { gold: 0, silver: 0, bronze: 0 };
  
  // 1. Core Medal Score (latest cycle)
  const medalScore = (latestMedals.gold * 3) + (latestMedals.silver * 2) + (latestMedals.bronze * 1);
  
  if (medalScore === 0) {
    // Baseline score for countries with no recent medals but high growth potential
    return Math.round(5 + (country.growthPotential * 0.1));
  }

  // 2. GDP Factor: normalized economic resource impact
  // We use log10 to prevent extreme skew from giant economies (e.g. USA, CHN)
  const logGDP = Math.log10(country.gdpUsd);
  const gdpFactor = (medalScore / logGDP) * 12;

  // 3. Population Factor: normalized human resource density
  const logPop = Math.log10(country.population);
  const populationFactor = (medalScore / logPop) * 8;

  // 4. Historical Growth Factor: percentage increase in medal score from 2008 to 2024
  const medals2008 = country.historicalMedals.find((m) => m.year === 2008) || { gold: 0, silver: 0, bronze: 0 };
  const score2008 = (medals2008.gold * 3) + (medals2008.silver * 2) + (medals2008.bronze * 1);
  
  let growthFactor = 0;
  if (score2008 > 0) {
    const growthRate = (medalScore - score2008) / score2008;
    growthFactor = Math.max(-10, Math.min(25, growthRate * 15)); // Clamped to avoid extremes
  } else {
    // If they started with 0 medals in 2008 but now have medals, give a significant boost
    growthFactor = 18;
  }

  // 5. Athlete Efficiency Factor
  // Driven by growth potential parameter representing youth participation & training infrastructures
  const efficiencyFactor = (country.growthPotential / 100) * 15;

  const rawSPI = medalScore + gdpFactor + populationFactor + growthFactor + efficiencyFactor;

  // Round to 1 decimal place
  return Math.round(rawSPI * 10) / 10;
}

/**
 * Ranks all countries based on their computed Sports Power Index.
 */
export function getRankedCountries(countries: CountryData[]): (CountryData & { sportsPowerIndex: number; spiRank: number })[] {
  const calculated = countries.map((c) => {
    const spi = calculateCountrySPI(c);
    return {
      ...c,
      sportsPowerIndex: spi
    };
  });

  // Sort descending
  calculated.sort((a, b) => b.sportsPowerIndex - a.sportsPowerIndex);

  // Assign ranks
  return calculated.map((c, index) => ({
    ...c,
    spiRank: index + 1
  }));
}
