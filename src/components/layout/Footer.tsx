import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

import "./Footer.css";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
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

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className={`footer ${isVisible ? "footer--visible" : ""}`}
    >
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <div className="footer__brand-row">
              <img
                src="/favicon.svg"
                alt=""
                className="footer__logo-mark"
                aria-hidden="true"
              />

              <h3>Ivan Ivanov</h3>
            </div>

            <p>Frontend Developer · Web Applications · AI Integrations</p>
          </div>

          <div className="footer__links">
            <a href="mailto:ivann.ivannov26@icloud.com">
              <Mail size={15} aria-hidden="true" />
              Email
            </a>

            <a
              href="https://github.com/IvannIvannov"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>

            <a
              href="https://www.linkedin.com/in/ivan-ivanov-673972360/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Ivan Ivanov</span>

          <button
            type="button"
            className="footer__back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
