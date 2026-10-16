import React, { useState } from 'react';
import { FAQS } from '../data/initialData';
import { ChevronDown, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0]?.id || 'faq-1']);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            SEBELUM ANDA MEMESAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Ada pertanyaan?
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Hal-hal yang sering ditanyakan kepada kami.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 hover:bg-neutral-850/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-850/60 whitespace-pre-line">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Support Prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-neutral-900/30 border border-neutral-850">
          <p className="text-xs text-neutral-400 mb-3">
            Masih ada pertanyaan lain seputar kebutuhan perjalanan atau jasa suruh Anda?
          </p>
          <a
            href="#pesan-layanan"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Pesan Sekarang Melalui Formulir ZAYN &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
