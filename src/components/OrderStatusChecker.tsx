import React, { useState } from 'react';
import { Search, CheckCircle, Clock, Truck, ShieldCheck, AlertCircle, MessageCircle } from 'lucide-react';
import { OrderItem } from '../types';

interface OrderStatusCheckerProps {
  orders: OrderItem[];
}

export const OrderStatusChecker: React.FC<OrderStatusCheckerProps> = ({ orders }) => {
  const [searchId, setSearchId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(orders[0] || null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    setSearched(true);
    const match = orders.find(
      (o) => o.id.toUpperCase() === query || o.phone.includes(query)
    );

    if (match) {
      setSelectedOrder(match);
      setNotFound(false);
    } else {
      setSelectedOrder(null);
      setNotFound(true);
    }
  };

  const getStageIndex = (status: OrderItem['status']) => {
    switch (status) {
      case 'menunggu_konfirmasi':
        return 0;
      case 'driver_ditugaskan':
        return 1;
      case 'sedang_jalan':
        return 2;
      case 'selesai':
        return 3;
      default:
        return 1;
    }
  };

  const currentStage = selectedOrder ? getStageIndex(selectedOrder.status) : 0;

  const stages = [
    { label: 'Diterima', desc: 'Pesanan masuk & diverifikasi' },
    { label: 'Ditugaskan', desc: 'Driver / personil dikonfirmasi' },
    { label: 'Dalam Tugas', desc: 'Sedang berjalan ke lokasi' },
    { label: 'Selesai', desc: 'Tugas selesai & aman' },
  ];

  return (
    <section id="cek-status" className="py-20 bg-neutral-900/30 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            PELACAKAN REAL-TIME
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Cek Status Pesanan
          </h2>
          <p className="text-neutral-400 text-sm">
            Pantau progres penugasan mobil, kurir suruh, atau status pengamanan dana Rekber ZAYN.
          </p>
        </div>

        {/* Search Card Container */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  if (notFound) setNotFound(false);
                }}
                placeholder="Masukkan ID Pesanan (misal: ZYN-2401)"
                className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all whitespace-nowrap active:scale-[0.98]"
            >
              Cek Status
            </button>
          </form>

          {/* Quick Demo ID suggestions */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-neutral-400">
            <span className="text-neutral-500">Contoh ID aktif:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchId(o.id);
                  setSelectedOrder(o);
                  setNotFound(false);
                  setSearched(true);
                }}
                className="font-mono text-[11px] text-amber-300/90 hover:text-amber-200 underline underline-offset-2"
              >
                {o.id}
              </button>
            ))}
          </div>

          {/* Search Result Box */}
          {notFound && (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm mb-1">
                ID Pesanan Tidak Ditemukan
              </div>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mb-4">
                Pastikan format ID benar (contoh: <span className="font-mono text-amber-300">ZYN-2401</span>) atau konfirmasikan langsung nomor HP Anda ke admin WhatsApp.
              </p>
              <a
                href="#pesan-layanan"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300"
              >
                <span>Buat Pesanan Baru Sekarang &rarr;</span>
              </a>
            </div>
          )}

          {selectedOrder && !notFound && (
            <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8">
              {/* Top Order Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-850">
                <div>
                  <div className="text-xs font-mono text-amber-400 font-semibold mb-0.5">
                    {selectedOrder.id}
                  </div>
                  <div className="text-lg font-bold text-white">
                    {selectedOrder.serviceName}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {selectedOrder.statusText}
                  </span>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                    Dibuat: {selectedOrder.createdAt}
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-8">
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-4 left-0 w-full h-0.5 bg-neutral-800 -z-0" />
                  <div 
                    className="absolute top-4 left-0 h-0.5 bg-amber-400 transition-all duration-500 -z-0"
                    style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
                  />

                  {/* Stage nodes */}
                  <div className="grid grid-cols-4 relative z-10">
                    {stages.map((st, i) => {
                      const isCompleted = i < currentStage;
                      const isCurrent = i === currentStage;

                      return (
                        <div key={i} className="flex flex-col items-center text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold mb-2 transition-all ${
                              isCompleted
                                ? 'bg-amber-400 text-neutral-950 ring-4 ring-neutral-950'
                                : isCurrent
                                ? 'bg-amber-400 text-neutral-950 ring-4 ring-amber-400/30 animate-pulse'
                                : 'bg-neutral-800 text-neutral-400 ring-4 ring-neutral-950'
                            }`}
                          >
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : i + 1}
                          </div>
                          <div className={`text-xs font-semibold ${isCurrent ? 'text-amber-400' : 'text-neutral-300'}`}>
                            {st.label}
                          </div>
                          <div className="text-[10px] text-neutral-400 hidden sm:block mt-0.5 max-w-[90px]">
                            {st.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs">
                <div>
                  <span className="text-neutral-400">Pemesan:</span>
                  <div className="font-semibold text-white mt-0.5">{selectedOrder.customerName} ({selectedOrder.phone})</div>
                </div>
                <div>
                  <span className="text-neutral-400">Jadwal Tugas:</span>
                  <div className="font-semibold text-white mt-0.5">{selectedOrder.date} · {selectedOrder.time}</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-neutral-400">Rincian Lokasi / Tugas:</span>
                  <div className="font-semibold text-neutral-200 mt-0.5">{selectedOrder.routeOrDetails}</div>
                </div>
                {selectedOrder.notes && (
                  <div className="sm:col-span-2 pt-2 border-t border-neutral-800">
                    <span className="text-neutral-400">Catatan Khusus:</span>
                    <div className="text-amber-200/90 mt-0.5 italic">{selectedOrder.notes}</div>
                  </div>
                )}
              </div>

              {/* Action info */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-850">
                <span className="text-xs text-neutral-400">
                  Estimasi: <span className="font-mono text-white font-bold">{selectedOrder.estimatedPrice || 'Sesuai kesepakatan'}</span>
                </span>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Diverifikasi Sistem ZAYN</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
