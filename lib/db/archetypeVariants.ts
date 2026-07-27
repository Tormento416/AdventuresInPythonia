// lib/db/archetypeVariants.ts
// Specialized quest variants for all 7 archetypes across Week 1 subquests.

import { Archetype, SubQuest } from './models';

export type SubQuestVariantMap = Record<string, SubQuest['archetypeVariant']>;

export const WEEK1_ARCHETYPE_VARIANTS: SubQuestVariantMap = {
  // DAY 1 - SQ 1 (Print Statement)
  "d1_sq1": {
    wizard: {
      title: "Wizard Spell: Neural Prompt Init",
      narrative: "As an Archmage of Neural Logic, your first spell requires initializing the local LLM prompt pipeline.",
      codeTask: "Print: Initializing Neural Prompt Engine...",
      starterCode: "# Cast your neural print spell below\n",
      solutionCode: "print('Initializing Neural Prompt Engine...')",
      testAssertion: "output.includes('Initializing Neural Prompt Engine')",
    },
    rogue: {
      title: "Rogue Hack: Recon Signal",
      narrative: "As a Red Team Cyber Shadow, you breach the target network's telemetry channel.",
      codeTask: "Print: Target acquired: Network Node Alpha",
      starterCode: "# Send your shadow recon ping\n",
      solutionCode: "print('Target acquired: Network Node Alpha')",
      testAssertion: "output.includes('Target acquired')",
    },
    warrior: {
      title: "Warrior Cleave: Data Stream Log",
      narrative: "As a Titan of Data Analytics, you log the incoming raw data matrix stream.",
      codeTask: "Print: Data Stream Online: 10000 Records",
      starterCode: "# Log the data stream\n",
      solutionCode: "print('Data Stream Online: 10000 Records')",
      testAssertion: "output.includes('Data Stream Online')",
    },
    healer: {
      title: "Healer Ward: Sentinel Log Alert",
      narrative: "As a Blue Team Sentinel, you issue your first system security monitoring alert.",
      codeTask: "Print: Sentinel Ward Active: No Threats Detected",
      starterCode: "# Issue sentinel status log\n",
      solutionCode: "print('Sentinel Ward Active: No Threats Detected')",
      testAssertion: "output.includes('Sentinel Ward Active')",
    },
    trickster: {
      title: "Trickster Loop: Engine Boot Signal",
      narrative: "As a Master of Game Engines, you fire up the graphics render loop context.",
      codeTask: "Print: Pygame Viewport Initialized!",
      starterCode: "# Boot the engine viewport\n",
      solutionCode: "print('Pygame Viewport Initialized!')",
      testAssertion: "output.includes('Pygame Viewport Initialized')",
    },
    ranger: {
      title: "Ranger Arrow: REST Endpoint Signal",
      narrative: "As a Web Realm Navigator, you spin up your first REST service endpoint.",
      codeTask: "Print: REST API Server listening on port 8080",
      starterCode: "# Start REST API log\n",
      solutionCode: "print('REST API Server listening on port 8080')",
      testAssertion: "output.includes('REST API Server')",
    },
    tank: {
      title: "Tank Shield: OOP System Init",
      narrative: "As an Architect of Software Engineering, you boot the core Enterprise System module.",
      codeTask: "Print: System Core v1.0 Initialized Successfully",
      starterCode: "# Initialize system core\n",
      solutionCode: "print('System Core v1.0 Initialized Successfully')",
      testAssertion: "output.includes('System Core v1.0')",
    },
  },

  // DAY 1 - SQ 2 (Multiline Print)
  "d1_sq2": {
    wizard: {
      title: "Wizard Spell: Prompt Stack Logs",
      narrative: "Log both system instructions and user context prompt lines.",
      codeTask: "Print 'System Prompt: You are a helpful AI assistant' on line 1, and 'User Prompt: Analyze dungeon logs' on line 2.",
      starterCode: "# Print 2 prompt lines\n",
      solutionCode: "print('System Prompt: You are a helpful AI assistant')\nprint('User Prompt: Analyze dungeon logs')",
      testAssertion: "output.includes('System Prompt') && output.includes('User Prompt')",
    },
    rogue: {
      title: "Rogue Hack: Exploit Payload Header",
      narrative: "Transmit payload header and authorization token override.",
      codeTask: "Print 'Header: Authorization Bearer XYZ' on line 1, and 'Payload: Exploiting port 22' on line 2.",
      starterCode: "# Print payload header lines\n",
      solutionCode: "print('Header: Authorization Bearer XYZ')\nprint('Payload: Exploiting port 22')",
      testAssertion: "output.includes('Authorization Bearer') && output.includes('Payload:')",
    },
    warrior: {
      title: "Warrior Cleave: Data Matrix Metadata",
      narrative: "Output batch size and processing shape metadata.",
      codeTask: "Print 'Batch Size: 64' on line 1, and 'Matrix Dimensions: 500x500' on line 2.",
      starterCode: "# Output matrix stats\n",
      solutionCode: "print('Batch Size: 64')\nprint('Matrix Dimensions: 500x500')",
      testAssertion: "output.includes('Batch Size') && output.includes('Matrix Dimensions')",
    },
    healer: {
      title: "Healer Ward: Firewall Status Logs",
      narrative: "Record incoming firewall status and port block reports.",
      codeTask: "Print 'Firewall: Active' on line 1, and 'Port 80: Secure' on line 2.",
      starterCode: "# Print firewall logs\n",
      solutionCode: "print('Firewall: Active')\nprint('Port 80: Secure')",
      testAssertion: "output.includes('Firewall: Active') && output.includes('Port 80: Secure')",
    },
  },

  // DAY 2 - SQ 1 (Variables)
  "d2_sq1": {
    wizard: {
      title: "Wizard Spell: Model Parameters",
      narrative: "Store neural weights and model identifier in variables.",
      codeTask: "Set variable model_name = 'Llama-3' and temperature = 0.7. Print both.",
      starterCode: "# Store model_name and temperature\n",
      solutionCode: "model_name = 'Llama-3'\ntemperature = 0.7\nprint(model_name, temperature)",
      testAssertion: "output.includes('Llama-3') && output.includes('0.7')",
    },
    rogue: {
      title: "Rogue Hack: Secret Token & Target IP",
      narrative: "Store target IP and auth token in variables.",
      codeTask: "Set variable target_ip = '192.168.1.1' and secret_key = 'admin123'. Print both.",
      starterCode: "# Store target_ip and secret_key\n",
      solutionCode: "target_ip = '192.168.1.1'\nsecret_key = 'admin123'\nprint(target_ip, secret_key)",
      testAssertion: "output.includes('192.168.1.1') && output.includes('admin123')",
    },
    warrior: {
      title: "Warrior Cleave: Dataset Stats",
      narrative: "Store dataset row count and feature count.",
      codeTask: "Set variable row_count = 5000 and accuracy_score = 0.95. Print both.",
      starterCode: "# Store row_count and accuracy_score\n",
      solutionCode: "row_count = 5000\naccuracy_score = 0.95\nprint(row_count, accuracy_score)",
      testAssertion: "output.includes('5000') && output.includes('0.95')",
    },
  },

  // DAY 3 - SQ 1 (f-strings)
  "d3_sq1": {
    wizard: {
      title: "Wizard Spell: Prompt Interpolation",
      narrative: "Format prompt template with dynamic token values using f-strings.",
      codeTask: "Given topic = 'Python' and tokens = 120, print: 'Generating Python response with 120 tokens.' using an f-string.",
      starterCode: "topic = 'Python'\ntokens = 120\n# Use f-string\n",
      solutionCode: "topic = 'Python'\ntokens = 120\nprint(f'Generating {topic} response with {tokens} tokens.')",
      testAssertion: "output.includes('Generating Python response with 120 tokens.')",
    },
    rogue: {
      title: "Rogue Hack: Exploit Command Construction",
      narrative: "Construct dynamic shell command string using f-strings.",
      codeTask: "Given port = 443 and protocol = 'HTTPS', print: 'Attacking HTTPS on port 443.' using an f-string.",
      starterCode: "port = 443\nprotocol = 'HTTPS'\n# Use f-string\n",
      solutionCode: "port = 443\nprotocol = 'HTTPS'\nprint(f'Attacking {protocol} on port {port}.')",
      testAssertion: "output.includes('Attacking HTTPS on port 443.')",
    },
  },
};
