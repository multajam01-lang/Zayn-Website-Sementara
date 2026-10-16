import React from 'react';
import { MousePointerClick, MessageSquare, Car } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Pilih layanan',
      description: 'Tentukan kebutuhan, tanggal, dan tujuan Anda.',
      detail: 'Pilih antar jemput, jasa suruh beli obat/makanan, sewa mobil + supir, atau buat rekber transaksi online.',
      icon: MousePointerClick,
    },
    {
      number: '02',
      title: 'Konfirmasi bersama',
      description: 'Admin mengonfirmasi harga dan ketersediaan lewat chat.',
      detail: 'Admin standby 24 jam memverifikasi rute, armada terdekat, estimasi biaya tanpa markup tersembunyi.',
      icon: MessageSquare,
    },
    {
      number: '03',
      title: 'Kami yang jalan',
      description: 'Pantau status pesanan dan nikmati layanan ZAYN.',
      detail: 'Duduk santai. Supir kami jemput tepat waktu atau kurir kami jalankan tugas harian Anda hingga tuntas.',
      icon: Car,
    },
  ];

  return (
    <section id="cara-pesan" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            MUDAH DARI AWAL
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Tiga langkah. Beress.
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Tanpa aplikasi rumit. Cukup tentukan kebutuhan Anda, pesanan langsung terhubung ke sistem Dashboard Admin ZAYN secara real-time.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl p-8 bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-mono font-extrabold text-amber-400">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 border border-neutral-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-amber-200/90 mb-3">
                    {step.description}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {idx === 0 && (
                  <div className="mt-8 pt-4 border-t border-neutral-800">
                    <button
                      onClick={onOpenBooking}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Mulai langkah 01 sekarang</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
