import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { projects } from "../../data/projects";
import useSectionReveal from "../../hooks/useSectionReveal";

import "./Projects.css";

const Projects = () => {
  const { elementRef: sectionRef, isVisible } = useSectionReveal<HTMLElement>();

  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollControls = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    setCanScrollLeft(carousel.scrollLeft > 4);

    setCanScrollRight(carousel.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    updateScrollControls();

    carousel.addEventListener("scroll", updateScrollControls, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollControls);

    return () => {
      carousel.removeEventListener("scroll", updateScrollControls);

      window.removeEventListener("resize", updateScrollControls);
    };
  }, [updateScrollControls]);

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const card = carousel.querySelector<HTMLElement>(".project-card");

    const cardWidth = card?.offsetWidth ?? 350;

    const styles = window.getComputedStyle(carousel);

    const gap = Number.parseFloat(styles.columnGap || styles.gap || "24") || 24;

    carousel.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`projects ${isVisible ? "projects--visible" : ""}`}
    >
      <div className="projects__container">
        <div className="projects__header">
          <div>
            <p className="projects__eyebrow">Selected Work</p>

            <h2 className="projects__title">
              Projects built with
              <span> purpose and precision.</span>
            </h2>
          </div>

          <div
            className="projects__controls"
            role="group"
            aria-label="Project carousel controls"
          >
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous projects"
              disabled={!canScrollLeft}
            >
              <ArrowLeft size={19} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              aria-label="Next projects"
              disabled={!canScrollRight}
            >
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="projects__carousel"
          role="region"
          aria-label="Selected projects"
        >
          {projects.map((project) => {
            const projectUrl = project.liveUrl ?? project.githubUrl;

            const ariaLabel = project.liveUrl
              ? `Open ${project.title} live project`
              : `Open ${project.title} GitHub repository`;

            const cardContent = (
              <>
                <div className="project-card__preview">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="project-card__placeholder">
                      <span>{project.number}</span>

                      <p>{project.title}</p>
                    </div>
                  )}

                  <div
                    className="project-card__preview-overlay"
                    aria-hidden="true"
                  />
                </div>

                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span>{project.number}</span>

                    <span className="project-card__arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
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
              </>
            );

            return (
              <article key={project.number} className="project-card">
                {projectUrl ? (
                  <a
                    href={projectUrl}
                    className="project-card__content"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="project-card__content">{cardContent}</div>
                )}
              </article>
            );
          })}
        </div>

        <p className="projects__swipe">Swipe to explore projects</p>
      </div>
    </section>
  );
};

export default Projects;
