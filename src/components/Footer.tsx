import React from 'react';
import { ShieldCheck, Instagram, AtSign, Phone, MapPin } from 'lucide-react';
import { ServiceAreaMap } from './ServiceAreaMap';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenBooking: () => void;
  pendingOrdersCount?: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenBooking, pendingOrdersCount = 0 }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visual Service Area Map Thumbnail */}
        <div className="mb-14">
          <ServiceAreaMap />
        </div>

        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand & Overview */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-lg font-extrabold tracking-tight text-white font-sans">
                ZAYN
              </span>
            </div>
            
            <p className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              ANTAR JEMPUT &amp; JASA SURUH &amp; REKBER ZAYN
            </p>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Dari perjalanan sampai kebutuhan harian. Satu layanan, lebih banyak ketenangan. Melayani perjalanan pribadi, sewa mobil + supir, belanja harian, dan escrow rekening bersama terpercaya di Cibinong &amp; sekitarnya 24 jam.
            </p>

            {/* Socials & Threads from prompt */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
              <a
                href="https://instagram.com/Zaynanterjemput"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-amber-400" />
                <span>@Zaynanterjemput</span>
              </a>

              <span className="text-neutral-700">·</span>

              <a
                href="https://threads.net/@andrean.multajam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <AtSign className="w-4 h-4 text-amber-400" />
                <span>Threads: @andrean.multajam</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white tracking-wider uppercase">
              Navigasi Layanan
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">
                  Layanan Kami (01-05)
                </a>
              </li>
              <li>
                <a href="#paket-harga" className="hover:text-white transition-colors">
                  Paket &amp; Harga (Bandara, 12 Jam, 24 Jam)
                </a>
              </li>
              <li>
                <a href="#cara-pesan" className="hover:text-white transition-colors">
                  Cara Pesan
                </a>
              </li>
              <li>
                <a href="#cek-status" className="hover:text-white transition-colors">
                  Cek Status Pesanan
                </a>
              </li>
              <li>
                <a href="#rekber" className="hover:text-white transition-colors">
                  Zayn Rekber Online
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Operational & Direct Contact */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white tracking-wider uppercase">
              Kontak 24 Jam
            </div>
            <div className="text-xs space-y-2 text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cibinong, Bogor, Jawa Barat</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+62 812-8900-1926</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Standby 24 Jam Nonstop</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#pesan-layanan"
                className="w-full py-2.5 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors text-center block"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar per prompt */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; 2026 ZAYN &middot; Cibinong, Bogor. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#paket-harga"
              className="hover:text-white transition-colors"
            >
              Paket &amp; Harga
            </a>

            <span className="text-neutral-700">|</span>

            <button
              onClick={onOpenAdmin}
              className="text-neutral-400 hover:text-amber-400 font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <span>Akses Admin</span>
              {pendingOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-neutral-950">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <span className="text-neutral-700">|</span>

            <a
              href="#pesan-layanan"
              className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1.5"
            >
              <span>Mulai Pesan</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
