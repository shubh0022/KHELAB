export interface AthleteData {
  id: string;
  name: string;
  countryId: string;
  sport: string;
  discipline: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  rank: number;
  imageUrl: string;
  historicalPerformance: {
    competition: string;
    year: number;
    result: string;
    scoreMetric?: string;
  }[];
  biomechanics: {
    reactionTimeMs: number;
    peakVelocityMs?: number;
    enduranceIndex: number; // 0-100
    movementEfficiency: number; // 0-100
    forceOutputNewtons?: number;
    jointAnglesDeg?: { [joint: string]: number };
  };
  strengths: string[];
  weaknesses: string[];
  injuryRisk: number; // Percentage 0-100
  careerPeakYear: number;
  retirementRisk: number; // Percentage
  winningProbability: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

export const athletesData: AthleteData[] = [
  {
    id: "neeraj_chopra",
    name: "Neeraj Chopra",
    countryId: "IND",
    sport: "Athletics",
    discipline: "Javelin Throw",
    age: 28,
    height: 182,
    weight: 86,
    rank: 2,
    imageUrl: "/images/athletes/neeraj.jpg",
    historicalPerformance: [
      { competition: "Tokyo Olympics", year: 2020, result: "Gold Medal", scoreMetric: "87.58m" },
      { competition: "World Championships (Eugene)", year: 2022, result: "Silver Medal", scoreMetric: "88.13m" },
      { competition: "World Championships (Budapest)", year: 2023, result: "Gold Medal", scoreMetric: "88.17m" },
      { competition: "Paris Olympics", year: 2024, result: "Silver Medal", scoreMetric: "89.45m" }
    ],
    biomechanics: {
      reactionTimeMs: 165,
      peakVelocityMs: 31.8, // Run-up speed in km/h translated to m/s is ~8.8 m/s, release velocity ~31.8 m/s
      enduranceIndex: 78,
      movementEfficiency: 96,
      forceOutputNewtons: 980,
      jointAnglesDeg: {
        "Elbow Extension": 165,
        "Hip Rotation": 45,
        "Ankle Plantarflexion": 30,
        "Shoulder Abduction": 110
      }
    },
    strengths: ["Block leg stability", "Extreme release angle consistency", "Fierce competitive mentality"],
    weaknesses: ["Groin adductor strain vulnerability", "Run-up speed decay on wet runways"],
    injuryRisk: 28,
    careerPeakYear: 2028,
    retirementRisk: 10,
    winningProbability: {
      gold: 68,
      silver: 22,
      bronze: 8
    }
  },
  {
    id: "simone_biles",
    name: "Simone Biles",
    countryId: "USA",
    sport: "Gymnastics",
    discipline: "Artistic Gymnastics",
    age: 29,
    height: 142,
    weight: 47,
    rank: 1,
    imageUrl: "/images/athletes/biles.jpg",
    historicalPerformance: [
      { competition: "Rio Olympics", year: 2016, result: "4x Gold, 1x Bronze" },
      { competition: "Tokyo Olympics", year: 2020, result: "1x Silver, 1x Bronze" },
      { competition: "Antwerp World Champ", year: 2023, result: "4x Gold, 1x Silver" },
      { competition: "Paris Olympics", year: 2024, result: "3x Gold, 1x Silver" }
    ],
    biomechanics: {
      reactionTimeMs: 110,
      peakVelocityMs: 25.5, // Vault launch speed
      enduranceIndex: 82,
      movementEfficiency: 99,
      forceOutputNewtons: 1450, // Massive relative strength index
      jointAnglesDeg: {
        "Knee Flexion landing": 125,
        "Spine Hyperextension": 48,
        "Shoulder Flexion": 175
      }
    },
    strengths: ["Highest difficulty score (D-score) globally", "Unmatched spatial awareness", "Eccentric explosive power"],
    weaknesses: ["Mental block susceptibility (twisties)", "High ankle landing impact fatigue"],
    injuryRisk: 35,
    careerPeakYear: 2024,
    retirementRisk: 75,
    winningProbability: {
      gold: 72,
      silver: 18,
      bronze: 7
    }
  },
  {
    id: "leon_marchand",
    name: "Leon Marchand",
    countryId: "FRA",
    sport: "Swimming",
    discipline: "400m Individual Medley / 200m Breast / Fly",
    age: 24,
    height: 187,
    weight: 77,
    rank: 1,
    imageUrl: "/images/athletes/marchand.jpg",
    historicalPerformance: [
      { competition: "Fukuoka World Champ", year: 2023, result: "3x Gold (WR in 400m IM)" },
      { competition: "Paris Olympics", year: 2024, result: "4x Gold, 1x Bronze" }
    ],
    biomechanics: {
      reactionTimeMs: 620, // Swim block reaction time in ms
      peakVelocityMs: 2.1, // Pool velocity in m/s
      enduranceIndex: 98,
      movementEfficiency: 97,
      forceOutputNewtons: 680,
      jointAnglesDeg: {
        "Knee Flexion (Kick)": 110,
        "Ankle Flexibility": 40,
        "Hip Flexion": 85
      }
    },
    strengths: ["Elite under-water dolphin kicking distance", "Unbeatable aerobic capacity", "Flawless breaststroke glide efficiency"],
    weaknesses: ["Fatigue accumulate during multiple events on same day", "Sprint start block reaction time"],
    injuryRisk: 15,
    careerPeakYear: 2028,
    retirementRisk: 5,
    winningProbability: {
      gold: 85,
      silver: 10,
      bronze: 4
    }
  },
  {
    id: "noah_lyles",
    name: "Noah Lyles",
    countryId: "USA",
    sport: "Athletics",
    discipline: "100m / 200m Sprint",
    age: 28,
    height: 180,
    weight: 70,
    rank: 1,
    imageUrl: "/images/athletes/lyles.jpg",
    historicalPerformance: [
      { competition: "Tokyo Olympics", year: 2020, result: "Bronze Medal (200m)" },
      { competition: "Budapest World Champ", year: 2023, result: "3x Gold (100m, 200m, 4x100m)" },
      { competition: "Paris Olympics", year: 2024, result: "Gold Medal (100m), Bronze Medal (200m)" }
    ],
    biomechanics: {
      reactionTimeMs: 140,
      peakVelocityMs: 12.1, // Running speed in m/s (~43.6 km/h)
      enduranceIndex: 72,
      movementEfficiency: 94,
      forceOutputNewtons: 1100,
      jointAnglesDeg: {
        "Hip Extension": 160,
        "Knee Flexion (Recovery)": 45,
        "Ankle Dorsiflexion": 15
      }
    },
    strengths: ["Unrivaled speed endurance in top speed phase", "Elite stride frequency (4.9 Hz)", "High velocity biomechanics retention"],
    weaknesses: ["Starting block reaction time and drive phase acceleration", "Asthma management under low temperatures"],
    injuryRisk: 22,
    careerPeakYear: 2026,
    retirementRisk: 20,
    winningProbability: {
      gold: 60,
      silver: 25,
      bronze: 10
    }
  },
  {
    id: "faith_kipyegon",
    name: "Faith Kipyegon",
    countryId: "KEN",
    sport: "Athletics",
    discipline: "1500m / 5000m",
    age: 32,
    height: 157,
    weight: 42,
    rank: 1,
    imageUrl: "/images/athletes/kipyegon.jpg",
    historicalPerformance: [
      { competition: "Rio Olympics", year: 2016, result: "Gold Medal (1500m)" },
      { competition: "Tokyo Olympics", year: 2020, result: "Gold Medal (1500m)" },
      { competition: "Budapest World Champ", year: 2023, result: "2x Gold (1500m & 5000m)" },
      { competition: "Paris Olympics", year: 2024, result: "Gold Medal (1500m), Silver Medal (5000m)" }
    ],
    biomechanics: {
      reactionTimeMs: 190,
      peakVelocityMs: 7.2, // ~26 km/h kick speed
      enduranceIndex: 99,
      movementEfficiency: 98,
      forceOutputNewtons: 420,
      jointAnglesDeg: {
        "Hip Extension": 155,
        "Knee Extension": 172,
        "Ankle Range": 35
      }
    },
    strengths: ["World-class anaerobic kick at the end of tactical races", "Extremely low VO2-max oxygen cost (running economy)", "High altitude biological adaptations"],
    weaknesses: ["Tactical box risk in slow, crowded fields"],
    injuryRisk: 18,
    careerPeakYear: 2024,
    retirementRisk: 45,
    winningProbability: {
      gold: 80,
      silver: 15,
      bronze: 4
    }
  },
  {
    id: "manu_bhaker",
    name: "Manu Bhaker",
    countryId: "IND",
    sport: "Shooting",
    discipline: "10m Air Pistol / 25m Pistol",
    age: 24,
    height: 162,
    weight: 62,
    rank: 3,
    imageUrl: "/images/athletes/manu.jpg",
    historicalPerformance: [
      { competition: "Tokyo Olympics", year: 2020, result: "No Medal (Equipment failure)" },
      { competition: "Baku World Championships", year: 2023, result: "Gold Medal (Team)" },
      { competition: "Paris Olympics", year: 2024, result: "2x Bronze Medal (Individual & Mixed Team)" }
    ],
    biomechanics: {
      reactionTimeMs: 125, // reaction time to shot window
      enduranceIndex: 85, // mental concentration endurance
      movementEfficiency: 98, // posture micro-stability
      jointAnglesDeg: {
        "Shoulder Joint angle": 90,
        "Wrist locking angle": 180,
        "Elbow locking angle": 180
      }
    },
    strengths: ["Exceptional postural micro-stability during trigger release", "Extremely low resting heart rate (48 bpm) under pressure", "Rapid recovery from stray bad shots"],
    weaknesses: ["High heart rate spike during first-shot transition", "Precision variance in humid conditions"],
    injuryRisk: 10,
    careerPeakYear: 2030,
    retirementRisk: 5,
    winningProbability: {
      gold: 45,
      silver: 30,
      bronze: 15
    }
  }
];
