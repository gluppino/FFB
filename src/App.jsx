import { useState, useEffect, useMemo, useCallback } from "react";

const POS_COLORS = {
  QB: "#F5A623",
  RB: "#3DDC84",
  WR: "#4EA1FF",
  TE: "#C77DFF",
  DST: "#FF6B6B",
  K: "#9AA5B1",
};

const RAW = [
  ["Jahmyr Gibbs", "RB", "DET"], ["Bijan Robinson", "RB", "ATL"], ["Jonathan Taylor", "RB", "IND"],
  ["Christian McCaffrey", "RB", "SF"], ["Ja'Marr Chase", "WR", "CIN"], ["Ashton Jeanty", "RB", "LV"],
  ["Saquon Barkley", "RB", "PHI"], ["CeeDee Lamb", "WR", "DAL"], ["De'Von Achane", "RB", "MIA"],
  ["Justin Jefferson", "WR", "MIN"], ["Derrick Henry", "RB", "BAL"], ["Amon-Ra St. Brown", "WR", "DET"],
  ["Josh Jacobs", "RB", "GB"], ["Puka Nacua", "WR", "LAR"], ["Malik Nabers", "WR", "NYG"],
  ["Bucky Irving", "RB", "TB"], ["Nico Collins", "WR", "HOU"], ["Kyren Williams", "RB", "LAR"],
  ["Brian Thomas Jr", "WR", "JAX"], ["James Cook", "RB", "BUF"], ["A.J. Brown", "WR", "PHI"],
  ["Chase Brown", "RB", "CIN"], ["Drake London", "WR", "ATL"], ["Omarion Hampton", "RB", "LAC"],
  ["Ladd McConkey", "WR", "LAC"], ["Breece Hall", "RB", "NYJ"], ["Marvin Harrison Jr", "WR", "ARI"],
  ["Kenneth Walker III", "RB", "SEA"], ["Tee Higgins", "WR", "CIN"], ["TreVeyon Henderson", "RB", "NE"],
  ["DK Metcalf", "WR", "PIT"], ["Alvin Kamara", "RB", "NO"], ["Garrett Wilson", "WR", "NYJ"],
  ["Josh Allen", "QB", "BUF"], ["Terry McLaurin", "WR", "WAS"], ["Joe Mixon", "RB", "HOU"],
  ["Davante Adams", "WR", "LAR"], ["James Conner", "RB", "ARI"], ["Mike Evans", "WR", "TB"],
  ["Lamar Jackson", "QB", "BAL"], ["Rhamondre Stevenson", "RB", "NE"], ["Xavier Worthy", "WR", "KC"],
  ["Tony Pollard", "RB", "TEN"], ["Rome Odunze", "WR", "CHI"], ["Aaron Jones", "RB", "MIN"],
  ["Jaxon Smith-Njigba", "WR", "SEA"], ["Jayden Daniels", "QB", "WAS"], ["Chuba Hubbard", "RB", "CAR"],
  ["Zay Flowers", "WR", "BAL"], ["Javonte Williams", "RB", "DAL"], ["Brock Bowers", "TE", "LV"],
  ["DJ Moore", "WR", "CHI"], ["D'Andre Swift", "RB", "CHI"], ["Chris Olave", "WR", "NO"],
  ["Joe Burrow", "QB", "CIN"], ["Tyrone Tracy Jr", "RB", "NYG"], ["Jameson Williams", "WR", "DET"],
  ["Rachaad White", "RB", "TB"], ["Courtland Sutton", "WR", "DEN"], ["Patrick Mahomes", "QB", "KC"],
  ["Isiah Pacheco", "RB", "KC"], ["Jerry Jeudy", "WR", "CLE"], ["J.K. Dobbins", "RB", "DEN"],
  ["Jordan Addison", "WR", "MIN"], ["Trey McBride", "TE", "ARI"], ["Zach Charbonnet", "RB", "SEA"],
  ["Tyreek Hill", "WR", "MIA"], ["Brian Robinson Jr", "RB", "WAS"], ["Calvin Ridley", "WR", "TEN"],
  ["Jalen Hurts", "QB", "PHI"], ["Najee Harris", "RB", "LAC"], ["Deebo Samuel", "WR", "WAS"],
  ["Austin Ekeler", "RB", "WAS"], ["George Pickens", "WR", "DAL"], ["Ray Davis", "RB", "BUF"],
  ["Keon Coleman", "WR", "BUF"], ["Baker Mayfield", "QB", "TB"], ["Jaylen Warren", "RB", "PIT"],
  ["Brandon Aiyuk", "WR", "SF"], ["Tyjae Spears", "RB", "TEN"], ["Cooper Kupp", "WR", "SEA"],
  ["David Montgomery", "RB", "DET"], ["Christian Kirk", "WR", "HOU"], ["Bo Nix", "QB", "DEN"],
  ["Braelon Allen", "RB", "NYJ"], ["Jauan Jennings", "WR", "SF"], ["Jerome Ford", "RB", "CLE"],
  ["Josh Downs", "WR", "IND"], ["George Kittle", "TE", "SF"], ["Rashee Rice", "WR", "KC"],
  ["Kyler Murray", "QB", "ARI"], ["Khalil Shakir", "WR", "BUF"], ["Justin Herbert", "QB", "LAC"],
  ["Ricky Pearsall", "WR", "SF"], ["Sam LaPorta", "TE", "DET"], ["Tetairoa McMillan", "WR", "CAR"],
  ["Jordan Love", "QB", "GB"], ["Emeka Egbuka", "WR", "TB"], ["Brock Purdy", "QB", "SF"],
  ["Travis Hunter", "WR", "JAX"], ["Mark Andrews", "TE", "BAL"], ["Wan'Dale Robinson", "WR", "NYG"],
  ["Dak Prescott", "QB", "DAL"], ["Michael Pittman Jr", "WR", "IND"], ["T.J. Hockenson", "TE", "MIN"],
  ["C.J. Stroud", "QB", "HOU"], ["Jakobi Meyers", "WR", "LV"], ["Caleb Williams", "QB", "CHI"],
  ["Diontae Johnson", "WR", "HOU"], ["Evan Engram", "TE", "DEN"], ["Trevor Lawrence", "QB", "JAX"],
  ["Amari Cooper", "WR", "LV"], ["David Njoku", "TE", "CLE"], ["Matthew Stafford", "QB", "LAR"],
  ["Adam Thielen", "WR", "CAR"], ["Dalton Kincaid", "TE", "BUF"], ["Drake Maye", "QB", "NE"],
  ["Darnell Mooney", "WR", "ATL"], ["Kyle Pitts", "TE", "ATL"], ["Jared Goff", "QB", "DET"],
  ["Jonnu Smith", "TE", "PIT"], ["Sam Darnold", "QB", "SEA"], ["Tucker Kraft", "TE", "GB"],
  ["Geno Smith", "QB", "LV"], ["Colston Loveland", "TE", "CHI"], ["Anthony Richardson", "QB", "IND"],
  ["Isaiah Likely", "TE", "BAL"], ["Cade Otton", "TE", "TB"], ["Dallas Goedert", "TE", "PHI"],
  ["Broncos D/ST", "DST", "DEN"], ["Steelers D/ST", "DST", "PIT"], ["Eagles D/ST", "DST", "PHI"],
  ["Vikings D/ST", "DST", "MIN"], ["Ravens D/ST", "DST", "BAL"], ["Texans D/ST", "DST", "HOU"],
  ["Packers D/ST", "DST", "GB"], ["Lions D/ST", "DST", "DET"], ["Chiefs D/ST", "DST", "KC"],
  ["49ers D/ST", "DST", "SF"], ["Jets D/ST", "DST", "NYJ"], ["Bills D/ST", "DST", "BUF"],
  ["Brandon Aubrey", "K", "DAL"], ["Chris Boswell", "K", "PIT"], ["Jake Bates", "K", "DET"],
  ["Cameron Dicker", "K", "LAC"], ["Tyler Bass", "K", "BUF"], ["Harrison Butker", "K", "KC"],
  ["Jason Sanders", "K", "MIA"], ["Younghoe Koo", "K", "ATL"], ["Ka'imi Fairbairn", "K", "HOU"],
  ["Wil Lutz", "K", "DEN"], ["Chase McLaughlin", "K", "TB"],
];

