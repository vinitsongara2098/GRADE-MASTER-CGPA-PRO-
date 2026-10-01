# GradeMaster — Modern CGPA & SGPA Calculator Frontend

A modern, responsive, zero-dependency Cumulative Grade Point Average (CGPA) and Semester Grade Point Average (SGPA) calculator built with pure **HTML5, Tailwind CSS, and modern JavaScript**.

---

## 🚀 Quick Start

No build tools, npm packages, or dependencies are required to run this project!

1. Open the file directly in any web browser:
   - Double-click **`index.html`** or right-click and choose **Open with > Chrome / Edge / Firefox / Safari**.
2. Start adding your courses, credit hours, and grades to see real-time updates!

---

## ✨ Features

- **Multi-Semester Management**:
  - Add unlimited semesters and courses dynamically.
  - Collapse / Expand individual semesters or all at once.
  - Duplicate semesters with 1-click for quick entry.
  - Delete individual courses or entire semesters.
- **Multiple Grading Scales**:
  - **4.0 Scale** (Standard US/International: A+, A, A-, B+, B, ...)
  - **10.0 Scale** (Indian / VTU / Anna Univ / CBSE: O, A+, A, B+, B, ...)
  - **Custom Grading Scale**: Define your own custom grades, labels, and grade point mappings in a modal dialog.
- **Real-Time Live Calculation**:
  - Semester GPA (**SGPA**) calculated per semester: $\frac{\sum (\text{Credits} \times \text{GradePoints})}{\sum \text{Credits}}$
  - Cumulative GPA (**CGPA**) computed across all semesters.
  - Total credits completed and total quality points earned.
  - Smooth animated radial circular gauge with score percentages and academic honors classification.
- **Interactive Semester Trend Chart**:
  - Live Chart.js graph tracking semester-by-semester SGPA progression vs running CGPA.
- **Target CGPA Forecaster ("What do I need?")**:
  - Enter desired target CGPA and remaining credits to see the exact future SGPA needed to achieve your goal.
  - Alerts you whether the target is achievable or mathematically impossible.
- **Data Persistence & Backups**:
  - Auto-saves all changes to browser `localStorage` — never lose your calculations on reload!
  - **Demo Presets**: 1-click load pre-filled transcripts for both **10.0 Scale** (Engineering / Indian University grading: O, A+, A...) and **4.0 Scale** (US/Standard GPA) with celebratory confetti!
  - **Export to JSON**: Download your transcript data as a backup file.
  - **Import from JSON**: Restore previous calculations on any device.
- **PDF & Print Ready**:
  - Click **Print / PDF** to open a clean, formatted academic transcript view ready for saving or sharing.
- **Dark & Light Mode**:
  - Smooth 1-click theme toggling with automatic system preference detection.

---

## 📁 Project Structure

```
cgpa-calculator/
├── index.html        # Main HTML application layout and UI components
├── styles.css        # Theme variables, custom styling, animations, and print rules
├── app.js            # Calculation logic, scale definitions, Chart.js, storage
└── README.md         # Documentation & guide
```

---

## 🌐 Free Hosting / Deployment

To share your calculator online with classmates:
- **GitHub Pages**: Push this directory to a GitHub repository and turn on Pages in repository settings.
- **Vercel / Netlify**: Drag-and-drop the folder directly onto [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com) for instant live URLs!
