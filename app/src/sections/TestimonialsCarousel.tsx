import { useRef, useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Dr. Kalra's patience with my children is unmatched. She takes the time to explain everything, which puts us completely at ease. Her clinic is beautiful, clean, and the charges are very reasonable at just ₹200 per visit.",
    name: 'Priya M.',
    role: 'Mother of two',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
  },
  {
    quote: "I've been bringing my entire family here for over 3 years. The treatment and medicines Dr. Kalra prescribes are incredibly effective. My blood pressure and thyroid are now well under control.",
    name: 'Rajesh K.',
    role: 'Father of three',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
  },
  {
    quote: "The staff is well-behaved and courteous. The clinic environment is so welcoming. Dr. Kalra diagnosed my chronic cough when others couldn't. Highly recommend her for family healthcare.",
    name: 'Sunita Devi',
    role: 'Grandmother of four',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
  },
  {
    quote: "From vaccinations to regular checkups, Dr. Kalra has been our trusted family physician. Her modern approach combined with genuine care makes every visit reassuring.",
    name: 'Ankit S.',
    role: 'Father of one',
    avatar: '/images/avatar-4.jpg',
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.testimonial-card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-track',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, TESTIMONIALS.length - 1));
    setCurrentIndex(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = currentIndex;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 80) {
      if (diff > 0) {
        goTo(scrollLeft.current + 1);
      } else {
        goTo(scrollLeft.current - 1);
      }
      isDragging.current = false;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-sky overflow-hidden"
    >
      <div className="container-padding mx-auto">
        {/* Header */}
        <div className="testimonials-header flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-navy font-inter font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-[-2px]">
              Stories of Trust
            </h2>
            <p className="font-cormorant text-lg md:text-xl text-navy/70 mt-3 max-w-lg">
              Real experiences from families who trust us with their health.
            </p>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden md:flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border-2 border-navy/30 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === TESTIMONIALS.length - 1}
              className="w-12 h-12 rounded-full border-2 border-navy/30 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="testimonials-track relative cursor-grab active:cursor-grabbing select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          ref={trackRef}
        >
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 1.5)}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] bg-white rounded-2xl p-6 md:p-8 shadow-card transition-all duration-300 ${
                  i === currentIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                }`}
              >
                <Quote size={32} className="text-sky mb-4" />
                <p className="font-cormorant italic text-lg md:text-xl text-navy/80 leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-inter font-semibold text-navy text-sm">
                      {t.name}
                    </div>
                    <div className="font-cormorant text-navy/60 text-sm">
                      {t.role}
                    </div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-navy w-6' : 'bg-navy/30'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile Arrows */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border-2 border-navy/30 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-30"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === TESTIMONIALS.length - 1}
            className="w-10 h-10 rounded-full border-2 border-navy/30 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-30"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
