import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <h3>Ivan Ivanov</h3>

            <p>Frontend Developer · Web Applications · AI Integrations</p>
          </div>

          <div className="footer__links">
            <a href="mailto:ivann.ivannov26@icloud.com">
              <Mail size={15} />
              Email
            </a>

            <a
              href="https://github.com/IvannIvannov"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight size={13} />
            </a>

            <a
              href="https://www.linkedin.com/in/ivan-ivanov-673972360/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Ivan Ivanov</span>

          <button
            type="button"
            className="footer__back-to-top"
            onClick={scrollToTop}
          >
            Back to top
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
