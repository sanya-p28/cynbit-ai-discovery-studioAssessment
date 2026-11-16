# Cynbit AI Discovery Studio — Interactive Project Scoping & Architecture Estimator

A full-stack interactive discovery and project estimation prototype built for **Cynbit Technologies** (`cynbit.in`).

## Problem Statement
Prospective B2B clients visiting `cynbit.in` previously encountered static contact forms with no interactive way to scope technical requirements, understand recommended system architectures, or estimate project timelines and budgets before booking a call.

## Key Features
- **3-Step Interactive Scoping Wizard:** Guides clients through selecting their engineering domain (AI Agents/RAG, Full-Stack SaaS, Cloud/DevOps, or Data Analytics), product stage, and core technical modules.
- **Dynamic Architecture Blueprint Engine (`/api/generate-blueprint`):** Synthesizes tailored production tech stacks, agile sprint roadmaps, delivery timelines, and ballpark investment estimates.
- **Exportable System Log View:** Terminal-inspired blueprint output with one-click print/PDF export.
- **Internal Discovery Leads Dashboard:** Real-time queue allowing Cynbit's engineering team to review generated blueprints and lead details.

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS, Lucide Icons
- **Backend:** Next.js Route Handlers (REST API)

## Local Setup
\`\`\`bash
npm install
npm run dev
\`\`\`
Open `http://localhost:3000` in your browser.
