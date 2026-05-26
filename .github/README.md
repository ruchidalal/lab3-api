# Copilot Customization Structure

This repository uses a shared customization layout under `.github`:

- `copilot-instructions.md`: Always-on repository instructions
- `instructions/*.instructions.md`: File-targeted instructions via `applyTo`
- `prompts/*.prompt.md`: Reusable task prompts
- `agents/*.agent.md`: Reusable custom agents
- `skills/<name>/SKILL.md`: Reusable multi-step skills

Copy this structure to other repositories to standardize Copilot behavior.
