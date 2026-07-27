// lib/dungeon/levels.ts
// Dungeon level definitions for all 28 days.
// Boss days (7, 14, 21, 28) redirect to /boss/[week] — no dungeon needed.
// Maps are 25 chars wide × 15 rows tall.
// Tile chars: W=wall .=floor @=spawn C=chest E=enemy D=door X=exit S=sign B=book K=cloud_zone

import { DungeonLevel, ObstacleConfig, TutorialZone, DungeonTheme } from './types';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const chest = (tileX: number, tileY: number, questId: string, label: string): ObstacleConfig =>
  ({ tileX, tileY, type: 'chest', questId, label });

const enemy = (tileX: number, tileY: number, questId: string, label: string): ObstacleConfig =>
  ({ tileX, tileY, type: 'enemy', questId, label });

const door = (tileX: number, tileY: number, questId: string, unlocksWhen: string): ObstacleConfig =>
  ({ tileX, tileY, type: 'door', questId, label: 'Locked Gate', unlocksWhen });

const sign = (tileX: number, tileY: number, questId: string, message: string): ObstacleConfig =>
  ({ tileX, tileY, type: 'sign', questId, label: '📜 Secret Hint Scroll', message });

const book = (tileX: number, tileY: number, dayNum: number, label: string): ObstacleConfig =>
  ({ tileX, tileY, type: 'book', questId: `book_d${dayNum}`, label: `📚 ${label}`, dayNumber: dayNum });

const zone = (tileX: number, tileY: number, w: number, h: number, tip: string, icon: string): TutorialZone =>
  ({ tileX, tileY, width: w, height: h, tip, icon });

// ─────────────────────────────────────────────
// LEVEL GENERATOR FOR 100% REACHABLE MAPS
// ─────────────────────────────────────────────

/**
 * Creates a 100% guaranteed reachable dungeon level with:
 * - Unblocked spawn area
 * - Chest 1 (SQ1) in Room 1 (unlocked from start)
 * - Door 1 unlocking when SQ1 is solved
 * - Chest 2 (SQ2) in Room 2
 * - Door 2 unlocking when SQ2 is solved
 * - Mini-Boss in Room 3
 * - Exit Portal unlocking when Mini-Boss is defeated
 * - Hidden Hint Scroll (S)
 * - Source of Truth Book (B)
 * - Context Cloud Zone (K)
 */
function createLevel(
  day: number,
  name: string,
  theme: DungeonTheme,
  sqIds: string[],
  mbId: string,
  hintMessage: string,
  bookTitle: string
): DungeonLevel {
  const map = [
    'WWWWWWWWWWWWWWWWWWWWWWWWW', // 0
    'W.S.....B.....KKKKK.....W', // 1  S at (2,1), B at (8,1), K at (14-18,1)
    'W.......................W', // 2
    'W.@.......C.............W', // 3  @ at (2,3), C1 at (10,3)
    'W.......................W', // 4
    'WWWWWWWWWDWWWWWWWWWWWWWWW', // 5  Door 1 at (9,5) — unlocks when sq1 solved
    'W.......................W', // 6
    'W.........C.............W', // 7  C2 at (10,7)
    'W.......................W', // 8
    'WWWWWWWWWWWWWDWWWWWWWWWWW', // 9  Door 2 at (13,9) — unlocks when sq2 solved
    'W.......................W', // 10
    'W...............E.......W', // 11 Enemy at (16,11)
    'W.......................W', // 12
    'W.....................X.W', // 13 Exit at (22,13)
    'WWWWWWWWWWWWWWWWWWWWWWWWW', // 14
  ];

  const sq1Id = sqIds[0] || `d${day}_sq1`;
  const sq2Id = sqIds[1] || `d${day}_sq2`;

  return {
    dayNumber: day,
    name,
    theme,
    map,
    spawnX: 2,
    spawnY: 3,
    isTutorial: day === 1,
    tutorialZones: [
      zone(1, 1, 6, 4, 'WASD / Arrow Keys to move. Step on ☁️ for Context Cloud syntax help.', '🎮'),
      zone(7, 1, 3, 3, 'Read the Source of Truth Tome for real-world career applications & skills!', '📚'),
      zone(9, 2, 4, 3, 'Approach the Chest and press E or SPACE to open the Python Challenge.', '📦'),
      zone(8, 4, 3, 3, 'Solve the first chest to unlock the gate to Room 2.', '🔒'),
      zone(14, 10, 5, 3, 'Defeat the Mini-Boss to open the exit portal!', '👹'),
      zone(21, 12, 3, 2, 'Step through the exit portal to complete the day!', '✨'),
    ],
    obstacles: [
      sign(2, 1, `hint_d${day}`, hintMessage),
      book(8, 1, day, bookTitle),
      chest(10, 3, sq1Id, `Side Quest 1: ${name} Part I`),
      door(9, 5, `door1_d${day}`, sq1Id),
      chest(10, 7, sq2Id, `Side Quest 2: ${name} Part II`),
      door(13, 9, `door2_d${day}`, sq2Id),
      enemy(16, 11, mbId, `👹 Gatekeeper Boss — Day ${day}`),
    ],
  };
}

