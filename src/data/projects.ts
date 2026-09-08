import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    number: "01",
    slug: "codescope-analyzer",
    title: "CodeScope Analyzer",
    category: "Developer Tool",
    year: "2026",
    role: "Full-Stack Development",

    shortDescription:
      "A code quality analysis tool focused on identifying common issues and improving maintainability.",

    description:
      "CodeScope Analyzer is a developer-focused tool created to analyse source code against a predefined set of quality rules and provide clear feedback about potential issues.",

    technologies: ["TypeScript", "Node.js", "Code Analysis", "Git"],

    problem:
      "As projects grow, maintaining consistent code quality becomes increasingly difficult. Repetitive issues such as excessive complexity, deeply nested logic and inconsistent development practices can easily become difficult to track manually.",

    solution:
      "CodeScope Analyzer introduces automated rules that inspect code and highlight potential quality problems. The goal is to provide developers with fast and understandable feedback before those problems grow into larger maintenance issues.",

    features: [
      "Automated code quality analysis",
      "Custom development rules",
      "Complexity detection",
      "Function length validation",
      "Parameter limit checks",
      "Deep nesting detection",
      "Structured analysis results",
    ],

    challenges:
      "One of the main challenges was designing the analysis rules so they remained useful without producing unnecessary noise. The project required careful handling of different code structures while keeping the output understandable.",
  },

  {
    number: "02",
    slug: "e-learning-platform",
    title: "E-Learning Platform",
    category: "Web Platform",
    year: "2026",
    role: "Frontend Development",

    shortDescription:
      "A modern educational platform designed around structured learning content and intuitive navigation.",

    description:
      "A React-based e-learning platform developed to provide users with a clear and accessible environment for consuming structured educational content.",

    technologies: ["React", "TypeScript", "JavaScript", "CSS", "REST API"],

    problem:
      "Educational content can quickly become difficult to navigate when lessons, resources and learning materials are presented without a clear structure.",

    solution:
      "The platform was designed around simple navigation, reusable interface components and a structured content hierarchy that makes learning materials easier to discover and use.",

    features: [
      "Structured learning content",
      "Responsive user interface",
      "Reusable React components",
      "Course and lesson navigation",
      "Modern interface design",
      "API-ready architecture",
    ],

    challenges:
      "The main challenge was balancing the amount of educational information on screen while keeping the interface simple, responsive and easy to navigate.",
  },

  {
    number: "03",
    slug: "creative-portfolio",
    title: "Creative Portfolio",
    category: "Portfolio Website",
    year: "2026",
    role: "Frontend Development",

    shortDescription:
      "A responsive portfolio experience focused on visual storytelling, motion and modern presentation.",

    description:
      "A modern portfolio website developed to showcase creative work through strong visual hierarchy, responsive layouts and subtle motion.",

    technologies: ["React", "TypeScript", "Motion", "Vite", "Vercel"],

    problem:
      "Creative portfolios often need to display a large amount of visual content without overwhelming the visitor or making the experience feel like a simple gallery.",

    solution:
      "The website combines carefully structured sections, responsive layouts and subtle animation to create a portfolio that feels both visually engaging and easy to explore.",

    features: [
      "Responsive portfolio layout",
      "Animated interface elements",
      "Project presentation sections",
      "Video and visual content integration",
      "Contact functionality",
      "Vercel deployment",
    ],

    challenges:
      "The key challenge was maintaining strong visual impact while keeping performance, responsiveness and usability consistent across different screen sizes.",
  },
];
