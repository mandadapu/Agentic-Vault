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

  for (const file of files) {
    const disabled = file.endsWith(".disabled");
    const skillName = file.replace(/\.md(\.disabled)?$/, "");
    const status = disabled
      ? "\x1b[31m disabled\x1b[0m"
      : "\x1b[32m enabled \x1b[0m";
    console.log(`  ${status}  ${skillName}`);
  }

  const enabled = files.filter((f) => !f.endsWith(".disabled")).length;
  const disabled = files.filter((f) => f.endsWith(".disabled")).length;
  console.log(`\n  ${enabled} enabled, ${disabled} disabled`);
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
