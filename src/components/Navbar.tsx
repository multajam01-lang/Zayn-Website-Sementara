import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceKey?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0d0d]/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Left: Brand lockup with ZAYN + Subtitle (Identical to screenshot) */}
        <a href="#" className="flex flex-col group cursor-pointer">
          <div className="text-2xl sm:text-3xl font-black tracking-wider text-white group-hover:text-amber-400 transition-colors font-sans leading-none">
            ZAYN
          </div>
          <div className="text-[8px] sm:text-[9px] tracking-widest text-neutral-400 uppercase font-semibold mt-1">
            ANTARJEMPUT &amp; JASA SURUH &amp; REKBER ZAYN
          </div>
        </a>

        {/* Center: Navigation Links (Beranda, Layanan, Paket & Harga, Cek Pesanan) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-300">
          <a
            href="#"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Beranda
          </a>
          <a
            href="#layanan"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Layanan
          </a>
          <a
            href="#paket-harga"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Paket &amp; Harga
          </a>
          <a
            href="#cek-status"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cek Pesanan
          </a>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-neutral-500 hover:text-amber-400 text-xs font-medium transition-colors cursor-pointer"
            title="Portal Akses Admin"
          >
            Admin
          </button>
        </nav>

        {/* Right: Primary Action Button: "Pesan Sekarang ↗" */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="#pesan-layanan"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-neutral-950 bg-[#f59e0b] hover:bg-[#fbbf24] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-amber-500/20"
          >
            <span>Pesan Sekarang</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#pesan-layanan"
            className="px-3 py-1.5 text-xs font-bold text-neutral-950 bg-[#f59e0b] rounded-lg"
          >
            Pesan
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-neutral-800 px-5 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-neutral-200 hover:text-amber-400"
            >
              Beranda
            </a>
            <a
              href="#layanan"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-neutral-200 hover:text-amber-400"
            >
              Layanan
            </a>
            <a
              href="#paket-harga"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-neutral-200 hover:text-amber-400"
            >
              Paket &amp; Harga
            </a>
            <a
              href="#cek-status"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-neutral-200 hover:text-amber-400"
            >
              Cek Pesanan
            </a>
            <a
              href="#rekber"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-neutral-200 hover:text-amber-400"
            >
              Rekber Zayn
            </a>
          </div>
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <a
              href="#pesan-layanan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-bold text-neutral-950 bg-amber-400 rounded-xl"
            >
              Pesan Sekarang ↗
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 text-center text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 rounded-xl"
            >
              Akses Admin ZAYN
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
