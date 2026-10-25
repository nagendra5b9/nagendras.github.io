"use strict";

const GITHUB_USER = "nagendra5b9";
const LEETCODE_USER = "sanikommunagendra";
const LEETCODE_URL = `https://leetcode.com/u/${LEETCODE_USER}/`;
const EMAIL = "nag37980@gmail.com";
const PROFILE_API = `https://api.github.com/users/${GITHUB_USER}`;
const REPOS_API = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&direction=desc&per_page=100&type=owner`;

// Custom copy for projects already on GitHub. Any new public repo is added automatically
// through the GitHub API, even when it has no entry here.
const PROJECT_OVERRIDES = {
  "nexus": {
    title: "Nexus Commerce Cloud",
    description: "A Java / Spring Boot commerce MVP with a Flash quick-commerce lane and a Mega Mall catalogue, covering catalog and inventory management, customer flows, admin tools, cart, wishlist, demo checkout, and support records.",
    category: ["fullstack", "backend"], featuredOrder: 1, icon: "fa-bag-shopping",
    tags: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Docker", "HTML/CSS/JS"],
    features: ["Modular-monolith structure with clear application responsibilities", "Role-based access and JWT-based authentication", "Product catalogue, inventory, wishlist, cart, and demo checkout flows", "Responsive storefront, admin tools, and customer feedback workflows"],
    focus: "Full-stack commerce MVP and application architecture"
  },
  "eventhub": {
    title: "EventHub — High-Concurrency Ticket Booking",
    description: "A full-stack ticket reservation platform exploring temporary seat holds, double-booking prevention, transactional checkout, and asynchronous booking events.",
    category: ["fullstack", "backend"], featuredOrder: 2, icon: "fa-ticket",
    tags: ["Java 21", "Spring Boot", "Redis", "Kafka", "MySQL", "Docker"],
    features: ["Redis seat locks with a 10-minute time-to-live", "MySQL pessimistic write locks for checkout consistency", "Kafka booking events for decoupled downstream work", "JWT authentication and a responsive live seat-selection UI"],
    focus: "Concurrency, transaction integrity, distributed locking, and event-driven workflows"
  },
  "securebank-java-fullstack": {
    title: "SecureBank — Full-Stack Banking Demo",
    description: "A simulated banking application for learning authenticated account workflows, transaction history, balance transfers, and concurrency-safe updates. It does not move real money or connect to a bank.",
    category: ["fullstack", "backend"], featuredOrder: 3, icon: "fa-shield-halved",
    tags: ["Java", "Spring Boot", "Spring Security", "JWT", "React", "MySQL"],
    features: ["JWT authentication, BCrypt password hashing, and protected routes", "Simulated deposits and transfers with ownership checks", "Transactional balance changes and database row locking", "Responsive React / TypeScript dashboard with transaction history"],
    focus: "Authentication, transaction safety, API design, and full-stack workflows"
  },
  "careerforge-job-tracker": {
    title: "CareerForge — Job Application Tracker",
    description: "A job-search workspace designed to organize applications, track statuses, keep key application details together, and make the job-hunt workflow easier to review.",
    category: ["fullstack", "backend"], featuredOrder: 4, icon: "fa-chart-line",
    tags: ["Java", "Spring Boot", "PostgreSQL", "HTML", "CSS", "JavaScript", "Docker"],
    features: ["Create, view, and manage job applications", "Store company, role, location, application date, and status", "Relational database persistence with PostgreSQL", "Responsive dashboard direction for a more organized job search"],
    focus: "CRUD workflows, RESTful backend development, and database integration"
  },
  "06-springboot-task-management-api": {
    title: "SprintFlow — Task Management REST API",
    description: "A Spring Boot task API using DTO validation and separated controller, service, and repository responsibilities, paired with a lightweight interactive task-board UI.",
    category: ["backend", "fullstack"], featuredOrder: 5, icon: "fa-list-check",
    tags: ["Java", "Spring Boot", "REST API", "Validation", "DTO", "JavaScript"],
    features: ["Layered controller, service, and repository structure", "Request validation with Jakarta Validation annotations", "Task lifecycle and priority/status management", "Interactive frontend with API request / response inspection"],
    focus: "REST design, request validation, maintainable layers, and API testing"
  },
  "leetcode-solutions": {
    title: "LeetCode Solutions — Java DSA Practice",
    description: "A growing collection of Java problem-solving exercises that records algorithm practice and provides a place to revisit patterns, edge cases, and complexity trade-offs.",
    category: ["dsa", "java"], featuredOrder: 6, icon: "fa-code",
    tags: ["Java", "Arrays", "Strings", "Two Pointers", "Sliding Window", "Algorithms"],
    features: ["Practice across common interview problem patterns", "Focus on clear logic, dry runs, and edge-case handling", "Review time and space complexity alongside solutions", "Repository-based history for revisiting earlier problems"],
    focus: "Data structures, algorithms, code clarity, and interview preparation"
  },
  "05-java-ticket-booking-multithreading": {
    title: "CineThread — Multithreaded Ticket Booking",
    description: "A Java concurrency project that simulates multiple customers competing for seats and shows how locks and thread pools prevent conflicting reservations.",
    category: ["java", "backend"], featuredOrder: 7, icon: "fa-people-arrows-left-right",
    tags: ["Java", "Multithreading", "ReentrantLock", "ExecutorService", "AtomicInteger"],
    features: ["Fine-grained fair locks for individual seat reservations", "Thread-pool simulation of concurrent customer requests", "Atomic counters for booking and collision metrics", "Race-condition prevention in a controlled console simulation"],
    focus: "Threads, synchronization, atomic operations, and race conditions"
  },
  "04-java-student-result-system": {
    title: "EduMetrics — Student Result System",
    description: "A Java Collections Framework exercise for storing student results, sorting and grouping records, and calculating class performance using streams.",
    category: ["java", "dsa"], featuredOrder: 8, icon: "fa-graduation-cap",
    tags: ["Java", "ArrayList", "HashMap", "TreeMap", "Streams", "Comparator"],
    features: ["ArrayList and maps for dynamic student/result records", "Sorted grade buckets and custom student ordering", "Comparable / Comparator examples", "Java Streams for averages, filtering, and grouping"],
    focus: "Collections, generics, ordering, streams, and data transformation"
  },
  "03-java-contact-book-fileio": {
    title: "PulseContacts — Contact Book & File I/O",
    description: "A contact management project that demonstrates custom exception types, input validation, and CSV-backed persistence using Java file streams.",
    category: ["java", "backend"], featuredOrder: 9, icon: "fa-address-book",
    tags: ["Java", "Exceptions", "File I/O", "CSV", "Regex", "Validation"],
    features: ["Custom checked exceptions for invalid or duplicate contacts", "Try-with-resources for safer stream handling", "Regex validation for email and phone formats", "CSV serialization and restore-on-startup workflows"],
    focus: "Exception design, data validation, files, and persistence"
  },
  "02-java-bank-account-oops": {
    title: "Apex Bank — OOP Account System",
    description: "A Java object-oriented account simulation built around encapsulated account state, abstract account behaviour, and specialized savings and checking rules.",
    category: ["java", "backend"], featuredOrder: 10, icon: "fa-building-columns",
    tags: ["Java", "OOP", "Abstraction", "Inheritance", "Polymorphism", "Encapsulation"],
    features: ["Abstract account contract with deposit and withdrawal operations", "Savings and checking account specializations", "Encapsulated balance and account state", "Transaction history and account-specific withdrawal rules"],
    focus: "The four OOP pillars, domain modelling, and business rules"
  },
  "01-java-number-guessing-game": {
    title: "Number Guessing Game",
    description: "A beginner-friendly Java project using random number generation, loops, input validation, hints, and score/attempt tracking.",
    category: ["java", "frontend"], featuredOrder: 11, icon: "fa-dice",
    tags: ["Java", "Random", "Loops", "Conditionals", "Validation", "JavaScript UI"],
    features: ["Random target generation and repeated guessing", "Higher/lower hints and input checks", "Attempt tracking and a small scoreboard", "A simple browser interface for learning feedback loops"],
    focus: "Programming fundamentals, control flow, and user feedback"
  },
  "nagendras.github.io": {
    title: "Developer Portfolio — nagendra.dev",
    description: "A responsive personal portfolio with a project library that synchronizes public repositories directly from the GitHub API.",
    category: ["frontend"], featuredOrder: 12, icon: "fa-window-maximize",
    tags: ["HTML", "CSS", "JavaScript", "GitHub API", "Responsive UI"],
    features: ["Responsive layout with dark and light themes", "Live repository cards, search, filters, and sorting", "Keyboard-accessible navigation and project detail dialogs", "Automatic discovery of new public GitHub repositories"],
    focus: "Responsive UI, accessibility, progressive enhancement, and API-driven content"
  }
};

const FALLBACK_REPOS = Object.entries(PROJECT_OVERRIDES).map(([name, item]) => ({
  name,
  full_name: `${GITHUB_USER}/${name}`,
  html_url: `https://github.com/${GITHUB_USER}/${name}`,
  description: item.description,
  language: item.tags?.[0] || "Java",
  stargazers_count: 0,
  forks_count: 0,
  updated_at: null,
  homepage: null,
  topics: []
}));

