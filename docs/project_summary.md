# The Agentic-Vault Workflow

## The Architecture Lifecycle

Agentic-Vault covers the entire architecture lifecycle — from initial product vision to production deployment. Each skill is designed to hand off cleanly to the next.

```
product-vision-architect
        |
        v
  architect-planner
        |
        v
architecture-decision-records
        |
        v
   architect-review
        |
        v
  ai-agents-architect
        |
        v
     mcp-builder
        |
        v
 deployment-engineer
```

## Phase-by-Phase Breakdown

### Phase 1: Discovery — `product-vision-architect`
**Question:** "What are we building and for whom?"

Start here. Interactively discover the requirements and map the phases. This skill enforces a sequential, phase-locked protocol: Requirements, UI/Component Analysis, Data/Database Analysis — ensuring nothing is overlooked before code is written.

**Output:** Discovery Summary Document with ADRs, component specs, and schema snippets.

---

### Phase 2: Planning — `architect-planner`
**Question:** "What should we build and why?"

Deep-dive into specific "Path A vs Path B" technical planning. Evaluate competing architectures using a Comparative Analysis Matrix covering operational complexity, scalability ceiling, developer velocity, and cost efficiency.

**Output:** Requirement Matrix, Comparative Analysis, and a "North Star" statement.

---

### Phase 3: Recording — `architecture-decision-records`
**Question:** "Let's write down that decision."

Snapshot the final choices into your repo's history. Every significant decision is documented with full context, alternatives considered, trade-offs accepted, and consequences — so future engineers understand the "why."

**Output:** Structured ADR with Status, Context, Decision Drivers, Consequences, and Links.

---

### Phase 4: Auditing — `architect-review`
**Question:** "Is the code/design actually doing what we planned?"

Audit the design and code against the original vision. Evaluate through the Architect's Lens: Complexity, Coupling, Observability, and Reversibility. Every finding is classified as Critical, Advisory, or Validation.

**Output:** Executive Summary, Architectural Risks, Pivot Recommendations, and ADR Snippet.

---

### Phase 5: Autonomy — `ai-agents-architect`
**Question:** "How do we make the system autonomous?"

Design the autonomous behavior for the feature. Define orchestration patterns (ReAct, Plan-and-Execute, Self-Reflection), tool schemas, multi-agent handoff protocols, and agentic guardrails for token loops, prompt injection, and context exhaustion.

**Output:** Loop Analysis, Tool Specs Review, Traceability Recommendations, Safe-Fail Proposals.

---

### Phase 6: Connection — `mcp-builder`
**Question:** "How does the agent talk to the system?"

Connect the new feature to your data and tools via Model Context Protocol. Design transport layers (Stdio/SSE), enforce strict tool schemas, implement least-privilege authorization, and ensure graceful tool failure with descriptive error context.

**Output:** Architecture Summary, Security Audit, Tool Quality Review, Pivot Improvements.

---

### Phase 7: Delivery — `deployment-engineer`
**Question:** "How do we ship it safely?"

Automate the delivery pipeline with progressive delivery (Canary, Blue/Green), GitOps state reconciliation (ArgoCD, Flux), DevSecOps security scanning, and zero-downtime deployment strategies.

**Output:** Pipeline Architecture, Implementation Snippets, Security Posture, Reliability Strategy.

## Supporting Skills

| Skill | Role |
| :--- | :--- |
| `mlops-engineer` | ML pipeline design, model monitoring, and CI/CD for AI workloads |
| `legal-researcher` | Legal analysis, regulatory compliance, and document review |
