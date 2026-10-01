/**
 * GradeMaster — CGPA & SGPA Calculator Application
 * Zero-dependency, modern JavaScript with Chart.js & Canvas-Confetti
 */

// --- Grading Scale Definitions ---
const SCALES = {
  '4.0': {
    max: 4.0,
    grades: [
      { label: 'A+ (4.0)', value: 4.0 },
      { label: 'A (4.0)', value: 4.0 },
      { label: 'A- (3.7)', value: 3.7 },
      { label: 'B+ (3.3)', value: 3.3 },
      { label: 'B (3.0)', value: 3.0 },
      { label: 'B- (2.7)', value: 2.7 },
      { label: 'C+ (2.3)', value: 2.3 },
      { label: 'C (2.0)', value: 2.0 },
      { label: 'C- (1.7)', value: 1.7 },
      { label: 'D+ (1.3)', value: 1.3 },
      { label: 'D (1.0)', value: 1.0 },
      { label: 'F (0.0)', value: 0.0 }
    ]
  },
  '10.0': {
    max: 10.0,
    grades: [
      { label: 'O / S - Outstanding (10.0)', value: 10.0 },
      { label: 'A+ - Excellent (9.0)', value: 9.0 },
      { label: 'A - Very Good (8.0)', value: 8.0 },
      { label: 'B+ - Good (7.0)', value: 7.0 },
      { label: 'B - Above Average (6.0)', value: 6.0 },
      { label: 'C - Average (5.0)', value: 5.0 },
      { label: 'P - Pass (4.0)', value: 4.0 },
      { label: 'F - Fail (0.0)', value: 0.0 }
    ]
  },
  'custom': {
    max: 4.0,
    grades: [
      { label: 'A (4.0)', value: 4.0 },
      { label: 'B (3.0)', value: 3.0 },
      { label: 'C (2.0)', value: 2.0 },
      { label: 'D (1.0)', value: 1.0 },
      { label: 'F (0.0)', value: 0.0 }
    ]
  }
};

// --- Sample Demo Data ---
const DEMO_DATA_4 = {
  currentScale: '4.0',
  semesters: [
    {
      id: 'sem-1',
      title: 'Semester 1 — Fall',
      collapsed: false,
      courses: [
        { id: 'c-101', name: 'Introduction to Computer Science', credits: 4, grade: 4.0 },
        { id: 'c-102', name: 'Calculus & Analytical Geometry', credits: 4, grade: 3.7 },
        { id: 'c-103', name: 'Physics for Engineers', credits: 3, grade: 3.3 },
        { id: 'c-104', name: 'Technical Writing & Communication', credits: 2, grade: 4.0 }
      ]
    },
    {
      id: 'sem-2',
      title: 'Semester 2 — Spring',
      collapsed: false,
      courses: [
        { id: 'c-201', name: 'Data Structures & Algorithms', credits: 4, grade: 4.0 },
        { id: 'c-202', name: 'Linear Algebra & Probability', credits: 3, grade: 3.7 },
        { id: 'c-203', name: 'Digital Logic & Computer Organization', credits: 4, grade: 3.3 },
        { id: 'c-204', name: 'Object-Oriented Programming (Java)', credits: 3, grade: 4.0 }
      ]
    },
    {
      id: 'sem-3',
      title: 'Semester 3 — Fall',
      collapsed: false,
      courses: [
        { id: 'c-301', name: 'Database Management Systems', credits: 4, grade: 4.0 },
        { id: 'c-302', name: 'Operating Systems & Kernels', credits: 4, grade: 3.7 },
        { id: 'c-303', name: 'Software Engineering Principles', credits: 3, grade: 3.7 },
        { id: 'c-304', name: 'Computer Networks', credits: 3, grade: 3.3 }
      ]
    }
  ]
};

