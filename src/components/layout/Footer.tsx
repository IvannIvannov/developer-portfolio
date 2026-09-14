import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

import useSectionReveal from "../../hooks/useSectionReveal";

import "./Footer.css";

const Footer = () => {
  const { elementRef: footerRef, isVisible } = useSectionReveal<HTMLElement>();

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
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
