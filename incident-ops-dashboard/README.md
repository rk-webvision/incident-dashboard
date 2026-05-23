# Incident Dashboard

A small incident management dashboard built with Angular 18.

This exercise focuses on component design, state management, accessibility, responsive UX, and maintainable frontend architecture rather than heavy visual polish or production completeness.

---

## Features

- View incident list
- Filter by **status**, **severity**, and **service**
- Search by **incident title** or **incident ID**
- Open incident details view
- Update incident status locally
- Loading, empty, and error states
- Mocked API layer
- Responsive layout across desktop, tablet, and mobile

---

## Tech Stack

- Angular 18
- Standalone Components
- Angular Signals
- Reactive Forms
- TypeScript
- SCSS

---

## Running Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
ng serve
```

Open:

```txt
http://localhost:4200
```

---

## Approach

The implementation intentionally keeps state management lightweight and feature-scoped.

For the scope of this exercise, Angular Signals provided enough capability without introducing additional global store complexity.

The solution uses:

- **Standalone Angular architecture**
- **Typed domain models**
- **Mock API abstraction**
- **Feature-local state service**
- **Container + presentational component separation**
- **Responsive layout patterns**
- **Accessible interaction design**

The mocked API layer is isolated from UI components to make migration toward a real backend straightforward.

---

## Responsive Layout Strategy

The dashboard was designed mobile-first with lightweight responsive behavior.

### Desktop

Uses a split dashboard layout.

```txt
Filters + Search

| Incident List | Incident Details |
```

This gives a fast "operations dashboard" workflow where users can scan incidents while keeping details visible.

### Tablet

The layout becomes stacked.

```txt
Filters + Search
Incident List
Details Drawer / Overlay
```

### Mobile

The UI shifts to a card-based experience.

- Compact filters
- Card layout instead of dense tables
- Fullscreen details view
- Touch-friendly spacing

I intentionally avoided forcing a desktop table layout onto smaller screens.

---

## Project Structure

```txt
src/app
├── core
│   ├── models
│   ├── mock-data
│   └── services
│
├── features/incidents
│   ├── dashboard
│   ├── filters
│   ├── incident-list
│   ├── incident-details
│   └── state
│
└── shared
```

---

## Design Decisions / Tradeoffs

### Why Signals instead of NgRx?

For this exercise, introducing global store tooling would add additional ceremony without much practical payoff.

Signals keep state updates predictable while keeping implementation compact.

If the application evolved toward:

- server pagination
- websocket updates
- shared cross-feature state
- caching strategies
- optimistic synchronization

a dedicated store approach would become more compelling.

---

### Why a Mock API Layer?

Even though mocked data is sufficient for the exercise, keeping API access behind a service layer prevents coupling components directly to static data.

This provides a cleaner migration path toward a real backend implementation.

---

### Why Responsive from the Start?

Internal tooling is increasingly accessed across laptops, tablets, and mobile devices.

Designing responsiveness early helped avoid retrofitting layout decisions later while keeping component responsibilities clearer.

---

## Accessibility Notes

A few accessibility considerations included:

- Semantic buttons and form controls
- Search input labeling
- Keyboard-friendly interactions
- Visible focus states
- Empty and error feedback messaging
- Status indicators supported by text (not color alone)
- Responsive touch-friendly interaction sizing

---

## Testing Strategy

Given additional time, I would add:

### Unit Tests

Coverage for:

- filtering logic
- search matching
- computed signals
- status update behavior
- state service logic

### Component Tests

Focus areas:

- filter interactions
- dashboard rendering states
- incident detail updates
- loading / empty / error behavior

### End-to-End Tests

Critical user flows:

- fetch incidents
- apply filters
- search incidents
- open details
- update incident status
- verify responsive behavior

---

## What I'd Improve Next

If continuing the project, likely next improvements would be:

- URL-driven filters
- sorting support
- server-backed pagination
- optimistic updates
- websocket/live refresh
- debounce search
- stronger test coverage
- reusable design system primitives
- dark mode / theme support
- virtualization for larger datasets

---

## Notes

This implementation intentionally prioritizes:

- code clarity
- practical architecture
- maintainable component boundaries
- tradeoff awareness
- UX and accessibility thinking

over production-level completeness or visual refinement.