const els = {
  html: document.documentElement,
  header: document.getElementById("siteHeader"),
  themeButton: document.getElementById("themeButton"),
  mobileMenuButton: document.getElementById("mobileMenuButton"),
  navLinks: document.getElementById("navLinks"),
  navLinkItems: [...document.querySelectorAll(".nav-link")],
  profilePhoto: document.getElementById("profilePhoto"),
  portraitFallback: document.getElementById("portraitFallback"),
  statRepos: document.getElementById("statRepos"),
  statStars: document.getElementById("statStars"),
  statForks: document.getElementById("statForks"),
  statFollowers: document.getElementById("statFollowers"),
  githubSyncStatus: document.getElementById("githubSyncStatus"),
  navProjectCount: document.getElementById("navProjectCount"),
  allProjectCount: document.getElementById("allProjectCount"),
  projectGrid: document.getElementById("projectGrid"),
  projectSearch: document.getElementById("projectSearch"),
  projectSort: document.getElementById("projectSort"),
  projectFilters: document.getElementById("projectFilters"),
  projectResultCount: document.getElementById("projectResultCount"),
  lastSyncLabel: document.getElementById("lastSyncLabel"),
  noProjects: document.getElementById("noProjects"),
  clearFilters: document.getElementById("clearFilters"),
  viewToggle: document.getElementById("viewToggle"),
  refreshProjects: document.getElementById("refreshProjects"),
  projectDialog: document.getElementById("projectDialog"),
  projectDialogContent: document.getElementById("projectDialogContent"),
  dialogClose: document.getElementById("dialogClose"),
  commandButton: document.getElementById("commandButton"),
  commandDialog: document.getElementById("commandDialog"),
  commandInput: document.getElementById("commandInput"),
  commandOptions: document.getElementById("commandOptions"),
  copyEmailButton: document.getElementById("copyEmailButton"),
  contactForm: document.getElementById("contactForm"),
  leetcodeCard: document.getElementById("leetcodeCard"),
  leetcodeFallback: document.getElementById("leetcodeFallback"),
  backToTop: document.getElementById("backToTop"),
  scrollProgress: document.getElementById("scrollProgress"),
  toast: document.getElementById("toast")
};

