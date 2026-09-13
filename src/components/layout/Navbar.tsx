import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import "./Navbar.css";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isMenuOpen) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
    setIsVisible(true);
  };

  return (
    <header
      className={`navbar ${
        isVisible ? "navbar--visible" : "navbar--hidden"
      } ${isMenuOpen ? "navbar--open" : ""}`}
    >
      <div className="navbar__container">
        <a
          href="#home"
          className="navbar__logo"
          onClick={closeMenu}
          aria-label="Ivan Ivanov — go to homepage"
        >
          Ivan Ivanov
        </a>

        <nav className="navbar__nav" aria-label="Primary navigation">
          <a href="#projects" className="navbar__link">
            Work
          </a>

          <a href="#about" className="navbar__link">
            About
          </a>

          <a href="#services" className="navbar__link">
            Services
          </a>

          <a href="#contact" className="navbar__link">
            Contact
          </a>

          <a href="#ai-project-planner" className="navbar__cta">
            Start a project
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="navbar__menu"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
          <a
            href="#projects"
            className="navbar__mobile-link"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <span aria-hidden="true">01</span>
            <strong>Work</strong>
          </a>

          <a
            href="#about"
            className="navbar__mobile-link"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <span aria-hidden="true">02</span>
            <strong>About</strong>
          </a>

          <a
            href="#services"
            className="navbar__mobile-link"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <span aria-hidden="true">03</span>
            <strong>Services</strong>
          </a>

          <a
            href="#contact"
            className="navbar__mobile-link"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <span aria-hidden="true">04</span>
            <strong>Contact</strong>
          </a>

          <a
            href="#ai-project-planner"
            className="navbar__mobile-cta"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
