import { useEffect, useRef } from 'react';
import { Phone, Calendar, Play, Star } from 'lucide-react';
import gsap from 'gsap';

const AVATARS = [
  '/images/avatar-1.jpg',
  '/images/avatar-2.jpg',
  '/images/avatar-3.jpg',
  '/images/avatar-4.jpg',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-h1-line', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.6,
      });
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.8,
      });
      gsap.from('.hero-social', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1,
      });
      gsap.from('.hero-portrait', {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from('.hero-video-thumb', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.9,
      });
      gsap.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-sky overflow-hidden pt-16 md:pt-20"
    >
      <div className="container-padding mx-auto flex flex-col md:flex-row items-center min-h-[calc(100vh-80px)]">
        {/* Left Column - Text */}
        <div ref={textRef} className="w-full md:w-[55%] py-12 md:py-0 z-10">
          <div className="max-w-xl">
            <h1 className="text-navy font-inter font-bold uppercase tracking-[-4.8px] leading-[0.9]">
              <span className="hero-h1-line block text-5xl sm:text-6xl md:text-7xl lg:text-[96px]">BECAUSE</span>
              <span className="hero-h1-line block text-5xl sm:text-6xl md:text-7xl lg:text-[96px]">EVERY LIFE</span>
              <span className="hero-h1-line block text-5xl sm:text-6xl md:text-7xl lg:text-[96px]">MATTERS</span>
            </h1>

            <p className="hero-subtitle font-cormorant text-xl md:text-2xl text-navy/90 mt-6 md:mt-8 max-w-[480px] leading-relaxed">
              Dedicated pediatric and family healthcare rooted in compassion and clinical excellence.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="tel:+918076606376"
                className="hero-cta pill-btn-filled flex items-center gap-2"
              >
                <Calendar size={16} />
                Book a Visit
              </a>
              <a
                href="tel:+918076606376"
                className="hero-cta pill-btn-outline flex items-center gap-2"
              >
                <Phone size={16} />
                Call Clinic
              </a>
            </div>

            {/* Social Proof */}
            <div className="hero-social flex items-center gap-3 mt-10">
              <div className="flex -space-x-3">
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Patient ${i + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-sky object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-navy">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-inter font-semibold text-sm">4.9 Stars</span>
                <span className="text-navy/40 mx-1">·</span>
                <span className="font-inter text-sm text-navy/70">150+ Happy Families</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Portrait */}
        <div ref={imgRef} className="w-full md:w-[45%] relative flex justify-center md:justify-end mt-8 md:mt-0">
          <div className="relative">
            {/* Main Portrait */}
            <img
              src="/images/hero-portrait.jpg"
              alt="Dr. Divya Sahni Kalra - Pediatrician & Family Physician"
              className="hero-portrait w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] h-auto rounded-2xl object-cover shadow-xl"
            />

            {/* Video Thumbnail */}
            <div className="hero-video-thumb absolute -left-12 md:-left-16 bottom-24 md:bottom-32 w-32 md:w-40 rounded-xl overflow-hidden shadow-lg border-2 border-white cursor-pointer group">
              <img
                src="/images/clinic-interior.jpg"
                alt="Clinic Tour"
                className="w-full h-20 md:h-24 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/20 group-hover:bg-navy/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play size={16} className="text-navy ml-0.5" fill="#164193" />
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="hero-badge absolute -right-2 md:-right-4 bottom-8 md:bottom-16 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 md:px-5 md:py-2.5 shadow-lg flex items-center gap-2 border border-white/50">
              <span className="text-lg md:text-xl">🏥</span>
              <span className="font-inter font-semibold text-navy text-xs md:text-sm">15+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