let allProjects = [];
let activeFilter = "all";
let listView = false;
let toastTimer = 0;
let commandSelection = 0;
let currentCommandItems = [];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function titleFromSlug(slug = "") {
  const clean = slug.replace(/^\d+-/, "").replace(/[._-]+/g, " ").trim();
  return clean.split(/\s+/).map(word => {
    if (["api", "dsa", "oop", "jwt", "sql", "ui", "css", "html", "java"].includes(word.toLowerCase())) return word.toUpperCase();
    return word ? word[0].toUpperCase() + word.slice(1) : "";
  }).join(" ");
}

function guessCategories(repo, override) {
  if (override?.category) return Array.isArray(override.category) ? override.category : [override.category];
  const haystack = `${repo.name || ""} ${repo.description || ""} ${(repo.topics || []).join(" ")} ${repo.language || ""}`.toLowerCase();
  const result = [];
  if (/leetcode|algorithm|dsa|problem|array|string/.test(haystack)) result.push("dsa");
  if (/spring|api|backend|java|sql|database|redis|kafka|security|hibernate/.test(haystack) || (repo.language || "").toLowerCase() === "java") result.push("backend");
  if (/portfolio|frontend|website|html|css|react|javascript|ui/.test(haystack)) result.push("frontend");
  if (/full.?stack|commerce|booking|tracker|dashboard|react/.test(haystack) && result.includes("backend")) result.push("fullstack");
  if (!result.length) result.push("frontend");
  return [...new Set(result)];
}

function tagListFor(repo, override) {
  const list = override?.tags?.length ? [...override.tags] : [];
  if (!list.length && repo.language) list.push(repo.language);
  for (const topic of (repo.topics || []).slice(0, 5)) {
    const tag = topic.split("-").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    if (!list.some(existing => existing.toLowerCase() === tag.toLowerCase())) list.push(tag);
  }
  return list.length ? list.slice(0, 7) : ["Source code", "Project practice"];
}

