import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Expertise', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-padding mx-auto flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-navy font-inter font-bold text-sm md:text-base tracking-tight uppercase"
        >
          DR. DIVYA SAHNI KALRA
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-navy/80 hover:text-navy font-inter text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+918076606376"
            className="pill-btn-filled flex items-center gap-2 text-sm"
          >
            <Phone size={14} />
            Book Appointment
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-navy p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-navy/10">
          <div className="container-padding py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-navy font-inter text-base font-medium text-left py-2"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+918076606376"
              className="pill-btn-filled flex items-center justify-center gap-2 text-sm mt-2"
            >
              <Phone size={14} />
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