// ─────────────────────────────────────────────
// WEEK 1 — SYNTAXIA (Days 1–6)
// ─────────────────────────────────────────────

const DAY1 = createLevel(
  1,
  'Awakening Grove',
  'syntaxia',
  ['d1_sq1', 'd1_sq2'],
  'd1_mb',
  'Welcome, Apprentice! Use WASD or Arrow keys to move.\nPress E or SPACE near chests 📦 to open Python challenges.\nCheck the 📚 Source of Truth tome for career application tips!',
  'Source of Truth: Telemetry & Output Streams'
);

const DAY2 = createLevel(
  2,
  'Alchemical Vaults',
  'syntaxia',
  ['d2_sq1', 'd2_sq2'],
  'd2_mb',
  'Variables bind memory to labels! Remember: reassigning a variable updates its memory pointer.\nUse snake_case naming for clean Python style.',
  'Source of Truth: Memory & Variable Binding'
);

const DAY3 = createLevel(
  3,
  'String Sanctum',
  'syntaxia',
  ['d3_sq1', 'd3_sq2'],
  'd3_mb',
  'f-Strings format text efficiently! Use f"Hello {name}" to inject variables.\nString slicing like text[0:4] extracts sub-phrases.',
  'Source of Truth: String Interpolation & Parsing'
);

const DAY4 = createLevel(
  4,
  'Logic Vault',
  'syntaxia',
  ['d4_sq1', 'd4_sq2'],
  'd4_mb',
  'Boolean logic controls access gates!\nRemember: "and" requires both true, "or" requires at least one true, "not" flips the state.',
  'Source of Truth: Boolean Logic & Security Firewalls'
);

const DAY5 = createLevel(
  5,
  'Crossroads of Choices',
  'syntaxia',
  ['d5_sq1', 'd5_sq2'],
  'd5_mb',
  'Multi-branch elif statements evaluate top to bottom.\nOnly the first matching branch executes!',
  'Source of Truth: Multi-Branch Decisioning'
);

const DAY6 = createLevel(
  6,
  'Crystal Loop Chamber',
  'syntaxia',
  ['d6_sq1', 'd6_sq2'],
  'd6_mb',
  'For loops iterate across sequences!\nUse range(start, stop) to generate index sequences.',
  'Source of Truth: Iteration & Loop Architecture'
);

// ─────────────────────────────────────────────
// WEEK 2 — DATA CAVERNS (Days 8–13)
// ─────────────────────────────────────────────

const DAY8 = createLevel(
  8,
  'Inventory Arrays',
  'cavern',
  ['d8_sq1', 'd8_sq2'],
  'd8_mb',
  'Lists store dynamic arrays of items.\nUse list.append(item) to add items to the end of the array.',
  'Source of Truth: Sequence Arrays & Lists'
);

const DAY9 = createLevel(
  9,
  'Dictionary Spellbook',
  'cavern',
  ['d9_sq1', 'd9_sq2'],
  'd9_mb',
  'Dictionaries store key-value pairs with instant O(1) lookup speed.\nUse dict.get(key, default) to prevent missing key errors.',
  'Source of Truth: Key-Value Hash Maps'
);

const DAY10 = createLevel(
  10,
  'Tuple & Set Relics',
  'cavern',
  ['d10_sq1', 'd10_sq2'],
  'd10_mb',
  'Tuples are immutable sequences (cannot be changed after creation).\nSets automatically eliminate all duplicate items!',
  'Source of Truth: Immutable Relics & Sets'
);

const DAY11 = createLevel(
  11,
  'While Loop Dungeon',
  'cavern',
  ['d11_sq1', 'd11_sq2'],
  'd11_mb',
  'While loops continue executing as long as their condition remains True.\nAlways include a sentinel check to avoid infinite loops!',
  'Source of Truth: Sentinel While Loops'
);

const DAY12 = createLevel(
  12,
  'Function Forge',
  'cavern',
  ['d12_sq1', 'd12_sq2'],
  'd12_mb',
  'Functions encapsulate modular code.\nUse return statements to pass computed results back to the caller.',
  'Source of Truth: Function Modularization'
);

const DAY13 = createLevel(
  13,
  '*args & **kwargs Vault',
  'cavern',
  ['d13_sq1', 'd13_sq2'],
  'd13_mb',
  '*args collects extra positional arguments into a tuple.\n**kwargs collects extra keyword arguments into a dictionary.',
  'Source of Truth: Variadic Function Signatures'
);

// ─────────────────────────────────────────────
// WEEK 3 — OOP CITADEL (Days 15–20)
// ─────────────────────────────────────────────

const DAY15 = createLevel(
  15,
  'Class Creation',
  'citadel',
  ['d15_sq1', 'd15_sq2'],
  'd15_mb',
  'Classes are blueprints for creating objects.\nObjects bundle state (attributes) and behavior (methods) together.',
  'Source of Truth: Object Creation & Classes'
);