function normalizeRepo(repo) {
  const name = repo.name || repo.full_name?.split("/").pop() || "repository";
  const override = PROJECT_OVERRIDES[name.toLowerCase()] || {};
  return {
    name,
    title: override.title || titleFromSlug(name),
    description: override.description || repo.description || `A public project from my GitHub workspace. Explore the repository README and source code for the latest implementation details.`,
    url: repo.html_url || `https://github.com/${GITHUB_USER}/${name}`,
    homepage: (repo.homepage && /^https?:\/\//i.test(repo.homepage)) ? repo.homepage : "",
    language: repo.language || override.tags?.[0] || "Code",
    stars: Number(repo.stargazers_count || 0),
    forks: Number(repo.forks_count || 0),
    updatedAt: repo.updated_at || null,
    defaultBranch: repo.default_branch || "main",
    topics: repo.topics || [],
    tags: tagListFor(repo, override),
    categories: guessCategories(repo, override),
    featuredOrder: Number.isFinite(override.featuredOrder) ? override.featuredOrder : 99,
    icon: override.icon || iconForRepo(repo),
    features: override.features || [
      "Browse the source code, README, and project history on GitHub",
      `Primary language: ${repo.language || "not specified"}`,
      "Project details reflect the latest public repository metadata",
      "Open the repository to explore implementation and setup instructions"
    ],
    focus: override.focus || repo.description || "Personal development and technical practice",
    isPortfolio: name.toLowerCase() === "nagendras.github.io"
  };
}

function iconForRepo(repo) {
  const haystack = `${repo.name || ""} ${repo.description || ""}`.toLowerCase();
  if (/bank|secure|auth|security/.test(haystack)) return "fa-shield-halved";
  if (/ticket|booking|event/.test(haystack)) return "fa-ticket";
  if (/leetcode|algorithm|solution/.test(haystack)) return "fa-code";
  if (/commerce|shop|product|store/.test(haystack)) return "fa-bag-shopping";
  if (/task|todo|management/.test(haystack)) return "fa-list-check";
  if (/portfolio|website|web/.test(haystack)) return "fa-window-maximize";
  return "fa-code-branch";
}

function niceDate(iso) {
  if (!iso) return "date unavailable";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "date unavailable";
  return `Updated ${date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
}

function langColor(lang) {
  const colors = {
    Java: "#de6a40", JavaScript: "#e5c449", TypeScript: "#4c91d7", HTML: "#e56e48",
    CSS: "#7b8ff1", Python: "#65a9db", Kotlin: "#a68af9", Go: "#5fc5ca", Code: "#b28aff"
  };
  return colors[lang] || "#b28aff";
}

function categoryLabel(project) {
  const labelMap = { fullstack: "Full stack", backend: "Backend", java: "Java practice", dsa: "DSA", frontend: "Frontend" };
  const primary = project.categories.find(c => ["fullstack", "backend", "dsa", "java", "frontend"].includes(c)) || "project";
  return labelMap[primary] || "Project";
}

function renderProjectCard(project, index) {
  const featured = project.featuredOrder < 5;
  const langColorValue = langColor(project.language);
  const tags = project.tags.slice(0, 5).map(tag => `<span>${escapeHtml(tag)}</span>`).join("");
  const badge = featured ? `<span class="project-badge featured-badge">✳ Featured</span>` : `<span class="project-badge">${escapeHtml(categoryLabel(project))}</span>`;
  const demoLink = project.homepage ? `<a class="project-link-button" href="${escapeHtml(project.homepage)}" target="_blank" rel="noopener noreferrer" aria-label="Open live demo for ${escapeHtml(project.title)}"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>` : "";
  return `
    <article class="project-card${featured ? " featured" : ""}" style="animation-delay:${Math.min(index * 35, 280)}ms" data-project-name="${escapeHtml(project.name)}">
      <div class="project-card-top">
        <span class="project-mark"><i class="fa-solid ${escapeHtml(project.icon)}"></i></span>
        <div class="project-badges">${badge}</div>
      </div>
      <h3>${escapeHtml(project.title)}</h3>
      <p class="project-description">${escapeHtml(project.description)}</p>
      <div class="project-tech">${tags}</div>
      <div class="project-meta">
        <span><i class="language-dot" style="background:${langColorValue}"></i>${escapeHtml(project.language)}</span>
        <span><i class="fa-regular fa-star"></i>${project.stars}</span>
        <span><i class="fa-solid fa-code-fork"></i>${project.forks}</span>
        <span><i class="fa-regular fa-clock"></i>${escapeHtml(niceDate(project.updatedAt))}</span>
      </div>
      <div class="project-card-footer">
        <button type="button" class="project-link-button details-link" data-details="${escapeHtml(project.name)}"><i class="fa-solid fa-circle-info"></i> Details</button>
        <div class="project-card-actions"><a class="project-link-button" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Code</a>${demoLink}</div>
      </div>
    </article>`;
}

function projectMatches(project, query) {
  const hasFilter = activeFilter === "all" || project.categories.includes(activeFilter);
  if (!hasFilter) return false;
  if (!query) return true;
  const haystack = [project.title, project.name, project.description, project.language, project.focus, ...project.tags, ...project.categories].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function getVisibleProjects() {
  const query = els.projectSearch.value.trim();
  const result = allProjects.filter(project => projectMatches(project, query));
  const sort = els.projectSort.value;
  result.sort((a, b) => {
    if (sort === "updated") return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0) || a.title.localeCompare(b.title);
    if (sort === "stars") return b.stars - a.stars || a.title.localeCompare(b.title);
    if (sort === "name") return a.title.localeCompare(b.title);
    return a.featuredOrder - b.featuredOrder || new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0) || a.title.localeCompare(b.title);
  });
  return result;
}

function renderProjects() {
  const visible = getVisibleProjects();
  els.projectGrid.classList.toggle("list-view", listView);
  els.viewToggle.innerHTML = listView ? '<i class="fa-solid fa-grip"></i>' : '<i class="fa-solid fa-list"></i>';
  els.viewToggle.setAttribute("aria-label", listView ? "Switch to grid layout" : "Switch to list layout");
  els.projectGrid.innerHTML = visible.map(renderProjectCard).join("");
  els.projectGrid.setAttribute("aria-busy", "false");
  els.projectResultCount.textContent = `${visible.length} ${visible.length === 1 ? "project" : "projects"} shown · ${allProjects.length} public repositories`;
  els.noProjects.classList.toggle("hidden", visible.length > 0);
  els.projectGrid.classList.toggle("hidden", visible.length === 0);
  els.allProjectCount.textContent = String(allProjects.length);
  els.navProjectCount.textContent = String(allProjects.length);
  updateFilterCountLabels();
  observeRevealElements(els.projectGrid);
}

function updateFilterCountLabels() {
  // Keep the All count current; other category chips remain stable and easy to scan.
  const allChip = els.projectFilters.querySelector('[data-filter="all"]');
  if (allChip) allChip.innerHTML = `All projects <span>${allProjects.length}</span>`;
}

async function loadGitHubProfile() {
  try {
    const response = await fetch(`${PROFILE_API}?_=${Date.now()}`, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" });
    if (!response.ok) throw new Error(`GitHub profile returned ${response.status}`);
    const profile = await response.json();
    els.statFollowers.textContent = numberFmt(profile.followers ?? 0);
    if (profile.avatar_url) {
      const safeAvatar = `${profile.avatar_url}${profile.avatar_url.includes("?") ? "&" : "?"}size=640`;
      els.profilePhoto.src = safeAvatar;
    }
    return profile;
  } catch (error) {
    els.statFollowers.textContent = "—";
    console.warn("Could not load GitHub profile metadata:", error);
    return null;
  }
}

async function loadGitHubRepos({ showRefreshState = false } = {}) {
  if (showRefreshState) {
    els.refreshProjects.classList.add("is-refreshing");
    els.refreshProjects.disabled = true;
    els.lastSyncLabel.textContent = "· refreshing";
  }
  els.githubSyncStatus.innerHTML = '<span class="status-dot-small"></span> Syncing GitHub…';
  try {
    const response = await fetch(`${REPOS_API}&_=${Date.now()}`, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" });
    if (!response.ok) throw new Error(`GitHub repositories returned ${response.status}`);
    const raw = await response.json();
    if (!Array.isArray(raw) || raw.length === 0) throw new Error("No public repositories returned");
    // The endpoint returns only public repos; keep every repository including the portfolio itself.
    allProjects = raw.map(normalizeRepo);
    const totalStars = raw.reduce((total, repo) => total + Number(repo.stargazers_count || 0), 0);
    const totalForks = raw.reduce((total, repo) => total + Number(repo.forks_count || 0), 0);
    els.statRepos.textContent = numberFmt(raw.length);
    els.statStars.textContent = numberFmt(totalStars);
    els.statForks.textContent = numberFmt(totalForks);
    renderProjects();
    const now = new Date();
    els.lastSyncLabel.textContent = `· synced ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    els.githubSyncStatus.innerHTML = '<span class="status-dot-small"></span> GitHub synced';
    els.githubSyncStatus.title = "Loaded public repositories from the GitHub API";
    if (showRefreshState) showToast("Projects refreshed from GitHub.");
  } catch (error) {
    console.warn("Live GitHub repository sync failed; using built-in public repository fallback:", error);
    if (!allProjects.length) {
      allProjects = FALLBACK_REPOS.map(normalizeRepo);
      renderProjects();
    }
    const totalStars = allProjects.reduce((total, repo) => total + repo.stars, 0);
    const totalForks = allProjects.reduce((total, repo) => total + repo.forks, 0);
    els.statRepos.textContent = numberFmt(allProjects.length);
    els.statStars.textContent = numberFmt(totalStars);
    els.statForks.textContent = numberFmt(totalForks);
    els.githubSyncStatus.innerHTML = '<span class="status-dot-small"></span> Showing saved repository list';
    els.githubSyncStatus.title = "GitHub could not be reached; the built-in list is displayed";
    els.lastSyncLabel.textContent = "· using saved list";
  } finally {
    els.refreshProjects.classList.remove("is-refreshing");
    els.refreshProjects.disabled = false;
  }
}

