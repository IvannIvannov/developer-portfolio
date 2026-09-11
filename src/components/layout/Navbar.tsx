import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import "./Navbar.css";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${isVisible ? "navbar--visible" : "navbar--hidden"} ${
        isMenuOpen ? "navbar--open" : ""
      }`}
    >
      <div className="navbar__container">
        <a href="#home" className="navbar__logo" onClick={closeMenu}>
          Ivan Ivanov
        </a>

        <nav className="navbar__nav">
          <a href="#about" className="navbar__link">
            About
          </a>

          <a href="#projects" className="navbar__link">
            Work
          </a>

          <a href="#services" className="navbar__link">
            Services
          </a>

          <a href="#contact" className="navbar__link">
            Contact
          </a>

          <a href="#contact" className="navbar__cta">
            Start a project
          </a>
        </nav>

        <button
          type="button"
          className="navbar__menu"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}
      >
        <nav className="navbar__mobile-nav">
          <a href="#about" className="navbar__mobile-link" onClick={closeMenu}>
            <span>01</span>

            <strong>About</strong>
          </a>

          <a
            href="#projects"
            className="navbar__mobile-link"
            onClick={closeMenu}
          >
            <span>02</span>

            <strong>Work</strong>
          </a>

          <a
            href="#services"
            className="navbar__mobile-link"
            onClick={closeMenu}
          >
            <span>03</span>

            <strong>Services</strong>
          </a>

          <a
            href="#contact"
            className="navbar__mobile-link"
            onClick={closeMenu}
          >
            <span>04</span>

            <strong>Contact</strong>
          </a>

          <a href="#contact" className="navbar__mobile-cta" onClick={closeMenu}>
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