const DAY16 = createLevel(
  16,
  'Constructor Ritual',
  'citadel',
  ['d16_sq1', 'd16_sq2'],
  'd16_mb',
  'The __init__ constructor runs automatically when creating a new instance.\nUse self.attribute to bind variables to the specific instance.',
  'Source of Truth: Constructor Rituals'
);

const DAY17 = createLevel(
  17,
  'Inheritance Citadel',
  'citadel',
  ['d17_sq1', 'd17_sq2'],
  'd17_mb',
  'Child classes inherit attributes and methods from parent classes.\nUse super().__init__() to invoke the parent constructor.',
  'Source of Truth: Class Inheritance & Polymorphism'
);

const DAY18 = createLevel(
  18,
  'Dunder Magic',
  'citadel',
  ['d18_sq1', 'd18_sq2'],
  'd18_mb',
  'Dunder methods (__str__, __repr__, __len__) override Python operators and built-in behaviors.',
  'Source of Truth: Dunder Magic Methods'
);

const DAY19 = createLevel(
  19,
  'File I/O Crypts',
  'citadel',
  ['d19_sq1', 'd19_sq2'],
  'd19_mb',
  'Use "with open(filepath) as f:" context managers to ensure files are automatically closed after reading/writing.',
  'Source of Truth: File Persistence & Context Managers'
);

const DAY20 = createLevel(
  20,
  'Exception Bastion',
  'citadel',
  ['d20_sq1', 'd20_sq2'],
  'd20_mb',
  'Try/except blocks catch runtime errors gracefully before they crash your application.',
  'Source of Truth: Exception Handling & Resilience'
);

// ─────────────────────────────────────────────
// WEEK 4 — CODE SOVEREIGN REALM (Days 22–27)
// ─────────────────────────────────────────────

const DAY22 = createLevel(
  22,
  'Package Management',
  'realm',
  ['d22_sq1', 'd22_sq2'],
  'd22_mb',
  'Modules allow importing Python code across files.\nUse PyPI tools (uv, pip) to install third-party packages.',
  'Source of Truth: Modules & Package Management'
);

const DAY23 = createLevel(
  23,
  'API Conjuring',
  'realm',
  ['d23_sq1', 'd23_sq2'],
  'd23_mb',
  'REST APIs communicate using HTTP methods (GET, POST).\nJSON payloads transmit structured data over web networks.',
  'Source of Truth: REST API Architecture'
);

const DAY24 = createLevel(
  24,
  'Pandas Data Realms',
  'realm',
  ['d24_sq1', 'd24_sq2'],
  'd24_mb',
  'Pandas DataFrames manage tabular data matrices with vectorized filtering and aggregation.',
  'Source of Truth: Pandas Data Analytics'
);

const DAY25 = createLevel(
  25,
  'Rich Terminal Arts',
  'realm',
  ['d25_sq1', 'd25_sq2'],
  'd25_mb',
  'Rich terminal UIs render colored logs, tables, and progress bars directly inside terminal consoles.',
  'Source of Truth: Rich Terminal UI Frameworks'
);

const DAY26 = createLevel(
  26,
  'Pygame Sprite Forge',
  'realm',
  ['d26_sq1', 'd26_sq2'],
  'd26_mb',
  'Pygame event loops process user inputs, update sprite positions, and re-render game frames continuously.',
  'Source of Truth: Pygame Engine Architecture'
);

const DAY27 = createLevel(
  27,
  'Capstone Compile',
  'realm',
  ['d27_sq1', 'd27_sq2'],
  'd27_mb',
  'Congratulations, Code Sovereign! Synthesize all 27 days into your final capstone project.',
  'Source of Truth: Full-Stack Project Synthesis'
);

// ─────────────────────────────────────────────
// MASTER INDEX
// ─────────────────────────────────────────────

export const DUNGEON_LEVELS: Record<number, DungeonLevel> = {
  1:  DAY1,
  2:  DAY2,
  3:  DAY3,
  4:  DAY4,
  5:  DAY5,
  6:  DAY6,
  8:  DAY8,
  9:  DAY9,
  10: DAY10,
  11: DAY11,
  12: DAY12,
  13: DAY13,
  15: DAY15,
  16: DAY16,
  17: DAY17,
  18: DAY18,
  19: DAY19,
  20: DAY20,
  22: DAY22,
  23: DAY23,
  24: DAY24,
  25: DAY25,
  26: DAY26,
  27: DAY27,
};

/** Returns the level for the given day, or null for boss days (7, 14, 21, 28) */
export function getDungeonLevel(dayNumber: number): DungeonLevel | null {
  return DUNGEON_LEVELS[dayNumber] ?? null;
}

/** Returns true for days that use the Boss Fight page instead of the dungeon */
export function isBossDay(dayNumber: number): boolean {
  return dayNumber === 7 || dayNumber === 14 || dayNumber === 21 || dayNumber === 28;
}
