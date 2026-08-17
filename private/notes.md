# Notes
## ChatGPT + Codex models
| Model / setup | Best for | Type of task | Approx. usage for you | Use when |
|---|---|---:|---:|---|
| **GPT-5.6 Sol — High** | Hard thinking, portfolio strategy, complex UX decisions, big rewrites, architecture discussions, difficult debugging plans | Thinking + reasoning + coding strategy | **25–35%** | When quality matters more than speed. Example: restructuring a case study, deciding IA, asking how to implement a feature safely |
| **GPT-5.6 Sol — Extra High** | Very difficult or high-impact work: repo-wide refactors, complex product/technical decisions, deep reviews | Deep reasoning + complex coding | **5–10%** | Use rarely, for the hardest tasks. Example: “inspect the whole architecture and propose a safe migration plan” |
| **GPT-5.6 Sol in Codex / Work** | Serious implementation in VS Code, multi-file changes, debugging, refactoring, metadata, routing, design-system consistency | Coding + development + reasoning | **30–40%** | Your main choice for Codex when it needs to understand the repo and not break existing patterns |
| **GPT-5.6 Terra in Codex / Work** | Everyday implementation, smaller features, component edits, CSS/Tailwind fixes, straightforward file changes | Coding + dev execution | **15–25%** | When the task is clear and not strategically risky. Example: “add this route,” “update metadata,” “fix spacing using existing tokens” |
| **GPT-5.6 Luna in Codex / Work** | Quick checks, simple edits, small fixes, fast code explanation | Fast coding support | **5–10%** | When speed matters and the task is low-risk. Example: “find where this string is defined,” “rename this label,” “explain this component” |
| **GPT-5.5 — High** | Normal ChatGPT thinking: portfolio critique, writing, UX feedback, Spanish/English help, planning | Thinking + writing + critique | **30–40%** | Good default for conversations like this one. Strong enough for most product/design discussion |
| **GPT-5.5 / Instant / Medium-style use** | Quick questions, small copy changes, translation, simple explanations | Fast everyday help | **10–20%** | Use when the answer doesn’t require deep context or careful reasoning |
| **GPT-5.4 / Mini-style models** | Very lightweight tasks only | Quick utility | **0–5%** | I’d mostly avoid these for portfolio/coding decisions. Fine for tiny questions, not for nuanced work |

| Situation | Choose |
|---|---|
| Long design/product thinking chat | **GPT-5.5 High** or **GPT-5.6 Sol High** |
| Important portfolio/career/UX decision | **GPT-5.6 Sol High** |
| Very hard architecture / repo strategy | **GPT-5.6 Sol Extra High** |
| Codex agent making meaningful code changes | **GPT-5.6 Sol** |
| Codex agent doing smaller clear tasks | **GPT-5.6 Terra** |
| Quick low-risk dev lookup/fix | **GPT-5.6 Luna** |