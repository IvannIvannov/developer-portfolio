import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import "./Projects.css";

const projects = [
  {
    number: "01",
    title: "CodeScope Analyzer",
    description:
      "A code quality analysis tool focused on cleaner and more maintainable development.",
    technologies: ["React", "TypeScript", "Node.js"],
    image: "/projects/codescope-preview.jpg",
    link: "#",
  },
  {
    number: "02",
    title: "E-Learning Platform",
    description:
      "A modern learning platform designed around structured content and intuitive navigation.",
    technologies: ["React", "TypeScript", "REST API"],
    image: "/projects/elearning-preview.jpg",
    link: "#",
  },
  {
    number: "03",
    title: "Creative Portfolio",
    description:
      "A responsive portfolio focused on visual storytelling, performance and motion.",
    technologies: ["React", "TypeScript", "Motion"],
    image: "/projects/portfolio-preview.jpg",
    link: "#",
  },
  {
    number: "04",
    title: "Web Project",
    description:
      "A modern digital experience built with a focus on usability and clean development.",
    technologies: ["React", "TypeScript"],
    image: "/projects/project-preview.jpg",
    link: "#",
  },
];

const Projects = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const cardWidth =
      carouselRef.current.querySelector<HTMLElement>(".project-card")
        ?.offsetWidth ?? 350;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <div className="projects__header">
          <div>
            <p className="projects__eyebrow">Selected Work</p>

            <h2 className="projects__title">
              Projects built with
              <span> purpose and precision.</span>
            </h2>
          </div>

          <div className="projects__controls">
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous projects"
            >
              <ArrowLeft size={19} />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              aria-label="Next projects"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        <div className="projects__carousel" ref={carouselRef}>
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card__preview">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                />
              </div>

              <div className="project-card__body">
                <div className="project-card__meta">
                  <span>{project.number}</span>

                  <a
                    href={project.link}
                    aria-label={`View ${project.title}`}
                    className="project-card__link"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