const DEMO_DATA_10 = {
  currentScale: '10.0',
  semesters: [
    {
      id: 'sem-10-1',
      title: 'Semester 1 — Monsoon',
      collapsed: false,
      courses: [
        { id: 'c-10-101', name: 'Engineering Mathematics I', credits: 4, grade: 10.0 },
        { id: 'c-10-102', name: 'Problem Solving & Python Programming', credits: 4, grade: 9.0 },
        { id: 'c-10-103', name: 'Engineering Physics & Optics', credits: 3, grade: 9.0 },
        { id: 'c-10-104', name: 'Basic Electrical & Electronics', credits: 3, grade: 8.0 },
        { id: 'c-10-105', name: 'Python Programming Laboratory', credits: 2, grade: 10.0 }
      ]
    },
    {
      id: 'sem-10-2',
      title: 'Semester 2 — Winter',
      collapsed: false,
      courses: [
        { id: 'c-10-201', name: 'Engineering Mathematics II (Calculus)', credits: 4, grade: 9.0 },
        { id: 'c-10-202', name: 'Data Structures and Algorithms', credits: 4, grade: 10.0 },
        { id: 'c-10-203', name: 'Digital Logic & Microprocessors', credits: 4, grade: 8.0 },
        { id: 'c-10-204', name: 'Environmental Science & Sustainability', credits: 2, grade: 9.0 },
        { id: 'c-10-205', name: 'Data Structures Lab', credits: 2, grade: 10.0 }
      ]
    },
    {
      id: 'sem-10-3',
      title: 'Semester 3 — Monsoon',
      collapsed: false,
      courses: [
        { id: 'c-10-301', name: 'Database Management Systems', credits: 4, grade: 10.0 },
        { id: 'c-10-302', name: 'Design and Analysis of Algorithms', credits: 4, grade: 9.0 },
        { id: 'c-10-303', name: 'Operating Systems & System Programming', credits: 4, grade: 9.0 },
        { id: 'c-10-304', name: 'Computer Architecture', credits: 3, grade: 8.0 },
        { id: 'c-10-305', name: 'RDBMS & SQL Laboratory', credits: 2, grade: 10.0 }
      ]
    }
  ]
};

// --- Application State ---
let state = {
  currentScale: '4.0',
  semesters: [],
  customScales: JSON.parse(JSON.stringify(SCALES.custom.grades))
};

let trendChartInstance = null;

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  initTheme();
  setupEventListeners();
  renderApp();
  initChart();
});

// --- Local Storage Management ---
function saveState() {
  localStorage.setItem('grademaster_state', JSON.stringify(state));
}

function loadSavedState() {
  const saved = localStorage.getItem('grademaster_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = parsed;
      if (state.customScales) {
        SCALES.custom.grades = state.customScales;
        const maxCustom = Math.max(...state.customScales.map(g => g.value), 4.0);
        SCALES.custom.max = maxCustom;
      }
    } catch (e) {
      console.error('Error loading saved state', e);
      initDefaultState();
    }
  } else {
    initDefaultState();
  }
}

function initDefaultState() {
  state.currentScale = '4.0';
  state.semesters = [
    {
      id: 'sem-' + Date.now(),
      title: 'Semester 1',
      collapsed: false,
      courses: [
        { id: 'c-1', name: 'Course 1', credits: 3, grade: 4.0 },
        { id: 'c-2', name: 'Course 2', credits: 3, grade: 3.7 },
        { id: 'c-3', name: 'Course 3', credits: 4, grade: 3.3 },
        { id: 'c-4', name: 'Course 4', credits: 3, grade: 4.0 }
      ]
    }
  ];
}

