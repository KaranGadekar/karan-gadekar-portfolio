import { LazyMotion, MotionConfig } from 'motion/react';

const loadFeatures = () => import('./motion-features').then((mod) => mod.default);
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Entrepreneurship } from './sections/Entrepreneurship';
import { Experience } from './sections/Experience';
import { FeaturedProject } from './sections/FeaturedProject';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <FeaturedProject />
        <Entrepreneurship />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
    </LazyMotion>
  );
}
