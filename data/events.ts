export interface OlympicRecord {
  id: string;
  sport: string;
  discipline: string;
  athleteName: string;
  countryId: string;
  recordValue: string;
  recordType: "Olympic Record" | "World Record";
  yearSet: number;
  location: string;
}

export interface LiveEvent {
  id: string;
  sport: string;
  discipline: string;
  phase: string; // e.g. Final, Semifinal, Qualification
  status: "live" | "scheduled" | "completed";
  startTime: string; // UTC or Relative
  participants: {
    athleteId: string;
    athleteName: string;
    countryId: string;
    currentScore?: string;
    rank?: number;
    status?: string;
  }[];
}

export const recordsVaultData: OlympicRecord[] = [
  {
    id: "rec_1",
    sport: "Athletics",
    discipline: "100m Sprint (Men)",
    athleteName: "Usain Bolt",
    countryId: "JAM",
    recordValue: "9.63s",
    recordType: "Olympic Record",
    yearSet: 2012,
    location: "London"
  },
  {
    id: "rec_2",
    sport: "Athletics",
    discipline: "100m Sprint (Men)",
    athleteName: "Usain Bolt",
    countryId: "JAM",
    recordValue: "9.58s",
    recordType: "World Record",
    yearSet: 2009,
    location: "Berlin"
  },
  {
    id: "rec_3",
    sport: "Swimming",
    discipline: "400m Individual Medley (Men)",
    athleteName: "Leon Marchand",
    countryId: "FRA",
    recordValue: "4:02.50",
    recordType: "Olympic Record",
    yearSet: 2024,
    location: "Paris"
  },
  {
    id: "rec_4",
    sport: "Swimming",
    discipline: "400m Individual Medley (Men)",
    athleteName: "Leon Marchand",
    countryId: "FRA",
    recordValue: "4:02.50",
    recordType: "World Record",
    yearSet: 2024,
    location: "Paris"
  },
  {
    id: "rec_5",
    sport: "Athletics",
    discipline: "Javelin Throw (Men)",
    athleteName: "Andreas Thorkildsen",
    countryId: "NOR",
    recordValue: "90.57m",
    recordType: "Olympic Record",
    yearSet: 2008,
    location: "Beijing"
  },
  {
    id: "rec_6",
    sport: "Athletics",
    discipline: "Javelin Throw (Men)",
    athleteName: "Jan Zelezny",
    countryId: "CZE",
    recordValue: "98.48m",
    recordType: "World Record",
    yearSet: 1996,
    location: "Jena"
  },
  {
    id: "rec_7",
    sport: "Athletics",
    discipline: "1500m (Women)",
    athleteName: "Faith Kipyegon",
    countryId: "KEN",
    recordValue: "3:49.04",
    recordType: "World Record",
    yearSet: 2024,
    location: "Paris"
  }
];

export const liveEventsData: LiveEvent[] = [
  {
    id: "live_javelin_final",
    sport: "Athletics",
    discipline: "Javelin Throw (Men's Final)",
    phase: "Final - Attempt 4/6",
    status: "live",
    startTime: "10:15 UTC",
    participants: [
      { athleteId: "neeraj_chopra", athleteName: "Neeraj Chopra", countryId: "IND", currentScore: "89.94m", rank: 1, status: "Active" },
      { athleteId: "julian_weber", athleteName: "Julian Weber", countryId: "GER", currentScore: "87.40m", rank: 3, status: "Active" },
      { athleteId: "arshad_nadeem", athleteName: "Arshad Nadeem", countryId: "PAK", currentScore: "88.75m", rank: 2, status: "Active" }
    ]
  },
  {
    id: "live_100m_final",
    sport: "Athletics",
    discipline: "100m Sprint (Men's Final)",
    phase: "Final",
    status: "scheduled",
    startTime: "18:45 UTC",
    participants: [
      { athleteId: "noah_lyles", athleteName: "Noah Lyles", countryId: "USA", rank: 1 },
      { athleteId: "kishane_thompson", athleteName: "Kishane Thompson", countryId: "JAM", rank: 2 },
      { athleteId: "letsile_tebogo", athleteName: "Letsile Tebogo", countryId: "BOT", rank: 3 }
    ]
  },
  {
    id: "live_400m_im",
    sport: "Swimming",
    discipline: "400m Individual Medley (Men)",
    phase: "Final",
    status: "completed",
    startTime: "Yesterday",
    participants: [
      { athleteId: "leon_marchand", athleteName: "Leon Marchand", countryId: "FRA", currentScore: "4:02.50", rank: 1, status: "Gold Medal (OR)" },
      { athleteId: "carson_foster", athleteName: "Carson Foster", countryId: "USA", currentScore: "4:08.66", rank: 2, status: "Silver Medal" },
      { athleteId: "max_litchfield", athleteName: "Max Litchfield", countryId: "GBR", currentScore: "4:08.85", rank: 3, status: "Bronze Medal" }
    ]
  }
];
