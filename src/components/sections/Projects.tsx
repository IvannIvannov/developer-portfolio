import { useRef } from "react";
import { Link } from "react-router-dom";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { projects } from "../../data/projects";

import "./Projects.css";

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
            <article key={project.slug} className="project-card">
              <div className="project-card__preview">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                  />
                ) : (
                  <div className="project-card__placeholder">
                    <span>{project.number}</span>
                    <p>{project.title}</p>
                  </div>
                )}
              </div>

              <div className="project-card__body">
                <div className="project-card__meta">
                  <span>{project.number}</span>

                  <Link
                    to={`/projects/${project.slug}`}
                    aria-label={`View ${project.title}`}
                    className="project-card__link"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                <h3 className="project-card__title">{project.title}</h3>

                <p className="project-card__description">
                  {project.shortDescription}
                </p>

                <div className="project-card__technologies">
                  {project.technologies.slice(0, 3).map((technology) => (
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