function numberFmt(number) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(Number(number) || 0);
}

function renderProjectDialog(project) {
  if (!project) return;
  const features = project.features.map(feature => `<div class="dialog-feature"><i class="fa-solid fa-check"></i><span>${escapeHtml(feature)}</span></div>`).join("");
  const tags = project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("");
  const demo = project.homepage ? `<a class="button button-primary" href="${escapeHtml(project.homepage)}" target="_blank" rel="noopener noreferrer">Open live demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : "";
  els.projectDialogContent.innerHTML = `
    <div class="dialog-project-top"><div class="project-mark"><i class="fa-solid ${escapeHtml(project.icon)}"></i></div><span class="project-badge ${project.featuredOrder < 5 ? "featured-badge" : ""}">${escapeHtml(categoryLabel(project))}</span></div>
    <p class="dialog-project-kicker">GITHUB REPOSITORY / ${escapeHtml(project.language)}</p>
    <h2 id="dialogTitle">${escapeHtml(project.title)}</h2>
    <p class="dialog-description">${escapeHtml(project.description)}</p>
    <div class="dialog-tech"><h4>TECHNOLOGY & CONCEPTS</h4><div class="project-tech">${tags}</div></div>
    <div class="dialog-tech"><h4>WHAT THIS PROJECT EXPLORES</h4><div class="dialog-feature-list">${features}</div></div>
    <p class="dialog-description"><strong>Engineering focus:</strong> ${escapeHtml(project.focus || "Software development practice")}.</p>
    <div class="dialog-actions"><a class="button button-primary" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">Explore source code <i class="fa-brands fa-github"></i></a>${demo}<button class="button button-ghost" type="button" data-copy-repo="${escapeHtml(project.url)}"><i class="fa-regular fa-copy"></i> Copy repo link</button></div>
    <p class="dialog-note">Repository data is retrieved from GitHub. Check the README for the exact run steps and current implementation details. The summary above is a portfolio overview, not a claim that every planned feature is production-deployed.</p>`;
  if (typeof els.projectDialog.showModal === "function") els.projectDialog.showModal();
  else els.projectDialog.setAttribute("open", "open");
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = window.setTimeout(() => els.toast.classList.remove("show"), 2700);
}

async function copyText(text, successMessage = "Copied to clipboard.") {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (!copied) throw new Error("Clipboard unavailable");
    }
    showToast(successMessage);
  } catch {
    showToast(`Copy manually: ${text}`);
  }
}

function setTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  els.html.dataset.theme = next;
  try { localStorage.setItem("nagendra-portfolio-theme-v6", next); } catch {}
  els.themeButton.innerHTML = next === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  els.themeButton.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0A0D1E" : "#EEF0FF");
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("nagendra-portfolio-theme-v6"); } catch {}
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(saved || "dark");
}

function initAvatarFallback() {
  els.profilePhoto.addEventListener("error", () => {
    els.profilePhoto.style.display = "none";
    els.portraitFallback.style.zIndex = "0";
  });
  els.profilePhoto.addEventListener("load", () => {
    els.profilePhoto.style.display = "block";
    els.portraitFallback.style.zIndex = "-1";
  });
  if (els.profilePhoto.complete && els.profilePhoto.naturalWidth === 0) {
    els.profilePhoto.style.display = "none";
    els.portraitFallback.style.zIndex = "0";
  }
}

function initLeetCodeCard() {
  els.leetcodeCard.addEventListener("error", () => {
    els.leetcodeCard.classList.add("hidden");
    els.leetcodeFallback.classList.remove("hidden");
  });
  els.leetcodeCard.addEventListener("load", () => {
    els.leetcodeCard.classList.remove("hidden");
    els.leetcodeFallback.classList.add("hidden");
  });
  if (els.leetcodeCard.complete && els.leetcodeCard.naturalWidth === 0) {
    els.leetcodeCard.classList.add("hidden");
    els.leetcodeFallback.classList.remove("hidden");
  }
}

function initTyping() {
  const target = document.getElementById("typedRole");
  if (!target) return;
  const phrases = ["reliable Java backends.", "useful full-stack apps.", "systems that handle edge cases.", "software that keeps improving."];
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = phrases[0];
    return;
  }
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = false;
  const tick = () => {
    const phrase = phrases[phraseIndex];
    if (!deleting) {
      charIndex = Math.min(charIndex + 1, phrase.length);
      target.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        deleting = true;
        window.setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex = Math.max(charIndex - 1, 0);
      target.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    window.setTimeout(tick, deleting ? 27 : 52);
  };
  window.setTimeout(() => { deleting = true; tick(); }, 1700);
}

function observeRevealElements(root = document) {
  const items = root.querySelectorAll ? root.querySelectorAll(".reveal:not(.is-observed)") : [];
  if (!items.length) return;
  if (!("IntersectionObserver" in window) || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(item => { item.classList.add("is-visible", "is-observed"); });
    return;
  }
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
  items.forEach(item => { item.classList.add("is-observed"); observer.observe(item); });
}

function handleScroll() {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  els.scrollProgress.style.width = `${maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0}%`;
  els.header.classList.toggle("scrolled", scrolled > 12);
  els.backToTop.classList.toggle("visible", scrolled > 580);
}

function initActiveNavigation() {
  if (!("IntersectionObserver" in window)) return;
  const sections = [...document.querySelectorAll("main section[id]")];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    els.navLinkItems.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, .1, .35] });
  sections.forEach(section => observer.observe(section));
}

function closeMobileMenu() {
  els.navLinks.classList.remove("open");
  els.mobileMenuButton.setAttribute("aria-expanded", "false");
  els.mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.classList.remove("menu-open");
}

function initMobileMenu() {
  els.mobileMenuButton.addEventListener("click", () => {
    const open = els.navLinks.classList.toggle("open");
    els.mobileMenuButton.setAttribute("aria-expanded", String(open));
    els.mobileMenuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    els.mobileMenuButton.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    document.body.classList.toggle("menu-open", open);
  });
  els.navLinks.addEventListener("click", event => {
    if (event.target.closest("a")) closeMobileMenu();
  });
  document.addEventListener("click", event => {
    if (els.navLinks.classList.contains("open") && !els.navLinks.contains(event.target) && !els.mobileMenuButton.contains(event.target)) closeMobileMenu();
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 860) closeMobileMenu(); });
}

function initFilters() {
  els.projectSearch.addEventListener("input", renderProjects);
  els.projectSort.addEventListener("change", renderProjects);
  els.projectFilters.addEventListener("click", event => {
    const chip = event.target.closest("[data-filter]");
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    els.projectFilters.querySelectorAll("[data-filter]").forEach(button => button.classList.toggle("selected", button === chip));
    renderProjects();
  });
  els.clearFilters.addEventListener("click", () => {
    activeFilter = "all";
    els.projectSearch.value = "";
    els.projectFilters.querySelectorAll("[data-filter]").forEach(button => button.classList.toggle("selected", button.dataset.filter === "all"));
    renderProjects();
  });
  els.viewToggle.addEventListener("click", () => { listView = !listView; renderProjects(); });
  els.refreshProjects.addEventListener("click", () => loadGitHubRepos({ showRefreshState: true }));
  els.projectGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-details]");
    if (!button) return;
    const project = allProjects.find(item => item.name === button.dataset.details);
    renderProjectDialog(project);
  });
  els.projectDialogContent.addEventListener("click", event => {
    const copyButton = event.target.closest("[data-copy-repo]");
    if (copyButton) copyText(copyButton.dataset.copyRepo, "Repository link copied.");
  });
  els.dialogClose.addEventListener("click", () => els.projectDialog.close?.());
  els.projectDialog.addEventListener("click", event => {
    if (event.target === els.projectDialog) els.projectDialog.close?.();
  });
}

const SECTIONS = [
  { label: "Home", description: "Back to the introduction", icon: "fa-house", href: "#home" },
  { label: "About me", description: "What I focus on", icon: "fa-user", href: "#about" },
  { label: "Projects", description: "Search all public repositories", icon: "fa-code-branch", href: "#work" },
  { label: "Tech stack", description: "Languages, frameworks, and tools", icon: "fa-layer-group", href: "#stack" },
  { label: "LeetCode", description: "Problem-solving profile", icon: "fa-code", href: "#signals" },
  { label: "Journey", description: "Education and current focus", icon: "fa-route", href: "#journey" },
  { label: "Contact", description: "Email and opportunities", icon: "fa-envelope", href: "#contact" }
];

function commandItemsFor(query = "") {
  const q = query.trim().toLowerCase();
  const sections = SECTIONS.filter(item => !q || `${item.label} ${item.description}`.toLowerCase().includes(q)).map(item => ({ ...item, type: "section" }));
  const projects = allProjects.filter(item => !q || `${item.title} ${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(q)).slice(0, 7).map(project => ({
    label: project.title,
    description: `Repository · ${project.language}`,
    icon: "fa-code-branch",
    href: "#work",
    type: "project",
    projectName: project.name
  }));
  return [...sections, ...projects];
}

