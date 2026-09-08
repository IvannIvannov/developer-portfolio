import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Services from './components/sections/Services'
import TechStack from './components/sections/TechStack'
import AIProjectPlanner from './components/sections/AIProjectPlanner'
import Contact from './components/sections/Contact'

function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Services />
      <TechStack />
      <AIProjectPlanner />
      <Contact />
    </main>
  );
}

export default App;
