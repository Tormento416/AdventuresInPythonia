import { Quest, SubQuest, WeeklyBoss } from "./models";
import { WEEK1_ARCHETYPE_VARIANTS } from "./archetypeVariants";

export const WEEKLY_BOSSES_SEED: WeeklyBoss[] = [
  {
    weekNumber: 1,
    dayNumber: 7,
    bossName: "Syntaxius the Unparsed",
    bossTitle: "Gatekeeper of the Realm of Syntax & Logic",
    bossAvatar: "👹",
    bossHp: 300,
    narrative: "The arch-demon Syntaxius blocks the bridge into the deep dungeons. His body is forged from unclosed parentheses, broken quotes, and undeclared variables. To shatter his armor, you must cast flawless basic spells combining print, variables, string formatting, numeric math, conditions, and for loops!",
    xpReward: 500,
    lootBadge: "Rune of Flawless Syntax",
    questions: [
      {
        id: "w1_q1",
        title: "Phase 1: Shatter the Quote Shield",
        prompt: "Cast a print command displaying formatted message: 'Hero level: ' followed by integer level 5, and total mana 100.",
        combatPhase: "Phase 1: Armor Break",
        starterCode: "level = 5\nmana = 100\n# Print 'Hero level: 5 | Mana: 100' using f-string\n",
        solutionCode: "level = 5\nmana = 100\nprint(f'Hero level: {level} | Mana: {mana}')",
        testAssertion: "output.includes('Hero level: 5 | Mana: 100')",
        damageValue: 100
      },
      {
        id: "w1_q2",
        title: "Phase 2: Counter the Conditional Strike",
        prompt: "Write a condition checking if player_hp is less than 30. If true, set action = 'potion'. Elif hp < 70, action = 'shield'. Else action = 'attack'. Print action.",
        combatPhase: "Phase 2: Tactical Counter",
        starterCode: "player_hp = 25\naction = ''\n# Add if/elif/else logic here\n\nprint(action)",
        solutionCode: "player_hp = 25\nif player_hp < 30:\n    action = 'potion'\nelif player_hp < 70:\n    action = 'shield'\nelse:\n    action = 'attack'\nprint(action)",
        testAssertion: "output.trim() === 'potion'",
        damageValue: 100
      },
      {
        id: "w1_q3",
        title: "Phase 3: The Multi-Strike Loop",
        prompt: "Execute a for loop over numbers 1 to 5. For each number, print 'Strike ' followed by the strike count multiplied by 10 (e.g., 'Strike 10', 'Strike 20', ..., 'Strike 50').",
        combatPhase: "Phase 3: Final Decisive Strike",
        starterCode: "# Use for loop with range(1, 6)\n",
        solutionCode: "for i in range(1, 6):\n    print(f'Strike {i * 10}')",
        testAssertion: "output.includes('Strike 10') && output.includes('Strike 50')",
        damageValue: 100
      }
    ]
  },
  {
    weekNumber: 2,
    dayNumber: 14,
    bossName: "Arch-Mage Algorithma",
    bossTitle: "Grand Master of Data Structures & Functions",
    bossAvatar: "🧙‍♀️",
    bossHp: 450,
    narrative: "Arch-Mage Algorithma hovers in the Chamber of Grimoires. She summons endless spell streams, nested lists, and dict traps. Only by deploying custom functions, dictionaries, set operations, and while loops can you dismantle her defensive barriers!",
    xpReward: 500,
    lootBadge: "Grimoire of Master Functions",
    questions: [
      {
        id: "w2_q1",
        title: "Phase 1: Draining the Mana Vault",
        prompt: "Create a dictionary named `spellbook` with keys 'fireball': 25, 'teleport': 40, 'heal': 15. Write a function `get_spell_cost(spell_name)` that returns the cost from spellbook or 0 if missing. Test by printing get_spell_cost('fireball').",
        combatPhase: "Phase 1: Disarm Spellbook",
        starterCode: "spellbook = {'fireball': 25, 'teleport': 40, 'heal': 15}\n\ndef get_spell_cost(spell):\n    pass\n\nprint(get_spell_cost('fireball'))",
        solutionCode: "spellbook = {'fireball': 25, 'teleport': 40, 'heal': 15}\n\ndef get_spell_cost(spell):\n    return spellbook.get(spell, 0)\n\nprint(get_spell_cost('fireball'))",
        testAssertion: "output.trim() === '25'",
        damageValue: 150
      },
      {
        id: "w2_q2",
        title: "Phase 2: Purging Duplicates",
        prompt: "Given a list `inventory = ['potion', 'sword', 'potion', 'scroll', 'sword']`, convert it to a set to remove duplicates, convert back to a sorted list, and print it.",
        combatPhase: "Phase 2: Purge Duplicate Illusions",
        starterCode: "inventory = ['potion', 'sword', 'potion', 'scroll', 'sword']\n# Clean duplicates and sort\nclean_inv = []\nprint(clean_inv)",
        solutionCode: "inventory = ['potion', 'sword', 'potion', 'scroll', 'sword']\nclean_inv = sorted(list(set(inventory)))\nprint(clean_inv)",
        testAssertion: "output.includes('potion') && output.includes('scroll') && output.includes('sword')",
        damageValue: 150
      },
      {
        id: "w2_q3",
        title: "Phase 3: The Variable-Args Power Strike",
        prompt: "Define a function `total_power(*args)` that sums all numeric arguments passed to it. Call `total_power(10, 25, 30, 15)` and print the result.",
        combatPhase: "Phase 3: Unlimited Energy Pulse",
        starterCode: "def total_power(*args):\n    pass\n\nprint(total_power(10, 25, 30, 15))",
        solutionCode: "def total_power(*args):\n    return sum(args)\n\nprint(total_power(10, 25, 30, 15))",
        testAssertion: "output.trim() === '80'",
        damageValue: 150
      }
    ]
  },
  {
    weekNumber: 3,
    dayNumber: 21,
    bossName: "Iron Colossus Automaton",
    bossTitle: "Master of Classes, Modules & Exception Shields",
    bossAvatar: "🤖",
    bossHp: 600,
    narrative: "A titanic metal guardian fueled by object-oriented steam and complex modules. To breach its chassis, you must construct custom classes, inherit combat capabilities, handle unexpected energy spikes with try/except, and manipulate file records!",
    xpReward: 500,
    lootBadge: "Core of the Iron Construct",
    questions: [
      {
        id: "w3_q1",
        title: "Phase 1: Forging the Hero Class",
        prompt: "Define a class `Hero` with `__init__(self, name, attack)` and a method `strike(self)` that returns `f'{self.name} deals {self.attack} damage!'`. Instantiate `Hero('Arthur', 50)` and print the output of `strike()`.",
        combatPhase: "Phase 1: Construct Champion Automaton",
        starterCode: "class Hero:\n    pass\n\nh = Hero('Arthur', 50)\nprint(h.strike())",
        solutionCode: "class Hero:\n    def __init__(self, name, attack):\n        self.name = name\n        self.attack = attack\n    def strike(self):\n        return f'{self.name} deals {self.attack} damage!'\n\nh = Hero('Arthur', 50)\nprint(h.strike())",
        testAssertion: "output.includes('Arthur deals 50 damage!')",
        damageValue: 200
      },
      {
        id: "w3_q2",
        title: "Phase 2: Overriding the Core Shield",
        prompt: "Create a subclass `Paladin(Hero)` overriding `strike(self)` to return `f'{self.name} casts Holy Shield for {self.attack * 2} power!'`. Instantiate `Paladin('Uther', 40)` and print `strike()`.",
        combatPhase: "Phase 2: Divine Overriding Strike",
        starterCode: "# Inherit from Hero\nclass Paladin(Hero):\n    pass\n\np = Paladin('Uther', 40)\nprint(p.strike())",
        solutionCode: "class Hero:\n    def __init__(self, name, attack):\n        self.name = name\n        self.attack = attack\n    def strike(self):\n        return f'{self.name} deals {self.attack} damage!'\n\nclass Paladin(Hero):\n    def strike(self):\n        return f'{self.name} casts Holy Shield for {self.attack * 2} power!'\n\np = Paladin('Uther', 40)\nprint(p.strike())",
        testAssertion: "output.includes('Uther casts Holy Shield for 80 power!')",
        damageValue: 200
      },
      {
        id: "w3_q3",
        title: "Phase 3: Absorbing System Overload",
        prompt: "Write a function `safe_divide(a, b)` wrapped in a `try...except ZeroDivisionError`. If zero division occurs, return 'Shield Activated: Division by Zero Prevented'. Call `safe_divide(100, 0)` and print result.",
        combatPhase: "Phase 3: Fault-Tolerant Deflector",
        starterCode: "def safe_divide(a, b):\n    # try/except block here\n    pass\n\nprint(safe_divide(100, 0))",
        solutionCode: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Shield Activated: Division by Zero Prevented'\n\nprint(safe_divide(100, 0))",
        testAssertion: "output.includes('Shield Activated: Division by Zero Prevented')",
        damageValue: 200
      }
    ]
  },
  {
    weekNumber: 4,
    dayNumber: 28,
    bossName: "Malakor the Overlord of Pythonia",
    bossTitle: "Final Dungeon Boss - Master of All Frameworks & Sorcery",
    bossAvatar: "🐲",
    bossHp: 1000,
    narrative: "The final showdown atop the Spire of Pythonia! Malakor wields the full spectrum of Pythonic magic—web APIs, data pipelines, game loops, CLI automation, and neural logic. Channel your specialized Archetype and every mastery acquired over 28 days to vanquish the darkness and claim victory!",
    xpReward: 1000,
    lootBadge: "Crown of the Grand Pythonian Archmage",
    questions: [
      {
        id: "w4_q1",
        title: "Phase 1: Parsing the Web Oracle",
        prompt: "Simulate a REST API JSON parsing routine. Parse JSON string `payload = '{\"status\": 200, \"boss_vulnerable\": true, \"hp\": 1000}'` using python `json` module, toggle `boss_vulnerable` to false, and print the updated JSON string.",
        combatPhase: "Phase 1: API Vulnerability Hack",
        starterCode: "import json\npayload = '{\"status\": 200, \"boss_vulnerable\": true, \"hp\": 1000}'\n# Parse, update, and print json\n",
        solutionCode: "import json\npayload = '{\"status\": 200, \"boss_vulnerable\": true, \"hp\": 1000}'\ndata = json.loads(payload)\ndata['boss_vulnerable'] = False\nprint(json.dumps(data))",
        testAssertion: "output.includes('\"boss_vulnerable\": false') || output.includes('\"boss_vulnerable\": False')",
        damageValue: 300
      },
      {
        id: "w4_q2",
        title: "Phase 2: Data Matrix Cleave",
        prompt: "Write a mini data processing script. Given list `damage_logs = [120, 45, 300, 80, 250]`, filter out all values below 100 using a list comprehension, multiply remaining by 1.5, and print the resulting list.",
        combatPhase: "Phase 2: High-Yield Data Blast",
        starterCode: "damage_logs = [120, 45, 300, 80, 250]\n# List comprehension filter & transform\nboosted = []\nprint(boosted)",
        solutionCode: "damage_logs = [120, 45, 300, 80, 250]\nboosted = [d * 1.5 for d in damage_logs if d >= 100]\nprint(boosted)",
        testAssertion: "output.includes('180.0') && output.includes('450.0') && output.includes('375.0')",
        damageValue: 350
      },
      {
        id: "w4_q3",
        title: "Phase 3: The Grand Pythonic Capstone",
        prompt: "Build an ultimate class `PythonicHero` with class attribute `realm = 'Pythonia'`, method `cast_ultimate(self, archetype_name)` returning `f'Grand {archetype_name} invokes the power of Pythonia for 9999 damage!'`. Instantiate with hero, execute method for your archetype, and print!",
        combatPhase: "Phase 3: Supreme Victory Spell",
        starterCode: "class PythonicHero:\n    realm = 'Pythonia'\n    def cast_ultimate(self, archetype_name):\n        pass\n\nhero = PythonicHero()\nprint(hero.cast_ultimate('Wizard'))",
        solutionCode: "class PythonicHero:\n    realm = 'Pythonia'\n    def cast_ultimate(self, archetype_name):\n        return f'Grand {archetype_name} invokes the power of {self.realm} for 9999 damage!'\n\nhero = PythonicHero()\nprint(hero.cast_ultimate('Wizard'))",
        testAssertion: "output.includes('invokes the power of Pythonia for 9999 damage!')",
        damageValue: 350
      }
    ]
  }
];

