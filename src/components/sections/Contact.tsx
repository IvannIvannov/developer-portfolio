import { useEffect, useState } from "react";

import type { SyntheticEvent } from "react";

import { Turnstile } from "@marsidev/react-turnstile";

import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail } from "lucide-react";

import "./Contact.css";

type ContactFormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

type ProjectPlan = {
  type: string;
  complexity: string;
  timeline: string;
  features: string[];
};

type AIProjectSelection = {
  selectedProjectType: string;
  plan: ProjectPlan;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  projectType: "Business Website",
  budget: "Not sure yet",
  message: "",
};

const projectTypes = [
  "Business Website",
  "Landing Page",
  "Portfolio Website",
  "Web Application",
  "AI-powered Product",
  "Something else",
];

const budgets = [
  "Not sure yet",
  "Under €500",
  "€500–€1,000",
  "€1,000–€2,500",
  "€2,500+",
];

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const [turnstileToken, setTurnstileToken] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const handleAIProjectSelection = (event: Event) => {
      const customEvent = event as CustomEvent<AIProjectSelection>;

      const { selectedProjectType, plan } = customEvent.detail;

      const validProjectType = projectTypes.includes(selectedProjectType)
        ? selectedProjectType
        : "Something else";

      const finalProjectType =
        validProjectType === "Not sure yet"
          ? "Something else"
          : validProjectType;

      const aiMessage = [
        "AI Project Planner summary",
        "",
        `Recommended project: ${plan.type}`,
        `Complexity: ${plan.complexity}`,
        `Estimated timeline: ${plan.timeline}`,
        "",
        "Recommended features:",
        ...plan.features.map((feature) => `- ${feature}`),
      ].join("\n");

      setFormData((current) => ({
        ...current,

        projectType: finalProjectType,

        message: aiMessage,
      }));

      setStep(1);

      setError("");
      setIsSuccess(false);
      setTurnstileToken("");
    };

    window.addEventListener("ai-project-selected", handleAIProjectSelection);

    return () => {
      window.removeEventListener(
        "ai-project-selected",
        handleAIProjectSelection,
      );
    };
  }, []);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setIsSuccess(false);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        return;
      }
    }

    if (step < 3) {
      setStep((current) => current + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((current) => current - 1);
    }
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.message.trim()) {
      setError("Please tell me a little about your project.");

      return;
    }

    if (!turnstileToken) {
      setError("Please complete the security check.");

      return;
    }

    setIsSubmitting(true);
    setError("");
    setIsSuccess(false);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setIsSuccess(true);

      setFormData(initialFormData);

      setTurnstileToken("");

      setStep(1);
    } catch (requestError) {
      if (requestError instanceof Error) {
        setError(requestError.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <div>
            <p className="contact__eyebrow">Contact</p>

            <h2 className="contact__title">
              Let’s turn your idea
              <span> into something real.</span>
            </h2>
          </div>

          <div className="contact__intro">
            <p>
              Have a project in mind or want to discuss an idea? Tell me a
              little about it and I’ll get back to you.
            </p>

            <a href="mailto:your@email.com">
              <Mail size={15} />
              your@email.com
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="contact__workspace">
          <div className="contact__progress">
            <div className="contact__progress-top">
              <span>Project enquiry</span>

              <span>0{step} / 03</span>
            </div>

            <div className="contact__progress-track">
              <div
                className="contact__progress-value"
                style={{
                  width: `${(step / 3) * 100}%`,
                }}
              />
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="contact__step">
                <div className="contact__step-header">
                  <span>01</span>

                  <h3>First, tell me who you are.</h3>
                </div>

                <div className="contact__fields">
                  <label className="contact__field">
                    <span>Your name</span>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="John Smith"
                      autoComplete="name"
                    />
                  </label>

                  <label className="contact__field">
                    <span>Email address</span>

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="john@company.com"
                      autoComplete="email"
                    />
                  </label>
                </div>

                <div className="contact__actions contact__actions--end">
                  <button
                    type="button"
                    className="contact__next"
                    onClick={handleNext}
                    disabled={!formData.name.trim() || !formData.email.trim()}
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="contact__step">
                <div className="contact__step-header">
                  <span>02</span>

                  <h3>What are we building?</h3>
                </div>

                <div className="contact__selection">
                  <div className="contact__selection-group">
                    <span className="contact__selection-label">
                      Project type
                    </span>

                    <div className="contact__options">
                      {projectTypes.map((projectType) => (
                        <button
                          key={projectType}
                          type="button"
                          className={
                            formData.projectType === projectType
                              ? "contact__option contact__option--active"
                              : "contact__option"
                          }
                          onClick={() =>
                            updateField("projectType", projectType)
                          }
                        >
                          {projectType}

                          {formData.projectType === projectType && (
                            <Check size={14} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="contact__selection-group">
                    <span className="contact__selection-label">
                      Estimated budget
                    </span>

                    <div className="contact__options">
                      {budgets.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          className={
                            formData.budget === budget
                              ? "contact__option contact__option--active"
                              : "contact__option"
                          }
                          onClick={() => updateField("budget", budget)}
                        >
                          {budget}

                          {formData.budget === budget && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="contact__actions">
                  <button
                    type="button"
                    className="contact__back"
                    onClick={handlePrevious}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <button
                    type="button"
                    className="contact__next"
                    onClick={handleNext}
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="contact__step">
                <div className="contact__step-header">
                  <span>03</span>

                  <h3>Tell me what you have in mind.</h3>
                </div>

                <label className="contact__field">
                  <span>Project details</span>

                  <textarea
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    placeholder="Tell me about your idea, goals, timeline or anything else that would be useful to know..."
                    maxLength={2000}
                  />

                  <small>{formData.message.length} / 2000</small>
                </label>

                <div className="contact__summary">
                  <div>
                    <span>Name</span>

                    <strong>{formData.name}</strong>
                  </div>

                  <div>
                    <span>Project</span>

                    <strong>{formData.projectType}</strong>
                  </div>

                  <div>
                    <span>Budget</span>

                    <strong>{formData.budget}</strong>
                  </div>
                </div>

                <div className="contact__turnstile">
                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => {
                      setTurnstileToken(token);

                      setError("");
                    }}
                    onExpire={() => {
                      setTurnstileToken("");
                    }}
                    onError={() => {
                      setTurnstileToken("");

                      setError("Security check failed. Please try again.");
                    }}
                    options={{
                      theme: "dark",
                    }}
                  />
                </div>

                {error && <p className="contact__error">{error}</p>}

                <div className="contact__actions">
                  <button
                    type="button"
                    className="contact__back"
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="contact__next"
                    disabled={
                      isSubmitting ||
                      !formData.message.trim() ||
                      !turnstileToken
                    }
                  >
                    {isSubmitting ? "Sending..." : "Send enquiry"}

                    {!isSubmitting && <ArrowUpRight size={16} />}
                  </button>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="contact__success">
                <span>
                  <Check size={15} />
                </span>

                <p>Your project enquiry was sent successfully.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
