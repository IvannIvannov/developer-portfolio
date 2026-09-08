import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import TechStack from "../components/sections/TechStack";
import AIProjectPlanner from "../components/sections/AIProjectPlanner";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Services />
        <TechStack />
        <AIProjectPlanner />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Home;
