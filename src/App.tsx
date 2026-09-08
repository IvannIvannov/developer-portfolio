import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Projects from './components/sections/Projects'

function App() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <Hero />
      <Projects />
    </main>
  );
}

export default App;
