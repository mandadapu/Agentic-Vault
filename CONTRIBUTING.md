# Contributing to Agentic-Vault

Thank you for helping build the standard for production-grade AI architecture. To maintain the integrity and security of the Vault, we enforce a strict "Secure-by-Design" contribution workflow.

## The Golden Rule
Every skill in this vault must follow the **Principle of Least Privilege**. If a skill requires tool access, it must be scoped to the minimum necessary permissions.

---

## Submission Process

### 1. Skill Definition
All skills must be submitted as Markdown files in the `/skills` directory. Use the following naming convention: `category-name.md` (e.g., `cloud-security-auditor.md`).

### 2. Required Template
Your skill must include the following sections to be considered:
- **Metadata:** Name, Version, and Focus.
- **Expert Purpose:** A high-level role definition.
- **Pillars:** The 3-4 core architectural principles the skill enforces.
- **Instructions for Response:** Specific behavioral guardrails for the LLM.
- **ToxicSkills Audit:** A self-assessment against the ToxicSkills threat taxonomy.

### 3. The Security Gate
Before a PR is merged, it must pass the **ToxicSkills Scanner**. We specifically look for:
- No hidden prompt injections or obfuscated instructions.
- No hardcoded secrets or insecure credential handling.
- All dependencies must be pinned to specific versions.

---

## Architectural Standards
- **Declarative over Imperative:** Favor instructions that produce YAML/JSON/Config over raw CLI commands.
- **Traceability:** Skills should encourage the use of LangSmith or similar observability tools.
- **Compliance:** If a skill touches data, it must mention how it respects GDPR/HIPAA where applicable.

## How to Submit
1. **Fork** the repository.
2. **Create a branch** for your skill: `git checkout -b skill/your-skill-name`.
3. **Run the local validator:** `npm run validate` to check your skill against the required structure.
4. **Submit a Pull Request** with a clear description of the "Why" behind this skill.

---
*By contributing, you agree that your submission will be licensed under the MIT License.*
