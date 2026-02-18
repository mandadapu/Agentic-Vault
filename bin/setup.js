#!/usr/bin/env node

/**
 * Agentic-Vault Skills CLI
 *
 * Install, enable, disable, and list AI skills across platforms.
 *
 * Usage:
 *   agentic-vault-skills install --claude
 *   agentic-vault-skills list    --claude
 *   agentic-vault-skills enable  architect-review --claude
 *   agentic-vault-skills disable architect-review --claude
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

const COMMANDS = ["install", "list", "enable", "disable"];

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
    "compliance-officer",
    "deployment-procedures",
    "incident-response-specialist",
    "architect-review",
  ],
};

// ── Helpers ────────────────────────────────────────────────────────

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
Usage: agentic-vault-skills <command> [skill-name] <target>

Commands:
  install                Clone and install all skills from the vault
  list                   List installed skills and their status
  enable  <skill-name>   Enable a disabled skill
  disable <skill-name>   Disable a skill (keeps file, adds .disabled extension)

Targets:
  --claude    ~/.claude/skills (Claude Code)
  --cursor    ~/.cursor/skills (Cursor)
  --gemini    ~/.gemini/skills (Gemini CLI)
  --codex     ~/.codex/skills (Codex CLI)

Examples:
  npx agentic-vault-skills install --claude
  npx agentic-vault-skills list --claude
  npx agentic-vault-skills disable architect-review --claude
  npx agentic-vault-skills enable architect-review --claude
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

    const files = fs.readdirSync(skillsSource).filter((f) => f.endsWith(".md"));
    if (files.length === 0) {
      error("No skill files found.");
    }

    for (const file of files) {
      const src = path.join(skillsSource, file);
      const target = path.join(dest, file);
      fs.copyFileSync(src, target);
      log(`  Installed: ${file}`);
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
    "\n\x1b[1m  AGENTIC-VAULT v1.5.0 | Production-Grade AI Architecture\x1b[0m"
  );
  console.log(
    "  \x1b[2mSecurity-Hardened with ToxicSkills Threat Taxonomy\x1b[0m\n"
  );
  log(`Skills in ${name} (${dest}):\n`);

  if (!fs.existsSync(dest)) {
    log("  No skills installed. Run: agentic-vault-skills install --<target>");
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

// ── Main ───────────────────────────────────────────────────────────

function run() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    usage();
  }

  // Parse command (first non-flag argument)
  const command = args.find((a) => !a.startsWith("--"));

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
      error(`Usage: agentic-vault-skills ${command} <skill-name> --<target>`);
    }
    if (command === "enable") {
      enable(dest, skillName);
    } else {
      disable(dest, skillName);
    }
  }
}

run();
