# Roadmap

Items are complete only when implemented and verified.

## Phase 1 — Working foundation

- [x] Establish the Vite, React, and TypeScript project structure.
- [x] Build a responsive CRM dashboard shell.
- [x] Add synthetic contacts, companies, opportunity values, and follow-up tasks.
- [x] Implement contact search and new-contact creation.
- [x] Implement pipeline stages and stage updates.
- [x] Add pipeline and won-revenue KPI calculations.
- [x] Add task completion controls.
- [x] Persist contact and task changes in browser localStorage.
- [x] Add unit tests for core CRM helper functions.
- [ ] Run the test suite and production build in CI.
- [ ] Verify a clean local setup from the documented instructions.

## Phase 2 — Core capabilities

- [ ] Add contact detail pages and richer activity timelines.
- [ ] Add edit and delete workflows with confirmation.
- [ ] Add CSV import/export for contacts.
- [ ] Add task creation, due-date editing, and filtering.
- [ ] Expand test coverage for validation, persistence, and UI interactions.

## Phase 3 — Public demonstration

- [x] Configure GitHub Actions CI workflow.
- [x] Add GitHub Pages build and deployment workflow.
- [ ] Enable GitHub Pages with GitHub Actions as the source in repository settings.
- [ ] Confirm CI and Pages deployment succeed.
- [ ] Verify the public application in a clean browser session.
- [ ] Publish the verified live URL in the README.
- [ ] Add screenshots and a short walkthrough.

## Phase 4 — Quality and expansion

- [ ] Add accessibility improvements and keyboard-flow review.
- [ ] Add error boundaries and safer local-storage handling.
- [ ] Consider a backend API and database for multi-user persistence.
- [ ] Add authentication and role-based access only with a properly secured backend.
- [ ] Review performance, privacy, and maintainability.
- [ ] Tag a stable release after acceptance checks pass.

## Definition of done

- A new user can run the app using documented instructions.
- Core business logic is covered by passing automated tests.
- The public demo is deployed and its primary workflows are verified.
- Demo records are synthetic and no private customer data or credentials are committed.
- Documentation reflects the actual feature set and limitations.