const SEED_PLAYERS = RAW.map((r, i) => ({ id: `p${i + 1}`, name: r[0], pos: r[1], nfl: r[2], rank: i + 1 }));

const GAMES = 17;

function bigPlayBonus(tds) {
  return tds * 0.16 * 1 + tds * 0.07 * 2;
}
function probOver(avgPerGame, threshold) {
  if (avgPerGame <= 0) return 0;
  const r = avgPerGame / threshold;
  const x = (r - 1) / 0.35;
  return 1 / (1 + Math.exp(-4 * x));
}
function yardageGameBonus(totalYards, tiers) {
  const avg = totalYards / GAMES;
  let bonus = 0;
  tiers.forEach((t) => {
    const pAbove = probOver(avg, t.min);
    const pAboveNext = t.max ? probOver(avg, t.max + 1) : 0;
    bonus += (pAbove - pAboveNext) * t.val * GAMES;
  });
  return bonus;
}

function calcOffensePoints(s) {
  let pts = 0;
  pts += (s.passYd || 0) * 0.05;
  pts += (s.passTD || 0) * 6 + bigPlayBonus(s.passTD || 0);
  pts += (s.int || 0) * -2;
  pts += yardageGameBonus(s.passYd || 0, [{ min: 300, max: 399, val: 5 }, { min: 400, max: null, val: 6 }]);
  pts += (s.rushYd || 0) * 0.1;
  pts += (s.rushTD || 0) * 6 + bigPlayBonus(s.rushTD || 0);
  pts += yardageGameBonus(s.rushYd || 0, [{ min: 100, max: 199, val: 5 }, { min: 200, max: null, val: 6 }]);
  pts += (s.recYd || 0) * 0.1;
  pts += (s.rec || 0) * 1;
  pts += (s.recTD || 0) * 6 + bigPlayBonus(s.recTD || 0);
  pts += yardageGameBonus(s.recYd || 0, [{ min: 100, max: 199, val: 5 }, { min: 200, max: null, val: 6 }]);
  pts += (s.fuml || 0) * -2;
  return pts;
}

function calcKickerPoints(s) {
  return (s.patMade || 0) * 1 + (s.patMiss || 0) * -2 + (s.fg0 || 0) * 3 + (s.fg40 || 0) * 4
    + (s.fgMiss0 || 0) * -3 + (s.fg50 || 0) * 5 + (s.fg60 || 0) * 6;
}

function calcDstPoints(t) {
  return t.sk * 2 + t.int * 2 + t.fr * 2 + t.sf * 2 + (t.blkk || 0) * 2 + (t.ret || 0) * 6
    + t.paPtsPerGame * GAMES + t.yaPtsPerGame * GAMES;
}

