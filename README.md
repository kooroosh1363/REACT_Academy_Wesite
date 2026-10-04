# PATHWAY — Curriculum & Prerequisite Planner

PATHWAY modernizes a 2023 React academy template into a testable curriculum-planning system.

The original repository presented a full online academy, but its implementation did not support those claims. It included navigation to routes that were never registered, fake enrollment and diploma actions, invented course pricing, fixed five-star ratings, placeholder instructors, fabricated success metrics, placeholder testimonials/content, and large decorative assets.

## Engineering identity

**PATHWAY — Curriculum & Prerequisite Planner**

The new project focuses on logic that can be implemented and tested honestly in a static frontend:

- structured course catalog
- prerequisite graph validation
- prerequisite-closed completion state
- course eligibility
- transitive prerequisite lookup
- cascade removal when a prerequisite is uncompleted
- catalog search
- track and level filtering
- deterministic sorting
- workload progress summaries
- local persistence recovery

## Curriculum invariant

A completed course is valid only when all of its prerequisites are also completed.

For example:

```text
Web Foundations
      │
      ▼
JavaScript Systems
      ├──────────────► State Modeling & Recovery
      │
      ▼
React Interface Engineering
      │
      ▼
Accessibility & Quality Gates
      │
      └──────────────┐
                     ▼
              Delivery, CI & Static Hosting
```

If `JavaScript Systems` is marked incomplete, any completed dependent courses that can no longer satisfy the graph are removed as well.

## Architecture

```text
src/data/curriculum.js
        │
        ▼
src/lib/curriculumPolicy.js
        ├─ catalog validation
        ├─ persisted-state sanitization
        ├─ prerequisite closure
        ├─ course status
        ├─ eligibility
        ├─ cascade completion transitions
        ├─ filtering / sorting
        └─ workload progress
        │
        ▼
src/App.jsx
        ├─ localStorage integration
        ├─ planner filters
        ├─ course state rendering
        └─ progress summaries
```

## Product boundaries

PATHWAY does **not** implement or claim:

- student accounts
- enrollment
- payments
- subscriptions
- live instructors
- course delivery/video hosting
- certificates
- diplomas
- accreditation
- grades
- real student counts
- real ratings or testimonials

The curriculum is explicitly demo data used to exercise prerequisite logic.

## Modernization summary

- Create React App → Vite
- React 18 → React 19
- removed React Router
- removed React Icons
- removed Web Vitals
- removed broken/unregistered navigation routes
- removed fake `GET Diploma` action
- removed fake `Enroll Now` actions
- removed invented prices and subscriptions
- removed fixed five-star ratings
- removed placeholder instructors
- removed fabricated success/tutor/schedule/course metrics
- removed placeholder team, pricing, FAQ, blog, and testimonial data
- removed external Icons8/Freepik dependencies
- removed decorative stock imagery
- removed ~2.9 MB PNG asset
- removed editor-specific `.vscode` settings
- removed oversized Google Fonts import
- removed CRA public/test boilerplate
- removed legacy lockfile
- added Vitest, CI, Pages deployment, and professional documentation

## Local development

Requirements:

- Node.js 22+
- npm

```bash
npm install --legacy-peer-deps --no-audit --no-fund
npm run dev
```

## Tests

```bash
npm test
```

The suite covers:

- valid catalog acceptance
- duplicate IDs
- missing prerequisites
- self prerequisites
- cycle detection
- invalid persisted state
- unknown IDs
- duplicate completion IDs
- prerequisite-invalid recovery
- prerequisite-closed recovery
- transitive prerequisite closure
- eligible / locked / completed / missing states
- course eligibility
- completion transitions
- locked-course protection
- cascade removal
- skill search
- combined track/level filters
- title sorting
- workload sorting
- progress hours and percentage
- filter option generation

## Quality gate

```bash
npm run check
```

Runs syntax checks, Vitest, and a Vite production build.

## CI

`.github/workflows/quality.yml` runs on pull requests and pushes to `main`.

## Deployment

PATHWAY includes a manual GitHub Pages workflow.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy Pages**.
4. Run the workflow.

## Security review

No API keys, passwords, tokens, authentication flows, payment data, backend endpoints, unsafe HTML rendering, or sensitive browser storage are required.

The only persisted state is a sanitized list of public demo course IDs.

## License

MIT. See [LICENSE](./LICENSE).
