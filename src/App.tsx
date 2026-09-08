import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Projects from './components/sections/Projects'
import About from './components/sections/About'

function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <Hero />
      <Projects />
      <About />
    </main>
  );
}

export default App;
