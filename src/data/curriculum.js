export const curriculum = Object.freeze([
  {
    id: "web-foundations",
    title: "Web Foundations",
    track: "frontend",
    level: "foundation",
    hours: 12,
    prerequisites: [],
    skills: ["html", "css", "semantic markup", "responsive basics"],
    summary:
      "Build the browser, markup, layout, and accessibility vocabulary required by the rest of the curriculum."
  },
  {
    id: "javascript-systems",
    title: "JavaScript Systems",
    track: "frontend",
    level: "foundation",
    hours: 18,
    prerequisites: ["web-foundations"],
    skills: ["javascript", "modules", "data flow", "error handling"],
    summary:
      "Practice deterministic state transitions, modules, validation, and browser-side error handling."
  },
  {
    id: "react-interface-engineering",
    title: "React Interface Engineering",
    track: "frontend",
    level: "intermediate",
    hours: 20,
    prerequisites: ["javascript-systems"],
    skills: ["react", "components", "effects", "accessibility"],
    summary:
      "Compose interfaces from predictable component boundaries without hiding application rules inside presentation code."
  },
  {
    id: "state-modeling",
    title: "State Modeling & Recovery",
    track: "architecture",
    level: "intermediate",
    hours: 16,
    prerequisites: ["javascript-systems"],
    skills: ["state machines", "persistence", "sanitization", "invariants"],
    summary:
      "Model client state, persistence recovery, transitions, and invariants as testable pure logic."
  },
  {
    id: "accessibility-quality",
    title: "Accessibility & Quality Gates",
    track: "quality",
    level: "intermediate",
    hours: 14,
    prerequisites: ["react-interface-engineering"],
    skills: ["keyboard UX", "focus", "semantic HTML", "testing"],
    summary:
      "Turn accessibility and interface behavior into explicit quality checks rather than visual afterthoughts."
  },
  {
    id: "delivery-ci",
    title: "Delivery, CI & Static Hosting",
    track: "delivery",
    level: "advanced",
    hours: 10,
    prerequisites: ["state-modeling", "accessibility-quality"],
    skills: ["ci", "builds", "deployment", "scope boundaries"],
    summary:
      "Connect tests, production builds, static hosting, and deployment constraints into one credible delivery path."
  }
]);

export const curriculumMeta = Object.freeze({
  title: "Frontend Systems Path",
  version: "demo-v1",
  disclaimer:
    "This is a demo curriculum for exercising prerequisite logic. It is not an accredited program and does not issue credentials."
});
