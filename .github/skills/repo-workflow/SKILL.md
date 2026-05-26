---
name: repo-workflow
description: "Repository-specific workflow for safe API updates with tests and verification. Use when implementing or refactoring endpoints or middleware."
---

# Repo Workflow

## Use This Skill When
- Adding or changing task API endpoints
- Updating middleware behavior
- Expanding test coverage for route behavior

## Workflow
1. Inspect impacted route or middleware files.
2. Implement minimal code changes.
3. Add or update tests for happy path and validation failures.
4. Run tests and fix regressions.
5. Provide a concise summary with modified files and test results.
