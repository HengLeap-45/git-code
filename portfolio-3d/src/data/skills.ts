// ============================================================
// EDIT PROFICIENCY (0-100) to reflect your real skill levels.
// These starting values are placeholders, not a self-assessment.
// ============================================================

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";

export interface Skill {
  name: string;
  level: number; // 0-100, editable
  description: string;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", level: 50, category: "Frontend", description: "Semantic, accessible page structure." },
  { name: "CSS", level: 50, category: "Frontend", description: "Layouts, animations, and responsive design." },
  { name: "JavaScript", level: 50, category: "Frontend", description: "Core language for interactive web apps." },
  { name: "TypeScript", level: 50, category: "Frontend", description: "Typed JavaScript for safer, maintainable code." },
  { name: "React", level: 50, category: "Frontend", description: "Component-based UIs with hooks and state." },
  { name: "Tailwind CSS", level: 50, category: "Frontend", description: "Utility-first styling for fast, consistent UI." },

  // Backend
  { name: "Python", level: 50, category: "Backend", description: "Scripting, automation, and backend services." },
  { name: "Java", level: 50, category: "Backend", description: "Object-oriented application development." },
  { name: "Node.js", level: 50, category: "Backend", description: "JavaScript runtime for server-side apps." },
  { name: "REST API", level: 50, category: "Backend", description: "Designing and consuming HTTP APIs." },

  // Database
  { name: "MySQL", level: 50, category: "Database", description: "Relational data modeling and queries." },
  { name: "PostgreSQL", level: 50, category: "Database", description: "Advanced relational database features." },
  { name: "SQLite", level: 50, category: "Database", description: "Lightweight embedded database." },

  // Tools
  { name: "Git", level: 50, category: "Tools", description: "Version control and branching workflows." },
  { name: "GitHub", level: 50, category: "Tools", description: "Collaboration, pull requests, and hosting." },
  { name: "VS Code", level: 50, category: "Tools", description: "Primary editor for development." },
  { name: "Figma", level: 50, category: "Tools", description: "Interface design and prototyping." },
  { name: "Linux", level: 50, category: "Tools", description: "Command-line environment and scripting." },
];