const RB_WR_STATS = {
  "Jahmyr Gibbs": [1350,13,55,480,3,3], "Bijan Robinson": [1400,14,50,430,3,3], "Jonathan Taylor": [1450,15,25,180,1,2],
  "Christian McCaffrey": [1100,10,65,520,3,3], "Ashton Jeanty": [1250,10,40,300,2,3], "Saquon Barkley": [1350,12,35,260,1,3],
  "De'Von Achane": [950,8,55,480,3,2], "Derrick Henry": [1300,13,15,100,0,2], "Josh Jacobs": [1200,11,30,220,1,2],
  "Bucky Irving": [1100,7,45,350,2,2], "Kyren Williams": [1150,10,35,240,1,2], "James Cook": [1150,9,35,260,1,2],
  "Chase Brown": [1050,7,35,270,1,2], "Omarion Hampton": [1000,7,30,220,1,2], "Breece Hall": [950,6,50,400,2,2],
  "Kenneth Walker III": [950,7,30,220,1,2], "TreVeyon Henderson": [800,6,35,280,2,2], "Alvin Kamara": [850,6,55,430,2,2],
  "Joe Mixon": [900,7,30,210,1,2], "James Conner": [950,8,25,180,1,2], "Rhamondre Stevenson": [800,5,35,250,1,2],
  "Tony Pollard": [850,5,30,220,1,2], "Aaron Jones": [800,5,30,220,1,2], "Chuba Hubbard": [850,6,25,180,1,2],
  "Javonte Williams": [750,5,30,220,1,2], "D'Andre Swift": [800,5,35,250,1,2], "Tyrone Tracy Jr": [750,4,30,220,1,1],
  "Rachaad White": [700,5,40,280,1,2], "Isiah Pacheco": [750,6,20,140,1,2], "J.K. Dobbins": [700,5,25,180,1,2],
  "Zach Charbonnet": [650,5,25,180,1,1], "Brian Robinson Jr": [750,7,15,100,0,1], "Najee Harris": [800,6,25,170,1,2],
  "Austin Ekeler": [500,4,45,350,2,2], "Ray Davis": [600,5,20,140,1,1], "Jaylen Warren": [550,3,30,210,1,1],
  "Tyjae Spears": [500,4,30,220,1,1], "David Montgomery": [700,6,20,140,1,1], "Braelon Allen": [550,5,15,90,0,1],
  "Jerome Ford": [500,3,25,180,1,1],
  "Ja'Marr Chase": [30,0,105,1400,10,1], "CeeDee Lamb": [20,0,100,1350,8,1], "Justin Jefferson": [15,0,100,1350,9,1],
  "Amon-Ra St. Brown": [10,0,105,1250,8,1], "Puka Nacua": [20,0,95,1300,7,1], "Malik Nabers": [15,0,95,1250,7,1],
  "Nico Collins": [5,0,85,1200,8,1], "Brian Thomas Jr": [10,0,80,1150,8,1], "A.J. Brown": [5,0,80,1150,7,1],
  "Drake London": [10,0,85,1100,6,1], "Ladd McConkey": [5,0,80,1050,6,1], "Marvin Harrison Jr": [5,0,75,1050,6,1],
  "Tee Higgins": [5,0,70,1000,7,1], "DK Metcalf": [5,0,70,1000,6,1], "Garrett Wilson": [10,0,80,1050,5,1],
  "Terry McLaurin": [5,0,70,950,6,1], "Davante Adams": [5,0,75,1000,6,1], "Mike Evans": [0,0,70,1000,7,1],
  "Xavier Worthy": [10,0,65,900,6,1], "Rome Odunze": [5,0,70,950,5,1], "Jaxon Smith-Njigba": [5,0,75,1000,5,1],
  "Zay Flowers": [20,0,70,900,4,1], "DJ Moore": [5,0,65,900,5,1], "Chris Olave": [5,0,65,850,5,1],
  "Jameson Williams": [10,0,60,900,6,1], "Courtland Sutton": [0,0,60,800,5,1], "Jerry Jeudy": [5,0,60,800,4,1],
  "Jordan Addison": [5,0,55,750,5,1], "Tyreek Hill": [10,0,65,850,5,1], "Calvin Ridley": [0,0,55,750,4,1],
  "Deebo Samuel": [80,1,55,650,3,1], "George Pickens": [5,0,55,800,5,1], "Keon Coleman": [5,0,50,700,4,1],
  "Brandon Aiyuk": [0,0,55,750,4,1], "Cooper Kupp": [0,0,60,750,4,1], "Christian Kirk": [5,0,55,700,3,1],
  "Jauan Jennings": [0,0,50,650,4,1], "Josh Downs": [5,0,60,700,3,1], "Rashee Rice": [5,0,60,750,4,1],
  "Khalil Shakir": [0,0,55,650,3,1], "Ricky Pearsall": [5,0,50,650,4,1], "Tetairoa McMillan": [0,0,55,700,4,1],
  "Emeka Egbuka": [0,0,55,700,4,1], "Travis Hunter": [0,0,60,750,4,1], "Wan'Dale Robinson": [5,0,55,600,2,1],
  "Michael Pittman Jr": [0,0,55,700,3,1], "Jakobi Meyers": [0,0,60,650,3,1], "Diontae Johnson": [0,0,55,650,3,1],
  "Amari Cooper": [0,0,45,600,3,1], "Adam Thielen": [0,0,50,600,3,1], "Darnell Mooney": [0,0,45,600,3,1],
};
const QB_STATS = {
  "Josh Allen": [4000,32,10,650,7,3], "Lamar Jackson": [3600,28,7,850,6,3], "Jayden Daniels": [3700,26,8,700,5,3],
  "Joe Burrow": [4300,34,9,150,2,2], "Patrick Mahomes": [4100,30,10,300,3,2], "Jalen Hurts": [3400,20,7,600,8,3],
  "Baker Mayfield": [3900,26,10,250,2,2], "Bo Nix": [3700,24,10,350,3,2], "Kyler Murray": [3500,22,8,500,4,2],
  "Justin Herbert": [3900,26,9,200,2,2], "Jordan Love": [3700,25,10,250,2,2], "Brock Purdy": [3600,24,9,150,1,2],
  "Dak Prescott": [3800,26,9,150,1,2], "C.J. Stroud": [3800,24,10,150,1,2], "Caleb Williams": [3600,22,10,350,3,2],
  "Trevor Lawrence": [3600,22,10,200,2,2], "Matthew Stafford": [3700,25,9,60,1,2], "Drake Maye": [3500,20,10,350,3,2],
  "Jared Goff": [3900,26,9,50,1,2], "Sam Darnold": [3400,20,11,200,2,2], "Geno Smith": [3500,20,10,150,1,2],
  "Anthony Richardson": [2800,16,12,550,6,4],
};
const TE_STATS = {
  "Brock Bowers": [90,1050,6,1], "Trey McBride": [85,1000,6,1], "George Kittle": [65,850,6,1], "Sam LaPorta": [70,800,5,1],
  "Mark Andrews": [65,750,6,1], "T.J. Hockenson": [65,700,4,1], "Evan Engram": [65,650,3,1], "David Njoku": [55,650,4,1],
  "Dalton Kincaid": [55,600,3,1], "Kyle Pitts": [50,600,3,1], "Jonnu Smith": [50,550,3,1], "Tucker Kraft": [45,500,3,1],
  "Colston Loveland": [45,500,3,1], "Isaiah Likely": [40,450,3,1], "Cade Otton": [40,420,2,1], "Dallas Goedert": [45,480,3,1],
};
const FALLBACK_STATS = {
  QB: { passYd: 3200, passTD: 18, int: 11, rushYd: 150, rushTD: 1, fuml: 2 },
  RB: { rushYd: 500, rushTD: 3, rec: 20, recYd: 150, recTD: 1, fuml: 1 },
  WR: { rec: 35, recYd: 450, recTD: 2, fuml: 1 },
  TE: { rec: 30, recYd: 350, recTD: 2, fuml: 1 },
};
const K_BASE = { patMade: 33, patMiss: 1, fg0: 14, fg40: 8, fgMiss0: 1, fg50: 4, fg60: 1 };
const DST_TIERS = {
  elite: { sk: 45, int: 13, fr: 10, sf: 1, blkk: 2, ret: 0.4, paPtsPerGame: 2, yaPtsPerGame: 2 },
  good: { sk: 42, int: 12, fr: 9, sf: 0.8, blkk: 1.5, ret: 0.3, paPtsPerGame: 1, yaPtsPerGame: 1 },
  avg: { sk: 38, int: 11, fr: 8, sf: 0.6, blkk: 1, ret: 0.2, paPtsPerGame: 0, yaPtsPerGame: 0 },
  below: { sk: 34, int: 9, fr: 7, sf: 0.5, blkk: 1, ret: 0.2, paPtsPerGame: -1, yaPtsPerGame: -1 },
};
const DST_TIER_LOOKUP = {
  "Broncos D/ST": "elite", "Steelers D/ST": "elite", "Eagles D/ST": "elite",
  "Vikings D/ST": "good", "Ravens D/ST": "good", "Texans D/ST": "good", "Packers D/ST": "good",
  "Lions D/ST": "avg", "Chiefs D/ST": "avg", "49ers D/ST": "avg",
  "Jets D/ST": "below", "Bills D/ST": "avg",
};

function getOffenseStats(p) {
  if (p.pos === "QB") {
    const t = QB_STATS[p.name];
    if (t) return { passYd: t[0], passTD: t[1], int: t[2], rushYd: t[3], rushTD: t[4], fuml: t[5] };
    return FALLBACK_STATS.QB;
  }
  if (p.pos === "TE") {
    const t = TE_STATS[p.name];
    if (t) return { rec: t[0], recYd: t[1], recTD: t[2], fuml: t[3] };
    return FALLBACK_STATS.TE;
  }
  if (p.pos === "RB" || p.pos === "WR") {
    const t = RB_WR_STATS[p.name];
    if (t) return { rushYd: t[0], rushTD: t[1], rec: t[2], recYd: t[3], recTD: t[4], fuml: t[5] };
    return FALLBACK_STATS[p.pos];
  }
  return null;
}

function getProjPoints(p) {
  if (p.pos === "QB" || p.pos === "RB" || p.pos === "WR" || p.pos === "TE") {
    return calcOffensePoints(getOffenseStats(p));
  }
  if (p.pos === "K") {
    const idxAdj = Math.max(0, (p.rank || 0) - 142) * 0.3;
    return calcKickerPoints(K_BASE) - idxAdj;
  }
  if (p.pos === "DST") {
    const tierName = DST_TIER_LOOKUP[p.name] || "avg";
    return calcDstPoints(DST_TIERS[tierName]);
  }
  return 0;
}

