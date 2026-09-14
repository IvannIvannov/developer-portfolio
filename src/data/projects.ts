import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    number: "01",
    title: "CodeScope Analyzer",
    category: "Developer Tool",
    year: "2026",
    role: "Full-Stack Development",

    shortDescription:
      "A code quality analysis tool focused on identifying common issues and improving maintainability.",

    technologies: ["TypeScript", "Node.js", "Code Analysis", "Git"],

    image:
      "https://res.cloudinary.com/dznyfk4z6/image/upload/f_auto,q_auto,w_1600/codescope_gfdlez.png",

    liveUrl: "https://codescope-n5t7.onrender.com/",
  },

  {
    number: "02",
    title: "E-Learning Platform",
    category: "Web Platform",
    year: "2026",
    role: "Frontend Development",

    shortDescription:
      "A modern educational platform designed around structured learning content and intuitive navigation.",

    technologies: ["React", "TypeScript", "JavaScript", "CSS", "REST API"],

    githubUrl: "https://github.com/IvannIvannov/react-diploma-project",
  },

  {
    number: "03",
    title: "Anastasia Portfolio",
    category: "Portfolio Website",
    year: "2026",
    role: "Frontend Development",

    shortDescription:
      "A modern personal portfolio focused on visual presentation, motion and a clean responsive experience.",

    technologies: ["React", "TypeScript", "Motion", "Vite", "Vercel"],

    image:
      "https://res.cloudinary.com/dznyfk4z6/image/upload/f_auto,q_auto,w_1600/Bebe_qxmeb2.png",

    liveUrl: "https://anastasia-portfolio.vercel.app/",
  },
];
