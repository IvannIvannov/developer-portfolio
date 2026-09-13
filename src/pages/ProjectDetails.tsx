import { useEffect } from "react";

import { Link, Navigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
} from "lucide-react";

import { projects } from "../data/projects";

import Footer from "../components/layout/Footer";

import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { slug } = useParams();

  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [slug]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);

  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <main className="project-page">
        <div className="project-page__container">
          <nav className="project-page__nav">
            <Link to="/" className="project-page__back">
              <ArrowLeft size={15} />
              Back to portfolio
            </Link>

            <span>
              {project.number} / {String(projects.length).padStart(2, "0")}
            </span>
          </nav>

          <header className="project-hero">
            <p className="project-hero__eyebrow">{project.category}</p>

            <div className="project-hero__heading">
              <h1>{project.title}</h1>

              <div className="project-hero__side">
                <p>{project.shortDescription}</p>

                <div className="project-hero__actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-hero__live"
                    >
                      View live project
                      <ExternalLink size={17} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-hero__source"
                    >
                      View code
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="project-hero__meta">
              <div>
                <span>Year</span>

                <strong>{project.year}</strong>
              </div>

              <div>
                <span>Role</span>

                <strong>{project.role}</strong>
              </div>

              <div>
                <span>Built with</span>

                <strong>{project.technologies.slice(0, 4).join(" · ")}</strong>
              </div>
            </div>
          </header>

          <section className="project-preview">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} website preview`}
              />
            ) : (
              <div className="project-preview__placeholder">
                <span>{project.number}</span>

                <div>
                  <p>Project preview</p>

                  <strong>{project.title}</strong>
                </div>
              </div>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-preview__visit"
              >
                <span>Open website</span>

                <ArrowUpRight size={18} />
              </a>
            )}
          </section>

          <section className="project-summary">
            <div className="project-summary__heading">
              <span>About the project</span>

              <h2>
                Built with a clear
                <span> purpose.</span>
              </h2>
            </div>

            <p className="project-summary__text">{project.description}</p>
          </section>

          <section className="project-features">
            <div className="project-features__header">
              <span>Key features</span>

              <span>{String(project.features.length).padStart(2, "0")}</span>
            </div>

            <div className="project-features__grid">
              {project.features.slice(0, 6).map((feature, index) => (
                <div className="project-feature" key={feature}>
                  <span className="project-feature__icon">
                    <Check size={14} />
                  </span>

                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <p>{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {project.liveUrl && (
            <section className="project-cta">
              <div>
                <span>Explore the project</span>

                <h2>See it in action.</h2>

                <p>Open the live version and explore the project yourself.</p>
              </div>

              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit live project
                <ArrowUpRight size={19} />
              </a>
            </section>
          )}

          <section className="project-next">
            <div className="project-next__top">
              <span>Next project</span>

              <span>{nextProject.number}</span>
            </div>

            <Link to={`/projects/${nextProject.slug}`}>
              <h2>{nextProject.title}</h2>

              <span className="project-next__arrow">
                <ArrowRight size={22} />
              </span>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetails;
