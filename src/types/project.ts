export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
};
