import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageCircle, Copy, Check, Calendar, Clock, MapPin, User, Phone, FileText } from 'lucide-react';
import { OrderItem, PricingDayType } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceKey?: string;
  defaultPlanId?: string;
  defaultDayType?: PricingDayType;
  onAddOrder: (order: OrderItem) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultServiceKey,
  defaultPlanId,
  defaultDayType = 'weekday',
  onAddOrder,
}) => {
  const [serviceType, setServiceType] = useState('antar-jemput');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');
  const [dayType, setDayType] = useState<PricingDayType>(defaultDayType);
  const [submittedOrder, setSubmittedOrder] = useState<OrderItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultPlanId) {
      setServiceType(defaultPlanId);
    } else if (defaultServiceKey) {
      if (defaultServiceKey === 'perjalanan') setServiceType('antar-jemput');
      else if (defaultServiceKey === 'harian') setServiceType('jasa-suruh');
      else if (defaultServiceKey === 'aktivitas') setServiceType('teman-aktivitas');
      else if (defaultServiceKey === 'rental') setServiceType('sewa-12-jam');
      else if (defaultServiceKey === 'rekber') setServiceType('zayn-rekber');
    }
  }, [defaultServiceKey, defaultPlanId, isOpen]);

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
    setTime('08:00');
  }, []);

  if (!isOpen) return null;

  const getServiceName = (key: string): string => {
    switch (key) {
      case 'antar-jemput':
        return 'Antar Jemput (Perjalanan Pribadi)';
      case 'jasa-suruh':
        return 'Jasa Suruh (Titip Beli / Antre / Tagihan)';
      case 'teman-aktivitas':
        return 'Teman Aktivitas (Hiburan & Gaya Hidup)';
      case 'airport-transfer':
        return 'Airport Transfer (Cibinong - Bandara All-In)';
      case 'sewa-12-jam':
        return `Sewa 12 Jam Mobil + Supir (${dayType === 'weekday' ? 'Weekday' : 'Weekend'})`;
      case 'sewa-24-jam':
        return `Sewa 24 Jam Mobil + Supir (${dayType === 'weekday' ? 'Weekday' : 'Weekend'})`;
      case 'zayn-rekber':
        return 'Zayn Rekber (Rekening Bersama)';
      default:
        return 'Layanan ZAYN';
    }
  };

  const getEstimatedPrice = (key: string): string => {
    switch (key) {
      case 'airport-transfer':
        return 'Rp 500.000 (All-In)';
      case 'sewa-12-jam':
        return dayType === 'weekday' ? 'Rp 250.000' : 'Rp 300.000';
      case 'sewa-24-jam':
        return dayType === 'weekday' ? 'Rp 350.000' : 'Rp 400.000';
      case 'jasa-suruh':
        return 'Mulai Rp 20.000 (Konfirmasi Admin)';
      case 'antar-jemput':
        return 'Menyesuaikan Rute (Tanya Admin)';
      case 'teman-aktivitas':
        return 'Menyesuaikan Agenda (Tanya Admin)';
      case 'zayn-rekber':
        return 'Fee mulai Rp 5.000';
      default:
        return 'Sesuai kesepakatan';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;

    const newId = `ZYN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderItem = {
      id: newId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      serviceType: serviceType,
      serviceName: getServiceName(serviceType),
      routeOrDetails: `${pickupLocation} -> ${destination}`,
      date: date,
      time: time,
      status: 'menunggu_konfirmasi',
      statusText: 'Menunggu Konfirmasi Admin',
      notes: notes.trim(),
      estimatedPrice: getEstimatedPrice(serviceType),
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) + ' ' + time,
    };

    onAddOrder(newOrder);
    setSubmittedOrder(newOrder);
  };

  const generateWhatsAppMessage = (order: OrderItem) => {
    const text = `Halo Admin ZAYN, saya mau konfirmasi pesanan:
--------------------------------
ID Pesanan: ${order.id}
Layanan: ${order.serviceName}
Nama: ${order.customerName}
Nomor HP/WA: ${order.phone}
Jadwal: ${order.date} (Pukul ${order.time} WIB)
Titik Jemput: ${pickupLocation || '-'}
Tujuan / Tugas: ${destination || '-'}
Catatan: ${notes || '-'}
Estimasi: ${order.estimatedPrice}
--------------------------------
Mohon konfirmasi ketersediaan dan harga ya min, terima kasih!`;
    return encodeURIComponent(text);
  };

  const copyOrderDetails = (order: OrderItem) => {
    const text = `ID Pesanan: ${order.id}\nLayanan: ${order.serviceName}\nNama: ${order.customerName}\nHP: ${order.phone}\nJadwal: ${order.date} ${order.time}\nRute/Tugas: ${order.routeOrDetails}\nCatatan: ${order.notes || '-'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Tutup form pemesanan"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedOrder ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-semibold text-amber-400 tracking-wider uppercase">
                FORMULIR PEMESANAN CEPAT
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Pesan Layanan ZAYN
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Isi rincian pesanan. Admin kami langsung memverifikasi ketersediaan armada 24 jam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Pilih Kategori Layanan:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                >
                  <optgroup label="Paket Rental Mobil + Supir">
                    <option value="airport-transfer">01. Cibinong - Bandara All In (Rp 500.000)</option>
                    <option value="sewa-12-jam">02. Sewa 12 Jam Mobil + Supir (Mulai Rp 250.000)</option>
                    <option value="sewa-24-jam">03. Sewa 24 Jam Mobil + Supir (Mulai Rp 350.000)</option>
                  </optgroup>
                  <optgroup label="Layanan Personal &amp; Harian">
                    <option value="antar-jemput">01. Antar Jemput Pribadi (Drop-off / Pick-up)</option>
                    <option value="jasa-suruh">02. Jasa Suruh (Titip Beli / Tagihan / Antre)</option>
                    <option value="teman-aktivitas">03. Hiburan &amp; Gaya Hidup (Teman Makan / Nonton)</option>
                    <option value="zayn-rekber">05. Zayn Rekber (Rekening Bersama)</option>
                  </optgroup>
                </select>
              </div>

              {/* Day Type Toggle (for 12h/24h rentals) */}
              {(serviceType === 'sewa-12-jam' || serviceType === 'sewa-24-jam') && (
                <div className="flex items-center gap-2 p-2 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                  <span className="text-neutral-400 text-[11px] font-medium ml-1">Kategori Hari:</span>
                  <button
                    type="button"
                    onClick={() => setDayType('weekday')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      dayType === 'weekday' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Weekday (Sen–Jum)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDayType('weekend')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      dayType === 'weekend' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Weekend (Sab–Min)
                  </button>
                </div>
              )}

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Nama Lengkap / Panggilan:
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Rian Pratama"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Nomor WhatsApp / HP:
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Tanggal Layanan:
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Waktu / Jam Penjemputan:
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Titik Jemput / Lokasi Awal:
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Contoh: Perumahan Pakansari Cibinong / Stasiun Bojong Gede"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Tujuan / Tugas / Rincian Belanja:
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Contoh: Bandara Soekarno Hatta Terminal 3 / Tebus obat di RSUD"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Catatan Tambahan (Opsional):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: Bawa 2 koper besar, butuh supir yang paham jalur alternatif, dll."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Estimated Price Bar */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Estimasi Paket:</span>
                <span className="font-bold text-amber-400 font-mono text-sm">
                  {getEstimatedPrice(serviceType)}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-xl transition-all shadow-md mt-2"
              >
                Lanjutkan Pemesanan &amp; Buat ID
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              PESANAN TERDAFTAR DI SISTEM
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">
              ID: <span className="font-mono text-amber-400">{submittedOrder.id}</span>
            </h3>

            <p className="text-xs text-neutral-300 max-w-sm mx-auto mb-6">
              Pesanan Anda telah dicatat. Klik tombol di bawah untuk langsung membuka WhatsApp admin ZAYN dan verifikasi penugasan armada Anda.
            </p>

            {/* Order Summary Box */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">Layanan:</span>
                <span className="text-white font-medium">{submittedOrder.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Pemesan:</span>
                <span className="text-white">{submittedOrder.customerName} ({submittedOrder.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Jadwal:</span>
                <span className="text-white font-mono">{submittedOrder.date} · {submittedOrder.time} WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Rute:</span>
                <span className="text-neutral-200">{submittedOrder.routeOrDetails}</span>
              </div>
              <div className="pt-2 border-t border-neutral-850 flex justify-between font-bold">
                <span className="text-neutral-400">Perkiraan Biaya:</span>
                <span className="text-amber-400 font-mono">{submittedOrder.estimatedPrice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/6281289001926?text=${generateWhatsAppMessage(submittedOrder)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Format ke WhatsApp Admin</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copyOrderDetails(submittedOrder)}
                  className="w-1/2 py-2.5 px-3 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Rincian'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedOrder(null);
                    onClose();
                  }}
                  className="w-1/2 py-2.5 px-3 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-850 rounded-xl transition-colors"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
