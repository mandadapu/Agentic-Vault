# Agentic-Vault

A curated collection of high-performance AI skills and system prompts designed for LLMs (Claude, GPT-4o, Gemini). These aren't just "prompts"—they are structurally sound **AI Personas** hardened for production-grade engineering, architectural review, and complex domain analysis.

## Featured Skills

| Skill Name | Focus | Best For |
| :--- | :--- | :--- |
| **[architect-review](skills/architect-review.md)** | System Design | PR reviews, ADR drafting, Distributed Systems |
| **[mlops-engineer](skills/mlops-engineer.md)** | Infrastructure | RAG pipelines, LLM scaling, CI/CD for AI |
| **[legal-researcher](skills/legal-researcher.md)** | Domain Analysis | Deep research, document cross-referencing |

## How to Use

### For Claude (Web/Projects)
1. Copy the contents of the `.md` file from the `/skills` directory.
2. Paste it into your **Project Instructions** or **Custom Instructions**.
3. Trigger the skill by name (e.g., *"Using the architect-review skill, evaluate this schema..."*).

### For Claude Code (CLI)
Add the skill to your global or project-level `.claude.json` configuration to enable it across your local repositories.

## Principles of the Vault
Every skill in this repository is built on four core pillars:
1. **Trade-off Analysis:** No solution is perfect; every recommendation must weigh pros and cons.
2. **Context-Awareness:** Minimal generic advice; maximum alignment with project constraints.
3. **Risk Identification:** Proactively flagging "Type 1" (irreversible) decisions.
4. **Actionable Output:** Moving beyond theory to concrete "Refactored Views" and implementation steps.

## Contributing
Have a hardened skill you use daily? Pull requests are welcome! Please ensure your skill includes a "Response Approach" and clear "Safety/Constraints" sections.

## License

[MIT](LICENSE)

---
*Maintained by [mandadapu](https://github.com/mandadapu). Built for the next generation of AI-augmented engineering.*
