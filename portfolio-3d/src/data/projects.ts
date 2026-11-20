// ============================================================
// EDIT THIS FILE to add, remove, or update your projects.
// Replace example titles, descriptions, and URLs with your own.
// Set liveUrl or githubUrl to "" to hide that button.
// ============================================================

export type ProjectCategory = "Web App" | "Frontend" | "Backend" | "Full Stack" | "Experiment";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string; // Path under public/, e.g. /projects/task-app.jpg
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  challenge: string;
  solution: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "example-task-app",
    title: "Example Task Manager",
    category: "Full Stack",
    description:
      "A task management app with authentication, drag-and-drop boards, and real-time updates.",
    image: "/projects/task-manager.svg",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "",
    challenge: "Keeping board state consistent when several updates arrived at once.",
    solution: "Used optimistic updates with server reconciliation and a single source of truth.",
    featured: true,
  },
  {
    id: "example-weather-dashboard",
    title: "Example Weather Dashboard",
    category: "Frontend",
    description:
      "A responsive dashboard showing forecasts, with animated charts and saved locations.",
    image: "/projects/weather-dashboard.svg",
    technologies: ["React", "Tailwind CSS", "REST API"],
    liveUrl: "",
    githubUrl: "",
    challenge: "Rendering large forecast datasets without slowing the interface.",
    solution: "Memoized chart data and lazy-loaded the chart library only when needed.",
  },
  {
    id: "example-inventory-api",
    title: "Example Inventory API",
    category: "Backend",
    description:
      "A REST API for managing products, stock levels, and low-stock alerts.",
    image: "/projects/inventory-api.svg",
    technologies: ["Python", "SQLite", "REST API"],
    liveUrl: "",
    githubUrl: "",
    challenge: "Preventing stock from going negative during concurrent orders.",
    solution: "Wrapped stock changes in transactions with row-level validation.",
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Web App",
  "Experiment",
];
