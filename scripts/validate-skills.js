#!/usr/bin/env node

/**
 * Agentic-Vault Skill Validator
 *
 * Validates that all skill markdown files in skills/ follow the
 * required structure. Run locally or in CI on pull requests.
 *
 * Usage:
 *   node scripts/validate-skills.js              # validate all skills
 *   node scripts/validate-skills.js file1.md ... # validate specific files
 */

const fs = require("fs");
const path = require("path");

const SKILLS_DIR = path.join(__dirname, "..", "skills");

// ── Required sections ──────────────────────────────────────────────
// Each skill must contain ALL of these H2 headings (case-insensitive content match).
const REQUIRED_SECTIONS = [
  {
    pattern: /^#\s+.+/m,
    name: "Title (H1)",
    hint: "Must start with a top-level heading: # Role: ...",
  },
  {
    pattern: /^##\s+metadata/im,
    name: "## Metadata",
    hint: "Include Name, Version, and Focus fields.",
  },
  {
    pattern: /^\s*-\s+\*\*Name\*\*/im,
    name: "Metadata → Name",
    hint: 'Add "- **Name**: your-skill-name" under Metadata.',
  },
  {
    pattern: /^\s*-\s+\*\*Version\*\*/im,
    name: "Metadata → Version",
    hint: 'Add "- **Version**: x.y" under Metadata.',
  },
  {
    pattern: /^##\s+(expert\s+purpose|purpose|role)/im,
    name: "## Expert Purpose / Purpose / Role",
    hint: "Describe what the skill does and its mission.",
  },
  {
    pattern: /^##\s+use\s+this\s+skill\s+when/im,
    name: "## Use This Skill When",
    hint: "List the scenarios where this skill should be activated.",
  },
  {
    pattern: /^##\s+(instructions|constraints|instructions\s+&\s+constraints|review\s+checklist|research\s+checklist)/im,
    name: "## Instructions / Constraints / Checklist",
    hint: "Define rules, constraints, or a checklist for the skill.",
  },
  {
    pattern: /^##\s+(response\s+format|output\s+format|instructions\s+for\s+response)/im,
    name: "## Response Format / Output Format",
    hint: "Specify the structured output the skill should produce.",
  },
  {
    pattern: /^##\s+behavioral\s+traits/im,
    name: "## Behavioral Traits",
    hint: "Define personality and decision-making characteristics.",
  },
];

// ── Quality checks ─────────────────────────────────────────────────
const QUALITY_CHECKS = [
  {
    name: "Minimum length",
    test: (content) => content.length >= 500,
    hint: "Skill files should be at least 500 characters to be meaningful.",
  },
  {
    name: "No empty file",
    test: (content) => content.trim().length > 0,
    hint: "File is empty.",
  },
  {
    name: "Has bullet points or tables",
    test: (content) => /^(\s*[-*]|\|)/m.test(content),
    hint: "Skills should use bullet points or tables for structured content.",
  },
  {
    name: "No TODO/FIXME placeholders",
    test: (content) => !/\b(TODO|FIXME|PLACEHOLDER|TBD)\b/i.test(content),
    hint: "Remove TODO/FIXME/TBD placeholders before submitting.",
  },
];

function findMdFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMdFiles(full));
    } else if (entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

// ── Validator ──────────────────────────────────────────────────────

function validateSkill(filePath) {
  const filename = path.basename(filePath);
  const content = fs.readFileSync(filePath, "utf-8");
  const errors = [];
  const warnings = [];

  // Check filename format: lowercase, hyphenated, .md extension
  if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(filename)) {
    errors.push({
      check: "Filename format",
      hint: 'Filename must be lowercase, hyphenated, and end in .md (e.g., "my-skill.md").',
    });
  }

  // Required sections
  for (const section of REQUIRED_SECTIONS) {
    if (!section.pattern.test(content)) {
      errors.push({ check: section.name, hint: section.hint });
    }
  }

  // Quality checks
  for (const check of QUALITY_CHECKS) {
    if (!check.test(content)) {
      warnings.push({ check: check.name, hint: check.hint });
    }
  }

  return { filename, errors, warnings };
}

function getSkillFiles(args) {
  // If specific files passed as arguments, use those
  if (args.length > 0) {
    return args.map((f) => (path.isAbsolute(f) ? f : path.resolve(f)));
  }

  // Otherwise validate all .md files in skills/
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`Skills directory not found: ${SKILLS_DIR}`);
    process.exit(1);
  }

  return findMdFiles(SKILLS_DIR);
}

// ── Main ───────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const files = getSkillFiles(args);

  if (files.length === 0) {
    console.log("No skill files found to validate.");
    process.exit(0);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  console.log(`\nValidating ${files.length} skill(s)...\n`);

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.error(`\x1b[31m  MISSING\x1b[0m ${file}`);
      totalErrors++;
      continue;
    }

    const result = validateSkill(file);

    if (result.errors.length === 0 && result.warnings.length === 0) {
      console.log(`\x1b[32m  PASS\x1b[0m  ${result.filename}`);
    } else {
      if (result.errors.length > 0) {
        console.log(`\x1b[31m  FAIL\x1b[0m  ${result.filename}`);
        for (const err of result.errors) {
          console.log(`\x1b[31m        ✗ ${err.check}\x1b[0m — ${err.hint}`);
        }
      }
      if (result.warnings.length > 0) {
        if (result.errors.length === 0) {
          console.log(`\x1b[33m  WARN\x1b[0m  ${result.filename}`);
        }
        for (const warn of result.warnings) {
          console.log(`\x1b[33m        ⚠ ${warn.check}\x1b[0m — ${warn.hint}`);
        }
      }
    }

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  console.log(
    `\n──────────────────────────────────────────────`
  );
  console.log(
    `Results: ${files.length} file(s), ${totalErrors} error(s), ${totalWarnings} warning(s)`
  );

  if (totalErrors > 0) {
    console.log(`\n\x1b[31mValidation failed.\x1b[0m Fix the errors above and try again.\n`);
    process.exit(1);
  }

  if (totalWarnings > 0) {
    console.log(`\n\x1b[33mPassed with warnings.\x1b[0m Consider addressing them.\n`);
  } else {
    console.log(`\n\x1b[32mAll skills valid.\x1b[0m\n`);
  }
}

main();
