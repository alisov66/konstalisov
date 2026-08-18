# AGENTS.md

This repository is a personal portfolio site built with Next.js App Router, TypeScript, Tailwind CSS v4, and pnpm.

## Project overview

- Framework: Next.js 16
- Runtime: React 19
- Language: TypeScript
- Styling: Tailwind CSS v4 plus shared design tokens in `src/styles`
- Package manager: pnpm
- Analytics: Vercel Analytics and Speed Insights

Konstantin Portfolio

A personal portfolio built with Next.js and TypeScript.

The project focuses on clarity, reusable design systems, accessibility, responsive layouts, and maintainable architecture rather than visual effects.

Design source of truth: Figma.

## Common commands

- `pnpm dev` — start the local development server
- `pnpm build` — create a production build
- `pnpm start` — run the production server
- `pnpm lint` — run ESLint

## Repository structure

- `src/app` — App Router pages, layout, metadata, sitemap, and robots
- `src/components` — page sections and reusable UI components
- `src/styles` — shared typography, spacing, color, radius, grid, and breakpoint tokens
- `src/data` — structured content used by pages
- `public` — static assets such as images and icons

## Working conventions

- Keep changes consistent with the existing App Router structure in `src/app`.
- Reuse shared tokens from `src/styles` before introducing one-off values.
- Keep UI components small and composable; section-level composition belongs in `src/components/sections`.
- Preserve the current visual language: warm neutral backgrounds, restrained accent color, and typography-driven layouts.
- Prefer server components by default; only add client components when interactivity requires them.
- When editing metadata or SEO behavior, check `src/app/seo.ts` and route-level `metadata` exports first.

## Validation

At minimum, run:

- `pnpm lint`

For changes that affect routing, metadata, or rendering behavior, also run:

- `pnpm build`

## Notes for future agents

- The current `README.md` is still the default Next.js scaffold, so rely on the codebase and package scripts over the README when they conflict.
- There is no dedicated test suite configured at the moment; linting and production build checks are the main validation paths.

## Working principles

- Figma is the source of truth for UI and interaction design.
- Inspect existing components, tokens, and patterns before creating new ones.
- Prefer reuse and composition over duplication.
- Keep implementations simple, readable, and maintainable.
- Make focused changes and avoid unrelated refactors.

## Design system

- Use existing design tokens from `src/styles` instead of hardcoded values.
- Do not introduce one-off colors, spacing, typography, radius, or breakpoint values when an existing token can be reused.
- Keep implementation aligned with Figma Variables and the existing design system.
- Create new tokens only when a value represents a reusable design decision.

## Component architecture

Follow this hierarchy:

Primitive → Composite → Section → Page

Guidelines:

- Primitive components solve a single UI problem.
- Composite components combine primitives into reusable patterns.
- Sections compose components into meaningful page areas.
- Pages should primarily orchestrate sections and content.

Avoid components that combine unrelated responsibilities or contain page-specific logic.

## Article system

Articles are built from reusable content blocks rather than custom layouts.

Current article flow blocks:

- Hero
- Section
- Subsection
- Media
- Body

Guidelines:

- Compose articles from existing blocks whenever possible.
- Use article spacing tokens instead of hardcoded spacing.
- Preserve consistent vertical rhythm across articles.
- Avoid creating article-specific layout components unless the pattern is reusable.

## Responsive design

- Desktop is the primary design reference.
- Use existing responsive tokens and breakpoints.
- Prefer token modes for responsive changes where available.
- Avoid introducing arbitrary breakpoint values.
- Keep mobile implementations consistent with the existing design system.

## Accessibility

- Use semantic HTML whenever possible.
- Prefer native interactive elements over custom implementations.
- Interactive components must support keyboard accessibility.
- Preserve accessible labels and focus states.

## Editing philosophy

When modifying existing code:

- Make the smallest change that solves the problem.
- Preserve existing architecture and naming conventions.
- Avoid unnecessary renaming or file restructuring.
- Do not reformat unrelated files.
- Reuse existing utilities and components before creating new ones.

## Design philosophy

This portfolio prioritizes clarity, hierarchy, consistency, and systems thinking over decorative UI.

Design decisions should:

- improve understanding,
- support usability,
- communicate structure,
- remain reusable beyond a single page.

Animations and visual effects should serve a functional purpose rather than exist only for decoration.