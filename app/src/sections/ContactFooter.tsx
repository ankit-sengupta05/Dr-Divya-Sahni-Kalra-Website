import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-left', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.contact-right', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-navy relative"
    >
      <div className="container-padding mx-auto py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info + Form */}
          <div className="contact-left">
            <h2 className="text-white font-inter font-bold text-3xl md:text-5xl uppercase tracking-[-2px] mb-8">
              GET IN TOUCH
            </h2>

            {/* Contact Details */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-sky" />
                </div>
                <div>
                  <div className="text-white/50 font-inter text-xs uppercase tracking-wider mb-1">Address</div>
                  <div className="text-white font-cormorant text-lg">
                    Kalra Child and Family Clinic, G-11, Matiala Rd, Opposite Jeevan Jyoti Hospital, G Block, Block B, Kiran Garden, Uttam Nagar, Delhi, 110059
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-sky" />
                </div>
                <div>
                  <div className="text-white/50 font-inter text-xs uppercase tracking-wider mb-1">Phone</div>
                  <a href="tel:+918076606376" className="text-white font-cormorant text-lg hover:text-sky transition-colors">
                    +91 80766 06376
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-sky" />
                </div>
                <div>
                  <div className="text-white/50 font-inter text-xs uppercase tracking-wider mb-1">Timing</div>
                  <div className="text-white font-cormorant text-lg">
                    Mon - Sat: 9:00 AM - 2:00 PM, 5:00 PM - 8:00 PM
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-sky" />
                </div>
                <div>
                  <div className="text-white/50 font-inter text-xs uppercase tracking-wider mb-1">Consultation Fee</div>
                  <div className="text-white font-cormorant text-lg">
                    ₹200 per visit
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-inter text-sm focus:outline-none focus:border-sky/50 transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-inter text-sm focus:outline-none focus:border-sky/50 transition-colors"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-inter text-sm focus:outline-none focus:border-sky/50 transition-colors resize-none"
                  required
                />
                <button
                  type="submit"
                  className="pill-btn-filled bg-sky text-navy hover:bg-sky/90 flex items-center gap-2"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-6 border border-green-400/30">
                <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-inter font-semibold">Message Sent!</div>
                  <div className="text-white/70 font-cormorant text-base">We'll get back to you within 24 hours.</div>
                </div>
              </div>
            )}
          </div>

          {/* Right - Google Map */}
          <div className="contact-right">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-full min-h-[300px] md:min-h-[500px]">
              <iframe
                title="Kalra Child and Family Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0!2d77.0458!3d28.6188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05642662a499%3A0x158572152e878d12!2sDr%20Divya%20Sahni%20Kalra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, filter: 'brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Base */}
      <div className="border-t border-white/10">
        <div className="container-padding mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/50 font-inter text-sm">
            &copy; {new Date().getFullYear()} Dr. Divya Sahni Kalra. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#services" className="text-white/50 hover:text-white font-inter text-sm transition-colors">
              Expertise
            </a>
            <a href="#about" className="text-white/50 hover:text-white font-inter text-sm transition-colors">
              About
            </a>
            <a href="#testimonials" className="text-white/50 hover:text-white font-inter text-sm transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-white/50 hover:text-white font-inter text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
