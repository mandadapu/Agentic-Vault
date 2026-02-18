#!/bin/bash

# Agentic-Vault Repository Initializer
# Sets up the structure for GitHub and npm distribution
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/mandadapu/Agentic-Vault/main/setup.sh | bash
#   or
#   git clone https://github.com/mandadapu/Agentic-Vault.git && cd Agentic-Vault && bash setup.sh

set -e

REPO_URL="https://github.com/mandadapu/Agentic-Vault.git"
VAULT_DIR="Agentic-Vault"

echo ""
echo "  Initializing Agentic-Vault..."
echo ""

# ── Step 1: Clone if not already inside the repo ───────────────────
if [ ! -f "package.json" ] || ! grep -q "agentic-vault" package.json 2>/dev/null; then
  echo "[1/5] Cloning repository..."
  git clone --depth 1 "$REPO_URL" "$VAULT_DIR"
  cd "$VAULT_DIR"
else
  echo "[1/5] Already inside Agentic-Vault repo, skipping clone."
fi

# ── Step 2: Verify directory structure ─────────────────────────────
echo "[2/5] Verifying directory structure..."
mkdir -p skills bin scripts docs

# ── Step 3: Verify all skills exist ────────────────────────────────
echo "[3/5] Checking skills..."

EXPECTED_SKILLS=(
  "architect-review"
  "mlops-engineer"
  "legal-researcher"
  "ai-agents-architect"
  "mcp-builder"
  "architect-planner"
  "architecture-decision-records"
  "product-vision-architect"
  "deployment-engineer"
)

MISSING=0
for skill in "${EXPECTED_SKILLS[@]}"; do
  if [ -f "skills/${skill}.md" ]; then
    echo "  [ok] ${skill}"
  else
    echo "  [!!] ${skill} — MISSING"
    MISSING=$((MISSING + 1))
  fi
done

if [ "$MISSING" -gt 0 ]; then
  echo ""
  echo "  Warning: ${MISSING} skill(s) missing. Run 'git pull' to update."
fi

# ── Step 4: Validate skills ────────────────────────────────────────
echo "[4/5] Validating skill format..."
if [ -f "scripts/validate-skills.js" ]; then
  node scripts/validate-skills.js || echo "  Some skills need attention (see above)."
else
  echo "  Validator not found, skipping."
fi

# ── Step 5: Install dependencies ───────────────────────────────────
echo "[5/5] Installing npm package..."
if command -v npm &> /dev/null; then
  npm install --ignore-scripts --silent 2>/dev/null || true
  echo "  Done."
else
  echo "  npm not found, skipping. Install Node.js to use the CLI."
fi

# ── Summary ────────────────────────────────────────────────────────
SKILL_COUNT=$(ls skills/*.md 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo "  Setup complete!"
echo ""
echo "  Skills:  ${SKILL_COUNT} installed"
echo "  CLI:     npx agentic-vault-skills --help"
echo ""
echo "  Next steps:"
echo "    npx agentic-vault-skills install --claude   # Install to Claude Code"
echo "    npx agentic-vault-skills install --cursor   # Install to Cursor"
echo "    npm run validate                            # Validate all skills"
echo ""
echo "  Workflow:"
echo "    1. product-vision-architect  — Discover requirements"
echo "    2. architect-planner         — Evaluate technical paths"
echo "    3. architecture-decision-records — Record the decisions"
echo "    4. architect-review          — Audit design and code"
echo "    5. ai-agents-architect       — Design autonomous behavior"
echo "    6. mcp-builder               — Connect to data and tools"
echo "    7. deployment-engineer       — Ship it to production"
echo ""
