// ============================================================
// EDIT THIS FILE with your real education, work, and milestones.
// Remove any entry you don't have. Dates use "YYYY" or "Mon YYYY".
// ============================================================

export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "education" | "work" | "learning";
}

export const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "Bachelor's Degree in Computer Science",
    organization: "Your University",
    period: "2022 - Present",
    description: "Core coursework in algorithms, databases, and software engineering.",
  },
  {
    type: "learning",
    title: "Full-Stack Web Development",
    organization: "Online Course / Self-Study",
    period: "2023",
    description: "Built several full-stack applications with React and Node.js.",
  },
  {
    type: "work",
    title: "Internship or Freelance Role",
    organization: "Company Name",
    period: "2024",
    description: "Delivered features, fixed bugs, and collaborated in a team workflow.",
  },
];

export const certifications = [
  { name: "Example Certification", issuer: "Issuing Organization", year: "2024" },
];

export const achievements = [
  { title: "Example Achievement", detail: "Describe a milestone, award, or recognition." },
];

export const futureGoals = [
  "Ship a production product to real users.",
  "Deepen expertise in system design and cloud infrastructure.",
];
