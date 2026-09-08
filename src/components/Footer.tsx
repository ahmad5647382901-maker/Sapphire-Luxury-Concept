import React, { useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="editorial-footer"
      className="bg-[#0B0A0A] text-[#FAF8F5] pt-24 md:pt-36 pb-14 px-6 sm:px-10 md:px-14 border-t border-[#FAF8F5]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Upper Editorial Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-16 md:pb-24 border-b border-[#FAF8F5]/10 gap-10">
          <div className="space-y-4 max-w-lg">
            <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/60 block">
              Digital Atelier Concept · 2026
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[#FAF8F5]">
              SAPPHIRE
            </h2>
            <p className="text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/60 leading-relaxed max-w-md">
              An independent architectural digital study exploring quiet luxury, structured forms, and
              ancestral Pakistani leathercraft.
            </p>
          </div>

          {/* Salon Newsletter */}
          <div className="w-full lg:max-w-sm space-y-3">
            <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 block">
              Private Salon Dispatches
            </span>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-sans text-[#FAF8F5] py-2">
                <Check className="w-3.5 h-3.5 text-[#D8CFBE]" />
                <span>You have been registered for private archive access.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex border-b border-[#FAF8F5]/30 focus-within:border-[#FAF8F5] transition-colors pb-1"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-xs font-sans placeholder:text-[#FAF8F5]/40 text-[#FAF8F5] focus:outline-none py-2"
                />
                <button
                  type="submit"
                  className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5] pl-4 hover:text-[#D8CFBE] transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Editorial Link Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 text-xs font-sans">
          {/* Column 1: Chapters */}
          <div className="space-y-4">
            <h3 className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#D8CFBE]/60">
              Anthology
            </h3>
            <ul className="space-y-2.5 text-[#FAF8F5]/70">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-hero')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  01 · Campaign Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-collections')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  02 · Curated Lookbook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-product-detail')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  03 · Noir Structure Bag
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-craftsmanship')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  04 · Atelier Craft
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Care */}
          <div className="space-y-4">
            <h3 className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#D8CFBE]/60">
              Client Care
            </h3>
            <ul className="space-y-2.5 text-[#FAF8F5]/70">
              <li className="hover:text-[#FAF8F5] cursor-pointer">White Glove Courier</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Archive Restoration</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Calfskin Maintenance</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Serialized Certificate</li>
            </ul>
          </div>

          {/* Column 3: Logistics */}
          <div className="space-y-4">
            <h3 className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#D8CFBE]/60">
              Concierge
            </h3>
            <ul className="space-y-2.5 text-[#FAF8F5]/70">
              <li className="hover:text-[#FAF8F5] cursor-pointer">Pakistan Courier (2–4 Days)</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Complimentary Exchange</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Bespoke Monogramming</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Private Salon Appointments</li>
            </ul>
          </div>

          {/* Column 4: Presence */}
          <div className="space-y-4">
            <h3 className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#D8CFBE]/60">
              Atelier Presence
            </h3>
            <ul className="space-y-2.5 text-[#FAF8F5]/70">
              <li className="hover:text-[#FAF8F5] cursor-pointer">Gulberg Atelier, Lahore</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Clifton Sanctuary, Karachi</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Archive Vault, Islamabad</li>
              <li className="hover:text-[#FAF8F5] cursor-pointer">Vogue International Archive</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Colophon */}
        <div className="border-t border-[#FAF8F5]/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-sans text-[#FAF8F5]/60 gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="tracking-wider text-[#FAF8F5]/80">
              Independent Unofficial Luxury Fashion Concept.
            </p>
            <p className="text-[9px] text-[#FAF8F5]/40">
              This project is an independent artistic fashion editorial and design concept for SAPPHIRE. It is not affiliated with or endorsed by the official brand.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/sapphire-luxury-concept.zip"
              download="sapphire-luxury-concept.zip"
              className="text-[9px] tracking-[0.2em] uppercase text-[#D8CFBE] hover:text-[#FAF8F5] underline underline-offset-4 transition-colors"
            >
              Export Project ZIP
            </a>
            <span>© 2026 SAPPHIRE CONCEPT</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-[#FAF8F5]/80 hover:text-[#FAF8F5] transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
