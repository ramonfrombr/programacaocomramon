# Agent Skills (this repo)

[Cursor Agent Skills](https://cursor.com/docs/context/skills) are markdown instruction packs the agent reads when a task matches the skill’s description. Skills in this folder are **project-scoped**: anyone who clones the repo gets the same agent context.

## Layout

```
.cursor/skills/
├── README.md                 # This file
└── <skill-name>/
    └── SKILL.md              # Required
```

Optional extras per skill (only when needed):

- `reference.md` — long reference material
- `examples.md` — usage examples
- `scripts/` — small helpers the agent may run

Do **not** put skills in `~/.cursor/skills-cursor/` — that path is reserved for Cursor’s built-in skills.

| Location | Scope |
|----------|--------|
| `.cursor/skills/` (here) | This repository / team |
| `~/.cursor/skills/` | All your projects (personal) |

**Git:** Commit `.cursor/skills/` so the team shares skills. Do not commit secrets or `.env` values inside skills.

## Skills vs rules

- **Skills** — workflows and domain knowledge; loaded when the description matches the task.
- **[`.cursor/rules/`](../rules/)** (optional) — always-on or file-scoped conventions.

Prefer skills for onboarding and domain models; use rules for lint-style conventions you want on every edit.

## How to add a skill

1. Create a directory: `.cursor/skills/<skill-name>/` (lowercase, hyphens; max 64 characters for `name`).
2. Add `SKILL.md` with YAML frontmatter and a concise markdown body (stay under ~500 lines; split detail into `reference.md` if needed).
3. Write the `description` in **third person**, stating **what** the skill covers and **when** to use it (include trigger terms the agent can match).
4. Choose invocation:
   - Omit `disable-model-invocation` (or set `false`) if the agent should auto-discover the skill from context.
   - Set `disable-model-invocation: true` if the skill should load only when the user explicitly asks for setup/debug or names the skill.
5. Open a **new Agent chat** in this repo and try a prompt that should trigger the skill to verify discovery.

### `SKILL.md` template

```markdown
---
name: my-skill-name
description: >-
  Summarizes what this skill does. Use when working on X, Y, or Z.
disable-model-invocation: true
---

# My Skill Title

## Quick reference

...
```

### Frontmatter fields

| Field | Required | Notes |
|-------|----------|--------|
| `name` | Yes | Lowercase letters, numbers, hyphens; max 64 chars; must match folder name |
| `description` | Yes | What + when + trigger terms; max 1024 chars |
| `disable-model-invocation` | No | Default behavior: omit for auto-discovery; `true` for explicit-only loading |

## Authoring guidelines

- No API keys, tokens, or `.env` values in skills — reference variable **names** only.
- Ground instructions in this repo (paths, scripts, schema) rather than generic framework guesses.
- Keep the main `SKILL.md` focused; link out to repo files (`prisma/schema.prisma`, `README.md`, etc.) instead of duplicating large docs.

## Skills in this project

| Skill | Purpose |
|-------|---------|
| `lms-domain` | LMS domain model, routes, payments, and data patterns |
| `local-dev-setup` | Local install, env, Prisma, and payment webhook debugging |

## Further reading

- [Cursor: Agent Skills](https://cursor.com/docs/context/skills)
- Cursor skill authoring (name, description, length): see the `create-skill` skill in Cursor’s built-in skills or your team’s skill guidelines
