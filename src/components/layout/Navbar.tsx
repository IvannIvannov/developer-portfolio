import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
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

  return (
    <header
      className={`navbar ${isVisible ? "navbar--visible" : "navbar--hidden"}`}
    >
      <div className="navbar__container">
        <a href="#home" className="navbar__logo">
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
          aria-label="Open navigation"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
