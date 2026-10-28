const prompts = [
  {
    id: 1,
    title: "Build a Student Website",
    category: "Coding",
    description: "Create a student portal with academic tools.",
    prompt: "Act as a frontend developer. Build a responsive student portal using HTML, CSS and JavaScript. Include an assignment tracker, timetable and dashboard. Explain the code for beginners."
  },
  {
    id: 2,
    title: "Learn a Difficult Topic",
    category: "Education",
    description: "Understand a subject step by step.",
    prompt: "Act as a patient tutor. Explain [TOPIC] in simple language, provide 5 steps, one real-life example and 3 quiz questions with answers."
  },
  {
    id: 3,
    title: "Write a Professional Email",
    category: "Writing",
    description: "Write clear and polite emails.",
    prompt: "Act as a communication expert. Write a professional email to [RECIPIENT] about [PURPOSE]. Include a subject, polite tone and clear next steps."
  },
  {
    id: 4,
    title: "Design a Landing Page",
    category: "Design",
    description: "Plan a modern responsive website.",
    prompt: "Act as a UI/UX designer. Design a responsive landing page for [PRODUCT]. Include a hero section, benefits, features, and call-to-action with accessible colors."
  },
  {
    id: 5,
    title: "Debug JavaScript",
    category: "Coding",
    description: "Understand and fix coding errors.",
    prompt: "Act as a JavaScript expert. Explain the cause of this error: [ERROR]. Review my code, suggest a fix, and provide steps to test it."
  },
  {
    id: 6,
    title: "Prepare for an Exam",
    category: "Education",
    description: "Create a revision plan.",
    prompt: "Act as a study coach. Create a revision plan for [SUBJECT] over [DAYS]. Divide topics into sessions, include breaks and end each day with a short review."
  },
  {
    id: 7,
    title: "Create a Blog Post",
    category: "Writing",
    description: "Structure an informative article.",
    prompt: "Act as a blog writer. Write an informative article about [TOPIC] for [AUDIENCE]. Include a title, introduction, headings, examples and conclusion."
  },
  {
    id: 8,
    title: "Create a Mobile App Design",
    category: "Design",
    description: "Plan a simple app interface.",
    prompt: "Act as a product designer. Design a mobile app for [PURPOSE]. Describe its screens, navigation, colors, typography, accessibility and user flow."
  }
];

const $ = id => document.getElementById(id);
let activeCategory = "All";
let lastImproved = "";

function getSaved() {
  try {
    return JSON.parse(localStorage.getItem("promptlabSaved") || "[]");
  } catch {
    return [];
  }
}

let saved = getSaved();
let points = Number(localStorage.getItem("promptlabPoints") || 0);

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

function updateStats() {
  $("savedCount").textContent = saved.length;
  $("score").textContent = points;
}

function renderLibrary() {
  const query = $("search").value.toLowerCase().trim();

  const filtered = prompts.filter(item =>
    (activeCategory === "All" || item.category === activeCategory) &&
    `${item.title} ${item.category} ${item.description}`
      .toLowerCase().includes(query)
  );

  $("promptList").innerHTML = filtered.map(item => `
    <article class="template-card">
      <span class="category">${escapeHTML(item.category)}</span>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <button class="small-button" data-use="${item.id}">Use prompt</button>
      <button class="small-button" data-save="${item.id}">♡ Save</button>
    </article>
  `).join("");

  if (!filtered.length) {
    $("promptList").innerHTML =
      '<p class="muted">No prompts found. Try another search.</p>';
  }
}

function renderSaved() {
  $("savedList").innerHTML = saved.map(item => `
    <article class="template-card">
      <span class="category">${escapeHTML(item.category)}</span>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${e