// --- Theme Toggling ---
function initTheme() {
  const savedTheme = localStorage.getItem('grademaster_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  updateThemeIcons();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('grademaster_theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
  updateChartColors();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sun = document.getElementById('theme-sun-icon');
  const moon = document.getElementById('theme-moon-icon');
  if (sun && moon) {
    if (isDark) {
      sun.classList.remove('hidden');
      moon.classList.add('hidden');
    } else {
      sun.classList.add('hidden');
      moon.classList.remove('hidden');
    }
  }
}

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Scale Selector Buttons
  document.getElementById('scale-4-btn').addEventListener('click', () => switchScale('4.0'));
  document.getElementById('scale-10-btn').addEventListener('click', () => switchScale('10.0'));
  document.getElementById('scale-custom-btn').addEventListener('click', () => openCustomScaleModal());

  // Add Semester Buttons
  document.getElementById('add-semester-btn').addEventListener('click', () => addSemester());
  document.getElementById('add-semester-top-btn').addEventListener('click', () => addSemester());

  // Collapse / Expand All
  document.getElementById('collapse-all-btn').addEventListener('click', () => toggleAllSemesters());

  // Header Actions & Demo Dropdown
  const sampleDataBtn = document.getElementById('sample-data-btn');
  const demoDropdownMenu = document.getElementById('demo-dropdown-menu');
  const loadDemo10Btn = document.getElementById('load-demo-10-btn');
  const loadDemo4Btn = document.getElementById('load-demo-4-btn');

  if (sampleDataBtn && demoDropdownMenu) {
    sampleDataBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      demoDropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#demo-dropdown-container')) {
        demoDropdownMenu.classList.add('hidden');
      }
    });
  }

  if (loadDemo10Btn) {
    loadDemo10Btn.addEventListener('click', () => {
      if (demoDropdownMenu) demoDropdownMenu.classList.add('hidden');
      loadDemoData('10.0');
    });
  }

  if (loadDemo4Btn) {
    loadDemo4Btn.addEventListener('click', () => {
      if (demoDropdownMenu) demoDropdownMenu.classList.add('hidden');
      loadDemoData('4.0');
    });
  }

  document.getElementById('print-btn').addEventListener('click', () => printReport());
  document.getElementById('theme-toggle').addEventListener('click', () => toggleTheme());
  document.getElementById('reset-all-btn').addEventListener('click', () => resetAllData());

  // Target Planner
  document.getElementById('calculate-target-btn').addEventListener('click', () => calculateTargetForecaster());

  // JSON Export / Import
  document.getElementById('export-json-btn').addEventListener('click', () => exportDataJSON());
  document.getElementById('import-json-file').addEventListener('change', (e) => importDataJSON(e));

  // Custom Scale Modal Handlers
  document.getElementById('close-scale-modal-btn').addEventListener('click', () => closeCustomScaleModal());
  document.getElementById('cancel-scale-btn').addEventListener('click', () => closeCustomScaleModal());
  document.getElementById('save-scale-btn').addEventListener('click', () => saveCustomScale());
  document.getElementById('add-scale-row-btn').addEventListener('click', () => addCustomScaleRow());
}

// --- Scale Switching ---
function switchScale(newScale) {
  state.currentScale = newScale;
  saveState();
  updateScaleButtonsUI();
  renderApp();
  recalculateEverything();
}

function updateScaleButtonsUI() {
  const btns = {
    '4.0': document.getElementById('scale-4-btn'),
    '10.0': document.getElementById('scale-10-btn'),
    'custom': document.getElementById('scale-custom-btn')
  };

  Object.entries(btns).forEach(([key, btn]) => {
    if (key === state.currentScale) {
      btn.className = 'scale-btn active-scale px-3 py-1.5 rounded-lg text-xs font-semibold transition-all';
    } else {
      btn.className = 'scale-btn text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all';
    }
  });

  const scaleConfig = SCALES[state.currentScale] || SCALES['4.0'];
  document.getElementById('scale-badge').textContent = `Max ${scaleConfig.max.toFixed(2)}`;
}

