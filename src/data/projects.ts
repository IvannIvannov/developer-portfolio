import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    number: "01",
    title: "FlowMind",
    category: "Desktop Application",
    year: "2026",
    role: "Full-Stack Development",

    shortDescription:
      "A modern productivity desktop application that brings tasks, projects, planning and local AI assistance together in one focused workspace. Currently available as a Windows beta.",

    technologies: [
      "Tauri",
      "React",
      "TypeScript",
      "Rust",
      "Supabase",
      "Ollama",
      "Vite",
    ],

    image:
      "https://res.cloudinary.com/dznyfk4z6/image/upload/f_auto,q_auto,w_1600/v1794414018/Screenshot_2026-11-11_181940_s3x98m.png",

    downloadUrl:
      "https://github.com/IvannIvannov/flowmind/releases/download/v1.0.0/flowmind_1.0.0_x64-setup.exe",

    downloadLabel: "Download for Windows",
  },

  {
    number: "02",
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
    number: "03",
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
    number: "04",
    title: "Anastasia Portfolio",
    category: "Portfolio Website",
    year: "2026",
    role: "Frontend Development",

    shortDescription:
      "A modern personal portfolio focused on visual presentation, motion and a clean responsive experience. Currently in development.",

    technologies: ["React", "TypeScript", "Motion", "Vite", "Vercel"],

    image:
      "https://res.cloudinary.com/dznyfk4z6/image/upload/f_auto,q_auto,w_1600/Bebe_qxmeb2.png",

    liveUrl: "https://anastasia-portfolio.vercel.app/",
  },

  {
    number: "05",
    title: "Restaurant Website",
    category: "Restaurant Website",
    year: "2026",
    role: "Full-Stack Development",

    shortDescription:
      "A modern bilingual restaurant website with reservations, customer accounts, authentication and an admin dashboard, built around a premium responsive experience. Currently in development.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Motion",
      "Vercel",
    ],

    liveUrl: "https://restaurant-website-mu-mauve.vercel.app/bg",
  },
];
