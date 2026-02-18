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
echo "  The Vault (23 Skills):"
echo ""
echo "  Product & Vision:"
echo "     1. product-vision-architect       — Vision: Discover requirements"
echo "     2. architect-planner              — Plan: Evaluate technical paths"
echo ""
echo "  AI & Logic:"
echo "     3. ai-agents-architect            — Logic: Design autonomous behavior"
echo "     4. langchain-architect            — Orchestrate: LLM chains & agents"
echo "     5. prompt-strategist              — Prompts: System instructions & CoT"
echo "     6. rag-systems-architect          — Retrieval: RAG pipelines & GraphRAG"
echo "     7. rag-implementation-engineer    — RAG Code: Vector DB & ingestion"
echo ""
echo "  Search & Data:"
echo "     8. embedding-strategist           — Search: Vector search and retrieval"
echo "     9. mcp-builder                    — Connect: Integrate data and tools"
echo ""
echo "  Frontend & UI:"
echo "    10. ui-craftsman                   — UI Craft: Intentional aesthetics"
echo "    11. ui-builder                     — UI Build: React & Next.js engine"
echo ""
echo "  Cloud & K8s:"
echo "    12. k8s-platform-architect         — Platform: Enterprise K8s & GitOps"
echo "    13. container-architect            — Artifact: Docker & image hardening"
echo ""
echo "  CI/CD & Ops:"
echo "    14. deployment-engineer            — Pipeline: CI/CD and GitOps"
echo "    15. mlops-pipeline-architect       — ML Pipelines: Training automation"
echo "    16. config-validator               — Validate: Schema and drift detection"
echo ""
echo "  Safety & SRE:"
echo "    17. deployment-procedures          — Safeguard: Go/No-Go and rollback"
echo "    18. incident-response-specialist   — Command: Incident response"
echo ""
echo "  Governance:"
echo "    19. agent-security-hardener        — Security: Skill auditing & threat defense"
echo "    20. compliance-officer             — Compliance: GDPR, HIPAA, SOC2, audits"
echo "    21. architecture-decision-records  — Record: Capture decisions"
echo "    22. architect-review               — Review: Audit design and code"
echo "    23. documentation-architect        — Memorialize: Codebase manuals"
echo ""
