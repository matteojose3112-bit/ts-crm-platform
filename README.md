# TypeScript CRM Platform

> A lightweight CRM workspace for organizing contacts, tracking opportunities, and managing sales follow-ups.

**Status:** MVP deployed; CI and GitHub Pages deployment passed  
**Primary language:** TypeScript  
**Frontend:** React + Vite  
**Live demo:** https://matteojose3112-bit.github.io/ts-crm-platform/

## Overview

Northstar CRM is a small-business sales workspace designed to make the customer pipeline easier to understand and act on. It combines a compact KPI dashboard, contact records, an opportunity board, and a follow-up queue.

All included people and companies are synthetic demonstration records.

## Implemented features

- Dashboard with open pipeline, won revenue, contact count, and follow-up metrics.
- Contact directory with live search across name, company, email, and stage.
- Add-contact form with basic field validation.
- Opportunity pipeline board with five stages: New, Qualified, Proposal, Won, and Lost.
- Update opportunity stages from the contact table or pipeline board.
- Follow-up task queue with completion toggles.
- Browser localStorage persistence for contact and task changes.
- Responsive layout for desktop, tablet, and mobile screens.
- Typed CRM models and unit tests for pipeline calculations, stage counts, search, and currency formatting.

## Technology

- TypeScript, React 18, Vite
- Vitest
- GitHub Actions CI
- GitHub Pages

## Run locally

Requires Node.js 22 or a compatible current LTS release.

```bash
npm install
npm run dev
```

Run tests and create a production build:

```bash
npm test
npm run build
npm run preview
```

## Demo data and persistence

The starter workspace is populated with fictional contacts, opportunity values, and follow-up tasks. Changes are saved in the current browser's localStorage. Use a private/incognito window or clear the site's local storage to restore the original sample workspace.

There is no server-side database, authentication, multi-user synchronization, or real email/calendar integration in this MVP. Do not enter confidential customer information.

## Deployment and checks

The public demo is published through GitHub Pages. The latest CI run (tests and production build) and the latest Pages deployment both completed successfully.

- [Live Northstar CRM demo](https://matteojose3112-bit.github.io/ts-crm-platform/)
- [Latest CI run](https://github.com/matteojose3112-bit/ts-crm-platform/actions/runs/44617813998)
- [Latest Pages deployment](https://github.com/matteojose3112-bit/ts-crm-platform/actions/runs/44617814072)

## Roadmap and changelog

- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

## Portfolio capabilities demonstrated

Typed frontend architecture, reusable React components, data modeling, business KPI calculations, CRUD-style workflows, local persistence, responsive UI design, unit testing, and CI/CD configuration.

## Current limitations

- Browser-local data only; no backend or cross-device synchronization.
- No authentication, roles, or team collaboration.
- No import/export or external CRM integrations yet.
- The public demo uses synthetic records; do not enter confidential customer data.
