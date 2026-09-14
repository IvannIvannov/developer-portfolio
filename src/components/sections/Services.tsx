import { useState } from "react";

import type { CSSProperties } from "react";

import { ArrowUpRight } from "lucide-react";

import useSectionReveal from "../../hooks/useSectionReveal";

import "./Services.css";

type Service = {
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  deliverables: string[];
};

const services: Service[] = [
  {
    number: "01",
    title: "Business Websites",
    shortDescription:
      "Modern websites built around your business, goals and audience.",
    description:
      "I build responsive business websites that present your brand clearly, perform well and create a professional experience across desktop and mobile devices.",
    deliverables: [
      "Responsive interface",
      "Modern visual structure",
      "Performance-focused development",
      "Contact and enquiry functionality",
    ],
  },
  {
    number: "02",
    title: "Landing Pages",
    shortDescription:
      "Focused pages designed around a clear message and conversion goal.",
    description:
      "Landing pages are built around one primary objective, combining strong hierarchy, focused content and a smooth user experience that helps visitors understand the offer quickly.",
    deliverables: [
      "Clear conversion structure",
      "Responsive layout",
      "Fast loading experience",
      "Call-to-action sections",
    ],
  },
  {
    number: "03",
    title: "Custom Web Apps",
    shortDescription:
      "Interactive web applications built around real product requirements.",
    description:
      "For projects that need more than a traditional website, I develop custom web applications with reusable components, structured logic and scalable frontend architecture.",
    deliverables: [
      "Custom application interface",
      "Reusable component system",
      "API integration",
      "Scalable frontend architecture",
    ],
  },
  {
    number: "04",
    title: "AI Integrations",
    shortDescription:
      "AI-powered functionality integrated directly into digital products.",
    description:
      "I integrate AI functionality into websites and web applications to create useful product features such as assistants, content generation, structured recommendations and intelligent workflows.",
    deliverables: [
      "AI-powered features",
      "API integration",
      "Custom user flows",
      "Production-ready implementation",
    ],
  },
];

const Services = () => {
  const { elementRef: sectionRef, isVisible } = useSectionReveal<HTMLElement>();

  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex];

  const progress =
    services.length > 1 ? (activeIndex / (services.length - 1)) * 100 : 0;

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services ${isVisible ? "services--visible" : ""}`}
    >
      <div className="services__container">
        <div className="services__header">
          <p className="services__eyebrow">Services</p>

          <h2 className="services__title">
            From first idea to
            <span> complete digital product.</span>
          </h2>
        </div>

        <div className="services__line">
          <div
            className="services__line-progress"
            style={
              {
                "--services-progress": `${progress}%`,
              } as CSSProperties
            }
            aria-hidden="true"
          />
        </div>

        <div className="services__content">
          <div className="services__items">
            {services.map((service, index) => (
              <button
                key={service.number}
                type="button"
                className={`services__item ${
                  activeIndex === index ? "services__item--active" : ""
                }`}
                aria-pressed={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span className="services__item-number">{service.number}</span>

                <div className="services__item-content">
                  <h3>{service.title}</h3>

                  <p>{service.shortDescription}</p>
                </div>

                <ArrowUpRight
                  className="services__item-icon"
                  size={18}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <div className="services__details" aria-live="polite">
            <span className="services__details-number">
              {activeService.number}
            </span>

            <h3>{activeService.title}</h3>

            <p className="services__details-description">
              {activeService.description}
            </p>

            <div className="services__details-list">
              {activeService.deliverables.map((deliverable) => (
                <div key={deliverable} className="services__details-item">
                  <span aria-hidden="true" />

                  <p>{deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
