import { useState } from "react";
import type { SyntheticEvent } from "react";

import { ArrowUpRight, Check, Sparkles, WandSparkles } from "lucide-react";

import "./AIProjectPlanner.css";

type ProjectPlan = {
  type: string;
  complexity: string;
  timeline: string;
  features: string[];
};

const AIProjectPlanner = () => {
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("Not sure yet");
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<ProjectPlan | null>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!description.trim()) return;

    setIsGenerating(true);
    setPlan(null);

    // Temporary frontend demo.
    // Later this will call our backend AI endpoint.
    setTimeout(() => {
      setPlan({
        type:
          projectType === "Not sure yet"
            ? "Custom Business Website"
            : projectType,
        complexity: "Medium",
        timeline: "3–5 weeks",
        features: [
          "Responsive interface",
          "Custom page structure",
          "Contact functionality",
          "SEO foundation",
          "Performance optimization",
        ],
      });

      setIsGenerating(false);
    }, 1100);
  };

  return (
    <section id="ai-planner" className="ai-planner">
      <div className="ai-planner__container">
        <div className="ai-planner__header">
          <div>
            <p className="ai-planner__eyebrow">AI Project Planner</p>

            <h2 className="ai-planner__title">
              Have an idea?
              <span> Let AI help shape it.</span>
            </h2>
          </div>

          <p className="ai-planner__intro">
            Describe what you want to build and receive an initial project
            outline with recommended functionality, scope and complexity.
          </p>
        </div>

        <div className="ai-planner__workspace">
          <form className="ai-planner__form" onSubmit={handleSubmit}>
            <div className="ai-planner__form-top">
              <div className="ai-planner__ai-badge">
                <Sparkles size={15} />
                AI powered
              </div>

              <span>01 / Project brief</span>
            </div>

            <div className="ai-planner__field">
              <label htmlFor="project-description">
                Tell me about your idea
              </label>

              <textarea
                id="project-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Example: I need a modern website for a beauty studio with services, pricing, a gallery and an online booking option..."
                rows={7}
                maxLength={1000}
              />

              <div className="ai-planner__field-footer">
                <span>
                  The more detail you provide, the better the project outline.
                </span>

                <span>{description.length} / 1000</span>
              </div>
            </div>

            <div className="ai-planner__field">
              <label htmlFor="project-type">Project type</label>

              <div className="ai-planner__select-wrapper">
                <select
                  id="project-type"
                  value={projectType}
                  onChange={(event) => setProjectType(event.target.value)}
                >
                  <option>Not sure yet</option>
                  <option>Business Website</option>
                  <option>Landing Page</option>
                  <option>Portfolio Website</option>
                  <option>Web Application</option>
                  <option>AI-powered Product</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="ai-planner__generate"
              disabled={!description.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="ai-planner__loader" />
                  Analysing project...
                </>
              ) : (
                <>
                  <WandSparkles size={18} />
                  Generate project plan
                  <ArrowUpRight size={17} />
                </>
              )}
            </button>

            <p className="ai-planner__disclaimer">
              This provides an initial AI-generated project outline. Final scope
              and requirements are confirmed personally before development
              begins.
            </p>
          </form>

          <div
            className={`ai-planner__result ${
              plan ? "ai-planner__result--active" : ""
            }`}
          >
            {!plan && !isGenerating && (
              <div className="ai-planner__empty">
                <div className="ai-planner__empty-icon">
                  <Sparkles size={30} strokeWidth={1.4} />
                </div>

                <span className="ai-planner__empty-label">
                  Project analysis
                </span>

                <h3>Your project plan will appear here.</h3>

                <p>
                  Describe your idea and the planner will turn it into a
                  structured starting point.
                </p>

                <div className="ai-planner__empty-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="ai-planner__thinking">
                <div className="ai-planner__thinking-icon">
                  <Sparkles size={28} />
                </div>

                <span>AI is analysing your idea</span>

                <div className="ai-planner__thinking-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {plan && !isGenerating && (
              <div className="ai-planner__plan">
                <div className="ai-planner__plan-top">
                  <div>
                    <span className="ai-planner__plan-label">
                      Suggested project
                    </span>

                    <h3>{plan.type}</h3>
                  </div>

                  <span className="ai-planner__generated">
                    <span />
                    Generated
                  </span>
                </div>

                <div className="ai-planner__metrics">
                  <div>
                    <span>Complexity</span>

                    <strong>{plan.complexity}</strong>
                  </div>

                  <div>
                    <span>Estimated timeline</span>

                    <strong>{plan.timeline}</strong>
                  </div>
                </div>

                <div className="ai-planner__features">
                  <span className="ai-planner__features-label">
                    Recommended features
                  </span>

                  <div className="ai-planner__feature-list">
                    {plan.features.map((feature) => (
                      <div className="ai-planner__feature" key={feature}>
                        <span>
                          <Check size={13} />
                        </span>

                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <a href="#contact" className="ai-planner__contact">
                  Continue with this project
                  <ArrowUpRight size={17} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProjectPlanner;
