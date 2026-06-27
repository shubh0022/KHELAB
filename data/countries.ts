export interface CountryData {
  id: string; // ISO 3-letter code
  name: string;
  flag: string;
  gdpUsd: number; // in USD
  population: number;
  currentRank: number;
  strongSports: string[];
  weakSports: string[];
  expectedMedals2028: { min: number; max: number };
  historicalMedals: {
    year: number;
    gold: number;
    silver: number;
    bronze: number;
  }[];
  growthPotential: number; // Percentage 0-100
  biomeDominance: string; // e.g., High Altitude, Coastal/Aquatic, Grass/Field, Indoor Arena
  sportsPowerIndex?: number;
}

export const countriesData: CountryData[] = [
  {
    id: "USA",
    name: "United States",
    flag: "🇺🇸",
    gdpUsd: 25462700000000,
    population: 333287557,
    currentRank: 1,
    strongSports: ["Swimming", "Athletics", "Gymnastics", "Basketball"],
    weakSports: ["Table Tennis", "Badminton", "Handball"],
    expectedMedals2028: { min: 110, max: 125 },
    historicalMedals: [
      { year: 2008, gold: 36, silver: 39, bronze: 37 },
      { year: 2012, gold: 47, silver: 27, bronze: 30 },
      { year: 2016, gold: 46, silver: 37, bronze: 38 },
      { year: 2020, gold: 39, silver: 41, bronze: 33 },
      { year: 2024, gold: 40, silver: 44, bronze: 42 }
    ],
    growthPotential: 85,
    biomeDominance: "Multi-biome / Indoor & Track"
  },
  {
    id: "CHN",
    name: "China",
    flag: "🇨🇳",
    gdpUsd: 17963170000000,
    population: 1412175000,
    currentRank: 2,
    strongSports: ["Diving", "Table Tennis", "Weightlifting", "Shooting", "Gymnastics", "Badminton"],
    weakSports: ["Athletics (Track)", "Swimming (Sprint)", "Rugby Sevens"],
    expectedMedals2028: { min: 85, max: 95 },
    historicalMedals: [
      { year: 2008, gold: 48, silver: 22, bronze: 30 },
      { year: 2012, gold: 39, silver: 31, bronze: 22 },
      { year: 2016, gold: 26, silver: 18, bronze: 26 },
      { year: 2020, gold: 38, silver: 32, bronze: 19 },
      { year: 2024, gold: 40, silver: 27, bronze: 24 }
    ],
    growthPotential: 88,
    biomeDominance: "Indoor Arenas & Closed Systems"
  },
  {
    id: "IND",
    name: "India",
    flag: "🇮🇳",
    gdpUsd: 3385090000000,
    population: 1417173173,
    currentRank: 17,
    strongSports: ["Shooting", "Wrestling", "Athletics (Javelin)", "Badminton", "Boxing", "Hockey"],
    weakSports: ["Swimming", "Gymnastics", "Cycling", "Rowing"],
    expectedMedals2028: { min: 10, max: 15 },
    historicalMedals: [
      { year: 2008, gold: 1, silver: 0, bronze: 2 },
      { year: 2012, gold: 0, silver: 2, bronze: 4 },
      { year: 2016, gold: 0, silver: 1, bronze: 1 },
      { year: 2020, gold: 1, silver: 2, bronze: 4 },
      { year: 2024, gold: 0, silver: 1, bronze: 5 }
    ],
    growthPotential: 94,
    biomeDominance: "Subtropical Clay & Open Field"
  },
  {
    id: "GBR",
    name: "Great Britain",
    flag: "🇬🇧",
    gdpUsd: 3070660000000,
    population: 66971411,
    currentRank: 7,
    strongSports: ["Cycling (Track)", "Rowing", "Sailing", "Equestrian"],
    weakSports: ["Wrestling", "Weightlifting", "Table Tennis"],
    expectedMedals2028: { min: 55, max: 68 },
    historicalMedals: [
      { year: 2008, gold: 19, silver: 13, bronze: 19 },
      { year: 2012, gold: 29, silver: 18, bronze: 18 },
      { year: 2016, gold: 27, silver: 23, bronze: 17 },
      { year: 2020, gold: 22, silver: 20, bronze: 22 },
      { year: 2024, gold: 14, silver: 22, bronze: 29 }
    ],
    growthPotential: 81,
    biomeDominance: "Temperate Marine & Aquatic"
  },
  {
    id: "FRA",
    name: "France",
    flag: "🇫🇷",
    gdpUsd: 2782900000000,
    population: 67971311,
    currentRank: 5,
    strongSports: ["Judo", "Fencing", "Cycling", "Swimming", "Handball"],
    weakSports: ["Badminton", "Baseball", "Softball"],
    expectedMedals2028: { min: 50, max: 62 },
    historicalMedals: [
      { year: 2008, gold: 7, silver: 16, bronze: 20 },
      { year: 2012, gold: 11, silver: 11, bronze: 13 },
      { year: 2016, gold: 10, silver: 18, bronze: 14 },
      { year: 2020, gold: 10, silver: 12, bronze: 11 },
      { year: 2024, gold: 16, silver: 26, bronze: 22 }
    ],
    growthPotential: 83,
    biomeDominance: "Indoor Combat & Fencing Pistes"
  },
  {
    id: "KEN",
    name: "Kenya",
    flag: "🇰🇪",
    gdpUsd: 113420000000,
    population: 54027487,
    currentRank: 24,
    strongSports: ["Athletics (Middle/Long Distance)"],
    weakSports: ["Gymnastics", "Swimming", "Combat Sports", "Archery"],
    expectedMedals2028: { min: 8, max: 13 },
    historicalMedals: [
      { year: 2008, gold: 6, silver: 4, bronze: 4 },
      { year: 2012, gold: 2, silver: 4, bronze: 7 },
      { year: 2016, gold: 6, silver: 6, bronze: 1 },
      { year: 2020, gold: 4, silver: 4, bronze: 2 },
      { year: 2024, gold: 4, silver: 2, bronze: 5 }
    ],
    growthPotential: 89,
    biomeDominance: "High Altitude Highlands (>2000m)"
  },
  {
    id: "JAM",
    name: "Jamaica",
    flag: "🇯🇲",
    gdpUsd: 17100000000,
    population: 2827695,
    currentRank: 28,
    strongSports: ["Athletics (Sprints)", "Bobsleigh (Winter)"],
    weakSports: ["Combat Sports", "Wrestling", "Gymnastics", "Aquatics"],
    expectedMedals2028: { min: 6, max: 11 },
    historicalMedals: [
      { year: 2008, gold: 5, silver: 4, bronze: 2 },
      { year: 2012, gold: 4, silver: 5, bronze: 3 },
      { year: 2016, gold: 6, silver: 3, bronze: 2 },
      { year: 2020, gold: 4, silver: 1, bronze: 4 },
      { year: 2024, gold: 1, silver: 5, bronze: 3 }
    ],
    growthPotential: 86,
    biomeDominance: "Tropical Sea-Level Fast Tracks"
  },
  {
    id: "AUS",
    name: "Australia",
    flag: "🇦🇺",
    gdpUsd: 1675400000000,
    population: 26005500,
    currentRank: 4,
    strongSports: ["Swimming", "Rowing", "Cycling", "Sailing", "Canoeing"],
    weakSports: ["Table Tennis", "Wrestling", "Gymnastics (Artistic)"],
    expectedMedals2028: { min: 45, max: 55 },
    historicalMedals: [
      { year: 2008, gold: 14, silver: 15, bronze: 17 },
      { year: 2012, gold: 8, silver: 15, bronze: 12 },
      { year: 2016, gold: 8, silver: 11, bronze: 10 },
      { year: 2020, gold: 17, silver: 7, bronze: 22 },
      { year: 2024, gold: 18, silver: 19, bronze: 16 }
    ],
    growthPotential: 84,
    biomeDominance: "Coastal Aquatic & Open Water"
  }
];
