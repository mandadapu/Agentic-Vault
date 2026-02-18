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

### Product & Vision
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[product-vision-architect](skills/product-vision-architect.md)** | Vision | Requirements orchestration, UI/data analysis, roadmapping |
| **[architect-planner](skills/architect-planner.md)** | Plan | Requirements discovery, trade-off evaluation, feasibility |

### AI & Logic
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[ai-agents-architect](skills/ai-agents-architect.md)** | Logic | Multi-agent orchestration, tool design, guardrails |
| **[langchain-architect](skills/langchain-architect.md)** | Orchestrate | LangChain/LangGraph, LCEL, agentic workflows, memory |
| **[prompt-strategist](skills/prompt-strategist.md)** | Prompts | Prompt engineering, CoT, few-shot, system instructions |
| **[rag-systems-architect](skills/rag-systems-architect.md)** | Retrieval | Semantic retrieval, RAG pipelines, GraphRAG, evaluation |
| **[rag-implementation-engineer](skills/rag-implementation-engineer.md)** | RAG Code | Vector DB integration, ingestion pipelines, retrieval logic |

### Search & Data
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[embedding-strategist](skills/embedding-strategist.md)** | Search | Vector search, chunking strategies, re-ranking |
| **[mcp-builder](skills/mcp-builder.md)** | Connect | MCP servers, secure data access, transport design |

### Frontend
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[ui-craftsman](skills/ui-craftsman.md)** | UI Craft | Intentional aesthetics, component craft, premium UI design |
| **[ui-builder](skills/ui-builder.md)** | UI Build | React, Next.js, state management, performance, a11y |

### Infrastructure
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[k8s-platform-architect](skills/k8s-platform-architect.md)** | Platform | Enterprise K8s, GitOps, service mesh, multi-tenancy |
| **[container-architect](skills/container-architect.md)** | Artifact | Docker optimization, multi-stage builds, image hardening |

### CI/CD & Ops
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[deployment-engineer](skills/deployment-engineer.md)** | Pipeline | CI/CD pipelines, GitOps, progressive delivery, DevSecOps |
| **[mlops-pipeline-architect](skills/mlops-pipeline-architect.md)** | ML Pipelines | Vertex AI/Kubeflow, model registry, feature stores, CT |
| **[config-validator](skills/config-validator.md)** | Validate | Schema enforcement, secret validation, drift detection |

### Safety & SRE
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[deployment-procedures](skills/deployment-procedures.md)** | Safeguard | Go/No-Go criteria, rollback strategy, blast radius control |
| **[incident-response-specialist](skills/incident-response-specialist.md)** | Command | Incident command, blameless post-mortems, runbooks |

### Governance
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[toxic-skills-scanner](skills/toxic-skills-scanner.md)** | Threat Scan | ToxicSkills taxonomy, prompt injection, malicious code detection |
| **[agent-security-hardener](skills/agent-security-hardener.md)** | Security | Skill auditing, injection prevention, threat modeling |
| **[compliance-officer](skills/compliance-officer.md)** | Compliance | GDPR, HIPAA, SOC2, PCI-DSS, audit trails |
| **[architecture-decision-records](skills/architecture-decision-records.md)** | Record | ADR drafting, decision lifecycle, trade-off capture |
| **[architect-review](skills/architect-review.md)** | Review | PR reviews, ADR drafting, Distributed Systems |
| **[documentation-architect](skills/documentation-architect.md)** | Memorialize | Codebase manuals, C4 model, ebook authoring |

### Domain
| Skill | Phase | Best For |
| :--- | :--- | :--- |
| **[mlops-engineer](skills/mlops-engineer.md)** | ML Ops | RAG pipelines, LLM scaling, CI/CD for AI |
| **[legal-researcher](skills/legal-researcher.md)** | Legal | Deep research, document cross-referencing |

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
