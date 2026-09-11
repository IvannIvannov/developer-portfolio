import { ArrowDown, ArrowUpRight } from "lucide-react";

import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero">
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
              <ArrowDown size={17} />
            </a>

            <a href="#contact" className="hero__button hero__button--secondary">
              Start a project
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="hero__footer">
          <div className="hero__availability">
            <span className="hero__status" />

            <p>Available for freelance projects and selected opportunities.</p>
          </div>

          <p className="hero__scroll">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