export const DAILY_QUESTS_SEED: Quest[] = [
  // --- WEEK 1: SYNTAX, VARIABLES, CONTROL STRUCTURES ---
  {
    dayNumber: 1,
    title: "Awakening in Pythonia",
    subtitle: "Syntax, Print & Incantations",
    chapterWeek: 1,
    category: "Syntax & Variables",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d1_sq1",
        title: "Side Quest 1: The Sacred Print Spell",
        narrative: "You awaken in the mystical Grove of Code. Ancient runes float before you. To activate your magic, you must cast your very first Python incantation using `print()`.",
        conceptExplanation: "In Python, `print()` displays text on the screen. Text must be surrounded by matching quotes, like `\"Hello World\"` or `'Hello World'`.",
        codeTask: "Write a line of Python code that prints: Hello Adventurer!",
        starterCode: "# Cast your first print spell below\n",
        solutionCode: "print('Hello Adventurer!')",
        testAssertion: "output.trim() === 'Hello Adventurer!'",
        xpReward: 50,
        hints: ["Use print('Hello Adventurer!')", "Make sure the punctuation matches exactly!"]
      },
      {
        id: "d1_sq2",
        title: "Side Quest 2: Multiline Revelations",
        narrative: "The ancient stone tablet requires two lines of text to unlock the path forward.",
        conceptExplanation: "Multiple `print()` statements execute in top-to-bottom order, outputting each message on a new line.",
        codeTask: "Print 'Line 1: Preparing spell' on the first line, and 'Line 2: Spell ready' on the second line.",
        starterCode: "# Print two lines\n",
        solutionCode: "print('Line 1: Preparing spell')\nprint('Line 2: Spell ready')",
        testAssertion: "output.includes('Line 1: Preparing spell') && output.includes('Line 2: Spell ready')",
        xpReward: 50,
        hints: ["Write two separate print() function calls on two lines."]
      }
    ],
    miniBoss: {
      id: "d1_mb",
      bossName: "The Goblin Scribe",
      bossTitle: "Guardian of the First Gate",
      bossAvatar: "👺",
      bossHp: 100,
      narrative: "A sneaky Goblin Scribe blocks the entrance, demanding proof that you can display your character's name and title cleanly!",
      combatTask: "Write code to print two lines: First line 'Character: Apprentice', second line 'Status: Ready for Battle'.",
      starterCode: "# Defeat the Goblin Scribe with two print statements\n",
      solutionCode: "print('Character: Apprentice')\nprint('Status: Ready for Battle')",
      testAssertion: "output.includes('Character: Apprentice') && output.includes('Status: Ready for Battle')",
      xpReward: 150,
      lootReward: "Scribe's Quill of Syntax"
    }
  },
  {
    dayNumber: 2,
    title: "Alchemical Variables & Data Types",
    subtitle: "Storing Mana & Stats",
    chapterWeek: 1,
    category: "Syntax & Variables",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d2_sq1",
        title: "Side Quest 1: Binding Variables",
        narrative: "To track your hero's power, you must store values in named variables.",
        conceptExplanation: "Variables store data. Use `=` to assign a value to a name, like `hero_name = 'Kael'` or `hp = 100`.",
        codeTask: "Create a variable `player_name` with value `'Valeros'` and `level` with value `1`. Print both using comma or formatting.",
        starterCode: "# Create player_name and level variables\n",
        solutionCode: "player_name = 'Valeros'\nlevel = 1\nprint(player_name, level)",
        testAssertion: "output.includes('Valeros') && output.includes('1')",
        xpReward: 50,
        hints: ["Assign player_name = 'Valeros'", "Assign level = 1", "print(player_name, level)"]
      },
      {
        id: "d2_sq2",
        title: "Side Quest 2: Alchemical Types",
        narrative: "Different stats require different data types: strings for names, integers for levels, floats for percentages, booleans for status.",
        conceptExplanation: "Python has data types: `str` (text), `int` (integers), `float` (decimals), and `bool` (`True`/`False`). `type()` reveals the data type.",
        codeTask: "Create `mana = 75.5` and `is_alive = True`. Print `type(mana)`.",
        starterCode: "mana = 75.5\nis_alive = True\n# Print type of mana\n",
        solutionCode: "mana = 75.5\nis_alive = True\nprint(type(mana))",
        testAssertion: "output.includes('float')",
        xpReward: 50,
        hints: ["Use print(type(mana))"]
      }
    ],
    miniBoss: {
      id: "d2_mb",
      bossName: "The Mana Balance Golem",
      bossTitle: "Construct of Pure Energy",
      bossAvatar: "🗿",
      bossHp: 120,
      narrative: "The Golem tests your ability to cast variables into output!",
      combatTask: "Create variable `hero_hp = 150` and `potion = 50`. Calculate `total_hp = hero_hp + potion` and print `total_hp`.",
      starterCode: "hero_hp = 150\npotion = 50\n# Calculate total_hp and print\n",
      solutionCode: "hero_hp = 150\npotion = 50\ntotal_hp = hero_hp + potion\nprint(total_hp)",
      testAssertion: "output.trim() === '200'",
      xpReward: 150,
      lootReward: "Amulet of Variable Binding"
    }
  },
  {
    dayNumber: 3,
    title: "User Whispers & String Magic",
    subtitle: "f-Strings & Text Manipulation",
    chapterWeek: 1,
    category: "Syntax & Variables",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d3_sq1",
        title: "Side Quest 1: The f-String Enchantment",
        narrative: "Combine stats directly inside text using the powerful f-string ritual.",
        conceptExplanation: "Prefix strings with `f` to insert variables directly inside `{}` brackets: `f\"Hero {name} has {hp} HP\"`.",
        codeTask: "Given `name = 'Elena'` and `gold = 250`, print: `Elena has 250 gold coins.` using an f-string.",
        starterCode: "name = 'Elena'\ngold = 250\n# Use f-string\n",
        solutionCode: "name = 'Elena'\ngold = 250\nprint(f'{name} has {gold} gold coins.')",
        testAssertion: "output.trim() === 'Elena has 250 gold coins.'",
        xpReward: 50,
        hints: ["Use f'{name} has {gold} gold coins.' inside print()"]
      },
      {
        id: "d3_sq2",
        title: "Side Quest 2: Shaping String Runes",
        narrative: "Clean up noisy spell incantations using `.upper()`, `.lower()`, and `.strip()`.",
        conceptExplanation: "String methods allow altering text: `.upper()` converts to uppercase, `.strip()` trims leading/trailing spaces.",
        codeTask: "Given `raw_spell = '   fireball   '`, store the stripped, uppercase version in `clean_spell` and print it.",
        starterCode: "raw_spell = '   fireball   '\n# Strip spaces and uppercase\n",
        solutionCode: "raw_spell = '   fireball   '\nclean_spell = raw_spell.strip().upper()\nprint(clean_spell)",
        testAssertion: "output.trim() === 'FIREBALL'",
        xpReward: 50,
        hints: ["Use raw_spell.strip().upper()"]
      }
    ],
    miniBoss: {
      id: "d3_mb",
      bossName: "The Riddle Gargoyle",
      bossTitle: "Stone Guardian of Whispers",
      bossAvatar: "🗿",
      bossHp: 130,
      narrative: "The Gargoyle speaks in lowercase whispers flanked by spaces. Re-format its message to pass!",
      combatTask: "Given `whisper = '  open sesame  '`, print `whisper` transformed so it is capitalized (`Open sesame`) and trimmed.",
      starterCode: "whisper = '  open sesame  '\n# Clean and capitalize\n",
      solutionCode: "whisper = '  open sesame  '\nprint(whisper.strip().capitalize())",
      testAssertion: "output.trim() === 'Open sesame'",
      xpReward: 150,
      lootReward: "Ring of Echoing Runes"
    }
  },
  {
    dayNumber: 4,
    title: "Arithmetic & Logical Relics",
    subtitle: "Math & Boolean Condition Testing",
    chapterWeek: 1,
    category: "Syntax & Variables",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d4_sq1",
        title: "Side Quest 1: The Alchemical Calculator",
        narrative: "Calculate damage outputs using modulus `%`, exponentiation `**`, and floor division `//`.",
        conceptExplanation: "`**` raises to power (e.g. `2**3 = 8`), `%` gives remainder (`10%3 = 1`), `//` gives integer floor division (`10//3 = 3`).",
        codeTask: "Calculate `damage = 5 ** 2` and `remainder = 17 % 5`. Print `damage` then `remainder`.",
        starterCode: "# Calculate damage and remainder\n",
        solutionCode: "damage = 5 ** 2\nremainder = 17 % 5\nprint(damage)\nprint(remainder)",
        testAssertion: "output.includes('25') && output.includes('2')",
        xpReward: 50,
        hints: ["damage = 5 ** 2", "remainder = 17 % 5"]
      },
      {
        id: "d4_sq2",
        title: "Side Quest 2: Logical Gates",
        narrative: "Test access to the enchanted vault using `and`, `or`, and `not` logic.",
        conceptExplanation: "`and` requires both conditions True; `or` requires at least one; `not` flips boolean state.",
        codeTask: "Set `has_key = True`, `level = 5`. Check if `has_key and level >= 5`. Store result in `can_enter` and print.",
        starterCode: "has_key = True\nlevel = 5\n# Check can_enter\n",
        solutionCode: "has_key = True\nlevel = 5\ncan_enter = has_key and level >= 5\nprint(can_enter)",
        testAssertion: "output.trim() === 'True'",
        xpReward: 50,
        hints: ["can_enter = has_key and level >= 5"]
      }
    ],
    miniBoss: {
      id: "d4_mb",
      bossName: "The Vault Keeper Lock",
      bossTitle: "Enchanted Mechanical Ward",
      bossAvatar: "🔒",
      bossHp: 140,
      narrative: "The Vault Keeper requires exact logic to disarm!",
      combatTask: "Given `passcode_a = 12`, `passcode_b = 4`. Check if `passcode_a % passcode_b == 0` and `passcode_a > 10`. Print result boolean.",
      starterCode: "passcode_a = 12\npasscode_b = 4\n# Evaluate security check\n",
      solutionCode: "passcode_a = 12\npasscode_b = 4\nprint(passcode_a % passcode_b == 0 and passcode_a > 10)",
      testAssertion: "output.trim() === 'True'",
      xpReward: 150,
      lootReward: "Key of Logical Harmony"
    }
  },
  {
    dayNumber: 5,
    title: "Conditional Branching Paths",
    subtitle: "If, Elif, Else & Choice Logic",
    chapterWeek: 1,
    category: "Control structures",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d5_sq1",
        title: "Side Quest 1: The Fork in the Road",
        narrative: "Choose your path through the dark forest based on your character's health.",
        conceptExplanation: "`if` checks a condition; `else` provides a fallback if false.",
        codeTask: "Given `health = 40`. If `health > 50`, print `'Fight'`. Else print `'Retreat'`.",
        starterCode: "health = 40\n# Add if / else\n",
        solutionCode: "health = 40\nif health > 50:\n    print('Fight')\nelse:\n    print('Retreat')",
        testAssertion: "output.trim() === 'Retreat'",
        xpReward: 50,
        hints: ["Use if health > 50: ... else: ..."]
      },
      {
        id: "d5_sq2",
        title: "Side Quest 2: The Multi-Element Ward",
        narrative: "Distinguish between Fire, Ice, and Lightning magic using `elif` branches.",
        conceptExplanation: "`elif` allows testing multiple mutually exclusive conditions in sequence.",
        codeTask: "Given `element = 'Ice'`. If `element == 'Fire'`, print `'Hot'`. Elif `element == 'Ice'`, print `'Cold'`. Else print `'Unknown'`.",
        starterCode: "element = 'Ice'\n# Add if / elif / else\n",
        solutionCode: "element = 'Ice'\nif element == 'Fire':\n    print('Hot')\nelif element == 'Ice':\n    print('Cold')\nelse:\n    print('Unknown')",
        testAssertion: "output.trim() === 'Cold'",
        xpReward: 50,
        hints: ["Check elif element == 'Ice': print('Cold')"]
      }
    ],
    miniBoss: {
      id: "d5_mb",
      bossName: "The Wandering Elemental",
      bossTitle: "Shifting Beast of Chaos",
      bossAvatar: "🌪️",
      bossHp: 150,
      narrative: "The Elemental shifts forms based on energy level!",
      combatTask: "Given `energy = 85`. If `energy >= 90`, print `'Overcharged'`. Elif `energy >= 70`, print `'Charged'`. Else print `'Depleted'`.",
      starterCode: "energy = 85\n# Conditional logic\n",
      solutionCode: "energy = 85\nif energy >= 90:\n    print('Overcharged')\nelif energy >= 70:\n    print('Charged')\nelse:\n    print('Depleted')",
      testAssertion: "output.trim() === 'Charged'",
      xpReward: 150,
      lootReward: "Shard of Shifting Elements"
    }
  },
  {
    dayNumber: 6,
    title: "Repetitive Spells - For Loops",
    subtitle: "Iteration, Range & Counting",
    chapterWeek: 1,
    category: "Control structures",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d6_sq1",
        title: "Side Quest 1: Counting the Magic Crystals",
        narrative: "Channel magic power across 5 crystals using `for` and `range()`.",
        conceptExplanation: "`for i in range(n)` repeats code `n` times, with `i` taking values `0` through `n-1`.",
        codeTask: "Use a for loop with `range(1, 4)` to print `Crystal 1`, `Crystal 2`, `Crystal 3`.",
        starterCode: "# Loop with range(1, 4)\n",
        solutionCode: "for i in range(1, 4):\n    print(f'Crystal {i}')",
        testAssertion: "output.includes('Crystal 1') && output.includes('Crystal 3')",
        xpReward: 50,
        hints: ["for i in range(1, 4): print(f'Crystal {i}')"]
      },
      {
        id: "d6_sq2",
        title: "Side Quest 2: Iterating Spell Words",
        narrative: "Examine each character in an ancient rune word.",
        conceptExplanation: "`for char in string` loops over each letter in a string in order.",
        codeTask: "Given `rune = 'PYTHIA'`, loop over each character and print it.",
        starterCode: "rune = 'PYTHIA'\n# Loop over string\n",
        solutionCode: "rune = 'PYTHIA'\nfor char in rune:\n    print(char)",
        testAssertion: "output.includes('P') && output.includes('A')",
        xpReward: 50,
        hints: ["for char in rune: print(char)"]
      }
    ],
    miniBoss: {
      id: "d6_mb",
      bossName: "The Hydra of Repeating Heads",
      bossTitle: "Multi-Headed Beast",
      bossAvatar: "🐉",
      bossHp: 180,
      narrative: "The Hydra regenerates heads! You must strike all 4 heads in sequence to suppress it.",
      combatTask: "Use a for loop with `range(1, 5)` to print `Severed head 1` through `Severed head 4`.",
      starterCode: "# Defeat the hydra heads\n",
      solutionCode: "for head in range(1, 5):\n    print(f'Severed head {head}')",
      testAssertion: "output.includes('Severed head 1') && output.includes('Severed head 4')",
      xpReward: 150,
      lootReward: "Hydra Scale Shield"
    }
  },

  // --- DAY 7: WEEK 1 EPIC BOSS (HANDLED SEPARATELY VIA WEEKLY BOSS PAGE) ---
  {
    dayNumber: 7,
    title: "EPIC BOSS DUNGEON: Syntaxius the Unparsed",
    subtitle: "Week 1 Finale Challenge",
    chapterWeek: 1,
    category: "Weekly Boss",
    isWeeklyBossDay: true,
    subQuests: []
  },

  // --- WEEK 2: DATA STRUCTURES & FUNCTIONS ---
  {
    dayNumber: 8,
    title: "The Adventurer's Satchel",
    subtitle: "Lists, Tuples & Slicing",
    chapterWeek: 2,
    category: "Data structures",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d8_sq1",
        title: "Side Quest 1: Inventory List",
        narrative: "Store your equipment in an ordered Python list.",
        conceptExplanation: "Lists are created with `[]`: `items = ['sword', 'shield']`. Access by index starting at 0: `items[0]`.",
        codeTask: "Create list `satchel = ['potion', 'scroll', 'elixir']`. Add `'map'` to satchel using `.append()`. Print `satchel`.",
        starterCode: "satchel = ['potion', 'scroll', 'elixir']\n# Append 'map' and print\n",
        solutionCode: "satchel = ['potion', 'scroll', 'elixir']\nsatchel.append('map')\nprint(satchel)",
        testAssertion: "output.includes('map') && output.includes('potion')",
        xpReward: 50,
        hints: ["satchel.append('map')", "print(satchel)"]
      },
      {
        id: "d8_sq2",
        title: "Side Quest 2: Slicing the Treasure Map",
        narrative: "Extract sub-sections of a list using slice notation `[start:end]`.",
        conceptExplanation: "`list[1:3]` extracts items from index 1 up to (excluding) index 3.",
        codeTask: "Given `loot = ['gold', 'gem', 'ruby', 'diamond', 'relic']`. Print slice of the middle 3 items (`loot[1:4]`).",
        starterCode: "loot = ['gold', 'gem', 'ruby', 'diamond', 'relic']\n# Slice indices 1 to 4\n",
        solutionCode: "loot = ['gold', 'gem', 'ruby', 'diamond', 'relic']\nprint(loot[1:4])",
        testAssertion: "output.includes('gem') && output.includes('ruby') && output.includes('diamond')",
        xpReward: 50,
        hints: ["print(loot[1:4])"]
      }
    ],
    miniBoss: {
      id: "d8_mb",
      bossName: "The Mimic Chest",
      bossTitle: "Deceptive Treasure Beast",
      bossAvatar: "🧰",
      bossHp: 200,
      narrative: "The Mimic disguised itself as a chest! Remove its trick items to neutralize it.",
      combatTask: "Given `chest = ['gold', 'trap', 'gem']`. Remove `'trap'` using `.remove('trap')` or `.pop(1)` and print `chest`.",
      starterCode: "chest = ['gold', 'trap', 'gem']\n# Remove 'trap' and print\n",
      solutionCode: "chest = ['gold', 'trap', 'gem']\nchest.remove('trap')\nprint(chest)",
      testAssertion: "output.includes('gold') && output.includes('gem') && !output.includes('trap')",
      xpReward: 150,
      lootReward: "Key of True Inspection"
    }
  },
  {
    dayNumber: 9,
    title: "The Grimoire of Keys",
    subtitle: "Dictionaries & Labeled Data",
    chapterWeek: 2,
    category: "Data structures",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d9_sq1",
        title: "Side Quest 1: Character Sheet Dict",
        narrative: "Map character stats to key-value pairs inside a dictionary.",
        conceptExplanation: "Dictionaries use `{}` with `key: value` pairs: `hero = {'name': 'Kael', 'hp': 100}`.",
        codeTask: "Create dict `hero = {'class': 'Wizard', 'level': 5}`. Add key `'mana': 120`. Print `hero`.",
        starterCode: "hero = {'class': 'Wizard', 'level': 5}\n# Add mana and print\n",
        solutionCode: "hero = {'class': 'Wizard', 'level': 5}\nhero['mana'] = 120\nprint(hero)",
        testAssertion: "output.includes('mana') && output.includes('120')",
        xpReward: 50,
        hints: ["hero['mana'] = 120", "print(hero)"]
      },
      {
        id: "d9_sq2",
        title: "Side Quest 2: Iterating Dict Elements",
        narrative: "Loop over dictionary keys and values using `.items()`.",
        conceptExplanation: "`for key, val in d.items()` iterates key and value simultaneously.",
        codeTask: "Given `stats = {'str': 18, 'dex': 14, 'int': 20}`. Loop and print `f'{k}: {v}'` for each pair.",
        starterCode: "stats = {'str': 18, 'dex': 14, 'int': 20}\n# Loop with .items()\n",
        solutionCode: "stats = {'str': 18, 'dex': 14, 'int': 20}\nfor k, v in stats.items():\n    print(f'{k}: {v}')",
        testAssertion: "output.includes('str: 18') && output.includes('int: 20')",
        xpReward: 50,
        hints: ["for k, v in stats.items(): print(f'{k}: {v}')"]
      }
    ],
    miniBoss: {
      id: "d9_mb",
      bossName: "The Inventory Construct",
      bossTitle: "Guardian of the Key Vault",
      bossAvatar: "🤖",
      bossHp: 220,
      narrative: "The Construct requests a full tally of your potion counts from a dict!",
      combatTask: "Given `potions = {'health': 3, 'mana': 5, 'stamina': 2}`. Calculate total potions sum using `sum(potions.values())` and print.",
      starterCode: "potions = {'health': 3, 'mana': 5, 'stamina': 2}\n# Calculate sum of values and print\n",
      solutionCode: "potions = {'health': 3, 'mana': 5, 'stamina': 2}\nprint(sum(potions.values()))",
      testAssertion: "output.trim() === '10'",
      xpReward: 150,
      lootReward: "Vault Key Ring"
    }
  },
  {
    dayNumber: 10,
    title: "Sacred Circles - Sets & Tuples",
    subtitle: "Uniqueness & Immutability",
    chapterWeek: 2,
    category: "Data structures",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d10_sq1",
        title: "Side Quest 1: Purifying Uniques with Sets",
        narrative: "Use Python sets to strip out duplicate curses.",
        conceptExplanation: "Sets `{}` hold unique items only: `set([1, 2, 2, 3])` becomes `{1, 2, 3}`.",
        codeTask: "Given `raw_spells = ['fire', 'ice', 'fire', 'light', 'ice']`. Convert to set `unique_spells` and print `len(unique_spells)`.",
        starterCode: "raw_spells = ['fire', 'ice', 'fire', 'light', 'ice']\n# Convert to set and print length\n",
        solutionCode: "raw_spells = ['fire', 'ice', 'fire', 'light', 'ice']\nunique_spells = set(raw_spells)\nprint(len(unique_spells))",
        testAssertion: "output.trim() === '3'",
        xpReward: 50,
        hints: ["len(set(raw_spells))"]
      },
      {
        id: "d10_sq2",
        title: "Side Quest 2: Fixed Coordinates Tuple",
        narrative: "Store immutable map coordinates inside a tuple.",
        conceptExplanation: "Tuples `()` cannot be altered after creation. Unpack tuples: `x, y = coords`.",
        codeTask: "Given `spawn_point = (10, 25)`. Unpack into `x` and `y`. Print `f'X={x}, Y={y}'`.",
        starterCode: "spawn_point = (10, 25)\n# Unpack x, y\n",
        solutionCode: "spawn_point = (10, 25)\nx, y = spawn_point\nprint(f'X={x}, Y={y}')",
        testAssertion: "output.trim() === 'X=10, Y=25'",
        xpReward: 50,
        hints: ["x, y = spawn_point"]
      }
    ],
    miniBoss: {
      id: "d10_mb",
      bossName: "The Shadow Twin",
      bossTitle: "Doppelganger of the Sacred Circle",
      bossAvatar: "👤",
      bossHp: 240,
      narrative: "Find common spells between your spellbook set and your Shadow Twin's set!",
      combatTask: "Given `my_spells = {'fire', 'heal', 'shield'}` and `twin_spells = {'ice', 'heal', 'curse'}`. Find intersection using `my_spells & twin_spells` and print.",
      starterCode: "my_spells = {'fire', 'heal', 'shield'}\ntwin_spells = {'ice', 'heal', 'curse'}\n# Find set intersection and print\n",
      solutionCode: "my_spells = {'fire', 'heal', 'shield'}\ntwin_spells = {'ice', 'heal', 'curse'}\nprint(my_spells & twin_spells)",
      testAssertion: "output.includes('heal')",
      xpReward: 150,
      lootReward: "Mirror Shard of Truth"
    }
  },
  {
    dayNumber: 11,
    title: "While Loops & Infinite Depths",
    subtitle: "Sentinel Values & Condition Loops",
    chapterWeek: 2,
    category: "Control structures",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d11_sq1",
        title: "Side Quest 1: Draining Boss HP",
        narrative: "Keep striking with a while loop until the monster's HP drops to 0.",
        conceptExplanation: "`while condition:` repeats code as long as condition remains `True`.",
        codeTask: "Set `boss_hp = 30`. Write a while loop: while `boss_hp > 0`, subtract 10 from `boss_hp` and print `boss_hp`.",
        starterCode: "boss_hp = 30\n# While loop subtracting 10\n",
        solutionCode: "boss_hp = 30\nwhile boss_hp > 0:\n    boss_hp -= 10\n    print(boss_hp)",
        testAssertion: "output.includes('20') && output.includes('10') && output.includes('0')",
        xpReward: 50,
        hints: ["while boss_hp > 0: boss_hp -= 10; print(boss_hp)"]
      },
      {
        id: "d11_sq2",
        title: "Side Quest 2: Breaking the Curse",
        narrative: "Use `break` to exit a while loop when a special condition is triggered.",
        conceptExplanation: "`break` immediately terminates the loop regardless of condition.",
        codeTask: "Set `count = 1`. Write infinite loop `while True:`. Print `count`. If `count == 3`, `break`. Increment `count += 1`.",
        starterCode: "count = 1\n# while True with break\n",
        solutionCode: "count = 1\nwhile True:\n    print(count)\n    if count == 3:\n        break\n    count += 1",
        testAssertion: "output.includes('1') && output.includes('2') && output.includes('3') && !output.includes('4')",
        xpReward: 50,
        hints: ["Use if count == 3: break inside while True"]
      }
    ],
    miniBoss: {
      id: "d11_mb",
      bossName: "The Endless Kraken",
      bossTitle: "Tentacle of the Abyss",
      bossAvatar: "🐙",
      bossHp: 260,
      narrative: "The Kraken regenerates unless you break its stamina counter down to zero!",
      combatTask: "Set `stamina = 50`. While `stamina > 0`, subtract `15`. Print `stamina` inside loop.",
      starterCode: "stamina = 50\n# While loop subtracting 15\n",
      solutionCode: "stamina = 50\nwhile stamina > 0:\n    stamina -= 15\n    print(stamina)",
      testAssertion: "output.includes('35') && output.includes('20') && output.includes('5') && output.includes('-10')",
      xpReward: 150,
      lootReward: "Kraken Tooth Dagger"
    }
  },
  {
    dayNumber: 12,
    title: "Crafting Custom Incantations",
    subtitle: "Functions, Parameters & Return Values",
    chapterWeek: 2,
    category: "Functions and modules",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d12_sq1",
        title: "Side Quest 1: The Basic Spell Function",
        narrative: "Package magic actions into reusable functions using `def`.",
        conceptExplanation: "Define functions with `def name(params):`. Return values using `return`.",
        codeTask: "Define function `cast_fireball(power)` returning `power * 2`. Call `cast_fireball(20)` and print the result.",
        starterCode: "# Define cast_fireball(power)\n\n",
        solutionCode: "def cast_fireball(power):\n    return power * 2\n\nprint(cast_fireball(20))",
        testAssertion: "output.trim() === '40'",
        xpReward: 50,
        hints: ["def cast_fireball(power): return power * 2"]
      },
      {
        id: "d12_sq2",
        title: "Side Quest 2: Default Parameter Wards",
        narrative: "Provide default fallback values for optional spell parameters.",
        conceptExplanation: "`def function(param=default_val):` supplies a fallback if argument is omitted.",
        codeTask: "Define `heal(amount=50)` returning `f'Healed {amount} HP'`. Call `heal()` with no args and print.",
        starterCode: "# Define heal(amount=50)\n\n",
        solutionCode: "def heal(amount=50):\n    return f'Healed {amount} HP'\n\nprint(heal())",
        testAssertion: "output.trim() === 'Healed 50 HP'",
        xpReward: 50,
        hints: ["def heal(amount=50): return f'Healed {amount} HP'"]
      }
    ],
    miniBoss: {
      id: "d12_mb",
      bossName: "The Alchemist of Functions",
      bossTitle: "Master Potion Weaver",
      bossAvatar: "🧪",
      bossHp: 280,
      narrative: "The Alchemist challenges you to combine two ingredient values into a master potion function!",
      combatTask: "Write function `brew_potion(herb, crystal)` returning `f'{herb} + {crystal} Potion'`. Call `brew_potion('Mandrake', 'Ruby')` and print.",
      starterCode: "# Define brew_potion(herb, crystal)\n\n",
      solutionCode: "def brew_potion(herb, crystal):\n    return f'{herb} + {crystal} Potion'\n\nprint(brew_potion('Mandrake', 'Ruby'))",
      testAssertion: "output.trim() === 'Mandrake + Ruby Potion'",
      xpReward: 150,
      lootReward: "Alchemist's Flask of Functions"
    }
  },
  {
    dayNumber: 13,
    title: "Scope, *args, and **kwargs",
    subtitle: "Arbitrary Arguments & Variable Bounds",
    chapterWeek: 2,
    category: "Functions and modules",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d13_sq1",
        title: "Side Quest 1: The Multi-Target *args Spell",
        narrative: "Accept an arbitrary number of spell targets using `*args`.",
        conceptExplanation: "`*args` captures extra positional arguments into a tuple.",
        codeTask: "Define `attack_all(*targets)` returning `len(targets)`. Call `attack_all('Goblin', 'Orc', 'Troll')` and print.",
        starterCode: "# Define attack_all(*targets)\n\n",
        solutionCode: "def attack_all(*targets):\n    return len(targets)\n\nprint(attack_all('Goblin', 'Orc', 'Troll'))",
        testAssertion: "output.trim() === '3'",
        xpReward: 50,
        hints: ["def attack_all(*targets): return len(targets)"]
      },
      {
        id: "d13_sq2",
        title: "Side Quest 2: Config **kwargs Incantation",
        narrative: "Pass keyword stats dynamically using `**kwargs`.",
        conceptExplanation: "`**kwargs` captures extra keyword arguments into a dictionary.",
        codeTask: "Define `configure_hero(**kwargs)` returning `kwargs.get('class_name', 'Adventurer')`. Call `configure_hero(class_name='Rogue')` and print.",
        starterCode: "# Define configure_hero(**kwargs)\n\n",
        solutionCode: "def configure_hero(**kwargs):\n    return kwargs.get('class_name', 'Adventurer')\n\nprint(configure_hero(class_name='Rogue'))",
        testAssertion: "output.trim() === 'Rogue'",
        xpReward: 50,
        hints: ["kwargs.get('class_name', 'Adventurer')"]
      }
    ],
    miniBoss: {
      id: "d13_mb",
      bossName: "The Spell-Weaver Chimera",
      bossTitle: "Beast of Infinite Arguments",
      bossAvatar: "🦁",
      bossHp: 300,
      narrative: "The Chimera demands a function that sums arbitrary numbers!",
      combatTask: "Write function `sum_mana(*values)` returning `sum(values)`. Call `sum_mana(10, 20, 30, 40)` and print.",
      starterCode: "# Define sum_mana(*values)\n\n",
      solutionCode: "def sum_mana(*values):\n    return sum(values)\n\nprint(sum_mana(10, 20, 30, 40))",
      testAssertion: "output.trim() === '100'",
      xpReward: 150,
      lootReward: "Chimera Horn of Unlimited Parameters"
    }
  },

  // --- DAY 14: WEEK 2 EPIC BOSS (HANDLED SEPARATELY) ---
  {
    dayNumber: 14,
    title: "EPIC BOSS DUNGEON: Arch-Mage Algorithma",
    subtitle: "Week 2 Finale Challenge",
    chapterWeek: 2,
    category: "Weekly Boss",
    isWeeklyBossDay: true,
    subQuests: []
  },

  // --- WEEK 3: OBJECT-ORIENTED PROGRAMMING, MODULES & FILE I/O ---
  {
    dayNumber: 15,
    title: "The Ancient Blueprint",
    subtitle: "Classes, Objects & Initializers",
    chapterWeek: 3,
    category: "Object-oriented programming",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d15_sq1",
        title: "Side Quest 1: Building the Hero Blueprint",
        narrative: "Define a class blueprint for objects in Python.",
        conceptExplanation: "Classes define custom object types. `__init__(self)` initializes instance attributes.",
        codeTask: "Create `class Companion:` with `__init__(self, name)` assigning `self.name = name`. Instantiate `c = Companion('Pippin')` and print `c.name`.",
        starterCode: "# Create Companion class\n\n",
        solutionCode: "class Companion:\n    def __init__(self, name):\n        self.name = name\n\nc = Companion('Pippin')\nprint(c.name)",
        testAssertion: "output.trim() === 'Pippin'",
        xpReward: 50,
        hints: ["class Companion: def __init__(self, name): self.name = name"]
      },
      {
        id: "d15_sq2",
        title: "Side Quest 2: Object Methods",
        narrative: "Give your class instances behavior by attaching methods.",
        conceptExplanation: "Methods are functions inside a class that take `self` as their first parameter.",
        codeTask: "Add method `greet(self)` to `Companion` returning `f'Hello, I am {self.name}!'`. Call `c.greet()` and print.",
        starterCode: "class Companion:\n    def __init__(self, name):\n        self.name = name\n    # Add greet method\n\nc = Companion('Pippin')\nprint(c.greet())",
        solutionCode: "class Companion:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f'Hello, I am {self.name}!'\n\nc = Companion('Pippin')\nprint(c.greet())",
        testAssertion: "output.trim() === 'Hello, I am Pippin!'",
        xpReward: 50,
        hints: ["def greet(self): return f'Hello, I am {self.name}!'"]
      }
    ],
    miniBoss: {
      id: "d15_mb",
      bossName: "The Automaton Sentry",
      bossTitle: "Clockwork Guardian",
      bossAvatar: "🤖",
      bossHp: 320,
      narrative: "Build a `Weapon` class to strike down the Automaton Sentry!",
      combatTask: "Create `class Weapon:` with `__init__(self, name, damage)` and method `stats(self)` returning `f'{self.name}: {self.damage} DMG'`. Instantiate `w = Weapon('Excalibur', 100)` and print `w.stats()`.",
      starterCode: "# Create Weapon class\n\n",
      solutionCode: "class Weapon:\n    def __init__(self, name, damage):\n        self.name = name\n        self.damage = damage\n    def stats(self):\n        return f'{self.name}: {self.damage} DMG'\n\nw = Weapon('Excalibur', 100)\nprint(w.stats())",
      testAssertion: "output.trim() === 'Excalibur: 100 DMG'",
      xpReward: 150,
      lootReward: "Blueprint of Object Engineering"
    }
  },
  {
    dayNumber: 16,
    title: "Lineage of Heroes",
    subtitle: "Inheritance & Polymorphism",
    chapterWeek: 3,
    category: "Object-oriented programming",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d16_sq1",
        title: "Side Quest 1: Inheriting Power",
        narrative: "Inherit attributes and methods from a parent class.",
        conceptExplanation: "`class Child(Parent):` inherits all methods from `Parent`.",
        codeTask: "Given `class Character: def speak(self): return '...'`. Create `class Wizard(Character)` and instantiate `w = Wizard()`. Print `w.speak()`.",
        starterCode: "class Character:\n    def speak(self):\n        return 'Greetings'\n\n# Inherit Wizard from Character\n",
        solutionCode: "class Character:\n    def speak(self):\n        return 'Greetings'\n\nclass Wizard(Character):\n    pass\n\nw = Wizard()\nprint(w.speak())",
        testAssertion: "output.trim() === 'Greetings'",
        xpReward: 50,
        hints: ["class Wizard(Character): pass"]
      },
      {
        id: "d16_sq2",
        title: "Side Quest 2: Method Overriding",
        narrative: "Override parent class methods to provide custom specialized behavior.",
        conceptExplanation: "Define a method with the same name in the child class to override the parent behavior.",
        codeTask: "In `Wizard`, override `speak(self)` to return `'I invoke magic!'`. Print `Wizard().speak()`.",
        starterCode: "class Character:\n    def speak(self):\n        return 'Greetings'\n\nclass Wizard(Character):\n    # Override speak\n    pass\n\nprint(Wizard().speak())",
        solutionCode: "class Character:\n    def speak(self):\n        return 'Greetings'\n\nclass Wizard(Character):\n    def speak(self):\n        return 'I invoke magic!'\n\nprint(Wizard().speak())",
        testAssertion: "output.trim() === 'I invoke magic!'",
        xpReward: 50,
        hints: ["def speak(self): return 'I invoke magic!'"]
      }
    ],
    miniBoss: {
      id: "d16_mb",
      bossName: "The Dragon Ancestor",
      bossTitle: "Wyrm of Ancient Lineage",
      bossAvatar: "🐲",
      bossHp: 350,
      narrative: "The Dragon Wyrm requires proof of super() inheritance calls!",
      combatTask: "Given `class Dragon: def __init__(self, hp): self.hp = hp`. Create subclass `FireDragon(Dragon)` calling `super().__init__(hp)` and setting `self.element = 'Fire'`. Instantiate `fd = FireDragon(500)` and print `f'{fd.element} Dragon: {fd.hp} HP'`.",
      starterCode: "class Dragon:\n    def __init__(self, hp):\n        self.hp = hp\n\n# Create FireDragon subclass\n",
      solutionCode: "class Dragon:\n    def __init__(self, hp):\n        self.hp = hp\n\nclass FireDragon(Dragon):\n    def __init__(self, hp):\n        super().__init__(hp)\n        self.element = 'Fire'\n\nfd = FireDragon(500)\nprint(f'{fd.element} Dragon: {fd.hp} HP')",
      testAssertion: "output.trim() === 'Fire Dragon: 500 HP'",
      xpReward: 150,
      lootReward: "Dragon Heart Sigil"
    }
  },
  {
    dayNumber: 17,
    title: "Mystical Encapsulation & Magic Methods",
    subtitle: "__str__, __len__ & Dunder Magic",
    chapterWeek: 3,
    category: "Object-oriented programming",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d17_sq1",
        title: "Side Quest 1: The String Representation Dunder",
        narrative: "Implement `__str__` to control how your object prints.",
        conceptExplanation: "`__str__(self)` defines the human-readable string representation returned when using `print(obj)`.",
        codeTask: "Create `class Spell:` with `__init__(self, name)` and `__str__(self)` returning `f'Spell: {self.name}'`. Print `Spell('Zap')`.",
        starterCode: "# Define Spell with __str__\n\n",
        solutionCode: "class Spell:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f'Spell: {self.name}'\n\nprint(Spell('Zap'))",
        testAssertion: "output.trim() === 'Spell: Zap'",
        xpReward: 50,
        hints: ["def __str__(self): return f'Spell: {self.name}'"]
      },
      {
        id: "d17_sq2",
        title: "Side Quest 2: The __len__ Inventory Magic",
        narrative: "Enable `len()` support on custom object collections using `__len__`.",
        conceptExplanation: "`__len__(self)` returns an integer defining the object's length when passed to `len()`.",
        codeTask: "Create `class Quiver:` holding `self.arrows = [1, 2, 3]`. Implement `__len__(self)` returning `len(self.arrows)`. Print `len(Quiver())`.",
        starterCode: "# Define Quiver with __len__\n\n",
        solutionCode: "class Quiver:\n    def __init__(self):\n        self.arrows = [1, 2, 3]\n    def __len__(self):\n        return len(self.arrows)\n\nprint(len(Quiver()))",
        testAssertion: "output.trim() === '3'",
        xpReward: 50,
        hints: ["def __len__(self): return len(self.arrows)"]
      }
    ],
    miniBoss: {
      id: "d17_mb",
      bossName: "The Rune Enchanter",
      bossTitle: "Master of Secret Dunders",
      bossAvatar: "🧙‍♂️",
      bossHp: 380,
      narrative: "Enchant a `Grimoire` class with `__len__` and `__str__`!",
      combatTask: "Create `class Grimoire:` with `self.pages = ['r1', 'r2', 'r3', 'r4']`. Add `__len__` returning page count and `__str__` returning `'Ancient Grimoire'`. Print `str(g)` and `len(g)`.",
      starterCode: "# Create Grimoire class\n\n",
      solutionCode: "class Grimoire:\n    def __init__(self):\n        self.pages = ['r1', 'r2', 'r3', 'r4']\n    def __len__(self):\n        return len(self.pages)\n    def __str__(self):\n        return 'Ancient Grimoire'\n\ng = Grimoire()\nprint(f'{g} has {len(g)} pages')",
      testAssertion: "output.trim() === 'Ancient Grimoire has 4 pages'",
      xpReward: 150,
      lootReward: "Tome of Dunder Mysteries"
    }
  },
  {
    dayNumber: 18,
    title: "Scrolls of Power - Modules & Imports",
    subtitle: "Standard Library, Math, Random & Datetime",
    chapterWeek: 3,
    category: "Functions and modules",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d18_sq1",
        title: "Side Quest 1: The Math Module Sanctuary",
        narrative: "Import mathematical tools from Python's standard library `math` module.",
        conceptExplanation: "`import math` provides math functions like `math.sqrt()`, `math.ceil()`, and constants like `math.pi`.",
        codeTask: "Import `math`. Calculate square root of 144 using `math.sqrt(144)`. Print result as integer.",
        starterCode: "# Import math and sqrt\n",
        solutionCode: "import math\nprint(int(math.sqrt(144)))",
        testAssertion: "output.trim() === '12'",
        xpReward: 50,
        hints: ["import math", "print(int(math.sqrt(144)))"]
      },
      {
        id: "d18_sq2",
        title: "Side Quest 2: JSON Scroll Serialization",
        narrative: "Convert Python data to and from JSON format using `json` module.",
        conceptExplanation: "`json.dumps(dict)` converts dict to JSON string; `json.loads(string)` parses string back to dict.",
        codeTask: "Import `json`. Given `data = {'hero': 'Kael', 'xp': 500}`. Convert to JSON string using `json.dumps()` and print.",
        starterCode: "import json\ndata = {'hero': 'Kael', 'xp': 500}\n# Convert to json string\n",
        solutionCode: "import json\ndata = {'hero': 'Kael', 'xp': 500}\nprint(json.dumps(data))",
        testAssertion: "output.includes('\"hero\": \"Kael\"') && output.includes('500')",
        xpReward: 50,
        hints: ["print(json.dumps(data))"]
      }
    ],
    miniBoss: {
      id: "d18_mb",
      bossName: "The Clockwork Chronomancer",
      bossTitle: "Master of Time & Modules",
      bossAvatar: "⏳",
      bossHp: 400,
      narrative: "The Chronomancer challenges you to format time using `datetime`!",
      combatTask: "Import `datetime`. Create `now = datetime.datetime(2026, 7, 24)`. Print `now.strftime('%Y-%m-%d')`.",
      starterCode: "import datetime\n# Format date 2026-07-24\n",
      solutionCode: "import datetime\nnow = datetime.datetime(2026, 7, 24)\nprint(now.strftime('%Y-%m-%d'))",
      testAssertion: "output.trim() === '2026-07-24'",
      xpReward: 150,
      lootReward: "Chronomancer's Pocket Watch"
    }
  },
  {
    dayNumber: 19,
    title: "Shielding from Chaos - Error & Exception Handling",
    subtitle: "Try, Except, Else & Custom Exceptions",
    chapterWeek: 3,
    category: "Control structures",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d19_sq1",
        title: "Side Quest 1: Deflecting Division by Zero",
        narrative: "Catch exceptions before they crash your spell script.",
        conceptExplanation: "`try:` contains code that might fail; `except ExceptionType:` handles the error gracefully.",
        codeTask: "Wrap `val = 10 / 0` in try/except `ZeroDivisionError`. If caught, print `'Division error prevented'`. ",
        starterCode: "# Try / except ZeroDivisionError\n",
        solutionCode: "try:\n    val = 10 / 0\nexcept ZeroDivisionError:\n    print('Division error prevented')",
        testAssertion: "output.trim() === 'Division error prevented'",
        xpReward: 50,
        hints: ["try: val = 10/0 except ZeroDivisionError: print(...)"]
      },
      {
        id: "d19_sq2",
        title: "Side Quest 2: Value Type Deflector",
        narrative: "Catch invalid type conversions when converting strings to integers.",
        conceptExplanation: "Converting a non-numeric string to integer raises `ValueError`.",
        codeTask: "Try converting `text = 'magic'` with `int(text)`. Catch `ValueError` and print `'Invalid number string'`.",
        starterCode: "text = 'magic'\n# Try int(text)\n",
        solutionCode: "try:\n    num = int(text)\nexcept ValueError:\n    print('Invalid number string')",
        testAssertion: "output.trim() === 'Invalid number string'",
        xpReward: 50,
        hints: ["except ValueError: print('Invalid number string')"]
      }
    ],
    miniBoss: {
      id: "d19_mb",
      bossName: "The Chaos Fiend",
      bossTitle: "Demon of Unhandled Exceptions",
      bossAvatar: "👾",
      bossHp: 420,
      narrative: "The Chaos Fiend throws missing dictionary keys at you! Deflect with KeyError exception handling.",
      combatTask: "Given `vault = {'key1': 'gold'}`. Try accessing `vault['key2']`. Catch `KeyError` and print `'Key not found in vault'`.",
      starterCode: "vault = {'key1': 'gold'}\n# Handle KeyError\n",
      solutionCode: "vault = {'key1': 'gold'}\ntry:\n    item = vault['key2']\nexcept KeyError:\n    print('Key not found in vault')",
      testAssertion: "output.trim() === 'Key not found in vault'",
      xpReward: 150,
      lootReward: "Shield of Exception Deflection"
    }
  },
  {
    dayNumber: 20,
    title: "Persistent Tomes - File I/O & Storage",
    subtitle: "Open, Read, Write & With Context Managers",
    chapterWeek: 3,
    category: "Functions and modules",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d20_sq1",
        title: "Side Quest 1: Writing to the Spell Log",
        narrative: "Persist text records using `with open('filename', 'w') as f:`.",
        conceptExplanation: "`with open(file, 'w') as f:` automatically handles opening and closing files safely.",
        codeTask: "Write `'Log: Quest completed'` to string buffer simulated file or variable, and print `'Saved successfully'`.",
        starterCode: "# Simulate file writing\nfile_content = ''\n# Set file_content = 'Log: Quest completed'\nfile_content = 'Log: Quest completed'\nprint(file_content)",
        solutionCode: "file_content = 'Log: Quest completed'\nprint(file_content)",
        testAssertion: "output.includes('Log: Quest completed')",
        xpReward: 50,
        hints: ["print(file_content)"]
      },
      {
        id: "d20_sq2",
        title: "Side Quest 2: Reading Saved Tomes",
        narrative: "Read line contents from persistent storage.",
        conceptExplanation: "`f.read()` or `f.readlines()` extracts file contents into strings or lists.",
        codeTask: "Given `log_lines = ['Level 10\\n', 'Mana 200\\n']`. Strip whitespace from first line and print.",
        starterCode: "log_lines = ['Level 10\\n', 'Mana 200\\n']\n# Print stripped line 1\n",
        solutionCode: "log_lines = ['Level 10\\n', 'Mana 200\\n']\nprint(log_lines[0].strip())",
        testAssertion: "output.trim() === 'Level 10'",
        xpReward: 50,
        hints: ["log_lines[0].strip()"]
      }
    ],
    miniBoss: {
      id: "d20_mb",
      bossName: "The Necromancer of Lost Records",
      bossTitle: "Keeper of Dead Data",
      bossAvatar: "💀",
      bossHp: 450,
      narrative: "The Necromancer requires parsing stored records to banish!",
      combatTask: "Given string `record = 'Hero:Kael,XP:1500,Status:Active'`. Split by comma `,`, then split each key-value pair by colon `:`, build a dict, and print `dict['XP']`.",
      starterCode: "record = 'Hero:Kael,XP:1500,Status:Active'\n# Parse record into dict\n",
      solutionCode: "record = 'Hero:Kael,XP:1500,Status:Active'\ndata = dict(item.split(':') for item in record.split(','))\nprint(data['XP'])",
      testAssertion: "output.trim() === '1500'",
      xpReward: 150,
      lootReward: "Tome of Permanent Preservation"
    }
  },

  // --- DAY 21: WEEK 3 EPIC BOSS (HANDLED SEPARATELY) ---
  {
    dayNumber: 21,
    title: "EPIC BOSS DUNGEON: Iron Colossus Automaton",
    subtitle: "Week 3 Finale Challenge",
    chapterWeek: 3,
    category: "Weekly Boss",
    isWeeklyBossDay: true,
    subQuests: []
  },

  // --- WEEK 4: FRAMEWORKS, EXTENSIONS, LIBRARIES & REAL-WORLD PYTHON ---
  {
    dayNumber: 22,
    title: "Realm of Virtual Envs & Package Alchemy",
    subtitle: "PIP, Virtualenv & Requirements",
    chapterWeek: 4,
    category: "Extensions",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d22_sq1",
        title: "Side Quest 1: Understanding Virtual Environments",
        narrative: "Learn how `python -m venv env` isolates dependencies.",
        conceptExplanation: "Virtual environments (`venv`) create isolated Python environments for each project.",
        codeTask: "Print `'Created venv: .venv'` to simulate creating an isolated virtual environment.",
        starterCode: "# Print virtualenv setup message\n",
        solutionCode: "print('Created venv: .venv')",
        testAssertion: "output.includes('Created venv: .venv')",
        xpReward: 50,
        hints: ["print('Created venv: .venv')"]
      },
      {
        id: "d22_sq2",
        title: "Side Quest 2: Requirements Specification",
        narrative: "Format package requirement strings for `pip install -r requirements.txt`.",
        conceptExplanation: "`requirements.txt` specifies packages and version constraints (e.g. `requests>=2.31.0`).",
        codeTask: "Create list `reqs = ['requests==2.31.0', 'pandas==2.2.0']`. Join with newline `\\n` and print.",
        starterCode: "reqs = ['requests==2.31.0', 'pandas==2.2.0']\n# Join with newline and print\n",
        solutionCode: "reqs = ['requests==2.31.0', 'pandas==2.2.0']\nprint('\\n'.join(reqs))",
        testAssertion: "output.includes('requests==2.31.0') && output.includes('pandas==2.2.0')",
        xpReward: 50,
        hints: ["print('\\n'.join(reqs))"]
      }
    ],
    miniBoss: {
      id: "d22_mb",
      bossName: "The Package Swarm",
      bossTitle: "Swarm of Conflicting Dependencies",
      bossAvatar: "🐝",
      bossHp: 480,
      narrative: "The Swarm throws version conflicts at you! Filter out outdated packages.",
      combatTask: "Given dict `packages = {'requests': '2.31.0', 'urllib3': '1.25.0', 'rich': '13.7.0'}`. Filter and print dict containing only packages with version starting with '2.' or '13.'.",
      starterCode: "packages = {'requests': '2.31.0', 'urllib3': '1.25.0', 'rich': '13.7.0'}\n# Filter packages\n",
      solutionCode: "packages = {'requests': '2.31.0', 'urllib3': '1.25.0', 'rich': '13.7.0'}\nfiltered = {k: v for k, v in packages.items() if v.startswith('2.') or v.startswith('13.')}\nprint(filtered)",
      testAssertion: "output.includes('requests') && output.includes('rich') && !output.includes('urllib3')",
      xpReward: 150,
      lootReward: "Pipmaster's Seal of Resolution"
    }
  },
  {
    dayNumber: 23,
    title: "Web Artifacts - Requests & APIs",
    subtitle: "HTTP Requests, REST APIs & Status Codes",
    chapterWeek: 4,
    category: "libraries",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d23_sq1",
        title: "Side Quest 1: Parsing API Responses",
        narrative: "Simulate an API request response parser.",
        conceptExplanation: "REST APIs exchange data using HTTP verbs (GET, POST) and JSON payloads.",
        codeTask: "Given `response = {'status': 200, 'data': {'hero': 'Kael', 'class': 'Wizard'}}`. Print `response['data']['hero']` if status is 200.",
        starterCode: "response = {'status': 200, 'data': {'hero': 'Kael', 'class': 'Wizard'}}\n# Check status and print hero name\n",
        solutionCode: "response = {'status': 200, 'data': {'hero': 'Kael', 'class': 'Wizard'}}\nif response['status'] == 200:\n    print(response['data']['hero'])",
        testAssertion: "output.trim() === 'Kael'",
        xpReward: 50,
        hints: ["if response['status'] == 200: print(response['data']['hero'])"]
      },
      {
        id: "d23_sq2",
        title: "Side Quest 2: Query Parameter Formatting",
        narrative: "Construct HTTP GET query parameter strings for API endpoints.",
        conceptExplanation: "URL query params follow `?key=val&key2=val2` structure.",
        codeTask: "Given dict `params = {'search': 'magic', 'limit': 10}`. Build string `'?' + '&'.join([f'{k}={v}' for k,v in params.items()])` and print.",
        starterCode: "params = {'search': 'magic', 'limit': 10}\n# Build query string\n",
        solutionCode: "params = {'search': 'magic', 'limit': 10}\nqs = '?' + '&'.join([f'{k}={v}' for k,v in params.items()])\nprint(qs)",
        testAssertion: "output.trim() === '?search=magic&limit=10'",
        xpReward: 50,
        hints: ["'?' + '&'.join(...)"]
      }
    ],
    miniBoss: {
      id: "d23_mb",
      bossName: "The Oracle of the Web API",
      bossTitle: "Guardian of the RESTful Spire",
      bossAvatar: "🔮",
      bossHp: 500,
      narrative: "The Oracle tests your ability to handle non-200 HTTP error codes gracefully!",
      combatTask: "Given status code `code = 404`. If `code == 200`, print `'Success'`. Elif `code == 404`, print `'Resource Not Found'`. Else print `'Server Error'`.",
      starterCode: "code = 404\n# HTTP status logic\n",
      solutionCode: "code = 404\nif code == 200:\n    print('Success')\nelif code == 404:\n    print('Resource Not Found')\nelse:\n    print('Server Error')",
      testAssertion: "output.trim() === 'Resource Not Found'",
      xpReward: 150,
      lootReward: "Orb of Endpoint Discovery"
    }
  },
  {
    dayNumber: 24,
    title: "CLI Magic - Building Command Line Frameworks",
    subtitle: "Argparse, Rich & Command Line Parsing",
    chapterWeek: 4,
    category: "Frameworks",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d24_sq1",
        title: "Side Quest 1: Parsing Command Arguments",
        narrative: "Build a CLI command parser simulating command line flag arguments.",
        conceptExplanation: "CLI tools process command-line arguments like `--flag value` to configure options.",
        codeTask: "Given list `sys_args = ['--attack', 'fireball', '--power', '50']`. Extract value following `'--power'` (convert to int) and print.",
        starterCode: "sys_args = ['--attack', 'fireball', '--power', '50']\n# Extract power value\n",
        solutionCode: "sys_args = ['--attack', 'fireball', '--power', '50']\npower_idx = sys_args.index('--power') + 1\nprint(int(sys_args[power_idx]))",
        testAssertion: "output.trim() === '50'",
        xpReward: 50,
        hints: ["sys_args.index('--power') + 1"]
      },
      {
        id: "d24_sq2",
        title: "Side Quest 2: Styled Terminal Output",
        narrative: "Format rich terminal text with color tags.",
        conceptExplanation: "CLI packages like `rich` allow styling text with tags like `[bold green]Message[/bold green]`.",
        codeTask: "Write a function `format_cli(msg, style)` returning `f'[{style}]{msg}[/{style}]'`. Call `format_cli('VICTORY', 'bold gold')` and print.",
        starterCode: "# Define format_cli\n\n",
        solutionCode: "def format_cli(msg, style):\n    return f'[{style}]{msg}[/{style}]'\n\nprint(format_cli('VICTORY', 'bold gold'))",
        testAssertion: "output.trim() === '[bold gold]VICTORY[/bold gold]'",
        xpReward: 50,
        hints: ["f'[{style}]{msg}[/{style}]'"]
      }
    ],
    miniBoss: {
      id: "d24_mb",
      bossName: "The Terminal Executioner",
      bossTitle: "Master of Command Flags",
      bossAvatar: "💻",
      bossHp: 520,
      narrative: "The Terminal Executioner requires a dispatch command map!",
      combatTask: "Given dict `commands = {'start': 'Game Initialized', 'stop': 'Game Terminated'}` and flag `action = 'start'`. Print `commands.get(action, 'Invalid Command')`.",
      starterCode: "commands = {'start': 'Game Initialized', 'stop': 'Game Terminated'}\naction = 'start'\n# Print mapped command result\n",
      solutionCode: "commands = {'start': 'Game Initialized', 'stop': 'Game Terminated'}\naction = 'start'\nprint(commands.get(action, 'Invalid Command'))",
      testAssertion: "output.trim() === 'Game Initialized'",
      xpReward: 150,
      lootReward: "Scepter of Terminal Mastery"
    }
  },
  {
    dayNumber: 25,
    title: "Web Realms - Web Frameworks Basics",
    subtitle: "FastAPI / Flask Routing & Endpoints",
    chapterWeek: 4,
    category: "Frameworks",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d25_sq1",
        title: "Side Quest 1: Building a Web Endpoint",
        narrative: "Define a web route handler returning JSON.",
        conceptExplanation: "Frameworks like FastAPI or Flask use decorators (`@app.get('/path')`) to map HTTP paths to Python functions.",
        codeTask: "Write a function `get_status_route()` returning dict `{'status': 'online', 'players': 42}`. Call and print JSON string.",
        starterCode: "import json\n# Define get_status_route\n",
        solutionCode: "import json\ndef get_status_route():\n    return {'status': 'online', 'players': 42}\n\nprint(json.dumps(get_status_route()))",
        testAssertion: "output.includes('\"status\": \"online\"') && output.includes('42')",
        xpReward: 50,
        hints: ["json.dumps(get_status_route())"]
      },
      {
        id: "d25_sq2",
        title: "Side Quest 2: Path Parameter Resolver",
        narrative: "Extract dynamic URL path parameters like `/heroes/{hero_id}`.",
        conceptExplanation: "Path parameters allow dynamic endpoints like `/items/101` where `item_id=101`.",
        codeTask: "Write function `get_hero_by_id(hero_id)` returning `f'Hero #{hero_id} loaded'`. Call `get_hero_by_id(7)` and print.",
        starterCode: "# Define get_hero_by_id\n\n",
        solutionCode: "def get_hero_by_id(hero_id):\n    return f'Hero #{hero_id} loaded'\n\nprint(get_hero_by_id(7))",
        testAssertion: "output.trim() === 'Hero #7 loaded'",
        xpReward: 50,
        hints: ["def get_hero_by_id(hero_id): return f'Hero #{hero_id} loaded'"]
      }
    ],
    miniBoss: {
      id: "d25_mb",
      bossName: "The Web Fortress Sentinel",
      bossTitle: "Guardian of the Microservice Gateway",
      bossAvatar: "🏰",
      bossHp: 540,
      narrative: "The Sentinel tests your route dispatch router dictionary!",
      combatTask: "Given router dict `routes = {'/api/health': '200 OK', '/api/hero': 'Hero Data'}`. Request path `path = '/api/health'`. Print `routes.get(path, '404 Not Found')`.",
      starterCode: "routes = {'/api/health': '200 OK', '/api/hero': 'Hero Data'}\npath = '/api/health'\n# Dispatch path\n",
      solutionCode: "routes = {'/api/health': '200 OK', '/api/hero': 'Hero Data'}\npath = '/api/health'\nprint(routes.get(path, '404 Not Found'))",
      testAssertion: "output.trim() === '200 OK'",
      xpReward: 150,
      lootReward: "Aegis of the Web Sentinel"
    }
  },
  {
    dayNumber: 26,
    title: "Data Sorcery - Libraries like Pandas & NumPy",
    subtitle: "DataFrames, Arrays & Transformations",
    chapterWeek: 4,
    category: "libraries",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d26_sq1",
        title: "Side Quest 1: Array Operations",
        narrative: "Perform vectorized mathematical transformations over numerical data.",
        conceptExplanation: "Libraries like NumPy operate over entire arrays simultaneously without explicit python loops.",
        codeTask: "Given list `damages = [10, 20, 30]`. Multiply each item by 2 using list comprehension (simulating array vectorization) and print.",
        starterCode: "damages = [10, 20, 30]\n# Multiply by 2\n",
        solutionCode: "damages = [10, 20, 30]\ndoubled = [d * 2 for d in damages]\nprint(doubled)",
        testAssertion: "output.includes('20') && output.includes('40') && output.includes('60')",
        xpReward: 50,
        hints: ["[d * 2 for d in damages]"]
      },
      {
        id: "d26_sq2",
        title: "Side Quest 2: DataFrame Filtering",
        narrative: "Filter records from a structured data table.",
        conceptExplanation: "DataFrames allow filtering rows based on condition expressions (e.g. `df[df['score'] > 80]`).",
        codeTask: "Given list of dicts `players = [{'name': 'A', 'score': 90}, {'name': 'B', 'score': 40}]`. Filter players with score > 50 and print their names list.",
        starterCode: "players = [{'name': 'A', 'score': 90}, {'name': 'B', 'score': 40}]\n# Filter score > 50\n",
        solutionCode: "players = [{'name': 'A', 'score': 90}, {'name': 'B', 'score': 40}]\nhigh_scorers = [p['name'] for p in players if p['score'] > 50]\nprint(high_scorers)",
        testAssertion: "output.includes('A') && !output.includes('B')",
        xpReward: 50,
        hints: ["[p['name'] for p in players if p['score'] > 50]"]
      }
    ],
    miniBoss: {
      id: "d26_mb",
      bossName: "The Data Leviathan",
      bossTitle: "Beast of the High-Dimensional Seas",
      bossAvatar: "🐉",
      bossHp: 560,
      narrative: "Compute mean statistical metrics across boss combat logs!",
      combatTask: "Given list `xp_gains = [100, 150, 200, 250, 300]`. Calculate average `sum(xp_gains) / len(xp_gains)` and print as float.",
      starterCode: "xp_gains = [100, 150, 200, 250, 300]\n# Calculate average\n",
      solutionCode: "xp_gains = [100, 150, 200, 250, 300]\navg = sum(xp_gains) / len(xp_gains)\nprint(avg)",
      testAssertion: "output.trim() === '200.0'",
      xpReward: 150,
      lootReward: "Scale of the Data Leviathan"
    }
  },
  {
    dayNumber: 27,
    title: "Game Engine Mechanics - Pygame & Capstone Compile",
    subtitle: "Game Loop, Sprites & Collision Math",
    chapterWeek: 4,
    category: "Frameworks",
    isWeeklyBossDay: false,
    subQuests: [
      {
        id: "d27_sq1",
        title: "Side Quest 1: The 60 FPS Game Loop Physics",
        narrative: "Calculated player movement vectors inside the frame update loop.",
        conceptExplanation: "In 2D game loops, player position updates every frame by adding velocity: `new_pos = pos + velocity`.",
        codeTask: "Write a function `update_player_pos(pos, velocity)` that returns `pos + velocity`. Call `update_player_pos(100, 5)` and print the result.",
        starterCode: "def update_player_pos(pos, velocity):\n    # Return pos + velocity\n    pass\n\nprint(update_player_pos(100, 5))\n",
        solutionCode: "def update_player_pos(pos, velocity):\n    return pos + velocity\n\nprint(update_player_pos(100, 5))",
        testAssertion: "output.includes('105')",
        xpReward: 50,
        hints: ["def update_player_pos(pos, velocity): return pos + velocity"]
      },
      {
        id: "d27_sq2",
        title: "Side Quest 2: Hitbox Collision Detection",
        narrative: "Detect if two sprite hitboxes overlap in 2D space.",
        conceptExplanation: "Collision detection checks if the distance between objects is less than their combined bounding radius.",
        codeTask: "Write a function `check_collision(x1, x2)` that returns `True` if `abs(x1 - x2) < 20` else `False`. Call `check_collision(50, 60)` and print.",
        starterCode: "def check_collision(x1, x2):\n    # Return True if abs(x1 - x2) < 20 else False\n    pass\n\nprint(check_collision(50, 60))\n",
        solutionCode: "def check_collision(x1, x2):\n    return abs(x1 - x2) < 20\n\nprint(check_collision(50, 60))",
        testAssertion: "output.includes('True')",
        xpReward: 50,
        hints: ["return abs(x1 - x2) < 20"]
      }
    ],
    miniBoss: {
      id: "d27_mb",
      bossName: "The Glitch Demon",
      bossTitle: "Master of Broken Frame Loops",
      bossAvatar: "👾",
      bossHp: 580,
      narrative: "Fix the frame counter inside the Glitch Demon's engine loop!",
      combatTask: "Initialize `frames = 0`. Write a `for` loop that runs 5 times, incrementing `frames += 1` on each iteration. At the end (outside the loop), print `f'Rendered frame {frames}'`.",
      starterCode: "frames = 0\n# Write for loop running 5 times, incrementing frames\n\nprint(f'Rendered frame {frames}')",
      solutionCode: "frames = 0\nfor _ in range(5):\n    frames += 1\n\nprint(f'Rendered frame {frames}')",
      testAssertion: "output.includes('Rendered frame 5')",
      xpReward: 150,
      lootReward: "Gem of 60 FPS Smoothness"
    }
  },

  // --- DAY 28: WEEK 4 FINAL EPIC BOSS (HANDLED SEPARATELY) ---
  {
    dayNumber: 28,
    title: "FINAL EPIC BOSS: Malakor the Overlord of Pythonia",
    subtitle: "Grand Finale - The Ultimate Capstone",
    chapterWeek: 4,
    category: "Weekly Boss",
    isWeeklyBossDay: true,
    subQuests: []
  }
].map((quest): Quest => ({
  ...quest,
  subQuests: quest.subQuests.map((sq: any): SubQuest => ({
    ...sq,
    archetypeVariant: WEEK1_ARCHETYPE_VARIANTS[sq.id] || sq.archetypeVariant,
  })),
}));
