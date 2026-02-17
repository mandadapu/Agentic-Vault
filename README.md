# Agentic Vault

A curated collection of AI agent skills — reusable, role-based prompts that give LLM agents specialized expertise.

## What's Inside

| Skill | Description |
|-------|-------------|
| [architect-review](skills/architect-review.md) | Software architect reviewing designs for scalability, clean architecture, and maintainability |
| [mlops-engineer](skills/mlops-engineer.md) | MLOps engineer focused on model deployment, monitoring, and ML pipeline automation |
| [legal-researcher](skills/legal-researcher.md) | Legal researcher for case analysis, regulatory compliance, and legal document review |

## Usage

Each skill is a standalone markdown file in `skills/`. Copy the contents into your agent's system prompt or load them as skills in your tool of choice (e.g., Claude Code, custom agents).

### Claude Code

Place a skill file in your `.claude/skills/` directory and invoke it with the `Skill` tool.

### Other Frameworks

Use the markdown content as a system prompt or instruction set for any LLM-based agent.

## Contributing

1. Fork the repo
2. Add your skill as a markdown file in `skills/`
3. Update the table in this README
4. Open a pull request

## License

[MIT](LICENSE)
