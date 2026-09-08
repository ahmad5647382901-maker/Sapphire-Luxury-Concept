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
    <footer id="editorial-footer" className="bg-[#0E0D0D] text-[#FAF9F5] pt-20 md:pt-28 pb-12 px-6 sm:px-8 md:px-12 border-t border-[#FAF9F5]/10">
      <div className="max-w-7xl mx-auto">
        {/* Upper Editorial Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-16 md:pb-20 border-b border-[#FAF9F5]/15 gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#FAF9F5]/40 block">
              The Digital Edition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide font-normal">
              SAPPHIRE
            </h2>
            <p className="text-xs sm:text-sm font-sans font-light text-[#FAF9F5]/60 leading-relaxed max-w-md">
              A contemporary digital fashion study re-imagining modern Pakistani luxury, architectural
              silhouettes, and heirloom leathercraft.
            </p>
          </div>

          {/* Newsletter Signup in Footer */}
          <div className="w-full lg:max-w-md space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#FAF9F5]/60 block">
              Curator's Journal & Private Previews
            </span>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-sans text-[#FAF9F5] py-2">
                <Check className="w-4 h-4 text-[#FAF9F5]" />
                <span>Thank you. You have been added to the private list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border-b border-[#FAF9F5]/30 focus-within:border-[#FAF9F5] transition-colors pb-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-xs font-sans placeholder:text-[#FAF9F5]/30 text-[#FAF9F5] focus:outline-none py-2"
                />
                <button
                  type="submit"
                  className="text-[11px] tracking-[0.2em] uppercase font-sans font-medium text-[#FAF9F5] pl-4 hover:opacity-75 transition-opacity"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 text-xs font-sans">
          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.28em] uppercase font-semibold text-[#FAF9F5]/40">
              Anthology
            </h3>
            <ul className="space-y-2.5 text-[#FAF9F5]/70">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-new-edition')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  The New Edition
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-collections')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Curated Series
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-product-story')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Noir Structure Bag
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('section-craftsmanship')}
                  className="hover:text-[#FAF9F5] transition-colors"
                >
                  Atelier Craftsmanship
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.28em] uppercase font-semibold text-[#FAF9F5]/40">
              Client Care
            </h3>
            <ul className="space-y-2.5 text-[#FAF9F5]/70">
              <li className="hover:text-[#FAF9F5] cursor-pointer">White Glove Courier</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Archive Restoration</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Leather Care Guide</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Certificate of Authenticity</li>
            </ul>
          </div>

          {/* Column 3: Shipping & Returns */}
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.28em] uppercase font-semibold text-[#FAF9F5]/40">
              Concierge
            </h3>
            <ul className="space-y-2.5 text-[#FAF9F5]/70">
              <li className="hover:text-[#FAF9F5] cursor-pointer">Shipping within Pakistan (2-4 Days)</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">14-Day Complimentary Exchange</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Custom Monogramming</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Private Fitting Appointment</li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.28em] uppercase font-semibold text-[#FAF9F5]/40">
              Presence
            </h3>
            <ul className="space-y-2.5 text-[#FAF9F5]/70">
              <li className="hover:text-[#FAF9F5] cursor-pointer">Gulberg Atelier, Lahore</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Clifton Sanctuary, Karachi</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Instagram @sapphire.concept</li>
              <li className="hover:text-[#FAF9F5] cursor-pointer">Vogue International Features</li>
            </ul>
          </div>
        </div>

        {/* Unofficial Disclaimer & Copyright */}
        <div className="border-t border-[#FAF9F5]/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-[#FAF9F5]/50 gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="tracking-wider">
              Independent Unofficial Digital Concept Exploration.
            </p>
            <p className="text-[#FAF9F5]/40 text-[10px]">
              This project is an independent artistic fashion editorial and design concept for SAPPHIRE. It is not affiliated with or endorsed by the official brand.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/sapphire-concept-source.zip"
              download="sapphire-concept-source.zip"
              className="text-[10px] tracking-[0.2em] uppercase text-[#FAF9F5]/70 hover:text-[#FAF9F5] underline underline-offset-4 transition-colors"
            >
              Download Project ZIP
            </a>
            <span>© 2026 SAPPHIRE CONCEPT</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#FAF9F5]/70 hover:text-[#FAF9F5] transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