// --- Render Main Application ---
function renderApp() {
  updateScaleButtonsUI();
  const container = document.getElementById('semesters-container');
  container.innerHTML = '';

  if (state.semesters.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-700/60 bg-slate-800/20">
        <i data-lucide="book-open" class="w-12 h-12 text-slate-500 mx-auto mb-3"></i>
        <h3 class="text-base font-medium text-slate-300">No Semesters Added Yet</h3>
        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">Click "Add Semester" to begin tracking courses, credits, and grades.</p>
        <button onclick="addSemester()" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md transition">
          <i data-lucide="plus" class="w-4 h-4"></i> Add First Semester
        </button>
      </div>
    `;
    lucide.createIcons();
    recalculateEverything();
    return;
  }

  state.semesters.forEach((semester, sIndex) => {
    const card = createSemesterElement(semester, sIndex);
    container.appendChild(card);
  });

  lucide.createIcons();
  recalculateEverything();
}

// --- Create Semester DOM Card ---
function createSemesterElement(semester, index) {
  const card = document.createElement('div');
  card.className = 'semester-card bg-slate-800/70 border border-slate-700/70 rounded-3xl p-5 shadow-lg backdrop-blur-sm transition-all';
  card.id = `sem-card-${semester.id}`;

  const currentScaleObj = SCALES[state.currentScale] || SCALES['4.0'];
  const gradeOptions = currentScaleObj.grades;

  // Header of Semester
  const headerHtml = `
    <div class="flex items-center justify-between pb-3 border-b border-slate-700/50 cursor-pointer" onclick="toggleSemesterCollapse('${semester.id}')">
      <div class="flex items-center gap-3">
        <button type="button" class="text-slate-400 hover:text-white transition p-1">
          <i data-lucide="${semester.collapsed ? 'chevron-right' : 'chevron-down'}" class="w-4 h-4"></i>
        </button>
        <input type="text" value="${escapeHtml(semester.title)}" 
          onclick="event.stopPropagation()"
          onchange="updateSemesterTitle('${semester.id}', this.value)"
          class="font-semibold text-white bg-transparent border-b border-transparent hover:border-slate-600 focus:border-brand-500 focus:outline-none px-1 py-0.5 text-sm transition"
          placeholder="Semester Title (e.g. Fall 2026)">
      </div>

      <div class="flex items-center gap-2" onclick="event.stopPropagation()">
        <!-- SGPA Pill -->
        <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 text-brand-300 font-bold flex items-center gap-1">
          <span>SGPA:</span> <strong id="sgpa-${semester.id}">0.00</strong>
        </span>
        <!-- Total Credits Pill -->
        <span class="text-xs font-mono px-2 py-1 rounded-full bg-slate-900/40 border border-slate-700/40 text-slate-400 hidden sm:inline-block">
          <span id="credits-${semester.id}">0</span> Credits
        </span>

        <!-- Delete Semester Button -->
        <button type="button" onclick="deleteSemester('${semester.id}')" title="Delete Semester" class="btn-remove-semester p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;

  // Courses Table
  let coursesHtml = '';
  if (!semester.collapsed) {
    let rowsHtml = '';
    semester.courses.forEach((course) => {
      // Build grade select options
      let optionsHtml = '';
      gradeOptions.forEach(opt => {
        const isSelected = (Math.abs(opt.value - course.grade) < 0.001);
        optionsHtml += `<option value="${opt.value}" ${isSelected ? 'selected' : ''} class="bg-slate-900 text-white">${opt.label}</option>`;
      });

      rowsHtml += `
        <div class="course-row grid grid-cols-12 gap-2 sm:gap-3 items-center py-2 border-b border-slate-700/30 text-xs" id="row-${course.id}">
          <div class="col-span-5 sm:col-span-6">
            <input type="text" value="${escapeHtml(course.name)}" 
              oninput="updateCourseField('${semester.id}', '${course.id}', 'name', this.value)"
              placeholder="Course Name / Code" 
              class="w-full bg-slate-900/50 border border-slate-700/60 rounded-xl px-2.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition">
          </div>

          <div class="col-span-3 sm:col-span-2">
            <input type="number" min="0" max="20" step="0.5" value="${course.credits}" 
              oninput="updateCourseField('${semester.id}', '${course.id}', 'credits', parseFloat(this.value) || 0)"
              placeholder="Credits" 
              class="w-full bg-slate-900/50 border border-slate-700/60 rounded-xl px-2.5 py-2 text-white placeholder-slate-500 text-center font-mono focus:outline-none focus:border-brand-500 transition">
          </div>

          <div class="col-span-3">
            <select onchange="updateCourseField('${semester.id}', '${course.id}', 'grade', parseFloat(this.value))"
              class="w-full bg-slate-900/50 border border-slate-700/60 rounded-xl px-2.5 py-2 text-white font-medium focus:outline-none focus:border-brand-500 transition cursor-pointer">
              ${optionsHtml}
            </select>
          </div>

          <div class="col-span-1 flex justify-center">
            <button type="button" onclick="deleteCourse('${semester.id}', '${course.id}')" title="Delete Course" class="btn-remove-course text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    });

    coursesHtml = `
      <div class="mt-3">
        <!-- Table Column Headers -->
        <div class="grid grid-cols-12 gap-2 sm:gap-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1 pb-1">
          <div class="col-span-5 sm:col-span-6">Course Name</div>
          <div class="col-span-3 sm:col-span-2 text-center">Credits</div>
          <div class="col-span-3">Grade</div>
          <div class="col-span-1"></div>
        </div>

        <div id="course-list-${semester.id}" class="space-y-1">
          ${rowsHtml}
        </div>

        <!-- Add Course Button -->
        <div class="mt-3 pt-2 flex items-center justify-between">
          <button type="button" onclick="addCourse('${semester.id}')" class="btn-add-course text-xs font-medium text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 px-3 py-1.5 rounded-xl border border-brand-500/20 transition flex items-center gap-1">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Course
          </button>
          
          <button type="button" onclick="duplicateSemester('${semester.id}')" class="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-700/30">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i> Duplicate
          </button>
        </div>
      </div>
    `;
  }

  card.innerHTML = headerHtml + coursesHtml;
  return card;
}

// --- Semester & Course Operations ---
function addSemester() {
  const semNumber = state.semesters.length + 1;
  const newSem = {
    id: 'sem-' + Date.now(),
    title: `Semester ${semNumber}`,
    collapsed: false,
    courses: [
      { id: 'c-' + Date.now() + '-1', name: '', credits: 3, grade: SCALES[state.currentScale].grades[0].value },
      { id: 'c-' + Date.now() + '-2', name: '', credits: 3, grade: SCALES[state.currentScale].grades[1].value },
      { id: 'c-' + Date.now() + '-3', name: '', credits: 4, grade: SCALES[state.currentScale].grades[0].value }
    ]
  };
  state.semesters.push(newSem);
  saveState();
  renderApp();

  // Scroll into view smoothly
  setTimeout(() => {
    const el = document.getElementById(`sem-card-${newSem.id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function deleteSemester(semId) {
  if (state.semesters.length > 1) {
    state.semesters = state.semesters.filter(s => s.id !== semId);
  } else {
    // If last semester, reset courses instead of completely empty if user wants to keep one
    state.semesters = [];
  }
  saveState();
  renderApp();
}

function duplicateSemester(semId) {
  const source = state.semesters.find(s => s.id === semId);
  if (!source) return;
  const newSem = JSON.parse(JSON.stringify(source));
  newSem.id = 'sem-' + Date.now();
  newSem.title = `${source.title} (Copy)`;
  newSem.courses.forEach((c, idx) => {
    c.id = 'c-' + Date.now() + '-' + idx;
  });
  state.semesters.push(newSem);
  saveState();
  renderApp();
}

function updateSemesterTitle(semId, newTitle) {
  const sem = state.semesters.find(s => s.id === semId);
  if (sem) {
    sem.title = newTitle;
    saveState();
  }
}

function toggleSemesterCollapse(semId) {
  const sem = state.semesters.find(s => s.id === semId);
  if (sem) {
    sem.collapsed = !sem.collapsed;
    saveState();
    renderApp();
  }
}

function toggleAllSemesters() {
  const hasExpanded = state.semesters.some(s => !s.collapsed);
  state.semesters.forEach(s => s.collapsed = hasExpanded);
  saveState();
  renderApp();
}

function addCourse(semId) {
  const sem = state.semesters.find(s => s.id === semId);
  if (!sem) return;
  const defaultGrade = SCALES[state.currentScale].grades[0].value;
  sem.courses.push({
    id: 'c-' + Date.now(),
    name: '',
    credits: 3,
    grade: defaultGrade
  });
  saveState();
  renderApp();
}

function deleteCourse(semId, courseId) {
  const sem = state.semesters.find(s => s.id === semId);
  if (!sem) return;
  sem.courses = sem.courses.filter(c => c.id !== courseId);
  saveState();
  renderApp();
}

function updateCourseField(semId, courseId, field, value) {
  const sem = state.semesters.find(s => s.id === semId);
  if (!sem) return;
  const course = sem.courses.find(c => c.id === courseId);
  if (!course) return;

  course[field] = value;
  saveState();
  recalculateEverything();
}

// --- Calculation Core ---
function recalculateEverything() {
  const maxScale = (SCALES[state.currentScale] || SCALES['4.0']).max;
  let grandTotalCredits = 0;
  let grandTotalPoints = 0;
  const semesterTrendData = [];

  state.semesters.forEach((semester, idx) => {
    let semCredits = 0;
    let semPoints = 0;

    semester.courses.forEach(course => {
      const cr = parseFloat(course.credits) || 0;
      const gr = parseFloat(course.grade);
      const gradeVal = isNaN(gr) ? 0 : gr;
      if (cr > 0) {
        semCredits += cr;
        semPoints += (cr * gradeVal);
      }
    });

    const semGpa = semCredits > 0 ? (semPoints / semCredits) : 0;

    // Update individual semester card badges
    const sgpaEl = document.getElementById(`sgpa-${semester.id}`);
    const crEl = document.getElementById(`credits-${semester.id}`);
    if (sgpaEl) sgpaEl.textContent = semGpa.toFixed(2);
    if (crEl) crEl.textContent = semCredits.toString();

    grandTotalCredits += semCredits;
    grandTotalPoints += semPoints;

    semesterTrendData.push({
      label: semester.title || `Sem ${idx + 1}`,
      sgpa: parseFloat(semGpa.toFixed(2)),
      runningCredits: grandTotalCredits,
      runningPoints: grandTotalPoints
    });
  });

  const cumulativeGpa = grandTotalCredits > 0 ? (grandTotalPoints / grandTotalCredits) : 0;
  const percentage = maxScale > 0 ? (cumulativeGpa / maxScale) * 100 : 0;

  // Update Summary Dashboard
  document.getElementById('cgpa-value').textContent = cumulativeGpa.toFixed(2);
  document.getElementById('cgpa-percentage').textContent = `${percentage.toFixed(1)}%`;
  document.getElementById('total-credits').textContent = grandTotalCredits.toString();
  document.getElementById('total-points').textContent = grandTotalPoints.toFixed(1);
  document.getElementById('total-semesters').textContent = state.semesters.length.toString();

  // Update Radial Gauge Circle
  // Circumference = 2 * PI * r = 2 * 3.14159 * 42 ~= 263.89
  const circle = document.getElementById('cgpa-gauge-circle');
  if (circle) {
    const circumference = 264;
    const progressFraction = Math.min(Math.max(cumulativeGpa / maxScale, 0), 1);
    const offset = circumference - (progressFraction * circumference);
    circle.style.strokeDashoffset = offset.toString();

    // Color gradient based on score
    if (progressFraction >= 0.85) {
      circle.setAttribute('class', 'text-emerald-500 transition-all duration-700 ease-out');
    } else if (progressFraction >= 0.70) {
      circle.setAttribute('class', 'text-brand-500 transition-all duration-700 ease-out');
    } else if (progressFraction >= 0.50) {
      circle.setAttribute('class', 'text-amber-500 transition-all duration-700 ease-out');
    } else {
      circle.setAttribute('class', 'text-rose-500 transition-all duration-700 ease-out');
    }
  }

  // Update Academic Standing Badge
  updateAcademicStanding(cumulativeGpa, maxScale, grandTotalCredits);

  // Update Chart
  updateChart(semesterTrendData, maxScale);
}

function updateAcademicStanding(cgpa, maxScale, totalCredits) {
  const badge = document.getElementById('academic-standing');
  if (!badge) return;

  if (totalCredits === 0) {
    badge.className = 'mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700 text-center';
    badge.textContent = 'No Data';
    return;
  }

  const ratio = cgpa / maxScale;

  if (ratio >= 0.90) {
    badge.className = 'mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-center';
    badge.textContent = 'First Class with Distinction';
  } else if (ratio >= 0.80) {
    badge.className = 'mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-center';
    badge.textContent = 'First Class / Honors';
  } else if (ratio >= 0.70) {
    badge.className = 'mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 text-center';
    badge.textContent = 'Good Standing';
  } else if (ratio >= 0.50) {
    badge.className = 'mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 text-center';
    badge.textContent = 'Satisfactory';
  } else {
    badge.className = 'mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 text-center';
    badge.textContent = 'Needs Improvement';
  }
}

// --- Chart.js Setup & Updates ---
function initChart() {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(203, 213, 225, 0.5)';

  const ctx = canvas.getContext('2d');
  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'SGPA',
          data: [],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointBackgroundColor: '#6366f1',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Running CGPA',
          data: [],
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderDash: [4, 4],
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 10,
            font: { size: 10, weight: 'bold' },
            color: textColor
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          titleColor: isDark ? '#ffffff' : '#0f172a',
          bodyColor: isDark ? '#cbd5e1' : '#334155',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          padding: 8,
          boxPadding: 4,
          usePointStyle: true
        }
      },
      scales: {
        x: {
          grid: { color: gridColor, drawBorder: false },
          ticks: { color: textColor, font: { size: 10 } }
        },
        y: {
          min: 0,
          max: (SCALES[state.currentScale] || SCALES['4.0']).max,
          grid: { color: gridColor, drawBorder: false },
          ticks: { color: textColor, font: { size: 10 }, stepSize: 1 }
        }
      }
    }
  });
}

function updateChart(trendData, maxScale) {
  if (!trendChartInstance) return;

  const labels = trendData.map(d => d.label);
  const sgpaValues = trendData.map(d => d.sgpa);
  const cgpaValues = trendData.map(d => {
    return d.runningCredits > 0 ? parseFloat((d.runningPoints / d.runningCredits).toFixed(2)) : 0;
  });

  trendChartInstance.data.labels = labels;
  trendChartInstance.data.datasets[0].data = sgpaValues;
  trendChartInstance.data.datasets[1].data = cgpaValues;
  trendChartInstance.options.scales.y.max = maxScale;
  trendChartInstance.update();
}

function updateChartColors() {
  if (!trendChartInstance) return;
  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(51, 65, 85, 0.4)' : 'rgba(203, 213, 225, 0.5)';

  trendChartInstance.options.scales.x.ticks.color = textColor;
  trendChartInstance.options.scales.x.grid.color = gridColor;
  trendChartInstance.options.scales.y.ticks.color = textColor;
  trendChartInstance.options.scales.y.grid.color = gridColor;
  trendChartInstance.options.plugins.legend.labels.color = textColor;
  trendChartInstance.update();
}

// --- Target CGPA Forecaster Logic ---
function calculateTargetForecaster() {
  const targetInput = document.getElementById('target-cgpa-input');
  const remainingInput = document.getElementById('remaining-credits-input');
  const resultBox = document.getElementById('target-result-box');
  const requiredSgpaEl = document.getElementById('target-required-sgpa');
  const feedbackEl = document.getElementById('target-feedback');

  const targetGpa = parseFloat(targetInput.value);
  const remainingCredits = parseFloat(remainingInput.value);
  const maxScale = (SCALES[state.currentScale] || SCALES['4.0']).max;

  if (isNaN(targetGpa) || isNaN(remainingCredits) || remainingCredits <= 0) {
    alert('Please enter a valid target CGPA and positive remaining credits.');
    return;
  }

  // Calculate current total completed credits and points
  let currentCredits = 0;
  let currentPoints = 0;
  state.semesters.forEach(sem => {
    sem.courses.forEach(c => {
      const cr = parseFloat(c.credits) || 0;
      const gr = parseFloat(c.grade) || 0;
      if (cr > 0) {
        currentCredits += cr;
        currentPoints += (cr * gr);
      }
    });
  });

  const totalFutureCredits = currentCredits + remainingCredits;
  const totalRequiredPoints = targetGpa * totalFutureCredits;
  const neededFuturePoints = totalRequiredPoints - currentPoints;
  const requiredSgpa = neededFuturePoints / remainingCredits;

  resultBox.classList.remove('hidden');
  requiredSgpaEl.textContent = requiredSgpa.toFixed(2);

  if (requiredSgpa > maxScale) {
    requiredSgpaEl.className = 'text-xl font-bold text-rose-400 block my-0.5';
    feedbackEl.textContent = `Target is mathematically unreachable (exceeds the maximum possible scale of ${maxScale.toFixed(2)}). Consider adjusting your target.`;
  } else if (requiredSgpa <= 0) {
    requiredSgpaEl.className = 'text-xl font-bold text-emerald-400 block my-0.5';
    feedbackEl.textContent = `Great news! You have already surpassed this target. Even with 0.0 in remaining credits, your target is locked in.`;
  } else {
    requiredSgpaEl.className = 'text-xl font-bold text-amber-400 block my-0.5';
    feedbackEl.textContent = `You need to average ${requiredSgpa.toFixed(2)} SGPA across your next ${remainingCredits} credits to graduate with a ${targetGpa.toFixed(2)} CGPA!`;
  }
}

// --- Demo Data & Celebrations ---
function loadDemoData(scaleType) {
  const chosenScale = scaleType || (state.currentScale === '10.0' ? '10.0' : '4.0');
  const targetDemo = (chosenScale === '10.0') ? DEMO_DATA_10 : DEMO_DATA_4;
  const scaleLabel = (chosenScale === '10.0') ? '10.0 scale (Indian / Univ standard: O, A+, A...)' : '4.0 scale (US / Standard: A+, A, B+...)';

  if (confirm(`Load ${scaleLabel} demo transcript data? This will populate 3 semesters with sample coursework.`)) {
    state.currentScale = targetDemo.currentScale;
    state.semesters = JSON.parse(JSON.stringify(targetDemo.semesters));
    saveState();
    renderApp();
    triggerCelebration();
  }
}

function triggerCelebration() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function resetAllData() {
  if (confirm('Are you sure you want to clear all semesters and courses? This action cannot be undone.')) {
    state.semesters = [];
    saveState();
    renderApp();
  }
}

// --- Print / PDF Export ---
function printReport() {
  const dateEl = document.getElementById('print-date');
  if (dateEl) {
    dateEl.textContent = 'Date: ' + new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  window.print();
}

// --- Data Export & Import (JSON) ---
function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `GradeMaster_Transcript_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importDataJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && Array.isArray(imported.semesters)) {
        state = imported;
        saveState();
        renderApp();
        alert('Transcript data successfully imported!');
      } else {
        alert('Invalid file format. Please upload a valid GradeMaster JSON export.');
      }
    } catch (err) {
      alert('Failed to parse JSON file.');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// --- Custom Scale Modal ---
function openCustomScaleModal() {
  const modal = document.getElementById('custom-scale-modal');
  modal.classList.remove('hidden');
  renderCustomScaleRows();
  lucide.createIcons();
}

function closeCustomScaleModal() {
  const modal = document.getElementById('custom-scale-modal');
  modal.classList.add('hidden');
}

function renderCustomScaleRows() {
  const container = document.getElementById('custom-scale-items');
  container.innerHTML = '';

  const scaleItems = state.customScales || SCALES.custom.grades;
  scaleItems.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2 text-xs';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(item.label)}" class="custom-grade-label w-2/3 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white" placeholder="e.g. A+ or Distinction">
      <input type="number" step="0.1" value="${item.value}" class="custom-grade-val w-1/3 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono" placeholder="Points">
      <button type="button" onclick="removeCustomScaleRow(${idx})" class="text-slate-500 hover:text-rose-400 p-1">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;
    container.appendChild(row);
  });
  lucide.createIcons();
}

function addCustomScaleRow() {
  state.customScales = state.customScales || [];
  state.customScales.push({ label: 'New Grade', value: 0.0 });
  renderCustomScaleRows();
}

window.removeCustomScaleRow = function(idx) {
  state.customScales.splice(idx, 1);
  renderCustomScaleRows();
};

function saveCustomScale() {
  const labels = document.querySelectorAll('.custom-grade-label');
  const vals = document.querySelectorAll('.custom-grade-val');
  const newScales = [];

  labels.forEach((lblInput, i) => {
    const valInput = vals[i];
    const lbl = lblInput.value.trim();
    const val = parseFloat(valInput.value);
    if (lbl && !isNaN(val)) {
      newScales.push({ label: lbl, value: val });
    }
  });

  if (newScales.length === 0) {
    alert('Please enter at least one valid grade and point value.');
    return;
  }

  // Sort descending by point value
  newScales.sort((a, b) => b.value - a.value);

  state.customScales = newScales;
  SCALES.custom.grades = newScales;
  SCALES.custom.max = Math.max(...newScales.map(g => g.value), 4.0);

  state.currentScale = 'custom';
  saveState();
  closeCustomScaleModal();
  renderApp();
}

// --- Utility Helpers ---
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Global hookups for dynamic inline onclick handlers
window.toggleSemesterCollapse = toggleSemesterCollapse;
window.updateSemesterTitle = updateSemesterTitle;
window.deleteSemester = deleteSemester;
window.addCourse = addCourse;
window.deleteCourse = deleteCourse;
window.updateCourseField = updateCourseField;
window.duplicateSemester = duplicateSemester;
window.addSemester = addSemester;
window.loadDemoData = loadDemoData;
