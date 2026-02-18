# Agentic-Vault
**The Standard for Production-Grade AI Architecture.**

Agentic-Vault is a curated library of high-performance AI skills, system prompts, and architectural frameworks. Designed for AI Architects and MLOps Engineers, these tools move beyond basic chat, enabling LLMs to perform complex system design, autonomous agent orchestration, and secure tool integration.

## Distribution
Access the skills via GitHub or through our npm package:
```bash
npx agentic-vault list --claude
```

### Quick Install
```bash
# Install all skills to your preferred platform
npx agentic-vault install --claude    # Claude Code
npx agentic-vault install --cursor    # Cursor
npx agentic-vault install --gemini    # Gemini CLI
npx agentic-vault install --codex     # Codex CLI
```

### Manage Skills Locally
```bash
npx agentic-vault list --claude                    # View status
npx agentic-vault disable architect-review --claude # Disable a skill
npx agentic-vault enable architect-review --claude  # Re-enable
```

## The Vault

### 1. Strategy & Vision
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[product-vision-architect](skills/01_strategy/product-vision-architect.md)** | Vision | Requirements orchestration, UI/data analysis, roadmapping |
| **[architect-planner](skills/01_strategy/architect-planner.md)** | Plan | Requirements discovery, trade-off evaluation, feasibility |
| **[architecture-decision-records](skills/01_strategy/architecture-decision-records.md)** | Record | ADR drafting, decision lifecycle, trade-off capture |
| **[documentation-architect](skills/01_strategy/documentation-architect.md)** | Memorialize | Codebase manuals, C4 model, ebook authoring |
| **[legal-researcher](skills/01_strategy/legal-researcher.md)** | Legal | Deep research, document cross-referencing |

### 2. AI Logic & Search
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[ai-agents-architect](skills/02_logic/ai-agents-architect.md)** | Logic | Multi-agent orchestration, tool design, guardrails |
| **[langchain-architect](skills/02_logic/langchain-architect.md)** | Orchestrate | LangChain/LangGraph, LCEL, agentic workflows, memory |
| **[rag-systems-architect](skills/02_logic/rag-systems-architect.md)** | Retrieval | Semantic retrieval, RAG pipelines, GraphRAG, evaluation |
| **[rag-implementation-engineer](skills/02_logic/rag-implementation-engineer.md)** | RAG Code | Vector DB integration, ingestion pipelines, retrieval logic |
| **[prompt-strategist](skills/02_logic/prompt-strategist.md)** | Prompts | Prompt engineering, CoT, few-shot, system instructions |
| **[embedding-strategist](skills/02_logic/embedding-strategist.md)** | Search | Vector search, chunking strategies, re-ranking |

### 3. Engineering & UI
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[ui-craftsman](skills/03_implementation/ui-craftsman.md)** | UI Craft | Intentional aesthetics, component craft, premium UI design |
| **[ui-builder](skills/03_implementation/ui-builder.md)** | UI Build | React, Next.js, state management, performance, a11y |
| **[mcp-builder](skills/03_implementation/mcp-builder.md)** | Connect | MCP servers, secure data access, transport design |

### 4. Infrastructure & Pipeline
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[k8s-platform-architect](skills/04_infra/k8s-platform-architect.md)** | Platform | Enterprise K8s, GitOps, service mesh, multi-tenancy |
| **[container-architect](skills/04_infra/container-architect.md)** | Artifact | Docker optimization, multi-stage builds, image hardening |
| **[deployment-engineer](skills/04_infra/deployment-engineer.md)** | Pipeline | CI/CD pipelines, GitOps, progressive delivery, DevSecOps |
| **[mlops-pipeline-architect](skills/04_infra/mlops-pipeline-architect.md)** | ML Pipelines | Vertex AI/Kubeflow, model registry, feature stores, CT |
| **[config-validator](skills/04_infra/config-validator.md)** | Validate | Schema enforcement, secret validation, drift detection |
| **[mlops-engineer](skills/04_infra/mlops-engineer.md)** | ML Ops | RAG pipelines, LLM scaling, CI/CD for AI |

### 5. Safety, Security & Ops
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[toxic-skills-scanner](skills/05_safety/toxic-skills-scanner.md)** | Threat Scan | ToxicSkills taxonomy, prompt injection, malicious code detection |
| **[agent-security-hardener](skills/05_safety/agent-security-hardener.md)** | Security | Skill auditing, injection prevention, threat modeling |
| **[skill-audit](skills/05_safety/skill-audit.md)** | Audit | Static security analysis, ToxicSkills detection, read-only audits |
| **[hydra-security-loop](skills/05_safety/hydra-security-loop.md)** | Red Team | Adversarial simulation, closed-loop hardening, automated red-teaming |
| **[compliance-officer](skills/05_safety/compliance-officer.md)** | Compliance | GDPR, HIPAA, SOC2, PCI-DSS, audit trails |
| **[deployment-procedures](skills/05_safety/deployment-procedures.md)** | Safeguard | Go/No-Go criteria, rollback strategy, blast radius control |
| **[incident-response-specialist](skills/05_safety/incident-response-specialist.md)** | Command | Incident command, blameless post-mortems, runbooks |
| **[architect-review](skills/05_safety/architect-review.md)** | Review | PR reviews, ADR drafting, Distributed Systems |

## Manual Usage

### For Claude (Web/Projects)
1. Copy the contents of the `.md` file from the `/skills` directory.
2. Paste it into your **Project Instructions** or **Custom Instructions**.
3. Trigger the skill by name (e.g., *"Using the architect-review skill, evaluate this schema..."*).

### For Claude Code (CLI)
Run `npx agentic-vault install --claude` or add the skill to your global or project-level `.claude.json` configuration.

## Why Agentic-Vault?
Most AI prompts focus on "what to write." Agentic-Vault focuses on **"how to think."**

- **Type 1 vs Type 2 Decisions:** Built-in logic to distinguish between irreversible and reversible choices.
- **Traceability:** Forces agents to log "Hidden Thoughts" for better observability.
- **Safety First:** Includes guardrails for token loops, prompt injection, and hallucination.

## Principles of the Vault
Every skill in this repository is built on four core pillars:
1. **Trade-off Analysis:** No solution is perfect; every recommendation must weigh pros and cons.
2. **Context-Awareness:** Minimal generic advice; maximum alignment with project constraints.
3. **Risk Identification:** Proactively flagging "Type 1" (irreversible) decisions.
4. **Actionable Output:** Moving beyond theory to concrete "Refactored Views" and implementation steps.

## Contributing
Have a hardened skill you use daily? Pull requests are welcome! All skills are validated against a standard structure on PR — run `npm run validate` locally to check before submitting.

Please ensure your skill includes:
- **Metadata** (Name, Version, Focus)
- **Use This Skill When** scenarios
- **Instructions & Constraints** with risk categorization
- **Response Format** for structured output
- **Behavioral Traits**

## License

[MIT](LICENSE)

---
*Maintained by [mandadapu](https://github.com/mandadapu). Built for the next generation of AI-augmented engineering.*
