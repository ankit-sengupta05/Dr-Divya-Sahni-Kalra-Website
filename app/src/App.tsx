import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import IntroductionPanel from './sections/IntroductionPanel';
import ServicesGrid from './sections/ServicesGrid';
import LivingBackgroundSection from './sections/LivingBackgroundSection';
import TestimonialsCarousel from './sections/TestimonialsCarousel';
import ContactFooter from './sections/ContactFooter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="font-inter">
      <Navbar />
      <main>
        <HeroSection />
        <IntroductionPanel />
        <ServicesGrid />
        <LivingBackgroundSection />
        <TestimonialsCarousel />
        <ContactFooter />
      </main>
    </div>
  );
}
