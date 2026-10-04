import { describe, expect, it } from "vitest";
import { curriculum } from "../data/curriculum.js";
import {
  courseStatus,
  eligibleCourses,
  filterCourses,
  prerequisiteClosure,
  progressSummary,
  sanitizeCompleted,
  sortCourses,
  toggleCompletion,
  uniqueOptions,
  validateCatalog
} from "./curriculumPolicy.js";

describe("PATHWAY curriculum policy", () => {
  it("accepts the maintained demo catalog", () => {
    expect(validateCatalog(curriculum)).toEqual([]);
  });

  it("detects duplicate ids", () => {
    expect(validateCatalog([curriculum[0], curriculum[0]])).toContain(
      "duplicate-id:web-foundations"
    );
  });

  it("detects missing prerequisites", () => {
    const broken = [{ ...curriculum[0], prerequisites: ["missing"] }];
    expect(validateCatalog(broken)).toContain(
      "missing-prerequisite:web-foundations:missing"
    );
  });

  it("detects self prerequisites", () => {
    const broken = [{ ...curriculum[0], prerequisites: ["web-foundations"] }];
    expect(validateCatalog(broken)).toContain(
      "self-prerequisite:web-foundations"
    );
  });

  it("detects cycles", () => {
    const broken = [
      { id: "a", prerequisites: ["b"] },
      { id: "b", prerequisites: ["a"] }
    ];
    expect(validateCatalog(broken).some((error) => error.startsWith("cycle:"))).toBe(true);
  });

  it("recovers non-array completed state", () => {
    expect(sanitizeCompleted({ id: "web-foundations" }, curriculum)).toEqual([]);
  });

  it("removes unknown completed ids", () => {
    expect(sanitizeCompleted(["missing"], curriculum)).toEqual([]);
  });

  it("deduplicates completed ids", () => {
    expect(
      sanitizeCompleted(["web-foundations", "web-foundations"], curriculum)
    ).toEqual(["web-foundations"]);
  });

  it("drops a completed dependent when its prerequisite is absent", () => {
    expect(
      sanitizeCompleted(["javascript-systems"], curriculum)
    ).toEqual([]);
  });

  it("keeps prerequisite-closed completion state", () => {
    expect(
      sanitizeCompleted(
        ["web-foundations", "javascript-systems", "state-modeling"],
        curriculum
      )
    ).toEqual(["web-foundations", "javascript-systems", "state-modeling"]);
  });

  it("computes transitive prerequisites", () => {
    expect(prerequisiteClosure("delivery-ci", curriculum)).toEqual([
      "web-foundations",
      "javascript-systems",
      "react-interface-engineering",
      "state-modeling",
      "accessibility-quality"
    ]);
  });

  it("marks a root course eligible", () => {
    expect(courseStatus("web-foundations", [], curriculum)).toBe("eligible");
  });

  it("marks a dependent course locked", () => {
    expect(courseStatus("javascript-systems", [], curriculum)).toBe("locked");
  });

  it("marks a completed course completed", () => {
    expect(
      courseStatus("web-foundations", ["web-foundations"], curriculum)
    ).toBe("completed");
  });

  it("returns missing for an unknown course", () => {
    expect(courseStatus("missing", [], curriculum)).toBe("missing");
  });

  it("returns eligible courses after a prerequisite completes", () => {
    expect(eligibleCourses(["web-foundations"], curriculum)).toEqual([
      "javascript-systems"
    ]);
  });

  it("adds an eligible course", () => {
    expect(toggleCompletion([], "web-foundations", curriculum)).toEqual([
      "web-foundations"
    ]);
  });

  it("ignores completion attempts for a locked course", () => {
    expect(toggleCompletion([], "javascript-systems", curriculum)).toEqual([]);
  });

  it("cascades removal into completed dependents", () => {
    const completed = [
      "web-foundations",
      "javascript-systems",
      "react-interface-engineering",
      "accessibility-quality"
    ];

    expect(toggleCompletion(completed, "javascript-systems", curriculum)).toEqual([
      "web-foundations"
    ]);
  });

  it("filters by skill query", () => {
    expect(filterCourses(curriculum, { query: "keyboard" }).map((c) => c.id)).toEqual([
      "accessibility-quality"
    ]);
  });

  it("filters by track and level together", () => {
    expect(
      filterCourses(curriculum, { track: "frontend", level: "foundation" }).map((c) => c.id)
    ).toEqual(["web-foundations", "javascript-systems"]);
  });

  it("sorts by title", () => {
    const sorted = sortCourses(curriculum, "title");
    expect(sorted[0].title).toBe("Accessibility & Quality Gates");
  });

  it("sorts by hours", () => {
    const sorted = sortCourses(curriculum, "hours");
    expect(sorted[0].id).toBe("delivery-ci");
  });

  it("calculates progress hours and percent", () => {
    expect(progressSummary(["web-foundations"], curriculum)).toEqual({
      completedCount: 1,
      totalCount: 6,
      completedHours: 12,
      totalHours: 90,
      remainingHours: 78,
      percent: 13
    });
  });

  it("builds unique filter options", () => {
    expect(uniqueOptions(curriculum, "level")).toEqual([
      "all",
      "foundation",
      "intermediate",
      "advanced"
    ]);
  });
});