function renderCommandItems() {
  currentCommandItems = commandItemsFor(els.commandInput.value);
  commandSelection = Math.max(0, Math.min(commandSelection, currentCommandItems.length - 1));
  els.commandOptions.innerHTML = currentCommandItems.length ? currentCommandItems.map((item, index) => `
    <button type="button" class="command-option${index === commandSelection ? " selected" : ""}" data-command-index="${index}">
      <i class="fa-solid ${escapeHtml(item.icon)}"></i><span>${escapeHtml(item.label)}</span><small>${escapeHtml(item.description)}</small><i class="fa-solid fa-arrow-turn-down"></i>
    </button>`).join("") : `<p style="padding:15px;color:var(--muted);font-size:11px">No navigation items or projects match that search.</p>`;
}

function openCommand() {
  if (typeof els.commandDialog.showModal === "function") els.commandDialog.showModal();
  else els.commandDialog.setAttribute("open", "open");
  els.commandInput.value = "";
  commandSelection = 0;
  renderCommandItems();
  window.setTimeout(() => els.commandInput.focus(), 30);
}

function closeCommand() { els.commandDialog.close?.(); }

function selectCommand(index) {
  const item = currentCommandItems[index];
  if (!item) return;
  closeCommand();
  if (item.type === "project") {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => renderProjectDialog(allProjects.find(project => project.name === item.projectName)), 240);
  } else {
    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
  }
}

