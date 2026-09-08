import { ArrowUpRight } from "lucide-react";
import "./Projects.css";

const projects = [
  {
    number: "01",
    title: "CodeScope Analyzer",
    description:
      "A code quality analysis tool built to identify common issues, enforce development rules and improve code maintainability.",
    technologies: ["React", "TypeScript", "Node.js"],
    image: "/projects/codescope-preview.jpg",
    link: "#",
  },
  {
    number: "02",
    title: "E-Learning Platform",
    description:
      "A modern educational platform focused on delivering structured learning content through a clean and intuitive interface.",
    technologies: ["React", "TypeScript", "REST API"],
    image: "/projects/elearning-preview.jpg",
    link: "#",
  },
  {
    number: "03",
    title: "Creative Portfolio",
    description:
      "A responsive portfolio experience designed to showcase creative work through clean layouts, motion and visual storytelling.",
    technologies: ["React", "TypeScript", "Motion"],
    image: "/projects/portfolio-preview.jpg",
    link: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <div className="projects__header">
          <p className="projects__eyebrow">Selected Work</p>

          <h2 className="projects__title">
            Projects built with
            <span> purpose and precision.</span>
          </h2>

          <p className="projects__intro">
            A selection of projects focused on usability, performance and clean
            development.
          </p>
        </div>

        <div className="projects__list">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card__top">
                <span className="project-card__number">{project.number}</span>

                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>

                  <p className="project-card__description">
                    {project.description}
                  </p>

                  <div className="project-card__technologies">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.link}
                  className="project-card__link"
                  aria-label={`View ${project.title}`}
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>

              <div className="project-card__preview">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
