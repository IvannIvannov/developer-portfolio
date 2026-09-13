import "./About.css";

const PROFILE_IMAGE_URL =
  "https://res.cloudinary.com/mxjelcos/image/upload/f_auto,q_auto,w_900/v1789289615/me2.png";

const technologies = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "REST APIs",
  "AI Integration",
];

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__grid">
          <div className="about__visual">
            <div className="about__photo">
              <img
                src={PROFILE_IMAGE_URL}
                alt="Ivan Ivanov"
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="about__photo-caption">
              <span>Developer</span>
              <span>Based in Bulgaria</span>
            </div>
          </div>

          <div className="about__content">
            <p className="about__eyebrow">About me</p>

            <h2 className="about__title">
              I turn ideas into
              <span> functional digital products.</span>
            </h2>

            <div className="about__copy">
              <p>
                I’m a developer focused on building modern websites and web
                applications with a strong emphasis on usability, performance
                and clean implementation.
              </p>

              <p>
                I enjoy working on projects from the initial idea to the final
                product, combining development, problem solving and a constant
                interest in new technologies.
              </p>
            </div>

            <div className="about__info">
              <div className="about__info-row">
                <span>Education</span>
                <p>Computer Systems and Technologies</p>
              </div>

              <div className="about__info-row">
                <span>Focus</span>
                <p>Web Development & Digital Products</p>
              </div>

              <div className="about__info-row">
                <span>Availability</span>
                <p>Freelance projects & selected opportunities</p>
              </div>
            </div>

            <div className="about__technologies">
              {technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
