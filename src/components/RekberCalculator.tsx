import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, FileCheck2, Calculator } from 'lucide-react';
import { RekberTransaction } from '../types';

interface RekberCalculatorProps {
  rekberList: RekberTransaction[];
  onAddRekber: (trx: RekberTransaction) => void;
}

export const RekberCalculator: React.FC<RekberCalculatorProps> = ({
  rekberList,
  onAddRekber,
}) => {
  const [nominal, setNominal] = useState<number>(1500000);
  const [nominalInput, setNominalInput] = useState<string>('1.500.000');
  const [buyerName, setBuyerName] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [itemName, setItemName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState<RekberTransaction | null>(null);

  // Fee logic:
  // <= 500.000: Rp 5.000
  // 500.001 - 2.000.000: Rp 10.000
  // 2.000.001 - 10.000.000: Rp 15.000
  // > 10.000.000: 0.2% max 50.000
  const calculateFee = (amount: number): number => {
    if (amount <= 500000) return 5000;
    if (amount <= 2000000) return 10000;
    if (amount <= 10000000) return 15000;
    return Math.min(50000, Math.round(amount * 0.002));
  };

  const currentFee = calculateFee(nominal);
  const totalPayment = nominal + currentFee;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val).replace('IDR', 'Rp');
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(raw, 10) || 0;
    setNominal(num);
    setNominalInput(num > 0 ? num.toLocaleString('id-ID') : '');
  };

  const handleSubmitTrx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !sellerName.trim() || !itemName.trim() || nominal <= 0) return;

    const newId = `ZYN-REKBER-${Math.floor(100 + Math.random() * 900)}`;
    const newTrx: RekberTransaction = {
      id: newId,
      buyerName: buyerName.trim(),
      sellerName: sellerName.trim(),
      itemName: itemName.trim(),
      itemPrice: nominal,
      adminFee: currentFee,
      totalPayment: totalPayment,
      status: 'menunggu_dana',
      statusText: 'Menunggu Transfer Dana Pembeli',
      createdAt: 'Hari ini',
    };

    onAddRekber(newTrx);
    setCreatedSuccess(newTrx);
    setShowForm(false);
  };

  return (
    <section id="rekber" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
            05 / REKENING BERSAMA RESMI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Zayn Rekber.
          </h2>
          <p className="text-lg text-neutral-300">
            Dana ditahan admin hingga barang diterima. <span className="text-amber-300 font-medium">Transaksi online lebih tenang.</span>
          </p>
        </div>

        {/* 2-Column Split: Visual & Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Rekber Mechanism & Visual */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 relative">
              <img
                src="/src/assets/images/rekber_escrow_trust_1792165892069.jpg"
                alt="Transaksi aman terpercaya Zayn Rekber"
                className="w-full h-64 sm:h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-amber-400 font-mono tracking-wider">
                  KEAMANAN TRANSAKSI 100%
                </span>
                <div className="text-white font-bold text-base sm:text-lg">
                  Anti Penipuan Jual-Beli Online &amp; COD Cibinong
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850">
                <Lock className="w-5 h-5 text-amber-400 mb-2" />
                <div className="font-bold text-white text-xs mb-1">Dana Ditahan Admin</div>
                <div className="text-[11px] text-neutral-400">Uang pembeli aman di rekening ZAYN.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850">
                <FileCheck2 className="w-5 h-5 text-amber-400 mb-2" />
                <div className="font-bold text-white text-xs mb-1">Cek Barang Sampai</div>
                <div className="text-[11px] text-neutral-400">Pembeli tes fisik barang sebelum acc.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-850">
                <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
                <div className="font-bold text-white text-xs mb-1">Pencairan Cepat</div>
                <div className="text-[11px] text-neutral-400">Dana langsung dikirim ke rekening penjual.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Fee Calculator */}
          <div className="lg:col-span-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Simulasi Biaya Rekber</h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">Transparan &amp; Flat</span>
            </div>

            {/* Input Amount */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Nominal Nilai Barang (Rp):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">Rp</span>
                <input
                  type="text"
                  value={nominalInput}
                  onChange={handleNominalChange}
                  placeholder="Contoh: 1.500.000"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base font-mono font-bold text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Quick Nominal Chips */}
              <div className="flex flex-wrap gap-2 mt-2.5">
                {[250000, 500000, 1500000, 3000000, 5000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setNominal(amt);
                      setNominalInput(amt.toLocaleString('id-ID'));
                    }}
                    className="text-[11px] font-mono px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  >
                    {amt >= 1000000 ? `${amt / 1000000} Jt` : `${amt / 1000} Rb`}
                  </button>
                ))}
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="space-y-3 p-4 rounded-xl bg-neutral-950 border border-neutral-850 mb-6 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Harga Barang:</span>
                <span className="text-white font-medium">{formatRupiah(nominal)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Biaya Admin Rekber:</span>
                <span className="text-amber-400 font-semibold">{formatRupiah(currentFee)}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold">
                <span className="text-white">Total Ditransfer Pembeli:</span>
                <span className="text-amber-400">{formatRupiah(totalPayment)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500 pt-1">
                <span>Dana yang Diterima Penjual:</span>
                <span className="text-neutral-300 font-semibold">{formatRupiah(nominal)} (Utuh)</span>
              </div>
            </div>

            {/* Action Trigger */}
            {!showForm && !createdSuccess && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="w-full py-3.5 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all duration-150 inline-flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Buat Transaksi Rekber Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* In-Place Transaction Form */}
            {showForm && (
              <form onSubmit={handleSubmitTrx} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Nama Pembeli:</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: Rian Cibinong"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Nama Penjual:</label>
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="Contoh: Toko Second Sentul"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Nama Barang / Transaksi:</label>
                  <input
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Contoh: Kamera Sony A6000 / Handphone"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-1/3 py-2 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                  >
                    Generate Rekber ID
                  </button>
                </div>
              </form>
            )}

            {/* Success state */}
            {createdSuccess && (
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transaksi Rekber Berhasil Dibuat!</span>
                </div>
                <div className="font-mono text-white mb-2">ID: <span className="font-bold text-amber-300">{createdSuccess.id}</span></div>
                <p className="text-neutral-300 mb-3 text-[11px]">
                  ID Rekber Anda telah tersimpan. Admin ZAYN akan segera mengonfirmasi dan membuat grup koordinasi untuk memverifikasi dana transaksi.
                </p>
                <div className="w-full py-2 px-3 text-center block text-xs font-bold text-neutral-950 bg-amber-400 rounded-lg">
                  Terdaftar di Sistem Rekber ZAYN
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Rekber Log Table */}
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-white tracking-wide uppercase">
              Riwayat Transaksi Rekber Terkini
            </span>
            <span className="text-[11px] font-mono text-neutral-400">Verifikasi Resmi ZAYN</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono">
                  <th className="py-2.5 pr-4">KODE REKBER</th>
                  <th className="py-2.5 px-4">BARANG</th>
                  <th className="py-2.5 px-4">PEMBELI / PENJUAL</th>
                  <th className="py-2.5 px-4 text-right">NILAI</th>
                  <th className="py-2.5 pl-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {rekberList.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-850/30 transition-colors">
                    <td className="py-3 pr-4 font-mono font-medium text-amber-400">{item.id}</td>
                    <td className="py-3 px-4 text-white font-medium">{item.itemName}</td>
                    <td className="py-3 px-4 text-neutral-300">
                      <span>{item.buyerName}</span>
                      <span className="text-neutral-500 mx-1">&rarr;</span>
                      <span className="text-neutral-400">{item.sellerName}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-white">
                      {formatRupiah(item.itemPrice)}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-300">
                        {item.statusText}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
