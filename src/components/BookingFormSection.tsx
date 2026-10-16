import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Calendar, User, Phone, FileText, CheckCircle2, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { OrderItem } from '../types';

interface BookingFormSectionProps {
  onAddOrder: (order: OrderItem) => void;
  selectedServicePreset?: string;
}

export const BookingFormSection: React.FC<BookingFormSectionProps> = ({
  onAddOrder,
  selectedServicePreset,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Antar Jemput');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('2026-10-16');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderItem | null>(null);

  useEffect(() => {
    if (selectedServicePreset) {
      if (selectedServicePreset === 'antar-jemput' || selectedServicePreset === 'perjalanan') {
        setServiceType('Antar Jemput');
      } else if (selectedServicePreset === 'jasa-suruh' || selectedServicePreset === 'harian') {
        setServiceType('Jasa Suruh');
      } else if (selectedServicePreset === 'teman-aktivitas' || selectedServicePreset === 'aktivitas') {
        setServiceType('Hiburan & Gaya Hidup');
      } else if (selectedServicePreset === 'airport-transfer') {
        setServiceType('Cibinong - Bandara All In');
      } else if (selectedServicePreset === 'sewa-12-jam') {
        setServiceType('Sewa Paket 12 Jam');
      } else if (selectedServicePreset === 'sewa-24-jam') {
        setServiceType('Sewa Paket 24 Jam');
      } else if (selectedServicePreset === 'zayn-rekber' || selectedServicePreset === 'rekber') {
        setServiceType('Zayn Rekber');
      }
    }
  }, [selectedServicePreset]);

  // Dynamic price quote
  const getPriceQuote = (service: string): { label: string; note: string } => {
    switch (service) {
      case 'Cibinong - Bandara All In':
        return {
          label: 'Rp 500.000 / perjalanan',
          note: 'Sudah all-in mobil, supir, bensin & tol.',
        };
      case 'Sewa Paket 12 Jam':
        return {
          label: 'Rp 250.000 / paket',
          note: 'Tarif sewa mobil + supir (bensin & tol menyesuaikan rute).',
        };
      case 'Sewa Paket 24 Jam':
        return {
          label: 'Rp 350.000 / paket',
          note: 'Tarif sewa 24 jam mobil + supir bebas jadwal.',
        };
      case 'Zayn Rekber':
        return {
          label: 'Fee mulai Rp 5.000',
          note: 'Tarif flat transparan sesuai nominal transaksi.',
        };
      case 'Antar Jemput':
      case 'Jasa Suruh':
      case 'Hiburan & Gaya Hidup':
      default:
        return {
          label: 'Tanya admin',
          note: 'Harga sesuai rute dan lama tunggu, dikonfirmasi admin.',
        };
    }
  };

  const currentPriceQuote = getPriceQuote(serviceType);

  // Geolocation handler
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Perangkat Anda tidak mendukung fitur lokasi otomatis.');
      return;
    }

    setIsLocating(true);
    setLocationSuccess(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Format precise coordinates with Cibinong area note
        const formatted = `Lokasi Saat Ini (${latitude.toFixed(4)}, ${longitude.toFixed(4)} - Sekitar Cibinong)`;
        setPickupLocation(formatted);
        setIsLocating(false);
        setLocationSuccess(true);
        setTimeout(() => setLocationSuccess(false), 3000);
      },
      () => {
        // Fallback if denied or offline
        setPickupLocation('Area Cibinong, Bogor (Titik GPS Terdeteksi)');
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !pickupLocation.trim() || !destination.trim()) {
      return;
    }

    const orderId = `ZYN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderItem = {
      id: orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      serviceType: serviceType.toLowerCase().replace(/\s+/g, '-'),
      serviceName: serviceType,
      routeOrDetails: `${pickupLocation} -> ${destination}`,
      date: date,
      time: 'Segera / Sesuai Jadwal',
      status: 'menunggu_konfirmasi',
      statusText: 'Pesanan Diterima (Menunggu Konfirmasi Admin)',
      notes: notes.trim(),
      estimatedPrice: currentPriceQuote.label,
      createdAt: '16/10/2026',
    };

    onAddOrder(newOrder);
    setSubmittedOrder(newOrder);
  };

  const handleReset = () => {
    setSubmittedOrder(null);
    setCustomerName('');
    setPhone('');
    setNotes('');
    setPickupLocation('');
    setDestination('');
  };

  return (
    <section id="pesan-layanan" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2 font-mono">
            MULAI DALAM SATU MENIT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Pesan Layanan ZAYN
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Tanpa membuat akun. Pesanan langsung terhubung ke Dashboard Admin ZAYN secara real-time.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm">
          {!submittedOrder ? (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Row 1: Nama Pelanggan & Nomor Kontak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-2">
                    Nama pelanggan <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nama lengkap atau panggilan Anda"
                      className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-2">
                    Nomor Kontak / Handphone <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Jenis Layanan & Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-2">
                    Jenis layanan
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white font-medium focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  >
                    <option value="Antar Jemput">Antar Jemput</option>
                    <option value="Jasa Suruh">Jasa Suruh</option>
                    <option value="Hiburan & Gaya Hidup">Hiburan &amp; Gaya Hidup</option>
                    <option value="Cibinong - Bandara All In">Cibinong - Bandara (All In)</option>
                    <option value="Sewa Paket 12 Jam">Sewa Paket 12 Jam (Mobil + Supir)</option>
                    <option value="Sewa Paket 24 Jam">Sewa Paket 24 Jam (Mobil + Supir)</option>
                    <option value="Zayn Rekber">Zayn Rekber (Rekening Bersama)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-2">
                    Tanggal
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Keterangan (Kebutuhan atau lama tunggu) */}
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-2">
                  Keterangan
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Kebutuhan atau lama tunggu"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Lokasi Jemput with 'Gunakan lokasi saya' */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-neutral-200">
                    Lokasi jemput <span className="text-amber-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    disabled={isLocating}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 focus:outline-none"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Mencari lokasi...' : locationSuccess ? 'Lokasi berhasil diambil' : 'Gunakan lokasi saya'}</span>
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Alamat lengkap dan patokan"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 5: Lokasi Tujuan */}
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-2">
                  Lokasi tujuan <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ke mana Anda ingin pergi?"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 6: Penawaran Harga Block */}
              <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Penawaran harga
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-amber-400 font-mono">
                    {currentPriceQuote.label}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Harga sesuai rute dan lama tunggu, dikonfirmasi admin.
                  </p>
                </div>
                
                <div className="text-xs text-neutral-400 flex items-center gap-1.5 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Tanpa Biaya Tersembunyi</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] rounded-xl transition-all shadow-lg shadow-amber-400/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Kirim Pesanan Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-neutral-400">
                Setelah formulir dikirim, pesanan langsung masuk ke Dashboard Admin ZAYN secara real-time dan admin segera memproses konfirmasi.
              </p>
            </form>
          ) : (
            /* Order Submission Success Screen */
            <div className="text-center py-6 sm:py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  PESANAN BERHASIL DIKIRIM
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  ID Pesanan: <span className="text-amber-400 font-mono">{submittedOrder.id}</span>
                </h3>
                <p className="text-sm text-neutral-300 max-w-lg mx-auto mt-2 leading-relaxed">
                  Terima kasih, <strong className="text-white">{submittedOrder.customerName}</strong>! Pesanan Anda telah tercatat di Dashboard Admin ZAYN secara real-time. Tim operasional kami akan segera menghubungi nomor <strong className="text-amber-300 font-mono">{submittedOrder.phone}</strong>.
                </p>
              </div>

              {/* Order Details Receipt */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-950 border border-neutral-850 text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Layanan:</span>
                  <span className="text-white font-semibold">{submittedOrder.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tanggal:</span>
                  <span className="text-white font-mono">{submittedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Rute:</span>
                  <span className="text-neutral-200 text-right max-w-[220px] truncate">{submittedOrder.routeOrDetails}</span>
                </div>
                {submittedOrder.notes && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Keterangan:</span>
                    <span className="text-amber-300/90 text-right max-w-[220px]">{submittedOrder.notes}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold">
                  <span className="text-neutral-400">Status:</span>
                  <span className="text-amber-400">{submittedOrder.statusText}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href="#cek-status"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
                >
                  Lacak Pesanan Ini di Cek Status
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors"
                >
                  Pesan Layanan Lain
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
