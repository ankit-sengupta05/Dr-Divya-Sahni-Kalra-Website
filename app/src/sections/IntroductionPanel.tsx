import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroductionPanel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const imgPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textPanel = textPanelRef.current;
    const imgPanel = imgPanelRef.current;
    if (!section || !textPanel || !imgPanel) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2' },
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center center',
          scrub: 1.2,
          pin: false,
        },
      });

      tl.to(textPanel, { xPercent: 100, duration: 1 }, 0);
      tl.to(imgPanel, { xPercent: -100, duration: 1.6 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative h-[100dvh] bg-sky overflow-hidden"
    >
      <div className="absolute inset-0 flex">
        {/* Text Panel */}
        <div
          ref={textPanelRef}
          className="features--text absolute left-0 top-0 h-full flex items-center justify-center"
          style={{ width: '45vw', transform: 'translateX(-120%)' }}
        >
          <div className="pl-8 md:pl-16 lg:pl-24 pr-4">
            <h2 className="text-navy font-inter font-bold uppercase tracking-[-3px] md:tracking-[-4.8px] leading-[0.9] text-4xl sm:text-5xl md:text-6xl lg:text-[80px]">
              <span className="block">YOUR</span>
              <span className="block">FAMILY'S</span>
              <span className="block">HEALTH</span>
              <span className="block">PARTNER</span>
            </h2>
          </div>
        </div>

        {/* Image Panel */}
        <div
          ref={imgPanelRef}
          className="features--img absolute right-0 top-0 h-full"
          style={{ width: '65vw', transform: 'translateX(120%)' }}
        >
          <div className="relative h-full flex items-center">
            <img
              src="/images/family-image.jpg"
              alt="Mother and child at the clinic"
              className="w-full h-[70vh] object-cover rounded-l-2xl md:rounded-l-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
