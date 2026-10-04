export const PLANNER_STORAGE_KEY = "pathway:completed:v1";

function byId(catalog) {
  return new Map(catalog.map((course) => [course.id, course]));
}

export function validateCatalog(catalog) {
  const errors = [];
  const ids = new Set();

  for (const course of catalog) {
    if (ids.has(course.id)) {
      errors.push(`duplicate-id:${course.id}`);
    }
    ids.add(course.id);
  }

  const map = byId(catalog);

  for (const course of catalog) {
    for (const prerequisite of course.prerequisites) {
      if (prerequisite === course.id) {
        errors.push(`self-prerequisite:${course.id}`);
      } else if (!map.has(prerequisite)) {
        errors.push(`missing-prerequisite:${course.id}:${prerequisite}`);
      }
    }
  }

  const visiting = new Set();
  const visited = new Set();

  function visit(id) {
    if (visiting.has(id)) {
      errors.push(`cycle:${id}`);
      return;
    }
    if (visited.has(id)) return;

    const course = map.get(id);
    if (!course) return;

    visiting.add(id);
    for (const prerequisite of course.prerequisites) {
      visit(prerequisite);
    }
    visiting.delete(id);
    visited.add(id);
  }

  for (const course of catalog) {
    visit(course.id);
  }

  return [...new Set(errors)];
}

export function sanitizeCompleted(value, catalog) {
  if (!Array.isArray(value)) return [];

  const map = byId(catalog);
  const requested = new Set(
    value
      .map((item) => String(item))
      .filter((id) => map.has(id))
  );

  const result = [];

  for (const course of catalog) {
    if (!requested.has(course.id)) continue;

    const prerequisitesComplete = course.prerequisites.every((id) =>
      result.includes(id)
    );

    if (prerequisitesComplete) {
      result.push(course.id);
    }
  }

  return result;
}

export function prerequisiteClosure(courseId, catalog) {
  const map = byId(catalog);
  const result = new Set();

  function visit(id) {
    const course = map.get(id);
    if (!course) return;

    for (const prerequisite of course.prerequisites) {
      if (!result.has(prerequisite)) {
        result.add(prerequisite);
        visit(prerequisite);
      }
    }
  }

  visit(courseId);
  return catalog
    .filter((course) => result.has(course.id))
    .map((course) => course.id);
}

export function courseStatus(courseId, completed, catalog) {
  const safe = sanitizeCompleted(completed, catalog);
  const course = catalog.find((item) => item.id === courseId);

  if (!course) return "missing";
  if (safe.includes(courseId)) return "completed";

  const eligible = course.prerequisites.every((id) => safe.includes(id));
  return eligible ? "eligible" : "locked";
}

export function eligibleCourses(completed, catalog) {
  const safe = sanitizeCompleted(completed, catalog);
  return catalog
    .filter((course) => courseStatus(course.id, safe, catalog) === "eligible")
    .map((course) => course.id);
}

export function toggleCompletion(completed, courseId, catalog) {
  const safe = sanitizeCompleted(completed, catalog);
  const status = courseStatus(courseId, safe, catalog);

  if (status === "missing" || status === "locked") {
    return safe;
  }

  if (status === "eligible") {
    return sanitizeCompleted([...safe, courseId], catalog);
  }

  const removed = new Set([courseId]);
  let changed = true;

  while (changed) {
    changed = false;

    for (const course of catalog) {
      if (!safe.includes(course.id) || removed.has(course.id)) continue;

      if (course.prerequisites.some((id) => removed.has(id))) {
        removed.add(course.id);
        changed = true;
      }
    }
  }

  return safe.filter((id) => !removed.has(id));
}

export function filterCourses(catalog, { query = "", track = "all", level = "all" } = {}) {
  const normalizedQuery = String(query).trim().toLowerCase();

  return catalog.filter((course) => {
    const haystack = [
      course.title,
      course.track,
      course.level,
      course.summary,
      ...course.skills
    ].join(" ").toLowerCase();

    const queryMatch = !normalizedQuery || haystack.includes(normalizedQuery);
    const trackMatch = track === "all" || course.track === track;
    const levelMatch = level === "all" || course.level === level;

    return queryMatch && trackMatch && levelMatch;
  });
}

export function sortCourses(catalog, sort = "sequence") {
  const copy = [...catalog];

  if (sort === "title") {
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "hours") {
    return copy.sort((a, b) => a.hours - b.hours || a.title.localeCompare(b.title));
  }

  return copy;
}

export function progressSummary(completed, catalog) {
  const safe = sanitizeCompleted(completed, catalog);
  const completedSet = new Set(safe);

  const completedHours = catalog
    .filter((course) => completedSet.has(course.id))
    .reduce((total, course) => total + course.hours, 0);

  const totalHours = catalog.reduce((total, course) => total + course.hours, 0);

  return {
    completedCount: safe.length,
    totalCount: catalog.length,
    completedHours,
    totalHours,
    remainingHours: totalHours - completedHours,
    percent: totalHours === 0 ? 0 : Math.round((completedHours / totalHours) * 100)
  };
}

export function uniqueOptions(catalog, field) {
  return ["all", ...new Set(catalog.map((course) => course[field]))];
}
