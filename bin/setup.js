#!/usr/bin/env node

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO_URL = "https://github.com/mandadapu/Agentic-Vault.git";

function log(msg) {
  console.log(`\x1b[36m[agentic-vault]\x1b[0m ${msg}`);
}

function error(msg) {
  console.error(`\x1b[31m[agentic-vault]\x1b[0m ${msg}`);
  process.exit(1);
}

const TARGETS = {
  "--claude": { dir: ".claude", name: "Claude Code" },
  "--cursor": { dir: ".cursor", name: "Cursor" },
  "--gemini": { dir: ".gemini", name: "Gemini CLI" },
  "--codex": { dir: ".codex", name: "Codex CLI" },
};

function usage() {
  console.log(`
Usage: agentic-vault-skills <option>

Options:
  --claude    Install to ~/.claude/skills (Claude Code)
  --cursor    Install to ~/.cursor/skills (Cursor)
  --gemini    Install to ~/.gemini/skills (Gemini CLI)
  --codex     Install to ~/.codex/skills (Codex CLI)
  --help      Show this help message

Examples:
  npx agentic-vault-skills --claude
  npx agentic-vault-skills --cursor
`);
  process.exit(0);
}

function run() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    usage();
  }

  const selected = Object.keys(TARGETS).filter((flag) => args.includes(flag));

  if (selected.length === 0) {
    console.error("Missing required option. Choose a target:\n");
    usage();
  }

  for (const flag of selected) {
    const { dir, name } = TARGETS[flag];
    const dest = path.join(require("os").homedir(), dir, "skills");
    install(dest, name);
  }
}

function install(dest, name) {
  log(`Installing skills to ${name}...`);
  log(`Target: ${dest}`);

  // Ensure target directory exists
  fs.mkdirSync(dest, { recursive: true });

  // Clone into a temp directory
  const tmp = path.join(require("os").tmpdir(), `agentic-vault-${Date.now()}`);

  try {
    log("Cloning Agentic-Vault repository...");
    execFileSync("git", ["clone", "--depth", "1", REPO_URL, tmp], {
      stdio: "pipe",
    });

    const skillsSource = path.join(tmp, "skills");
    if (!fs.existsSync(skillsSource)) {
      error("Skills directory not found in repository.");
    }

    // Copy each skill file
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
    // Clean up temp directory
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

run();