const STARTER_SLOTS = ["QB", "RB1", "RB2", "WR1", "WR2", "TE", "FLEX", "DST", "K"];
const SLOT_ACCEPT = {
  QB: ["QB"], RB1: ["RB"], RB2: ["RB"], WR1: ["WR"], WR2: ["WR"],
  TE: ["TE"], FLEX: ["RB", "WR", "TE"], DST: ["DST"], K: ["K"],
};
const SLOT_LABEL = { RB1: "RB", RB2: "RB", WR1: "WR", WR2: "WR" };

function assignSlots(playerList) {
  const slots = { QB: null, RB1: null, RB2: null, WR1: null, WR2: null, TE: null, FLEX: null, DST: null, K: null };
  const bench = [];
  for (const p of playerList) {
    if (p.pos === "QB") { if (!slots.QB) slots.QB = p; else bench.push(p); }
    else if (p.pos === "RB") { if (!slots.RB1) slots.RB1 = p; else if (!slots.RB2) slots.RB2 = p; else if (!slots.FLEX) slots.FLEX = p; else bench.push(p); }
    else if (p.pos === "WR") { if (!slots.WR1) slots.WR1 = p; else if (!slots.WR2) slots.WR2 = p; else if (!slots.FLEX) slots.FLEX = p; else bench.push(p); }
    else if (p.pos === "TE") { if (!slots.TE) slots.TE = p; else if (!slots.FLEX) slots.FLEX = p; else bench.push(p); }
    else if (p.pos === "DST") { if (!slots.DST) slots.DST = p; else bench.push(p); }
    else if (p.pos === "K") { if (!slots.K) slots.K = p; else bench.push(p); }
    else bench.push(p);
  }
  return { slots, bench };
}

const STORAGE_KEY = "nfl-draft-assistant-state";
const INJURY_STATUS_ORDER = ["Out", "Doubtful", "Questionable", "Limited", "Probable", "Active", "Healthy"];

function normalizePlayerName(raw) {
  return [raw.first_name, raw.last_name].filter(Boolean).join(" ").trim();
}

function normalisePos(pos) {
  if (pos === "DEF") return "DST";
  if (pos === "PK") return "K";
  return pos || "RB";
}

function getPlayerInjuryState(player) {
  const injuryStatus = (player?.injuryStatus || player?.status || "").trim();
  const injuryBodyPart = (player?.injuryBodyPart || "").trim();
  const safetyStatus = (player?.status || "").trim();

  if (injuryStatus && !["Active", "Healthy", "None"].includes(injuryStatus)) {
    return {
      flagged: true,
      label: injuryStatus,
      bodyPart: injuryBodyPart || "Update pending",
      priority: INJURY_STATUS_ORDER.indexOf(injuryStatus) >= 0 ? INJURY_STATUS_ORDER.indexOf(injuryStatus) : 99,
    };
  }

  if (safetyStatus && ["Out", "Doubtful", "Questionable", "Limited", "Inactive", "IR", "Injured Reserve"].includes(safetyStatus)) {
    return {
      flagged: true,
      label: safetyStatus,
      bodyPart: injuryBodyPart || "Monitor",
      priority: INJURY_STATUS_ORDER.indexOf(safetyStatus) >= 0 ? INJURY_STATUS_ORDER.indexOf(safetyStatus) : 99,
    };
  }

  return { flagged: false, label: "Healthy", bodyPart: "", priority: 999 };
}

if (!window.storage) {
  window.storage = {
    async get(key) {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return true;
    },
  };
}

