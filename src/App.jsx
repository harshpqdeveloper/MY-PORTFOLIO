import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import ProjectGallery from './components/ProjectGallery.jsx';
import Skills from './components/Skills.jsx';
import Process from './components/Process.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import SwarmCursors from './components/SwarmCursors.jsx';
import { initMotion } from './lib/motion.js';

export default function App() {
  useEffect(() => initMotion(), []);

  return (
    <>
      <SwarmCursors />
      <Cursor />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <ProjectGallery />
        <Skills />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
