import React from 'react';
import { SERVICES } from '../data/initialData';
import { ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceKey: string) => void;
  onScrollToPricing: () => void;
  onScrollToRekber: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onScrollToPricing,
  onScrollToRekber,
}) => {
  return (
    <section id="layanan" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            UNTUK SETIAP KEBUTUHAN
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Layanan Kami.
          </h2>
          <p className="text-lg text-neutral-300">
            Anda punya rencana. <span className="text-amber-300 font-medium">Kami bantu mewujudkannya.</span>
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const isFeaturedCourier = service.id === 'jasa-suruh';
            const isFeaturedRekber = service.id === 'zayn-rekber';

            return (
              <div
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-2xl p-7 bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all duration-200 ${
                  isFeaturedCourier || isFeaturedRekber ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Service Number & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-bold text-amber-400">
                      {service.number}
                    </span>
                    <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Optional Service Imagery */}
                  {service.image && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-neutral-800 h-44 bg-neutral-950">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-neutral-800/80">
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-2">
                  {service.id === 'sewa-paket' ? (
                    <button
                      onClick={onScrollToPricing}
                      className="w-full inline-flex items-center justify-between px-4 py-3 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-all border border-neutral-700/60 group-hover:border-amber-400/50"
                    >
                      <span>Lihat paket</span>
                      <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  ) : service.id === 'zayn-rekber' ? (
                    <button
                      onClick={onScrollToRekber}
                      className="w-full inline-flex items-center justify-between px-4 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
                    >
                      <span>Buat transaksi</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectService(service.categoryKey)}
                      className="w-full inline-flex items-center justify-between px-4 py-3 text-xs font-semibold text-neutral-200 bg-neutral-850 hover:bg-neutral-800 hover:text-white rounded-xl transition-all border border-neutral-800"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Tanya harga admin</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance banner below services */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold text-sm mb-1">
              Punya rute atau titipan khusus di luar daftar?
            </div>
            <div className="text-xs text-neutral-400">
              Konsultasikan rute, jadwal tunggu, maupun tugas khusus Anda dengan Admin ZAYN secara langsung.
            </div>
          </div>
          <a
            href="#pesan-layanan"
            className="px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap transition-colors"
          >
            Pesan Layanan Sekarang
          </a>
        </div>

      </div>
    </section>
  );
};