async function loadPlayersFromSleeper() {
  try {
    const response = await fetch("https://api.sleeper.app/v1/players/nfl");
    if (!response.ok) throw new Error("Sleeper API failed");
    const playerMap = await response.json();

    const sleeperPlayers = Object.values(playerMap)
      .filter((p) => p && p.position && ["QB", "RB", "WR", "TE", "K", "DEF"].includes(p.position))
      .map((p, i) => ({
        id: String(p.player_id ?? `s-${i}`),
        name: normalizePlayerName(p),
        pos: normalisePos(p.position),
        nfl: p.team || "FA",
        rank: i + 1,
        status: p.status || "Active",
        injuryStatus: p.injury_status || null,
        injuryBodyPart: p.injury_body_part || null,
        injuryNotes: p.injury_notes || null,
        active: p.active ?? true,
      }));

    const dstFromSeed = SEED_PLAYERS.filter((p) => p.pos === "DST");
    const allPlayers = [...sleeperPlayers, ...dstFromSeed].sort((a, b) => a.rank - b.rank);

    return { players: allPlayers, updatedAt: new Date().toISOString() };
  } catch (e) {
    console.warn("Failed to load from Sleeper API, using seed data:", e.message);
    return { players: SEED_PLAYERS, updatedAt: new Date().toISOString() };
  }
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState("setup");
  const [teams, setTeams] = useState(Array.from({ length: 12 }, (_, i) => ({ name: `Team ${i + 1}` })));
  const [myTeamIndex, setMyTeamIndex] = useState(0);
  const [benchCount, setBenchCount] = useState(6);
  const [keepers, setKeepers] = useState(Array.from({ length: 12 }, () => ({ enabled: false, playerId: null, round: 3 })));
  const [players, setPlayers] = useState(SEED_PLAYERS);
  const [pickResults, setPickResults] = useState([]);
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [sortMode, setSortMode] = useState("value");
  const [keeperSearchMap, setKeeperSearchMap] = useState({});
  const [customName, setCustomName] = useState("");
  const [customPos, setCustomPos] = useState("RB");
  const [customTeam, setCustomTeam] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { players: apiPlayers, updatedAt } = await loadPlayersFromSleeper();
        if (!cancelled) {
          setPlayers(apiPlayers);
          setLastUpdated(updatedAt);
        }

        const res = await window.storage.get(STORAGE_KEY);
        if (res && res.value && !cancelled) {
          const data = JSON.parse(res.value);
          if (data.phase) setPhase(data.phase);
          if (data.teams) setTeams(data.teams);
          if (typeof data.myTeamIndex === "number") setMyTeamIndex(data.myTeamIndex);
          if (data.benchCount != null) setBenchCount(data.benchCount);
          if (data.keepers) setKeepers(data.keepers);
          if (data.players) setPlayers(data.players);
          if (data.pickResults) setPickResults(data.pickResults);
          if (data.lastUpdated) setLastUpdated(data.lastUpdated);
        }
      } catch (e) {
        // nothing saved yet
      }
      if (!cancelled) setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, []);

  const saveState = useCallback((patch) => {
    const data = { phase, teams, myTeamIndex, benchCount, keepers, players, pickResults, lastUpdated, ...patch };
    try { window.storage.set(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }, [phase, teams, myTeamIndex, benchCount, keepers, players, pickResults, lastUpdated]);

  const totalRounds = STARTER_SLOTS.length + Number(benchCount || 0);
  const numTeams = teams.length;

  const pickSequence = useMemo(() => {
    const seq = [];
    let overall = 1;
    for (let r = 1; r <= totalRounds; r++) {
      const base = [...Array(numTeams).keys()];
      const order = r % 2 === 1 ? base : [...base].reverse();
      order.forEach((teamIndex, i) => { seq.push({ overall, round: r, pickInRound: i + 1, teamIndex }); overall++; });
    }
    return seq;
  }, [totalRounds, numTeams]);

  const resolveAuto = useCallback((arr) => {
    const next = [...arr];
    let changed = true;
    while (changed) {
      changed = false;
      const idx = next.findIndex((x) => x == null);
      if (idx === -1) break;
      const pk = pickSequence[idx];
      if (!pk) break;
      const k = keepers[pk.teamIndex];
      if (k && k.enabled && k.playerId && pk.round === k.round) {
        next[idx] = k.playerId;
        changed = true;
      }
    }
    return next;
  }, [pickSequence, keepers]);

  function startDraft() {
    const base = Array(pickSequence.length).fill(null);
    const resolved = resolveAuto(base);
    setPickResults(resolved);
    setPhase("draft");
    saveState({ phase: "draft", pickResults: resolved });
  }

  function assignPlayer(playerId) {
    const idx = pickResults.findIndex((x) => x == null);
    if (idx === -1) return;
    let next = [...pickResults];
    next[idx] = playerId;
    next = resolveAuto(next);
    setPickResults(next);
    saveState({ pickResults: next });
  }

  function undoLast() {
    let arr = [...pickResults];
    function lastFilled(a) { for (let i = a.length - 1; i >= 0; i--) if (a[i] != null) return i; return -1; }
    let li = lastFilled(arr);
    while (li !== -1) {
      const pk = pickSequence[li];
      const k = keepers[pk.teamIndex];
      const isAutoKeeper = k && k.enabled && k.playerId && pk.round === k.round && arr[li] === k.playerId;
      if (isAutoKeeper) { arr[li] = null; li = lastFilled(arr); } else break;
    }
    if (li !== -1) arr[li] = null;
    setPickResults(arr);
    saveState({ pickResults: arr });
  }

  function addCustomPlayer() {
    if (!customName.trim()) return;
    const maxRank = players.reduce((m, p) => Math.max(m, p.rank), 0);
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const next = [...players, { id, name: customName.trim(), pos: customPos, nfl: (customTeam.trim() || "FA").toUpperCase(), rank: maxRank + 1 }];
    setPlayers(next);
    saveState({ players: next });
    setCustomName(""); setCustomTeam("");
  }

  function updateKeeper(i, patch) {
    const next = keepers.map((k, idx) => (idx === i ? { ...k, ...patch } : k));
    setKeepers(next);
    saveState({ keepers: next });
  }

  function keeperMatchesFor(i) {
    const q = (keeperSearchMap[i] || "").toLowerCase().trim();
    if (!q) return [];
    const usedElsewhere = new Set(keepers.filter((k, idx) => idx !== i && k.enabled && k.playerId).map((k) => k.playerId));
    return players.filter((p) => p.name.toLowerCase().includes(q) && !usedElsewhere.has(p.id)).slice(0, 8);
  }

  const keepersIncomplete = keepers.some((k) => k.enabled && !k.playerId);

  function resetDraft() {
    setPhase("setup");
    setPickResults([]);
    saveState({ phase: "setup", pickResults: [] });
  }

  const playerById = useMemo(() => { const m = {}; players.forEach((p) => (m[p.id] = p)); return m; }, [players]);
  const injuredPlayers = useMemo(() => players.filter((p) => getPlayerInjuryState(p).flagged), [players]);
  const projPtsMap = useMemo(() => { const m = {}; players.forEach((p) => (m[p.id] = getProjPoints(p))); return m; }, [players]);
  const replacementLevel = useMemo(() => {
    const byPos = {};
    ["QB", "RB", "WR", "TE", "DST", "K"].forEach((pos) => { 
      const arr = players.filter((p) => p.pos === pos).map((p) => projPtsMap[p.id]).sort((a, b) => b - a);
      const rank = pos === "QB" ? numTeams : pos === "RB" || pos === "WR" ? Math.round(numTeams * 2.4) : pos === "TE" ? Math.round(numTeams * 1.2) : numTeams;
      const idx = Math.min(arr.length - 1, Math.max(0, rank - 1));
      byPos[pos] = arr.length ? arr[idx] : 0;
    });
    return byPos;
  }, [players, projPtsMap, numTeams]);
  const valueMap = useMemo(() => { const m = {}; players.forEach((p) => (m[p.id] = projPtsMap[p.id] - (replacementLevel[p.pos] || 0))); return m; }, [players, projPtsMap, replacementLevel]);
  const draftedIds = useMemo(() => new Set(pickResults.filter(Boolean)), [pickResults]);
  const availablePlayers = useMemo(() => {
    const list = players.filter((p) => !draftedIds.has(p.id));
    return list.sort((a, b) => {
      if (sortMode === "value") return valueMap[b.id] - valueMap[a.id];
      if (sortMode === "pts") return projPtsMap[b.id] - projPtsMap[a.id];
      return a.rank - b.rank;
    });
  }, [players, draftedIds, sortMode, projPtsMap, valueMap]);
  const currentPickIdx = pickResults.length ? pickResults.findIndex((x) => x == null) : 0;
  const currentPick = phase === "draft" && currentPickIdx !== -1 ? pickSequence[currentPickIdx] : null;
  const draftComplete = phase === "draft" && pickResults.length > 0 && currentPickIdx === -1;

  function teamPicks(teamIndex) {
    const list = [];
    pickSequence.forEach((pk, i) => {
      if (pk.teamIndex === teamIndex && pickResults[i] != null) {
        const p = playerById[pickResults[i]];
        if (p) list.push(p);
      }
    });
    return list;
  }

  const myRosterView = useMemo(() => assignSlots(teamPicks(myTeamIndex)), [pickResults, players, myTeamIndex]);

  const neededPositions = useMemo(() => {
    const needs = new Set();
    STARTER_SLOTS.forEach((slot) => { if (!myRosterView.slots[slot]) SLOT_ACCEPT[slot].forEach((pos) => needs.add(pos)); });
    return needs;
  }, [myRosterView]);

  const recommendations = useMemo(() => availablePlayers.slice(0, 8).map((p) => ({ ...p, isNeed: neededPositions.has(p.pos) })), [availablePlayers, neededPositions]);

  const filteredAvailable = useMemo(() => availablePlayers.filter((p) =>
    (posFilter === "ALL" || p.pos === posFilter) && p.name.toLowerCase().includes(search.toLowerCase())
  ), [availablePlayers, posFilter, search]);

  const bpaSuggestions = useMemo(() => availablePlayers.slice(0, 5), [availablePlayers]);

  const boardRows = useMemo(() => {
    const rows = [];
    for (let r = 1; r <= totalRounds; r++) {
      const cells = Array(numTeams).fill(undefined);
      pickSequence.forEach((pk, i) => { if (pk.round === r) cells[pk.teamIndex] = pickResults[i] != null ? playerById[pickResults[i]] : null; });
      rows.push({ round: r, cells });
    }
    return rows;
  }, [pickSequence, pickResults, playerById, totalRounds, numTeams]);

  function updateTeamName(i, name) {
    const next = teams.map((t, idx) => (idx === i ? { ...t, name } : t));
    setTeams(next);
  }

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; background: #0B0E14; }
        body { -webkit-text-size-adjust: 100%; }
        input, select, button { font: inherit; }
        .app { min-height: 100vh; background: #0B0E14; color: #E8ECF1; font-family: 'Inter', sans-serif; padding: 20px; }
        h1,h2,h3 { font-family: 'Space Grotesk', sans-serif; margin: 0; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .loading { padding: 60px; text-align: center; color: #7A8699; }
        .topbar { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
        .brand { font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
        .brand span { color: #3DDC84; }
        .sub { color: #7A8699; font-size: 13px; margin-top: 2px; }
        .card { background: #131822; border: 1px solid #232B3A; border-radius: 10px; padding: 18px; }
        .setup-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 16px; align-items: start; }
        @media (max-width: 900px) { .setup-grid { grid-template-columns: 1fr; } }
        .team-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; border-bottom: 1px solid #1B2130; }
        .team-row input[type=text] { flex: 1; background: #0F131C; border: 1px solid #2A3346; color: #E8ECF1; padding: 7px 9px; border-radius: 6px; font-size: 16px; }
        .team-row label { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #9BA6B7; white-space: nowrap; }
        .field { margin-bottom: 14px; }
        .field label { display: block; font-size: 12px; color: #9BA6B7; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        .field input[type=text], .field input[type=number] { width: 100%; background: #0F131C; border: 1px solid #2A3346; color: #E8ECF1; padding: 9px 10px; border-radius: 6px; font-size: 16px; }
        .row-inline { display: flex; gap: 10px; align-items: center; }
        button { cursor: pointer; font-family: 'Inter', sans-serif; }
        .btn-primary { background: #3DDC84; color: #0B0E14; border: none; padding: 11px 18px; border-radius: 7px; font-weight: 600; font-size: 14px; }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-ghost { background: transparent; border: 1px solid #2A3346; color: #C6CEDB; padding: 8px 14px; border-radius: 7px; font-size: 13px; }
        .btn-small { background: #1B2130; border: 1px solid #2A3346; color: #E8ECF1; padding: 5px 10px; border-radius: 5px; font-size: 12px; }
        .pos-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; color: #08090C; letter-spacing: 0.3px; }
        .keeper-box { margin-top: 10px; }
        .keeper-match { padding: 7px 9px; border-radius: 6px; background: #0F131C; margin-top: 4px; cursor: pointer; display: flex; justify-content: space-between; font-size: 13px; }
        .keeper-match:hover { background: #1B2130; }
        .keeper-selected { margin-top: 10px; padding: 10px; border-radius: 7px; background: #14231A; border: 1px solid #24422F; font-size: 13px; }
        .team-block { padding: 8px 0; border-bottom: 1px solid #1B2130; }
        .keeper-toggle { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #9BA6B7; margin: 6px 0 0 30px; }
        .keeper-inline { margin: 8px 0 4px 30px; background: #0F131C; border: 1px solid #1B2130; border-radius: 7px; padding: 10px; }
        .keeper-inline input[type=text] { width: 100%; background: #131822; border: 1px solid #2A3346; color: #E8ECF1; padding: 7px 9px; border-radius: 6px; font-size: 16px; margin-bottom: 4px; }
        .keeper-selected-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; gap: 10px; }
        .keeper-selected-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .keeper-placed-note { margin-top: 8px; font-size: 11px; color: #9BA6B7; }
        .keeper-round-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 12px; color: #9BA6B7; }
        .keeper-round-row input { width: 60px; background: #131822; border: 1px solid #2A3346; color: #E8ECF1; padding: 5px 7px; border-radius: 5px; font-size: 16px; }
        .bpa-strip { background: #131822; border: 1px solid #2A3346; border-radius: 10px; padding: 12px 16px; margin-bottom: 14px; }
        .bpa-list { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
        .bpa-chip { display: flex; align-items: center; gap: 6px; background: #0F131C; border: 1px solid #1B2130; border-radius: 20px; padding: 5px 6px 5px 10px; font-size: 12px; }
        .bpa-chip button { background: #3DDC84; color: #08090C; border: none; border-radius: 14px; padding: 3px 9px; font-size: 11px; font-weight: 700; }
        .draft-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; }
        @media (max-width: 1100px) { .draft-layout { grid-template-columns: 1fr; } }
        .clock-strip { background: linear-gradient(90deg,#1B2130,#131822); border: 1px solid #2A3346; border-radius: 10px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; }
        .clock-strip.mine { border-color: #3DDC84; box-shadow: 0 0 0 1px #3DDC84 inset; }
        .clock-team { font-size: 18px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
        .clock-meta { color: #7A8699; font-size: 12px; }
        .tag-mine { background: #3DDC84; color: #08090C; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-left: 8px; }
        .filters { display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; }
        .filter-btn { background: #0F131C; border: 1px solid #2A3346; color: #9BA6B7; padding: 6px 11px; border-radius: 6px; font-size: 12px; }
        .filter-btn.active { background: #232B3A; color: #E8ECF1; border-color: #3DDC84; }
        .search-input { width: 100%; background: #0F131C; border: 1px solid #2A3346; color: #E8ECF1; padding: 9px 10px; border-radius: 7px; font-size: 16px; margin-bottom: 10px; }
        .player-list { max-height: 480px; overflow-y: auto; }
        .player-row { display: flex; align-items: center; gap: 10px; padding: 8px 6px; border-bottom: 1px solid #1B2130; font-size: 13px; }
        .player-row:hover { background: #161C28; }
        .p-rank { color: #7A8699; width: 30px; }
        .p-name { flex: 1; font-weight: 500; }
        .p-nfl { color: #7A8699; width: 34px; font-size: 11px; }
        .rec-row { display: flex; align-items: center; gap: 10px; padding: 9px 8px; border-radius: 7px; margin-bottom: 6px; background: #0F131C; border: 1px solid #1B2130; }
        .rec-row.need { border-color: #3DDC84; background: #10201A; }
        .need-tag { font-size: 10px; background: #3DDC84; color: #08090C; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: auto; }
        .roster-slot { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border-bottom: 1px solid #1B2130; font-size: 13px; }
        .slot-label { color: #7A8699; width: 46px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.4px; }
        .slot-empty { color: #4A5468; font-style: italic; }
        .bench-item { padding: 6px 10px; font-size: 12px; color: #B7C0CE; border-bottom: 1px solid #161C28; }
        .board-wrap { overflow-x: auto; margin-top: 16px; }
        .board { border-collapse: collapse; font-size: 11px; min-width: 900px; }
        .board th, .board td { border: 1px solid #1B2130; padding: 5px 6px; text-align: left; white-space: nowrap; }
        .board th { background: #131822; position: sticky; top: 0; color: #9BA6B7; font-weight: 600; }
        .board td.mine-col { background: #10201A; }
        .board td.current-cell { outline: 2px solid #F5A623; outline-offset: -2px; }
        .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 0.6px; color: #9BA6B7; margin-bottom: 10px; font-weight: 600; }
        .top-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .add-custom { display: flex; gap: 6px; margin-top: 10px; }
        .add-custom input { background: #0F131C; border: 1px solid #2A3346; color: #E8ECF1; padding: 6px 8px; border-radius: 6px; font-size: 16px; }
        .add-custom input.name { flex: 1; }
        .add-custom select { background: #0F131C; border: 1px solid #2A3346; color: #E8ECF1; padding: 6px 8px; border-radius: 6px; font-size: 16px; }
        .complete-banner { background: #14231A; border: 1px solid #24422F; padding: 14px 18px; border-radius: 10px; margin-bottom: 14px; text-align: center; font-weight: 600; }
        .note { font-size: 12px; color: #6E7889; line-height: 1.5; margin-top: 10px; }
      `}</style>

      {!loaded ? (
        <div className="loading">Loading draft room…</div>
      ) : phase === "setup" ? (
        <div>
          <div className="topbar">
            <div>
              <div className="brand">DRAFT<span>ROOM</span></div>
              <div className="sub">12-team standard keeper draft — set up your league, then run the live draft.</div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="field">
              <label>Bench spots (starters are fixed: QB/RB/RB/WR/WR/TE/FLEX/DST/K)</label>
              <input type="number" min="0" max="10" value={benchCount} onChange={(e) => setBenchCount(Number(e.target.value))} style={{ maxWidth: 120 }} />
            </div>
            <div className="sub" style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <span>Total rounds: {totalRounds} · ESPN standard scoring/roster assumed — adjust bench count if your league differs.</span>
              <span className="mono" style={{ color: "#3DDC84" }}>Live player feed: {lastUpdated ? new Date(lastUpdated).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "just now"}</span>
            </div>
          </div>

          <div className="card">
            <div className="section-title">Teams, Draft Order &amp; Keepers</div>
            <div className="note" style={{ marginTop: -4, marginBottom: 8 }}>
              Set a keeper for any team that has one. Each keeper locks into that team's pick for the round you choose — every other pick that round happens normally. Injury statuses refresh from the live Sleeper player feed, so questionable or out tags show up before the draft starts.
            </div>
            {injuredPlayers.length > 0 && (
              <div className="bpa-strip" style={{ margin: "0 0 14px" }}>
                <div className="section-title" style={{ marginBottom: 6 }}>Injury Watch</div>
                <div className="bpa-list">
                  {injuredPlayers.slice(0, 6).map((p) => {
                    const injury = getPlayerInjuryState(p);
                    return (
                      <div className="bpa-chip" key={`injury-${p.id}`}>
                        <span className="pos-badge" style={{ background: POS_COLORS[p.pos] }}>{p.pos}</span>
                        <span>{p.name}</span>
                        <span className="mono" style={{ color: injury.flagged ? "#FFB25B" : "#3DDC84", fontSize: 11 }}>{injury.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {teams.map((t, i) => {
              const k = keepers[i];
              const kp = k.playerId ? playerById[k.playerId] : null;
              return (
                <div className="team-block" key={i}>
                  <div className="team-row" style={{ borderBottom: "none", padding: 0 }}>
                    <span className="mono" style={{ color: "#4A5468", width: 20 }}>{i + 1}</span>
                    <input type="text" value={t.name} onChange={(e) => updateTeamName(i, e.target.value)} />
                    <label>
                      <input type="radio" name="myteam" checked={myTeamIndex === i} onChange={() => setMyTeamIndex(i)} />
                      My team
                    </label>
                  </div>
                  <label className="keeper-toggle">
                    <input type="checkbox" checked={k.enabled} onChange={(e) => updateKeeper(i, { enabled: e.target.checked, ...(e.target.checked ? {} : { playerId: null }) })} />
                    Has a keeper
                  </label>
                  {k.enabled && (
                    <div className="keeper-inline">
                      {kp ? (
                        <div className="keeper-selected-row">
                          <div className="keeper-selected-meta">
                            <span>
                              <strong>{kp.name}</strong> <span className="pos-badge" style={{ background: POS_COLORS[kp.pos] }}>{kp.pos}</span> <span className="mono" style={{ color: "#7A8699" }}>{kp.nfl}</span>
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            <button className="btn-small" onClick={() => updateKeeper(i, { playerId: null })}>Change</button>
                            <button className="btn-small" onClick={() => updateKeeper(i, { enabled: false, playerId: null })}>Remove</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <input type="text" placeholder="Search player…" value={keeperSearchMap[i] || ""} onChange={(e) => setKeeperSearchMap((prev) => ({ ...prev, [i]: e.target.value }))} />
                          {keeperMatchesFor(i).map((p) => (
                            <div key={p.id} className="keeper-match" onClick={() => { updateKeeper(i, { playerId: p.id }); setKeeperSearchMap((prev) => ({ ...prev, [i]: "" })); }}>
                              <span>{p.name} <span className="mono" style={{ color: "#7A8699" }}>({p.nfl})</span></span>
                              <span className="pos-badge" style={{ background: POS_COLORS[p.pos] }}>{p.pos}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="keeper-placed-note">Placed on the draft board for Round {k.round} automatically.</div>
                      <div className="keeper-round-row">
                        Round
                        <input type="number" min="1" max={totalRounds} value={k.round} onChange={(e) => updateKeeper(i, { round: Number(e.target.value) })} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ marginTop: 18 }}>
              <button className="btn-primary" disabled={keepersIncomplete} onClick={startDraft}>Start Draft</button>
              {keepersIncomplete && <span className="note" style={{ marginLeft: 10 }}>Finish selecting a player for every team marked "has a keeper."</span>}
            </div>
            <div className="note">
              Default sort is <strong>Value Over Replacement (VOR)</strong> — projected points minus what a freely-available player at that position would score, computed from your league's exact scoring rules (6pt pass/rush/rec TDs, full PPR, yardage &amp; big-play bonuses). Raw points alone would over-rank QBs, since one team only starts one — VOR corrects for that scarcity. Switch to raw points or consensus rank anytime on the draft screen. Stat lines behind the numbers are estimated, not from a live projections feed — good enough to guide value, but sanity-check anyone you're about to reach for.
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="topbar">
            <div>
              <div className="brand">DRAFT<span>ROOM</span></div>
              <div className="sub">{teams[myTeamIndex]?.name} · Pick {currentPick ? currentPick.overall : pickSequence.length} of {pickSequence.length}</div>
            </div>
            <div className="top-actions">
              <button className="btn-ghost" onClick={() => setShowBoard((s) => !s)}>{showBoard ? "Hide" : "Show"} board</button>
              <button className="btn-ghost" onClick={undoLast}>Undo last pick</button>
              <button className="btn-ghost" onClick={resetDraft}>New draft</button>
            </div>
          </div>

          {draftComplete ? (
            <div className="complete-banner">Draft complete — {teams[myTeamIndex]?.name}'s roster is set below.</div>
          ) : (
            <div className={`clock-strip ${currentPick && currentPick.teamIndex === myTeamIndex ? "mine" : ""}`}>
              <div>
                <div className="clock-team">
                  {teams[currentPick.teamIndex]?.name}
                  {currentPick.teamIndex === myTeamIndex && <span className="tag-mine">YOU'RE ON THE CLOCK</span>}
                </div>
                <div className="clock-meta mono">Round {currentPick.round}, Pick {currentPick.pickInRound} · Overall #{currentPick.overall}</div>
              </div>
            </div>
          )}

          {!draftComplete && (
            <div className="bpa-strip">
              <div className="section-title" style={{ marginBottom: 0 }}>Suggested Picks — Best Available{currentPick ? ` for ${teams[currentPick.teamIndex]?.name}` : ""}</div>
              <div className="bpa-list">
                {bpaSuggestions.map((p) => (
                  <div className="bpa-chip" key={p.id}>
                    <span className="pos-badge" style={{ background: POS_COLORS[p.pos] }}>{p.pos}</span>
                    <span>{p.name}</span>
                    <span className="mono" style={{ color: "#3DDC84", fontSize: 11 }}>{valueMap[p.id] >= 0 ? "+" : ""}{valueMap[p.id].toFixed(0)} VOR</span>
                    <button onClick={() => assignPlayer(p.id)}>Draft</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="draft-layout">
            <div className="card">
              <div className="section-title">Available Players</div>
              <input className="search-input" type="text" placeholder="Search players…" value={search} onChange={(e) => setSearch(e.target.value)} />
              <div className="filters">
                {["ALL", "QB", "RB", "WR", "TE", "DST", "K"].map((p) => (
                  <button key={p} className={`filter-btn ${posFilter === p ? "active" : ""}`} onClick={() => setPosFilter(p)}>{p}</button>
                ))}
                <span style={{ width: 1, background: "#2A3346", margin: "0 4px" }} />
                <button className={`filter-btn ${sortMode === "value" ? "active" : ""}`} onClick={() => setSortMode("value")}>Sort: Value (VOR)</button>
                <button className={`filter-btn ${sortMode === "pts" ? "active" : ""}`} onClick={() => setSortMode("pts")}>Sort: Raw Pts</button>
                <button className={`filter-btn ${sortMode === "rank" ? "active" : ""}`} onClick={() => setSortMode("rank")}>Sort: Consensus Rank</button>
              </div>
              <div className="player-list">
                {filteredAvailable.map((p) => {
                  const injury = getPlayerInjuryState(p);
                  return (
                    <div className="player-row" key={p.id}>
                      <span className="p-rank mono">{p.rank}</span>
                      <span className="pos-badge" style={{ background: POS_COLORS[p.pos] }}>{p.pos}</span>
                      <span className="p-name">{p.name}</span>
                      <span className="p-nfl mono">{p.nfl}</span>
                      {injury.flagged ? (
                        <span className="mono" style={{ color: "#FFB25B", fontSize: 10, minWidth: 62, textAlign: "center", border: "1px solid rgba(255,178,91,0.4)", borderRadius: 999, padding: "2px 6px" }}>{injury.label}</span>
                      ) : (
                        <span className="mono" style={{ color: "#3DDC84", fontSize: 10, minWidth: 62, textAlign: "center", border: "1px solid rgba(61,220,132,0.3)", borderRadius: 999, padding: "2px 6px" }}>Healthy</span>
                      )}
                      <span className="mono" style={{ color: "#7A8699", fontSize: 11, width: 50, textAlign: "right" }}>{projPtsMap[p.id].toFixed(0)}pt</span>
                      <span className="mono" style={{ color: valueMap[p.id] >= 0 ? "#3DDC84" : "#FF6B6B", fontSize: 12, width: 55, textAlign: "right" }}>{valueMap[p.id] >= 0 ? "+" : ""}{valueMap[p.id].toFixed(0)} VOR</span>
                      <button className="btn-small" disabled={draftComplete} onClick={() => assignPlayer(p.id)}>Draft</button>
                    </div>
                  );
                })}
                {filteredAvailable.length === 0 && <div className="sub" style={{ padding: 10 }}>No players match.</div>}
              </div>

              <div className="section-title" style={{ marginTop: 16 }}>Add a player not on the list</div>
              <div className="add-custom">
                <input className="name" type="text" placeholder="Player name" value={customName} onChange={(e) => setCustomName(e.target.value)} />
                <select value={customPos} onChange={(e) => setCustomPos(e.target.value)}>
                  {["QB", "RB", "WR", "TE", "DST", "K"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <input style={{ width: 60 }} type="text" placeholder="Team" value={customTeam} onChange={(e) => setCustomTeam(e.target.value)} />
                <button className="btn-small" onClick={addCustomPlayer}>Add</button>
              </div>
            </div>

            <div>
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="section-title">Best For Your Team (weighted by need)</div>
                {recommendations.map((p) => {
                  const injury = getPlayerInjuryState(p);
                  return (
                    <div className={`rec-row ${p.isNeed ? "need" : ""}`} key={p.id}>
                      <span className="mono" style={{ color: valueMap[p.id] >= 0 ? "#3DDC84" : "#FF6B6B", fontSize: 12 }}>{valueMap[p.id] >= 0 ? "+" : ""}{valueMap[p.id].toFixed(0)}</span>
                      <span className="pos-badge" style={{ background: POS_COLORS[p.pos] }}>{p.pos}</span>
                      <span style={{ flex: 1 }}>{p.name}</span>
                      <span className="mono" style={{ color: injury.flagged ? "#FFB25B" : "#7A8699", fontSize: 11 }}>{injury.flagged ? injury.label : "Healthy"}</span>
                      {p.isNeed && <span className="need-tag">NEED</span>}
                    </div>
                  );
                })}
                {recommendations.length === 0 && <div className="sub">No players left.</div>}
              </div>

              <div className="card">
                <div className="section-title">{teams[myTeamIndex]?.name} Roster</div>
                {STARTER_SLOTS.map((slot) => {
                  const p = myRosterView.slots[slot];
                  return (
                    <div className="roster-slot" key={slot}>
                      <span className="slot-label mono">{SLOT_LABEL[slot] || slot}</span>
                      {p ? (
                        <span style={{ flex: 1, marginLeft: 10 }}>{p.name} <span className="mono" style={{ color: "#7A8699", fontSize: 11 }}>{p.nfl}</span></span>
                      ) : (
                        <span className="slot-empty" style={{ flex: 1, marginLeft: 10 }}>empty</span>
                      )}
                      {p && <span className="pos-badge" style={{ background: POS_COLORS[p.pos] }}>{p.pos}</span>}
                    </div>
                  );
                })}
                {myRosterView.bench.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div className="slot-label mono" style={{ padding: "6px 10px" }}>BENCH</div>
                    {myRosterView.bench.map((p) => (
                      <div className="bench-item" key={p.id}>
                        <span className="pos-badge" style={{ background: POS_COLORS[p.pos], marginRight: 8 }}>{p.pos}</span>
                        {p.name} <span className="mono" style={{ color: "#7A8699" }}>{p.nfl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {showBoard && (
            <div className="board-wrap">
              <table className="board">
                <thead>
                  <tr>
                    <th>Rnd</th>
                    {teams.map((t, i) => <th key={i} className={i === myTeamIndex ? "mono" : ""}>{t.name}{i === myTeamIndex ? " ★" : ""}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {boardRows.map((row) => (
                    <tr key={row.round}>
                      <td className="mono">{row.round}</td>
                      {row.cells.map((c, i) => {
                        const isCurrentCell = currentPick && currentPick.round === row.round && currentPick.teamIndex === i;
                        return (
                          <td key={i} className={`${i === myTeamIndex ? "mine-col" : ""} ${isCurrentCell ? "current-cell" : ""}`}>
                            {c ? <span><span className="pos-badge" style={{ background: POS_COLORS[c.pos], marginRight: 4 }}>{c.pos}</span>{c.name}</span> : (c === null ? "—" : "")}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
