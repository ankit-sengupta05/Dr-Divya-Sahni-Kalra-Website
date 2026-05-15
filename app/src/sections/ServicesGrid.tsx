import { useEffect, useRef } from 'react';
import { Stethoscope, Syringe, ClipboardList, Leaf, HeartPulse, Baby, Thermometer, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Baby,
    title: 'Well-Child Visits',
    description: 'Comprehensive growth monitoring, developmental assessments, and preventive care for children from infancy through adolescence.',
  },
  {
    icon: Syringe,
    title: 'Vaccinations',
    description: 'Complete immunization schedules following national guidelines, ensuring your child stays protected against preventable diseases.',
  },
  {
    icon: HeartPulse,
    title: 'Chronic Care',
    description: 'Ongoing management of chronic conditions including asthma, diabetes, thyroid disorders, and hypertension with personalized treatment plans.',
  },
  {
    icon: Leaf,
    title: 'Nutritional Guidance',
    description: 'Expert dietary counseling for all age groups — from infant feeding to geriatric nutrition and weight management programs.',
  },
  {
    icon: Thermometer,
    title: 'Fever & Infection Care',
    description: 'Prompt diagnosis and treatment of acute fevers, respiratory infections, gastrointestinal issues, and seasonal illnesses.',
  },
  {
    icon: ClipboardList,
    title: 'Health Checkups',
    description: 'Thorough annual health screenings, lab investigations, and preventive health assessments for the entire family.',
  },
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description: 'Expert diagnosis and treatment of common ailments, skin conditions, allergies, and everyday health concerns for all ages.',
  },
  {
    icon: Activity,
    title: 'Emergency Care',
    description: 'Immediate attention for urgent medical situations with rapid assessment, stabilization, and referral when needed.',
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 85%',
        },
      });

      gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-navy relative"
    >
      <div className="container-padding mx-auto">
        {/* Header */}
        <div className="services-header text-center mb-16">
          <h2 className="text-white font-inter font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-[-2px]">
            Comprehensive Care
          </h2>
          <p className="font-cormorant text-lg md:text-xl text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            From newborns to grandparents, we provide personalized medical attention for every stage of life.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card glass-card p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 group cursor-default"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.08) 0%, transparent 60%)',
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/15 transition-colors">
                  <Icon size={24} className="text-sky" />
                </div>
                <h3 className="text-white font-inter font-semibold text-lg mb-3">
                  {service.title}
                </h3>
                <p className="text-white/60 font-cormorant text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
