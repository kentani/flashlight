# Codex feedback memory

This file is the durable, project-specific memory for feedback received while building おもちゃばこ. Keep only rules that are likely to improve future work in this repository.

## Active rules

### Autonomous feedback capture

- **Rule:** When the user gives implementation feedback that is reusable for this project, record the distilled rule in this file and apply it in the current task without requesting a separate approval for the local documentation update.
- **Rationale:** Feedback should improve the next Codex task as well as the current one.
- **Scope:** Local project instructions and implementation decisions only. This does not authorize a push, publication, deployment, deletion, or account/permission change.
- **Added:** 2026-09-19

## Entry format

Add new rules under `Active rules` using this format:

### Short rule name

- **Rule:** A concrete instruction that can be followed or checked.
- **Rationale:** Why it matters, if known.
- **Scope:** Files, features, or situations where it applies; note any exceptions.
- **Source:** Brief paraphrase of the user feedback; never include sensitive information.
- **Added:** YYYY-MM-DD