function initCommandPalette() {
  els.commandButton.addEventListener("click", openCommand);
  els.commandInput.addEventListener("input", () => { commandSelection = 0; renderCommandItems(); });
  els.commandOptions.addEventListener("click", event => {
    const option = event.target.closest("[data-command-index]");
    if (option) selectCommand(Number(option.dataset.commandIndex));
  });
  els.commandInput.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") { event.preventDefault(); commandSelection = Math.min(commandSelection + 1, currentCommandItems.length - 1); renderCommandItems(); }
    else if (event.key === "ArrowUp") { event.preventDefault(); commandSelection = Math.max(0, commandSelection - 1); renderCommandItems(); }
    else if (event.key === "Enter") { event.preventDefault(); selectCommand(commandSelection); }
  });
  els.commandDialog.addEventListener("click", event => { if (event.target === els.commandDialog) closeCommand(); });
  document.addEventListener("keydown", event => {
    const target = event.target;
    const typing = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openCommand(); }
    else if (event.key === "/" && !typing && !els.commandDialog.open && !els.projectDialog.open) { event.preventDefault(); els.projectSearch.focus(); }
    else if (event.key === "Escape" && els.navLinks.classList.contains("open")) closeMobileMenu();
  });
}

function initContact() {
  els.copyEmailButton.addEventListener("click", () => copyText(els.copyEmailButton.dataset.email || EMAIL, "Email address copied."));
  els.contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(els.contactForm);
    const name = String(form.get("name") || "").trim();
    const sender = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !sender || !message) { showToast("Please fill in all three fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender)) { showToast("Please enter a valid email address."); return; }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Nagendra,\n\n${message}\n\nFrom: ${name}\nEmail: ${sender}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    showToast("Opening your email application with a draft.");
  });
}

function initMisc() {
  els.themeButton.addEventListener("click", () => setTheme(els.html.dataset.theme === "dark" ? "light" : "dark"));
  els.backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.getElementById("currentYear").textContent = String(new Date().getFullYear());
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

async function init() {
  initTheme();
  initAvatarFallback();
  initLeetCodeCard();
  initTyping();
  initMobileMenu();
  initFilters();
  initCommandPalette();
  initContact();
  initMisc();
  observeRevealElements(document);
  initActiveNavigation();
  await Promise.all([loadGitHubProfile(), loadGitHubRepos()]);
}

document.addEventListener("DOMContentLoaded", init, { once: true });
