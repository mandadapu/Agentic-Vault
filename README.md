# Agentic-Vault
**The Standard for Production-Grade AI Architecture.**

Agentic-Vault is a curated library of high-performance AI skills, system prompts, and architectural frameworks. Designed for AI Architects and MLOps Engineers, these tools move beyond basic chat, enabling LLMs to perform complex system design, autonomous agent orchestration, and secure tool integration.

## Distribution
Access the skills via GitHub or through our npm package:
```bash
npx agentic-vault-skills list --claude
```

### Quick Install
```bash
# Install all skills to your preferred platform
npx agentic-vault-skills install --claude    # Claude Code
npx agentic-vault-skills install --cursor    # Cursor
npx agentic-vault-skills install --gemini    # Gemini CLI
npx agentic-vault-skills install --codex     # Codex CLI
```

### Manage Skills Locally
```bash
npx agentic-vault-skills list --claude                    # View status
npx agentic-vault-skills disable architect-review --claude # Disable a skill
npx agentic-vault-skills enable architect-review --claude  # Re-enable
```

## The Vault

| Skill | Focus | Best For |
| :--- | :--- | :--- |
| **[product-vision-architect](skills/product-vision-architect.md)** | Product Discovery | Requirements orchestration, UI/data analysis, roadmapping |
| **[architect-planner](skills/architect-planner.md)** | Planning | Requirements discovery, trade-off evaluation, feasibility |
| **[architecture-decision-records](skills/architecture-decision-records.md)** | Documentation | ADR drafting, decision lifecycle, trade-off capture |
| **[architect-review](skills/architect-review.md)** | System Design | PR reviews, ADR drafting, Distributed Systems |
| **[ai-agents-architect](skills/ai-agents-architect.md)** | Agentic Systems | Multi-agent orchestration, tool design, guardrails |
| **[mcp-builder](skills/mcp-builder.md)** | Tool Integration | MCP servers, secure data access, transport design |
| **[deployment-engineer](skills/deployment-engineer.md)** | DevOps | CI/CD pipelines, GitOps, progressive delivery, DevSecOps |
| **[deployment-procedures](skills/deployment-procedures.md)** | Production Safety | Go/No-Go criteria, rollback strategy, blast radius control |
| **[incident-response-specialist](skills/incident-response-specialist.md)** | SRE | Incident command, root cause analysis, service restoration |
| **[mlops-engineer](skills/mlops-engineer.md)** | Infrastructure | RAG pipelines, LLM scaling, CI/CD for AI |
| **[legal-researcher](skills/legal-researcher.md)** | Domain Analysis | Deep research, document cross-referencing |

## Manual Usage

### For Claude (Web/Projects)
1. Copy the contents of the `.md` file from the `/skills` directory.
2. Paste it into your **Project Instructions** or **Custom Instructions**.
3. Trigger the skill by name (e.g., *"Using the architect-review skill, evaluate this schema..."*).

### For Claude Code (CLI)
Run `npx agentic-vault-skills install --claude` or add the skill to your global or project-level `.claude.json` configuration.

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
