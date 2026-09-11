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

type ProjectPlanResponse = {
  success: boolean;
  plan?: ProjectPlan;
  message?: string;
};

type AIProjectSelection = {
  selectedProjectType: string;
  originalDescription: string;
  plan: ProjectPlan;
};

const projectTypes = [
  "Not sure yet",
  "Business Website",
  "Landing Page",
  "Portfolio Website",
  "Web Application",
  "AI-powered Product",
];

const API_URL = import.meta.env.VITE_API_URL;

const AIProjectPlanner = () => {
  const [description, setDescription] = useState("");

  const [projectType, setProjectType] = useState("Not sure yet");

  const [isGenerating, setIsGenerating] = useState(false);

  const [plan, setPlan] = useState<ProjectPlan | null>(null);

  const [error, setError] = useState("");

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanDescription = description.trim();

    if (!cleanDescription) {
      return;
    }

    setIsGenerating(true);
    setPlan(null);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/ai/project-plan`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          description: cleanDescription,

          projectType,
        }),
      });

      const data = (await response.json()) as ProjectPlanResponse;

      if (!response.ok || !data.success || !data.plan) {
        throw new Error(
          data.message || "Unable to generate your project plan.",
        );
      }

      setPlan(data.plan);
    } catch (requestError) {
      if (requestError instanceof Error) {
        setError(requestError.message);
      } else {
        setError("Unable to generate your project plan. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContinueWithProject = () => {
    if (!plan) {
      return;
    }

    const projectSelection: AIProjectSelection = {
      selectedProjectType: projectType,
      originalDescription: description.trim(),
      plan,
    };

    window.dispatchEvent(
      new CustomEvent("ai-project-selected", {
        detail: projectSelection,
      }),
    );

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="ai-project-planner" className="ai-planner">
      <div className="ai-planner__container">
        <div className="ai-planner__header">
          <div>
            <p className="ai-planner__eyebrow">AI Project Planner</p>

            <h2 className="ai-planner__title">
              Turn your idea into
              <span> a clear starting point.</span>
            </h2>
          </div>

          <p className="ai-planner__intro">
            Describe what you want to build and get an instant AI-generated
            project outline with estimated complexity, timeline and key
            features.
          </p>
        </div>

        <div className="ai-planner__workspace">
          <div className="ai-planner__input-panel">
            <div className="ai-planner__panel-top">
              <div>
                <WandSparkles size={17} />

                <span>Describe your project</span>
              </div>

              <span className="ai-planner__powered">AI powered</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ai-planner__field">
                <label htmlFor="project-description">Project idea</label>

                <textarea
                  id="project-description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);

                    setError("");
                  }}
                  maxLength={1000}
                  placeholder="For example: I need a modern website for a boutique hotel where visitors can explore rooms, view a gallery and send booking enquiries..."
                />

                <span className="ai-planner__count">
                  {description.length} / 1000
                </span>
              </div>

              <div className="ai-planner__type">
                <span className="ai-planner__field-label">Project type</span>

                <div className="ai-planner__type-options">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={
                        projectType === type
                          ? "ai-planner__type-option ai-planner__type-option--active"
                          : "ai-planner__type-option"
                      }
                      onClick={() => {
                        setProjectType(type);
                        setError("");
                      }}
                    >
                      {type}

                      {projectType === type && <Check size={13} />}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="ai-planner__error">{error}</p>}

              <button
                type="submit"
                className="ai-planner__generate"
                disabled={isGenerating || !description.trim()}
              >
                {isGenerating ? (
                  <>
                    <span className="ai-planner__loader" />
                    Analysing your idea...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate project plan
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="ai-planner__result-panel">
            {!plan && !isGenerating && (
              <div className="ai-planner__empty">
                <div className="ai-planner__empty-icon">
                  <Sparkles size={22} />
                </div>

                <span>Your project plan will appear here</span>

                <p>
                  Add a short description of your idea and let AI turn it into a
                  practical starting point.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="ai-planner__loading">
                <div className="ai-planner__loading-icon">
                  <Sparkles size={22} />
                </div>

                <span>Analysing your project</span>

                <p>Evaluating scope, complexity and recommended features.</p>

                <div className="ai-planner__loading-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {plan && !isGenerating && (
              <div className="ai-planner__result">
                <div className="ai-planner__result-top">
                  <div>
                    <Sparkles size={16} />

                    <span>Project analysis</span>
                  </div>

                  <span className="ai-planner__status">Generated</span>
                </div>

                <div className="ai-planner__result-title">
                  <span>Recommended project</span>

                  <h3>{plan.type}</h3>
                </div>

                <div className="ai-planner__result-meta">
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
                  <span>Recommended features</span>

                  <div>
                    {plan.features.map((feature) => (
                      <p key={feature}>
                        <Check size={14} />

                        {feature}
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="ai-planner__continue"
                  onClick={handleContinueWithProject}
                >
                  Continue with this project
                  <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProjectPlanner;
