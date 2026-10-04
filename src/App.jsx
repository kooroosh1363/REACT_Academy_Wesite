import { useMemo, useState } from "react";
import { curriculum, curriculumMeta } from "./data/curriculum.js";
import {
  PLANNER_STORAGE_KEY,
  courseStatus,
  eligibleCourses,
  filterCourses,
  progressSummary,
  sanitizeCompleted,
  sortCourses,
  toggleCompletion,
  uniqueOptions
} from "./lib/curriculumPolicy.js";

function readCompleted() {
  try {
    return sanitizeCompleted(
      JSON.parse(localStorage.getItem(PLANNER_STORAGE_KEY) || "[]"),
      curriculum
    );
  } catch {
    return [];
  }
}

function CourseCard({ course, completed, onToggle }) {
  const status = courseStatus(course.id, completed, curriculum);
  const prerequisiteNames = course.prerequisites.map(
    (id) => curriculum.find((item) => item.id === id)?.title ?? id
  );

  return (
    <article className="course-card" data-status={status}>
      <div className="course-meta">
        <span>{course.track}</span>
        <span>{course.level}</span>
        <span>{course.hours}h</span>
      </div>

      <div>
        <p className="status-label">{status}</p>
        <h3>{course.title}</h3>
        <p className="course-summary">{course.summary}</p>
      </div>

      <div className="skill-row" aria-label="Skills">
        {course.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="prerequisite-block">
        <span>Prerequisites</span>
        <strong>
          {prerequisiteNames.length ? prerequisiteNames.join(" · ") : "None"}
        </strong>
      </div>

      <button
        type="button"
        disabled={status === "locked"}
        onClick={() => onToggle(course.id)}
      >
        {status === "completed"
          ? "Mark incomplete"
          : status === "eligible"
            ? "Mark complete"
            : "Complete prerequisites first"}
      </button>
    </article>
  );
}

export default function App() {
  const [completed, setCompleted] = useState(readCompleted);
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("all");
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState("sequence");

  const summary = useMemo(
    () => progressSummary(completed, curriculum),
    [completed]
  );

  const eligible = useMemo(
    () => eligibleCourses(completed, curriculum),
    [completed]
  );

  const visible = useMemo(
    () =>
      sortCourses(
        filterCourses(curriculum, { query, track, level }),
        sort
      ),
    [query, track, level, sort]
  );

  const trackOptions = useMemo(
    () => uniqueOptions(curriculum, "track"),
    []
  );
  const levelOptions = useMemo(
    () => uniqueOptions(curriculum, "level"),
    []
  );

  function persist(next) {
    const safe = sanitizeCompleted(next, curriculum);
    setCompleted(safe);
    localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(safe));
  }

  function toggle(courseId) {
    persist(toggleCompletion(completed, courseId, curriculum));
  }

  function resetPlanner() {
    persist([]);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="layout header-row">
          <a className="brand" href="#top" aria-label="PATHWAY home">
            <span className="brand-mark">P</span>
            <span>
              <strong>PATHWAY</strong>
              <small>Curriculum & prerequisite planner</small>
            </span>
          </a>

          <nav aria-label="Primary">
            <a href="#catalog">Catalog</a>
            <a href="#system">System</a>
            <a href="#boundaries">Boundaries</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero layout">
          <p className="eyebrow">Curriculum systems lab</p>
          <h1>Plan the learning path. Don’t fake the learning platform.</h1>
          <p className="hero-copy">
            PATHWAY turns an old academy template into a testable curriculum planner:
            prerequisite-aware course eligibility, prerequisite-closed progress,
            deterministic filtering, workload summaries, and local recovery.
          </p>

          <div className="scope-note">
            <strong>{curriculumMeta.title} · {curriculumMeta.version}</strong>
            <p>{curriculumMeta.disclaimer}</p>
          </div>

          <div className="progress-grid" aria-label="Planner progress">
            <div>
              <span>Completed</span>
              <strong>{summary.completedCount}/{summary.totalCount}</strong>
            </div>
            <div>
              <span>Progress</span>
              <strong>{summary.percent}%</strong>
            </div>
            <div>
              <span>Completed workload</span>
              <strong>{summary.completedHours}h</strong>
            </div>
            <div>
              <span>Remaining workload</span>
              <strong>{summary.remainingHours}h</strong>
            </div>
          </div>
        </section>

        <section id="catalog" className="catalog-section layout" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Course catalog</p>
              <h2 id="catalog-title">Eligibility is derived from prerequisites.</h2>
            </div>
            <p>{eligible.length} course{eligible.length === 1 ? "" : "s"} currently eligible</p>
          </div>

          <div className="planner-toolbar">
            <label className="search-field">
              <span>Search title, skill, or description</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try state, accessibility, React…"
              />
            </label>

            <label>
              <span>Track</span>
              <select value={track} onChange={(event) => setTrack(event.target.value)}>
                {trackOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Level</span>
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                {levelOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Sort</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="sequence">Curriculum sequence</option>
                <option value="title">Title</option>
                <option value="hours">Workload</option>
              </select>
            </label>
          </div>

          <div className="catalog-status">
            <span>{visible.length} course{visible.length === 1 ? "" : "s"} shown</span>
            <button type="button" onClick={resetPlanner}>Reset local progress</button>
          </div>

          {visible.length ? (
            <div className="course-grid">
              {visible.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  completed={completed}
                  onToggle={toggle}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>No course matches these filters.</strong>
              <p>Adjust the query, track, or level to restore catalog results.</p>
            </div>
          )}

          <p className="persistence-note">
            Planner progress is stored only in this browser under <code>{PLANNER_STORAGE_KEY}</code>.
            Corrupted or prerequisite-invalid state is sanitized on load.
          </p>
        </section>

        <section id="system" className="system-section">
          <div className="layout system-grid">
            <div>
              <p className="eyebrow">Curriculum invariants</p>
              <h2>Progress remains prerequisite-closed.</h2>
            </div>

            <div className="rule-list">
              <article>
                <span>01</span>
                <h3>Eligibility</h3>
                <p>A course becomes eligible only when every registered prerequisite is completed.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Recovery</h3>
                <p>Unknown IDs, duplicates, and completed courses missing prerequisites are removed from persisted state.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Cascade removal</h3>
                <p>Uncompleting a prerequisite also removes completed dependents that can no longer satisfy the graph.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="boundaries" className="boundaries-section layout" aria-labelledby="boundaries-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Product boundaries</p>
              <h2 id="boundaries-title">A planner, not a pretend academy backend.</h2>
            </div>
          </div>

          <div className="boundary-grid">
            <article>
              <strong>No enrollment</strong>
              <p>There is no student account, registration workflow, roster, or enrollment database.</p>
            </article>
            <article>
              <strong>No payments</strong>
              <p>There are no course purchases, subscriptions, checkout flows, or payment-provider integrations.</p>
            </article>
            <article>
              <strong>No credentials</strong>
              <p>PATHWAY does not issue diplomas, certificates, academic credit, or accredited qualifications.</p>
            </article>
            <article>
              <strong>No fake instructors or ratings</strong>
              <p>The demo curriculum avoids invented tutors, star ratings, student counts, testimonials, and success metrics.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer layout">
        <strong>PATHWAY</strong>
        <span>Curriculum planning · prerequisite policy · local demo state</span>
      </footer>
    </div>
  );
}
