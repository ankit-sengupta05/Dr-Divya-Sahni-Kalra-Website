import { useEffect, useRef } from 'react';
import OrganicCanvas from './OrganicCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LivingBackgroundSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.living-title', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      gsap.from('.living-body', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
        },
      });

      gsap.from('.living-metric', {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] overflow-hidden bg-warm-black"
    >
      {/* Organic Canvas Background */}
      <div className="absolute inset-0">
        <OrganicCanvas />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center container-padding mx-auto text-center">
        <h2 className="living-title text-white font-inter font-bold text-4xl sm:text-5xl md:text-7xl lg:text-[120px] uppercase tracking-[-3px] md:tracking-[-4.8px] leading-[0.9]">
          A MODERN
          <br />
          APPROACH
        </h2>

        <p className="living-body font-cormorant text-lg md:text-xl lg:text-[22px] text-white/80 mt-6 md:mt-8 max-w-[600px] leading-relaxed">
          We combine time-tested medical wisdom with the latest advancements in pediatric and family care to ensure the best outcomes for your loved ones.
        </p>

        {/* Floating Metric Card */}
        <div className="living-metric absolute bottom-8 right-4 md:bottom-16 md:right-16 lg:right-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 md:px-8 md:py-6">
          <div className="text-white font-inter font-bold text-3xl md:text-4xl">500+</div>
          <div className="text-white/70 font-cormorant text-base md:text-lg">Families Treated</div>
        </div>
      </div>
    </section>
  );
}
