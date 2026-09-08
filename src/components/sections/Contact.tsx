import { useState } from "react";
import type { SyntheticEvent } from "react";

import { ArrowRight, ArrowLeft, ArrowUpRight, Check, Mail } from "lucide-react";

import "./Contact.css";

type FormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  projectType: "Business Website",
  budget: "Not sure yet",
  message: "",
};

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => {
    setStep((current) => Math.min(current + 1, 3));
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData(initialFormData);
      setStep(1);
    }, 1000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <p className="contact__eyebrow">Contact</p>

          <h2 className="contact__title">
            Let’s turn your idea
            <span> into something real.</span>
          </h2>

          <div className="contact__header-bottom">
            <p>
              Tell me a little about your project and I’ll get back to you with
              the next steps.
            </p>

            <a href="mailto:your@email.com">
              <Mail size={16} />
              your@email.com
            </a>
          </div>
        </div>

        <div className="contact__workspace">
          <div className="contact__progress">
            <div className="contact__progress-top">
              <span>Project enquiry</span>

              <span>0{step} / 03</span>
            </div>

            <div className="contact__progress-line">
              <span
                style={{
                  width: `${(step / 3) * 100}%`,
                }}
              />
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="contact__step">
                <span className="contact__step-label">01 / Introduction</span>

                <h3>First, tell me who you are.</h3>

                <div className="contact__fields">
                  <div className="contact__field">
                    <label htmlFor="contact-name">Name</label>

                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          name: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="contact-email">Email</label>

                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          email: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="contact__actions contact__actions--end">
                  <button
                    type="button"
                    className="contact__next"
                    disabled={!formData.name.trim() || !formData.email.trim()}
                    onClick={nextStep}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="contact__step">
                <span className="contact__step-label">02 / Project</span>

                <h3>What are we building?</h3>

                <div className="contact__fields">
                  <div className="contact__field">
                    <label htmlFor="contact-project">Project type</label>

                    <select
                      id="contact-project"
                      value={formData.projectType}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          projectType: event.target.value,
                        })
                      }
                    >
                      <option>Business Website</option>
                      <option>Landing Page</option>
                      <option>Portfolio Website</option>
                      <option>Web Application</option>
                      <option>AI-powered Product</option>
                      <option>Something else</option>
                    </select>
                  </div>

                  <div className="contact__field">
                    <label htmlFor="contact-budget">Budget</label>

                    <select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          budget: event.target.value,
                        })
                      }
                    >
                      <option>Not sure yet</option>
                      <option>Under €500</option>
                      <option>€500 – €1,000</option>
                      <option>€1,000 – €2,500</option>
                      <option>€2,500+</option>
                    </select>
                  </div>
                </div>

                <div className="contact__actions">
                  <button
                    type="button"
                    className="contact__back"
                    onClick={previousStep}
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>

                  <button
                    type="button"
                    className="contact__next"
                    onClick={nextStep}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="contact__step">
                <span className="contact__step-label">03 / Details</span>

                <h3>Tell me what you have in mind.</h3>

                <div className="contact__field">
                  <label htmlFor="contact-message">Project details</label>

                  <textarea
                    id="contact-message"
                    rows={7}
                    maxLength={2000}
                    placeholder="Your goals, ideas, required functionality, references, deadlines..."
                    value={formData.message}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        message: event.target.value,
                      })
                    }
                  />

                  <div className="contact__count">
                    {formData.message.length} / 2000
                  </div>
                </div>

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

                <div className="contact__actions">
                  <button
                    type="button"
                    className="contact__back"
                    onClick={previousStep}
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="contact__submit"
                    disabled={!formData.message.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="contact__loader" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="contact__success">
                <span>
                  <Check size={16} />
                </span>

                <div>
                  <strong>Enquiry sent.</strong>

                  <p>I’ll get back to you as soon as possible.</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
