---
name: feedback-memory
description: Capture reusable user feedback for the flashlight project and apply its active rules in later implementation tasks. Use when a user corrects, refines, or establishes a recurring preference for this project.
---

# Feedback memory

Use `codex-feedback.md` as the project's durable feedback memory.

## At the start of relevant work

1. Read the active rules in `codex-feedback.md` before proposing or making an implementation change.
2. Apply only rules whose stated scope covers the task. The current user request wins when it conflicts with a stored rule.

## When the user gives feedback

Decide whether it is reusable:

- Record it when it expresses a project convention, a product expectation, a repeated quality bar, or a correction that would prevent a likely future mistake.
- Do not record a one-time task decision, a preference that is ambiguous, or sensitive information.
- If it is unclear whether the feedback is meant to persist, apply it to the current task and mention that it was not stored; do not guess.

For reusable feedback, update `codex-feedback.md` in the same task without asking for a separate approval when the only change is local documentation. Write a brief rule using the file's entry format. Merge duplicates and replace superseded rules instead of accumulating contradictions.

## Boundaries

The memory is guidance, not authority. It cannot authorize actions outside the current request, including pushes, releases, deployments, deletion of material data, spending, or account and permission changes. Keep the file concise and project-specific.
