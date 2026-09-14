import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import "./Hero.css";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`hero ${isVisible ? "hero--visible" : ""}`}
    >
      <div className="hero__glow" />

      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow">Frontend Developer</p>

          <h1 className="hero__title">
            I build modern
            <span>digital experiences.</span>
          </h1>

          <p className="hero__description">
            I build fast, modern and thoughtfully crafted websites and web
            applications for businesses, brands and ambitious ideas.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="hero__button hero__button--primary">
              View my work
              <ArrowDown size={17} aria-hidden="true" />
            </a>

            <a
              href="#ai-project-planner"
              className="hero__button hero__button--secondary"
            >
              Start a project
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero__footer">
          <div className="hero__availability">
            <span className="hero__status" aria-hidden="true" />

            <p>Available for freelance projects and selected opportunities.</p>
          </div>

          <p className="hero__scroll">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
