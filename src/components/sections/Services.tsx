import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import "./Services.css";

const services = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "Modern, responsive websites for businesses, brands and professionals, focused on clarity, usability and strong presentation.",
  },
  {
    number: "02",
    title: "Landing Pages",
    description:
      "Focused landing pages built to communicate an offer clearly and guide users toward a specific action.",
  },
  {
    number: "03",
    title: "Custom Web Apps",
    description:
      "Custom web applications and interactive functionality developed around the unique needs of each project.",
  },
  {
    number: "04",
    title: "AI Integrations",
    description:
      "AI-powered features and smart tools integrated into modern web products to automate tasks and improve user experience.",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const progress =
    services.length > 1 ? (activeIndex / (services.length - 1)) * 100 : 0;

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
      id="services"
      className={`services ${isVisible ? "services--visible" : ""}`}
    >
      <div className="services__container">
        <div className="services__header">
          <p className="services__eyebrow">Services</p>

          <h2 className="services__title">
            From an idea to a<span> complete digital product.</span>
          </h2>
        </div>

        <div className="services__timeline">
          <div className="services__line" aria-hidden="true">
            <div
              className="services__line-progress"
              style={
                {
                  "--progress": `${progress}%`,
                } as CSSProperties
              }
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
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
              >
                <div className="service-item__dot" aria-hidden="true">
                  <span />
                </div>

                <span className="service-item__number">{service.number}</span>

                <h3>{service.title}</h3>
              </button>
            ))}
          </div>

          <div className="services__details" aria-live="polite">
            <div className="services__details-number" aria-hidden="true">
              {services[activeIndex].number}
            </div>

            <div className="services__details-content">
              <span className="services__details-label">Selected service</span>

              <h3>{services[activeIndex].title}</h3>

              <p>{services[activeIndex].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
