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
  "product-vision-architect"
  "architect-planner"
  "architecture-decision-records"
  "langchain-architect"
  "ai-agents-architect"
  "prompt-strategist"
  "rag-systems-architect"
  "rag-implementation-engineer"
  "embedding-strategist"
  "mcp-builder"
  "ui-craftsman"
  "ui-builder"
  "k8s-platform-architect"
  "container-architect"
  "deployment-engineer"
  "config-validator"
  "deployment-procedures"
  "incident-response-specialist"
  "toxic-skills-scanner"
  "agent-security-hardener"
  "compliance-officer"
  "documentation-architect"
  "architect-review"
  "mlops-pipeline-architect"
  "mlops-engineer"
  "legal-researcher"
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
echo "  The Vault (24 Skills) — Security-Hardened with ToxicSkills Taxonomy"
echo ""
echo "  1. Strategy & Vision:"
echo "      product-vision-architect         — Discover requirements"
echo "      architect-planner                — Evaluate technical paths"
echo "      architecture-decision-records    — Capture decisions"
echo "      documentation-architect          — Codebase manuals"
echo ""
echo "  2. AI Logic & Search:"
echo "      ai-agents-architect              — Multi-agent orchestration"
echo "      langchain-architect              — LLM chains & agents"
echo "      rag-systems-architect            — RAG pipelines & GraphRAG"
echo "      rag-implementation-engineer      — Vector DB & ingestion"
echo "      prompt-strategist                — System instructions & CoT"
echo "      embedding-strategist             — Vector search and retrieval"
echo ""
echo "  3. Engineering & UI:"
echo "      ui-craftsman                     — Intentional aesthetics"
echo "      ui-builder                       — React & Next.js engine"
echo "      mcp-builder                      — Integrate data and tools"
echo ""
echo "  4. Infrastructure & Pipeline:"
echo "      k8s-platform-architect           — Enterprise K8s & GitOps"
echo "      container-architect              — Docker & image hardening"
echo "      deployment-engineer              — CI/CD and GitOps"
echo "      mlops-pipeline-architect         — ML training automation"
echo "      config-validator                 — Schema and drift detection"
echo ""
echo "  5. Safety, Security & Ops:"
echo "      toxic-skills-scanner             — ToxicSkills threat taxonomy"
echo "      agent-security-hardener          — Skill auditing & threat defense"
echo "      compliance-officer               — GDPR, HIPAA, SOC2, audits"
echo "      deployment-procedures            — Go/No-Go and rollback"
echo "      incident-response-specialist     — Incident command"
echo "      architect-review                 — Audit design and code"
echo ""
