import { useEffect } from "react";

import { Link, Navigate, useParams } from "react-router-dom";

import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
      <main className="case-study">
        <div className="case-study__container">
          <div className="case-study__nav">
            <Link to="/" className="case-study__back">
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>

            <span>{project.number} / Case Study</span>
          </div>

          <header className="case-study__hero">
            <p className="case-study__category">{project.category}</p>

            <h1>{project.title}</h1>

            <p className="case-study__description">{project.description}</p>

            <div className="case-study__meta">
              <div>
                <span>Year</span>

                <strong>{project.year}</strong>
              </div>

              <div>
                <span>Role</span>

                <strong>{project.role}</strong>
              </div>

              <div>
                <span>Technologies</span>

                <strong>{project.technologies.slice(0, 3).join(" · ")}</strong>
              </div>
            </div>
          </header>

          <div className="case-study__visual">
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <div className="case-study__visual-placeholder">
                <span>{project.number}</span>

                <strong>{project.title}</strong>

                <p>Project preview</p>
              </div>
            )}
          </div>

          <section className="case-study__section">
            <span className="case-study__section-number">01</span>

            <div className="case-study__section-content">
              <p className="case-study__section-label">The challenge</p>

              <h2>Problem</h2>

              <p>{project.problem}</p>
            </div>
          </section>

          <section className="case-study__section">
            <span className="case-study__section-number">02</span>

            <div className="case-study__section-content">
              <p className="case-study__section-label">The approach</p>

              <h2>Solution</h2>

              <p>{project.solution}</p>
            </div>
          </section>

          <section className="case-study__features">
            <div className="case-study__features-header">
              <span>03</span>

              <div>
                <p>Key Features</p>

                <h2>What the project includes.</h2>
              </div>
            </div>

            <div className="case-study__features-grid">
              {project.features.map((feature, index) => (
                <div className="case-study__feature" key={feature}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="case-study__section">
            <span className="case-study__section-number">04</span>

            <div className="case-study__section-content">
              <p className="case-study__section-label">Development</p>

              <h2>Challenges</h2>

              <p>{project.challenges}</p>
            </div>
          </section>

          <section className="case-study__stack">
            <p>Technology Stack</p>

            <div>
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </section>

          {(project.liveUrl || project.githubUrl) && (
            <section className="case-study__links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live project
                  <ArrowUpRight size={17} />
                </a>
              )}

              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  View code
                  <ArrowUpRight size={17} />
                </a>
              )}
            </section>
          )}

          <section className="case-study__next">
            <span>Next project</span>

            <Link to={`/projects/${nextProject.slug}`}>
              <div>
                <span>{nextProject.number}</span>

                <h2>{nextProject.title}</h2>
              </div>

              <ArrowUpRight size={30} />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetails;
