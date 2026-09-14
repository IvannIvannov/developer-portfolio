import { useState } from "react";

import type { CSSProperties } from "react";

import useSectionReveal from "../../hooks/useSectionReveal";

import "./Services.css";

type Service = {
  number: string;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "I build responsive business websites that present your brand clearly, perform well and create a professional experience across desktop and mobile devices.",
  },
  {
    number: "02",
    title: "Landing Pages",
    description:
      "Landing pages are built around one primary objective, combining strong hierarchy, focused content and a smooth user experience that helps visitors understand the offer quickly.",
  },
  {
    number: "03",
    title: "Custom Web Apps",
    description:
      "For projects that need more than a traditional website, I develop custom web applications with reusable components, structured logic and scalable frontend architecture.",
  },
  {
    number: "04",
    title: "AI Integrations",
    description:
      "I integrate AI functionality into websites and web applications to create useful product features such as assistants, content generation, structured recommendations and intelligent workflows.",
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

        <div className="services__timeline">
          <div className="services__line">
            <div
              className="services__line-progress"
              style={
                {
                  "--progress": `${progress}%`,
                } as CSSProperties
              }
              aria-hidden="true"
            />
          </div>

          <div className="services__items">
            {services.map((service, index) => (
              <button
                key={service.number}
                type="button"
                className={`service-item ${
                  activeIndex === index ? "service-item--active" : ""
                }`}
                aria-pressed={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span className="service-item__dot" aria-hidden="true">
                  <span />
                </span>

                <span className="service-item__number">{service.number}</span>

                <h3>{service.title}</h3>
              </button>
            ))}
          </div>
        </div>

        <div className="services__details" aria-live="polite">
          <span className="services__details-number">
            {activeService.number}
          </span>

          <div className="services__details-content">
            <span className="services__details-label">Selected service</span>

            <h3>{activeService.title}</h3>

            <p>{activeService.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
