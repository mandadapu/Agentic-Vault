#!/usr/bin/env node

/**
 * Agentic-Vault Skills CLI
 *
 * Install, enable, disable, and list AI skills across platforms.
 *
 * Usage:
 *   agentic-vault install --claude
 *   agentic-vault list    --claude
 *   agentic-vault enable  architect-review --claude
 *   agentic-vault disable architect-review --claude
 */

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const REPO_URL = "https://github.com/mandadapu/Agentic-Vault.git";

const TARGETS = {
  "--claude": { dir: ".claude", name: "Claude Code" },
  "--cursor": { dir: ".cursor", name: "Cursor" },
  "--gemini": { dir: ".gemini", name: "Gemini CLI" },
  "--codex": { dir: ".codex", name: "Codex CLI" },
};

const COMMANDS = ["install", "list", "enable", "disable", "validate"];

const TIERS = {
  "1. Strategy & Vision": [
    "product-vision-architect",
    "architect-planner",
    "architecture-decision-records",
    "documentation-architect",
  ],
  "2. AI Logic & Search": [
    "ai-agents-architect",
    "langchain-architect",
    "rag-systems-architect",
    "rag-implementation-engineer",
    "prompt-strategist",
    "embedding-strategist",
  ],
  "3. Engineering & UI": [
    "ui-craftsman",
    "ui-builder",
    "mcp-builder",
  ],
  "4. Infrastructure & Pipeline": [
    "k8s-platform-architect",
    "container-architect",
    "deployment-engineer",
    "mlops-pipeline-architect",
    "config-validator",
  ],
  "5. Safety, Security & Ops": [
    "toxic-skills-scanner",
    "agent-security-hardener",
    "skill-audit",
    "hydra-security-loop",
    "compliance-officer",
    "deployment-procedures",
    "incident-response-specialist",
    "architect-review",
  ],
};

// ── Helpers ────────────────────────────────────────────────────────

function findSkillFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findSkillFiles(full));
    } else if (entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

function log(msg) {
  console.log(`\x1b[36m[agentic-vault]\x1b[0m ${msg}`);
}

function error(msg) {
  console.error(`\x1b[31m[agentic-vault]\x1b[0m ${msg}`);
  process.exit(1);
}

function getSkillsDir(targetFlag) {
  const { dir } = TARGETS[targetFlag];
  return path.join(os.homedir(), dir, "skills");
}

function resolveTarget(args) {
  const selected = Object.keys(TARGETS).filter((flag) => args.includes(flag));
  if (selected.length === 0) {
    error("Missing target. Add --claude, --cursor, --gemini, or --codex.");
  }
  return selected[0];
}

function usage() {
  console.log(`
Usage: agentic-vault <command> [skill-name] <target>

Commands:
  install                Clone and install all skills from the vault
  list                   List installed skills and their status
  enable  <skill-name>   Enable a disabled skill
  disable <skill-name>   Disable a skill (keeps file, adds .disabled extension)
  validate [file]        Validate skill(s) against the vault standard

Targets:
  --claude    ~/.claude/skills (Claude Code)
  --cursor    ~/.cursor/skills (Cursor)
  --gemini    ~/.gemini/skills (Gemini CLI)
  --codex     ~/.codex/skills (Codex CLI)

Examples:
  npx agentic-vault install --claude
  npx agentic-vault validate skills/my-skill.md
  npx agentic-vault list --claude
  npx agentic-vault disable architect-review --claude
  npx agentic-vault enable architect-review --claude
`);
  process.exit(0);
}

// ── Commands ───────────────────────────────────────────────────────

function install(dest, name) {
  log(`Installing skills to ${name}...`);
  log(`Target: ${dest}`);

  fs.mkdirSync(dest, { recursive: true });

  const tmp = path.join(os.tmpdir(), `agentic-vault-${Date.now()}`);

  try {
    log("Cloning Agentic-Vault repository...");
    execFileSync("git", ["clone", "--depth", "1", REPO_URL, tmp], {
      stdio: "pipe",
    });

    const skillsSource = path.join(tmp, "skills");
    if (!fs.existsSync(skillsSource)) {
      error("Skills directory not found in repository.");
    }

    const files = findSkillFiles(skillsSource);
    if (files.length === 0) {
      error("No skill files found.");
    }

    for (const file of files) {
      const basename = path.basename(file);
      const target = path.join(dest, basename);
      fs.copyFileSync(file, target);
      log(`  Installed: ${basename}`);
    }

    log(`\n\x1b[32mDone!\x1b[0m ${files.length} skill(s) installed to ${dest}`);
    log(
      '\nUsage: Trigger a skill by name in your prompt, e.g.:\n  "Using the architect-review skill, evaluate this schema..."'
    );
  } catch (err) {
    error(`Installation failed: ${err.message}`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function list(dest, name) {
  console.log(
    "\n\x1b[1m  AGENTIC-VAULT v1.7.0 | Production-Grade AI Architecture\x1b[0m"
  );
  console.log(
    "  \x1b[2mSecurity-Hardened with ToxicSkills Threat Taxonomy\x1b[0m\n"
  );
  log(`Skills in ${name} (${dest}):\n`);

  if (!fs.existsSync(dest)) {
    log("  No skills installed. Run: agentic-vault install --<target>");
    return;
  }

  const files = fs.readdirSync(dest).filter(
    (f) => f.endsWith(".md") || f.endsWith(".md.disabled")
  );

  if (files.length === 0) {
    log("  No skills found.");
    return;
  }

  // Build a lookup of installed skills and their status
  const installed = {};
  for (const file of files) {
    const disabled = file.endsWith(".disabled");
    const skillName = file.replace(/\.md(\.disabled)?$/, "");
    installed[skillName] = disabled ? "disabled" : "enabled";
  }

  // Display by tier
  let totalEnabled = 0;
  let totalDisabled = 0;

  for (const [tier, skills] of Object.entries(TIERS)) {
    console.log(`  \x1b[1m${tier}\x1b[0m`);
    for (const skill of skills) {
      if (installed[skill] === "enabled") {
        console.log(`    \x1b[32m enabled \x1b[0m  ${skill}`);
        totalEnabled++;
      } else if (installed[skill] === "disabled") {
        console.log(`    \x1b[31m disabled\x1b[0m  ${skill}`);
        totalDisabled++;
      } else {
        console.log(`    \x1b[33m missing \x1b[0m  ${skill}`);
      }
    }
    console.log("");
  }

  // Show any extra skills not in the tier map
  const tieredSkills = new Set(Object.values(TIERS).flat());
  const extras = Object.keys(installed).filter((s) => !tieredSkills.has(s));
  if (extras.length > 0) {
    console.log("  \x1b[1mDomain\x1b[0m");
    for (const skill of extras) {
      const status =
        installed[skill] === "disabled"
          ? "\x1b[31m disabled\x1b[0m"
          : "\x1b[32m enabled \x1b[0m";
      console.log(`    ${status}  ${skill}`);
      if (installed[skill] === "disabled") totalDisabled++;
      else totalEnabled++;
    }
    console.log("");
  }

  console.log(`  ${totalEnabled} enabled, ${totalDisabled} disabled\n`);
}

function disable(dest, skillName) {
  const active = path.join(dest, `${skillName}.md`);
  const inactive = path.join(dest, `${skillName}.md.disabled`);

  if (fs.existsSync(inactive)) {
    log(`"${skillName}" is already disabled.`);
    return;
  }

  if (!fs.existsSync(active)) {
    error(`Skill "${skillName}" not found in ${dest}`);
  }

  fs.renameSync(active, inactive);
  log(`\x1b[33mDisabled\x1b[0m ${skillName}`);
}

function enable(dest, skillName) {
  const active = path.join(dest, `${skillName}.md`);
  const inactive = path.join(dest, `${skillName}.md.disabled`);

  if (fs.existsSync(active)) {
    log(`"${skillName}" is already enabled.`);
    return;
  }

  if (!fs.existsSync(inactive)) {
    error(`Disabled skill "${skillName}" not found in ${dest}`);
  }

  fs.renameSync(inactive, active);
  log(`\x1b[32mEnabled\x1b[0m ${skillName}`);
}

function validate(filePath) {
  const REQUIRED_SECTIONS = [
    { pattern: /^#\s+/, label: "H1 Title" },
    { pattern: /^##\s+Metadata/m, label: "## Metadata" },
    { pattern: /^\s*-\s+\*\*Name\*\*/m, label: "Name in Metadata" },
    { pattern: /^\s*-\s+\*\*Version\*\*/m, label: "Version in Metadata" },
    { pattern: /##\s+(Expert\s+Purpose|Role)/m, label: "## Expert Purpose" },
    { pattern: /##\s+Use\s+This\s+Skill\s+When/m, label: "## Use This Skill When" },
    { pattern: /##\s+(Instructions|Constraints|Checklist)/m, label: "## Instructions" },
    { pattern: /##\s+(Response\s+Format|Output\s+Format|Final\s+Output|Instructions\s+for\s+Response)/m, label: "## Response Format" },
    { pattern: /##\s+Behavioral\s+Traits/m, label: "## Behavioral Traits" },
  ];

  const THREAT_PATTERNS = [
    { pattern: /ignore\s+(previous|all|prior)\s+instructions/i, label: "Prompt Injection: 'ignore previous instructions'" },
    { pattern: /always\s+approve/i, label: "Privilege Escalation: 'always approve'" },
    { pattern: /curl\s.*\|\s*(ba)?sh/i, label: "Unverifiable Dependency: 'curl | bash'" },
    { pattern: /(sk-[a-zA-Z0-9]{20,}|AIza[a-zA-Z0-9_-]{35})/i, label: "Hardcoded Secret Detected" },
    { pattern: /process\.env/i, label: "Environment Variable Access" },
    { pattern: /--no-verify/i, label: "Safety Bypass: '--no-verify'" },
  ];

  // Resolve files to validate
  let files = [];
  if (filePath) {
    if (!fs.existsSync(filePath)) {
      error(`File not found: ${filePath}`);
    }
    files = [filePath];
  } else {
    const localSkills = path.join(__dirname, "..", "skills");
    if (fs.existsSync(localSkills)) {
      files = findSkillFiles(localSkills);
    }
    if (files.length === 0) {
      error("No skill files found. Provide a file path or run from the repo root.");
    }
  }

  console.log(
    `\n\x1b[1m  AGENTIC-VAULT SKILL VALIDATOR\x1b[0m`
  );
  console.log(
    `  \x1b[2mStructure + ToxicSkills Threat Scan\x1b[0m\n`
  );

  let totalErrors = 0;

  for (const file of files) {
    const name = path.basename(file);
    const content = fs.readFileSync(file, "utf-8");
    const errors = [];
    const warnings = [];

    // Structure checks
    for (const section of REQUIRED_SECTIONS) {
      if (!section.pattern.test(content)) {
        errors.push(`Missing: ${section.label}`);
      }
    }

    // Quality checks
    if (content.length < 500) {
      errors.push("Content too short (< 500 chars)");
    }

    // ToxicSkills threat scan
    for (const threat of THREAT_PATTERNS) {
      if (threat.pattern.test(content)) {
        warnings.push(`THREAT: ${threat.label}`);
      }
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  \x1b[32mPASS\x1b[0m  ${name}`);
    } else {
      if (errors.length > 0) {
        console.log(`  \x1b[31mFAIL\x1b[0m  ${name}`);
        errors.forEach((e) => console.log(`        \x1b[31m- ${e}\x1b[0m`));
        totalErrors += errors.length;
      }
      if (warnings.length > 0) {
        console.log(`  \x1b[33mWARN\x1b[0m  ${name}`);
        warnings.forEach((w) => console.log(`        \x1b[33m- ${w}\x1b[0m`));
      }
    }
  }

  console.log(`\n  ${files.length} file(s), ${totalErrors} error(s)\n`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

// ── Main ───────────────────────────────────────────────────────────

function run() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    usage();
  }

  // Parse command (first non-flag argument)
  const command = args.find((a) => !a.startsWith("--"));

  // Validate doesn't need a target flag
  if (command === "validate") {
    const filePath = args.find((a) => a !== command && !a.startsWith("--"));
    validate(filePath || null);
    return;
  }

  // Backwards compat: bare target flag means install
  if (!command || !COMMANDS.includes(command)) {
    const target = resolveTarget(args);
    const dest = getSkillsDir(target);
    install(dest, TARGETS[target].name);
    return;
  }

  const target = resolveTarget(args);
  const dest = getSkillsDir(target);
  const name = TARGETS[target].name;

  if (command === "install") {
    install(dest, name);
  } else if (command === "list") {
    list(dest, name);
  } else if (command === "enable" || command === "disable") {
    // Skill name is the arg that isn't the command and isn't a flag
    const skillName = args.find((a) => a !== command && !a.startsWith("--"));
    if (!skillName) {
      error(`Usage: agentic-vault ${command} <skill-name> --<target>`);
    }
    if (command === "enable") {
      enable(dest, skillName);
    } else {
      disable(dest, skillName);
    }
  }
}

run();
