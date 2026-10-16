import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/initialData';
import { PricingDayType, PricingPlan } from '../types';
import { Check, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan, dayType: PricingDayType) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [dayType, setDayType] = useState<PricingDayType>('weekday');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val).replace('IDR', 'Rp');
  };

  return (
    <section id="paket-harga" className="py-20 lg:py-28 bg-neutral-900/40 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Segmented Day Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
              RENCANAKAN PERJALANAN ANDA
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              Paket &amp; Harga.
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl">
              Pilihan armada privat dengan supir profesional. Tarif transparan tanpa biaya tersembunyi.
            </p>
          </div>

          {/* Functional Day Type Switch (Buttons per anti-slop guidelines) */}
          <div className="flex items-center p-1.5 bg-neutral-950 border border-neutral-800 rounded-xl shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setDayType('weekday')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                dayType === 'weekday'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Weekday</span>
              <span className="ml-1.5 opacity-80 font-normal">Sen–Jum</span>
            </button>
            <button
              type="button"
              onClick={() => setDayType('weekend')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                dayType === 'weekend'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Weekend</span>
              <span className="ml-1.5 opacity-80 font-normal">Sab–Min</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const currentPrice = dayType === 'weekday' ? plan.priceWeekday : plan.priceWeekend;
            const isAllIn = plan.badge === 'ALL IN';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-7 bg-neutral-950 border transition-all duration-200 ${
                  plan.popular
                    ? 'border-amber-400/80 shadow-xl shadow-amber-500/5 ring-1 ring-amber-400/30'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  {/* Category code & optional badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-medium text-neutral-400 tracking-wider">
                      {plan.code}
                    </span>
                    {plan.badge && (
                      <span className="text-[11px] font-bold text-amber-400 tracking-wider bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Title */}
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-neutral-850">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                        {formatRupiah(currentPrice)}
                      </span>
                      <span className="text-xs text-neutral-400">
                        / {plan.unit}
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-amber-300/90 font-medium">
                      {plan.id === 'airport-transfer'
                        ? 'Harga sama setiap hari'
                        : dayType === 'weekday'
                        ? 'Tarif Senin–Jumat'
                        : 'Tarif Sabtu–Minggu'}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div>
                  <button
                    onClick={() => onSelectPlan(plan, dayType)}
                    className={`w-full py-3 px-4 text-xs font-bold rounded-xl transition-all duration-150 inline-flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300 active:scale-[0.98]'
                        : 'bg-neutral-850 text-white hover:bg-neutral-800 border border-neutral-700/60'
                    }`}
                  >
                    <span>Pesan Paket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-center text-neutral-500 mt-2.5">
                    {isAllIn ? 'Tanpa biaya tambahan bensin & tol' : 'Bensin & tol dibayar sesuai rute'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note Footnote per specification */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 text-center">
          <p className="text-xs text-neutral-400 flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Layanan di luar paket mengikuti penawaran admin sesuai rute, tugas, dan lama tunggu.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
