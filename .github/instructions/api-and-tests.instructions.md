---
applyTo: "src/**/*.ts,tests/**/*.ts"
description: "Conventions for route changes, middleware updates, and API tests in this repository."
---

When changing API code:
- Keep request validation near route handlers.
- Reuse existing error handling middleware patterns.
- Return JSON responses with stable field names.

When changing tests:
- Cover both happy path and validation failures.
- Assert status code and key response body fields.
- Keep tests deterministic and independent.
