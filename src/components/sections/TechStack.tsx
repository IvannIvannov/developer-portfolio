import { Braces, GitBranch, Layers3, Sparkles } from "lucide-react";

import "./TechStack.css";

const technologiesRowOne = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Motion",
];

const technologiesRowTwo = [
  "Node.js",
  "Express",
  "REST APIs",
  "PostgreSQL",
  "Supabase",
  "Cloudflare Workers AI",
  "Git",
  "GitHub",
  "Vercel",
  "Cloudflare",
  "Vite",
];

const highlights = [
  {
    icon: <Braces size={18} />,
    label: "Clean Code",
  },
  {
    icon: <Layers3 size={18} />,
    label: "Responsive UI",
  },
  {
    icon: <GitBranch size={18} />,
    label: "Version Control",
  },
  {
    icon: <Sparkles size={18} />,
    label: "AI Integration",
  },
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="tech-stack">
      <div className="tech-stack__container">
        <div className="tech-stack__header">
          <p className="tech-stack__eyebrow">Tech Stack</p>

          <div className="tech-stack__heading">
            <h2 className="tech-stack__title">
              Technologies behind
              <span> the products I build.</span>
            </h2>

            <p className="tech-stack__intro">
              A modern development stack focused on performance, maintainability
              and creating reliable digital products.
            </p>
          </div>
        </div>

        <div className="tech-stack__experience">
          <div className="tech-stack__visual">
            <div className="frontend-window">
              <div className="frontend-window__top">
                <div className="frontend-window__dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="frontend-window__file">App.tsx</span>

                <span className="frontend-window__status">LIVE</span>
              </div>

              <div className="frontend-window__body">
                <div className="frontend-code">
                  <div className="code-line code-line--1">
                    <span className="code-number">01</span>

                    <span>
                      <span className="code-purple">const</span>{" "}
                      <span className="code-white">Portfolio</span>{" "}
                      <span className="code-grey">=</span>{" "}
                      <span className="code-grey">()</span>{" "}
                      <span className="code-purple">=&gt;</span>{" "}
                      <span className="code-grey">{"{"}</span>
                    </span>
                  </div>

                  <div className="code-line code-line--2">
                    <span className="code-number">02</span>

                    <span>
                      <span className="code-purple">return</span>{" "}
                      <span className="code-grey">(</span>
                    </span>
                  </div>

                  <div className="code-line code-line--3">
                    <span className="code-number">03</span>

                    <span>
                      &nbsp;&nbsp;
                      <span className="code-blue">&lt;main</span>{" "}
                      <span className="code-grey">className=</span>
                      <span className="code-green">"portfolio"</span>
                      <span className="code-blue">&gt;</span>
                    </span>
                  </div>

                  <div className="code-line code-line--4">
                    <span className="code-number">04</span>

                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="code-blue">&lt;Hero</span>{" "}
                      <span className="code-blue">/&gt;</span>
                    </span>
                  </div>

                  <div className="code-line code-line--5">
                    <span className="code-number">05</span>

                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="code-blue">&lt;Projects</span>{" "}
                      <span className="code-blue">/&gt;</span>
                    </span>
                  </div>

                  <div className="code-line code-line--6">
                    <span className="code-number">06</span>

                    <span>
                      &nbsp;&nbsp;
                      <span className="code-blue">&lt;/main&gt;</span>
                    </span>
                  </div>

                  <div className="code-line code-line--7">
                    <span className="code-number">07</span>

                    <span className="code-grey">)</span>
                  </div>

                  <div className="code-line code-line--8">
                    <span className="code-number">08</span>

                    <span className="code-grey">{"}"}</span>

                    <span className="code-cursor" />
                  </div>
                </div>

                <div className="frontend-preview">
                  <div className="frontend-preview__browser">
                    <div className="frontend-preview__nav">
                      <div className="frontend-preview__logo" />

                      <div className="frontend-preview__links">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="frontend-preview__hero">
                      <div className="preview-line preview-line--small" />

                      <div className="preview-line preview-line--large" />

                      <div className="preview-line preview-line--large preview-line--grey" />

                      <div className="frontend-preview__buttons">
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="frontend-preview__cards">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="frontend-preview__render">
                    <span className="render-dot" />
                    UI rendered
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tech-stack__marquee-area">
            <div className="tech-stack__marquee-label">
              Frontend & Interface
            </div>

            <div className="tech-stack__marquee">
              <div className="tech-stack__track tech-stack__track--left">
                {[...technologiesRowOne, ...technologiesRowOne].map(
                  (technology, index) => (
                    <span key={`${technology}-${index}`}>{technology}</span>
                  ),
                )}
              </div>
            </div>

            <div className="tech-stack__marquee-label tech-stack__marquee-label--second">
              Backend, Data & Tools
            </div>

            <div className="tech-stack__marquee">
              <div className="tech-stack__track tech-stack__track--right">
                {[...technologiesRowTwo, ...technologiesRowTwo].map(
                  (technology, index) => (
                    <span key={`${technology}-${index}`}>{technology}</span>
                  ),
                )}
              </div>
            </div>

            <div className="tech-stack__statement">
              <span>01</span>

              <p>
                Choosing the right technology for the project — not simply using
                a technology because it is popular.
              </p>
            </div>
          </div>
        </div>

        <div className="tech-stack__highlights">
          {highlights.map((item) => (
            <div className="tech-stack__highlight" key={item.label}>
              {item.icon}

              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
