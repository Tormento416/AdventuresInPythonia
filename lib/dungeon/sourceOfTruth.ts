// lib/dungeon/sourceOfTruth.ts
// Real-world career insights, industry frameworks, and skill applications for every Python lesson.

export interface SourceOfTruthEntry {
  dayNumber: number;
  title: string;
  topic: string;
  careerImpact: string;
  industryTools: string[];
  practicalApplication: string;
  proTip: string;
}

export const SOURCE_OF_TRUTH: Record<number, SourceOfTruthEntry> = {
  1: {
    dayNumber: 1,
    title: "The Codex of Telemetry & Output Streams",
    topic: "Python Output, Strings & Print Mechanics",
    careerImpact: "Logging and output formatting are the foundation of cloud microservices, AI prompt engineering, and production debugging. 90% of production issues are diagnosed via structured log streams.",
    industryTools: ["Structured Logging (structlog / loguru)", "Prompt Engineering Pipelines", "AWS CloudWatch / GCP Cloud Logging"],
    practicalApplication: "In AI engineering, print/logging streams monitor token usage and prompt assembly. In cybersecurity, output streams broadcast real-time threat telemetry.",
    proTip: "Use f-strings (f'User: {username}') instead of string concatenation (+) for 3x faster performance and zero type-casting errors."
  },
  2: {
    dayNumber: 2,
    title: "The Tome of Memory & Variable Binding",
    topic: "Variables, Primitive Types & Memory Allocation",
    careerImpact: "Understanding object reference and type mutability in Python prevents silent state corruption in web backends and high-throughput data pipelines.",
    industryTools: ["Pydantic Data Models", "Python Type Hints (mypy)", "RAM Profile Memory Profilers"],
    practicalApplication: "Variables hold API request state, database connections, and model parameters (hyperparameters in ML, auth tokens in security).",
    proTip: "Everything in Python is an object! Variable assignment binds a label to a memory address, not a copy of the value."
  },
  3: {
    dayNumber: 3,
    title: "The Grimoire of String Interpolation",
    topic: "f-Strings, Slicing & Text Parsing",
    careerImpact: "Text manipulation powers NLP models, regex log filters, SQL query builders, and REST payload formatting across all software engineering domains.",
    industryTools: ["Regex (re module)", "Jinja2 Template Engines", "FastAPI Response Formatters"],
    practicalApplication: "Extracting IP addresses from server logs using slicing `log[12:27]`, or injecting dynamic variables into SQL / prompt templates safely.",
    proTip: "f-strings support expressions directly inside braces: `f'{amount * 1.08:.2f}'` formats currency instantly."
  },
  4: {
    dayNumber: 4,
    title: "The Compendium of Boolean Logic",
    topic: "Conditionals, Logic Gates & Branching",
    careerImpact: "Branching logic dictates authorization access controls, automated trading triggers, ML decision trees, and defensive security firewalls.",
    industryTools: ["FastAPI Auth Middleware", "Scikit-Learn Decision Trees", "Rule Engine Frameworks"],
    practicalApplication: "Security firewalls evaluate incoming packet headers: `if is_admin and valid_token and not ip_blacklisted:`.",
    proTip: "Python uses short-circuit evaluation: in `A and B`, if `A` is false, `B` is never evaluated."
  },
  5: {
    dayNumber: 5,
    title: "The Codex of Multi-Branch Decisioning",
    topic: "Elif Chains & Nested Control Flow",
    careerImpact: "Multi-branch decision logic classifies incoming web requests, categorizes data stream alerts, and selects AI model execution paths.",
    industryTools: ["Match-Case (Python 3.10+)", "State Machine Libraries", "HTTP Router Dispatchers"],
    practicalApplication: "Routing HTTP response codes: `200 OK`, `401 Unauthorized`, `404 Not Found`, `500 Server Error`.",
    proTip: "Prefer Python 3.10+ `match status:` over long `elif` chains for cleaner, faster pattern matching."
  },
  6: {
    dayNumber: 6,
    title: "The Tome of Iteration & Crystal Loops",
    topic: "For Loops, Range & Sequence Traversal",
    careerImpact: "Loop iteration fuels ETL batch data processing, game render loops, network port scanners, and neural network training epochs.",
    industryTools: ["Tqdm Progress Bars", "Itertools High-Speed Iterators", "Pygame Main Loop"],
    practicalApplication: "Processing 1,000,000 database records in batches, or iterating across game entities each frame.",
    proTip: "Avoid modifying a list while iterating over it! Create a copy or use list comprehension instead."
  },
  8: {
    dayNumber: 8,
    title: "The Grimoire of Sequence Arrays & Lists",
    topic: "Lists, Slicing & List Operations",
    careerImpact: "Lists are Python's primary dynamic array. Used for queue management, data batches, inventory lists, and feature vectors.",
    industryTools: ["NumPy NDArrays", "Pandas Series", "Collections Deque"],
    practicalApplication: "Maintaining real-time shopping cart items, user permission arrays, or image pixel color matrices.",
    proTip: "Use `list.append()` for O(1) additions. Inserting at index 0 (`list.insert(0, val)`) is O(N) — use `collections.deque` for fast double-ended queues!"
  },
  9: {
    dayNumber: 9,
    title: "The Compendium of Key-Value Spellbooks",
    topic: "Dictionaries & Hash Maps",
    careerImpact: "Dictionaries provide O(1) hash map lookups. They form the backbone of JSON APIs, MongoDB documents, and redis caching.",
    industryTools: ["JSON Serialization", "Redis In-Memory Key-Value", "GraphQL Resolvers"],
    practicalApplication: "Querying user profile data by ID: `users['user_102']['email']` instantly without scanning all users.",
    proTip: "Use `.get(key, default)` instead of `dict[key]` to avoid KeyError crashes when keys are missing."
  },
  10: {
    dayNumber: 10,
    title: "The Codex of Immutable Relics & Sets",
    topic: "Tuples & Unique Sets",
    careerImpact: "Tuples ensure immutable data integrity (DB rows, coordinates). Sets perform ultra-fast set operations (intersections, deduplication).",
    industryTools: ["Database Cursor Records", "Set Union & Intersection", "Immutable Data Structures"],
    practicalApplication: "Removing duplicate IP addresses from server logs in a single line: `unique_ips = set(raw_log_ips)`.",
    proTip: "Set membership checking (`val in my_set`) is O(1) constant time, compared to O(N) list search!"
  },
  11: {
    dayNumber: 11,
    title: "The Tome of Endless While Loops",
    topic: "While Loops & Sentinel Guarding",
    careerImpact: "While loops power event-driven microservices, socket connections, CLI shells, and game engine loops that run continuously.",
    industryTools: ["Asyncio Event Loops", "Socket Server Listeners", "Polling Daemon Services"],
    practicalApplication: "Waiting for a remote API response or keeping an HTTP server listening until shutdown signal.",
    proTip: "Always include a timeout or maximum retry guard in production while loops to prevent infinite CPU lockup!"
  },
  12: {
    dayNumber: 12,
    title: "The Grimoire of Function Forging",
    topic: "Functions, Parameters & Return Values",
    careerImpact: "Functions enable modular, reusable, and testable clean code across all enterprise architectures.",
    industryTools: ["PyTest Unit Testing", "DRY (Don't Repeat Yourself)", "Type Annotations"],
    practicalApplication: "Writing reusable payment processing, password hashing, or data normalization functions.",
    proTip: "Keep functions small and focused on a single responsibility (Single Responsibility Principle)."
  },
  13: {
    dayNumber: 13,
    title: "The Compendium of Variadic Magic",
    topic: "*args, **kwargs & Flexible Signatures",
    careerImpact: "Variadic arguments allow flexible framework APIs, decorator wrappers, and customizable library hooks.",
    industryTools: ["Decorator Pattern", "Wrapper Middleware", "Django / Flask View Handlers"],
    practicalApplication: "Writing custom logging decorators that wrap any function regardless of parameter count.",
    proTip: "`*args` captures extra positional args into a tuple; `**kwargs` captures keyword args into a dict."
  },
  15: {
    dayNumber: 15,
    title: "The Codex of Object Creation & Classes",
    topic: "Classes, Instantiation & Attributes",
    careerImpact: "Object-Oriented Programming (OOP) models complex domain entities in web frameworks, game engines, and enterprise software.",
    industryTools: ["ORM Frameworks (SQLAlchemy / Django ORM)", "Pydantic BaseModels", "UML Class Diagrams"],
    practicalApplication: "Modeling a `Hero`, `User`, `Account`, or `GameItem` with encapsulated properties and behaviors.",
    proTip: "Class attributes belong to the class itself; instance attributes (`self.hp`) belong to individual instances."
  },
  16: {
    dayNumber: 16,
    title: "The Tome of Constructor Rituals",
    topic: "__init__ Method & Self References",
    careerImpact: "Constructors initialize valid object state upon creation, enforcing invariants and setting up resources.",
    industryTools: ["Dependency Injection Frameworks", "Factory Pattern", "Dataclasses"],
    practicalApplication: "Initializing DB connection pools or establishing API client credentials when an object is created.",
    proTip: "`self` represents the specific instance being operated on. Never forget `self` as the first parameter of instance methods!"
  },
  17: {
    dayNumber: 17,
    title: "The Grimoire of Inheritance Citadels",
    topic: "Class Inheritance & Method Overriding",
    careerImpact: "Inheritance creates specialized sub-classes that extend base functionality without duplicating code.",
    industryTools: ["Base API Controller Classes", "Pygame Sprite Hierarchies", "Polymorphism"],
    practicalApplication: "Defining a base `Character` class and inheriting `Wizard`, `Rogue`, and `Warrior` sub-classes.",
    proTip: "Use `super().__init__(...)` to cleanly initialize parent class attributes before setting child attributes."
  },
  18: {
    dayNumber: 18,
    title: "The Compendium of Dunder Magic",
    topic: "Magic Methods (__str__, __repr__, __eq__, __len__)",
    careerImpact: "Dunder methods customize how objects interact with Python operators, built-in functions, and string formatting.",
    industryTools: ["Custom Collection Classes", "Operator Overloading", "Rich Console Formatting"],
    practicalApplication: "Allowing custom objects to be compared (`obj1 == obj2`), printed cleanly (`print(hero)`), or checked for length (`len(inventory)`).",
    proTip: "`__repr__` should return an unambiguous string that could recreate the object; `__str__` returns a friendly human-readable summary."
  },
  19: {
    dayNumber: 19,
    title: "The Codex of File I/O Crypts",
    topic: "File Reading, Writing & Context Managers",
    careerImpact: "File I/O and context managers manage persistent storage, config files, data logging, and resource cleanup.",
    industryTools: ["Context Managers (with statement)", "Pathlib Path Handling", "JSON / CSV Readers"],
    practicalApplication: "Loading game save states, writing audit logs, or parsing configuration YAML files.",
    proTip: "Always use `with open(...) as f:` to automatically close file handles even if an error occurs!"
  },
  20: {
    dayNumber: 20,
    title: "The Tome of Exception Bastions",
    topic: "Try / Except / Finally Error Handling",
    careerImpact: "Robust error handling prevents system crashes, sanitizes user input, and ensures high availability in production microservices.",
    industryTools: ["Sentry Error Tracking", "Custom Exception Classes", "Graceful Degradation"],
    practicalApplication: "Catching network timeouts, missing files, or invalid user inputs without letting the application crash.",
    proTip: "Catch specific exceptions (`except FileNotFoundError:`) rather than bare `except:` to avoid masking unintended bugs!"
  },
  22: {
    dayNumber: 22,
    title: "The Grimoire of Package Management & PyPI",
    topic: "Modules, Imports & Virtual Environments",
    careerImpact: "Package managers (pip, uv, poetry) enable using millions of open-source third-party libraries safely.",
    industryTools: ["uv / Poetry Package Managers", "Virtualenv (venv)", "PyPI Ecosystem"],
    practicalApplication: "Installing and managing dependencies for machine learning (NumPy, PyTorch), web (FastAPI), or gaming (Pygame).",
    proTip: "Always run your projects inside an isolated virtual environment (`venv`) to prevent system-wide package conflicts!"
  },
  23: {
    dayNumber: 23,
    title: "The Compendium of REST API Conjuring",
    topic: "HTTP Requests, JSON & Web Services",
    careerImpact: "REST APIs connect backends, third-party services (Stripe, OpenAI), mobile apps, and microservices across the internet.",
    industryTools: ["httpx / requests", "FastAPI / Flask", "Postman / Curl"],
    practicalApplication: "Fetching weather data, making AI model completions via OpenAI API, or processing credit card payments.",
    proTip: "Check response status codes (`response.status_code == 200`) before attempting to parse response JSON payload!"
  },
  24: {
    dayNumber: 24,
    title: "The Codex of Pandas Data Realms",
    topic: "DataFrames, Data Cleaning & Analytics",
    careerImpact: "Pandas is the industry standard data analysis library used by data scientists, financial analysts, and ML engineers worldwide.",
    industryTools: ["Pandas DataFrames", "Jupyter Notebooks", "BigQuery / SQL Interop"],
    practicalApplication: "Filtering 10,000,000 rows of user telemetry, computing aggregations, and generating financial reports.",
    proTip: "Use vectorized Pandas operations (`df['total'] = df['qty'] * df['price']`) instead of looping over rows — it's 100x faster!"
  },
  25: {
    dayNumber: 25,
    title: "The Tome of Rich Terminal Arts",
    topic: "Rich Terminal UI, Formatting & CLI",
    careerImpact: "Rich CLI tools improve developer ergonomics, internal DevOps dashboards, and command-line application interfaces.",
    industryTools: ["Rich Terminal Library", "Click / Typer CLI Frameworks", "Argparse"],
    practicalApplication: "Building beautifully formatted CLI deployment tools with progress bars, tables, and colored logs.",
    proTip: "Use `rich.print('[bold green]Success![/bold green]')` to create stunning colored terminal output instantly."
  },
  26: {
    dayNumber: 26,
    title: "The Grimoire of Pygame Sprite Forge",
    topic: "2D Game Loops, Canvas & Event Handling",
    careerImpact: "Game development teaches real-time event loops, state machines, collision math, and graphics rendering pipeline architecture.",
    industryTools: ["Pygame / Pygame-CE", "Canvas Game Loop Architecture", "Sprite Groups"],
    practicalApplication: "Building 2D indie games, interactive simulations, and graphical user interfaces.",
    proTip: "Delta time (`dt`) scaling ensures your game runs at the exact same speed regardless of monitor refresh rate or hardware FPS!"
  },
  27: {
    dayNumber: 27,
    title: "The Capstone Compile of Code Sovereignty",
    topic: "Full-Stack Project Synthesis & Deployment",
    careerImpact: "Synthesizing all 27 days of Python mastery into a production-ready application brings full software engineering sovereignty.",
    industryTools: ["Git Version Control", "Docker Containers", "CI/CD Deployment Pipelines"],
    practicalApplication: "Deploying production-grade Python web apps, security automation suites, or data analytics pipelines.",
    proTip: "Clean architecture, automated tests, and clear documentation make the difference between a prototype and production software."
  }
};
