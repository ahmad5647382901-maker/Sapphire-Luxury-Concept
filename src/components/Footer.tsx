import React, { useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navigationItems = [
    { id: 'section-hero', label: '01 · Edition' },
    { id: 'section-collections', label: '02 · Anthology' },
    { id: 'section-hero-object', label: '03 · Hero Object' },
    { id: 'section-craftsmanship', label: '04 · Craft' },
  ];

  return (
    <footer
      id="editorial-footer"
      className="bg-[#0B0A0A] text-[#FAF8F5] pt-24 md:pt-32 pb-12 px-6 sm:px-10 md:px-14 border-t border-[#FAF8F5]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Closing Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-16 md:pb-20 border-b border-[#FAF8F5]/10">
          <div className="lg:col-span-7">
            <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#D8CFBE]/60 block mb-5">
              Editorial Study · 2026
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-[0.12em] font-light text-[#FAF8F5]">
              SAPPHIRE
            </h2>

            <p className="mt-6 text-xs sm:text-sm font-sans font-light text-[#FAF8F5]/55 leading-relaxed max-w-lg">
              An independent digital fashion study exploring restraint, proportion,
              material, and the visual language of contemporary Pakistani fashion.
            </p>
          </div>

          {/* Editorial Dispatch */}
          <div className="lg:col-span-5 lg:pl-8">
            <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#D8CFBE]/60 block mb-4">
              Editorial Dispatch
            </span>

            {subscribed ? (
              <div
                className="flex items-center gap-2 text-xs font-sans text-[#FAF8F5]/75 py-2"
                aria-live="polite"
              >
                <Check className="w-3.5 h-3.5 text-[#D8CFBE]" />
                <span>You are on the dispatch list.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex border-b border-[#FAF8F5]/25 focus-within:border-[#FAF8F5]/70 transition-colors"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent text-xs font-sans placeholder:text-[#FAF8F5]/35 text-[#FAF8F5] focus:outline-none py-3"
                />

                <button
                  type="submit"
                  className="min-h-11 pl-4 text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#FAF8F5] hover:text-[#D8CFBE] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-16 md:py-20">
          <div className="lg:col-span-5">
            <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#D8CFBE]/60 block mb-5">
              Navigate
            </span>

            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigateSection(item.id)}
                      className="min-h-10 text-left text-xs font-sans text-[#FAF8F5]/65 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#D8CFBE]/60 block mb-5">
              The Object
            </span>

            <div className="space-y-3 text-xs font-sans text-[#FAF8F5]/55">
              <p>NOIR STRUCTURE BAG</p>
              <p>Structured leather silhouette</p>
              <p>PKR 8,990</p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-[#D8CFBE]/60 block mb-5">
              About This Study
            </span>

            <p className="text-xs font-sans font-light text-[#FAF8F5]/50 leading-relaxed max-w-sm">
              This experience is an independent, unofficial artistic concept.
              Product presentation, imagery, and editorial direction are created
              as part of the digital study and do not represent an official
              SAPPHIRE store or service.
            </p>
          </div>
        </div>

        {/* Colophon */}
        <div className="border-t border-[#FAF8F5]/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[9px] font-sans">
          <div className="space-y-2 max-w-xl">
            <p className="tracking-[0.16em] uppercase text-[#FAF8F5]/65">
              Independent Unofficial Luxury Fashion Concept
            </p>

            <p className="text-[#FAF8F5]/35 leading-relaxed">
              An independent artistic fashion editorial and design concept for
              SAPPHIRE. Not affiliated with or endorsed by the official brand.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <span className="text-[#FAF8F5]/35">
              © 2026 SAPPHIRE CONCEPT
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="min-h-11 flex items-center gap-1.5 tracking-[0.2em] uppercase text-[#FAF8F5]/65 hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FAF8F5]/60"
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
