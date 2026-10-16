import React from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Check,
  Clock,
  Car,
  MapPin,
  MessageCircle,
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenChat }) => {
  return (
    <section className="relative w-full bg-[#0d0d0d] text-white overflow-hidden border-b border-neutral-800/80">
      
      {/* =======================================================================
          MAIN HERO VIEWPORT (Desktop & HP Responsive)
         ======================================================================= */}
      <div className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[680px] w-full flex items-center">
        
        {/* Background Car Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* High-res white modern Veloz MPV car */}
          <img
            src="/src/assets/images/white_veloz_hero_1792168368269.jpg"
            alt="ZAYN Armada Mobil Putih Cibinong"
            className="absolute right-0 top-0 w-full lg:w-[65%] h-full object-cover object-center lg:object-right opacity-85 sm:opacity-95"
          />

          {/* Seamless dark vignette for high contrast on both mobile & desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/95 sm:via-[#0d0d0d]/85 lg:via-[#0d0d0d]/60 to-transparent w-full lg:w-[75%]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0d0d0d] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 flex flex-col justify-between">
          
          {/* Left Column Content Area */}
          <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-5">
            
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>CIBINONG &amp; SEKITARNYA &middot; 24 JAM</span>
            </div>

            {/* Giant Display Headline */}
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] font-sans">
                ZAYN
              </h1>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] font-sans">
                Antar Jemput
              </div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] font-sans">
                &amp; Jasa Suruh
              </div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] font-sans">
                &amp; Rekber Zayn
              </div>
            </div>

            {/* Subhead Paragraph */}
            <div className="text-xs sm:text-base text-neutral-300 max-w-lg leading-relaxed pt-1 space-y-0.5">
              <p>Dari perjalanan sampai kebutuhan harian.</p>
              <p>Satu layanan, lebih banyak ketenangan.</p>
            </div>

            {/* Call To Action Buttons Row (Stacked full-width on HP, side-by-side on desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-3">
              {/* Primary Button */}
              <a
                href="#pesan-layanan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-neutral-950 bg-[#f59e0b] hover:bg-[#fbbf24] active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-amber-500/25 text-center"
              >
                <span>Pesan Sekarang</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              {/* Secondary Button */}
              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-600 rounded-xl transition-all text-center"
              >
                <span>Jelajahi Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2 text-xs text-neutral-300 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>Aman &amp; terpercaya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Harga transparan</span>
              </div>
            </div>

          </div>

          {/* Bottom Right Placement */}
          <div className="mt-8 sm:mt-12 flex justify-start sm:justify-end">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs text-neutral-400 font-mono tracking-wide bg-neutral-950/70 px-3 py-1.5 rounded-full backdrop-blur-sm border border-neutral-800/70">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Cibinong, Bogor</span>
              <span className="text-neutral-600">&mdash;</span>
              <span className="text-neutral-300 font-semibold truncate">YOUR EVERYDAY PARTNER</span>
            </div>
          </div>

        </div>

      </div>

      {/* =======================================================================
          BOTTOM VALUE TICKER STRIP (Desktop & HP Responsive)
         ======================================================================= */}
      <div className="w-full bg-[#111111] border-t border-neutral-800/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* 4 Feature Items: 2x2 grid on HP, single row on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full md:w-auto text-[11px] sm:text-xs text-neutral-300">
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Siap melayani 24 jam</span>
            </div>

            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Perjalanan pribadi</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Transaksi lebih tenang</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Cibinong &amp; sekitarnya</span>
            </div>

          </div>

          {/* Right: Docked "Chat dengan kami" button */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              type="button"
              onClick={onOpenChat}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#f5efe6] hover:bg-white text-neutral-900 text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-neutral-800" />
              <span>Chat dengan kami</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
