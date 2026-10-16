import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: CustomerReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onAddReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('Antar Jemput');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(
      today.getMonth() + 1
    ).padStart(2, '0')}/${today.getFullYear()}`;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      rating: rating,
      date: formattedDate,
      comment: comment.trim(),
      serviceType: serviceType,
      verified: true,
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setComment('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Tutup modal ulasan"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-semibold text-amber-400 tracking-wider uppercase">
                TESTIMONI PELANGGAN
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Kirim Penilaian Layanan
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Bagikan pengalaman Anda menggunakan jasa ZAYN untuk membantu pengguna lain.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Beri Bintang Kepuasan:
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-mono font-bold text-amber-400">
                    {hoverRating || rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Nama Anda:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rian / TEST Reviewer"
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Layanan yang Digunakan:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Antar Jemput">Antar Jemput</option>
                  <option value="Airport Transfer">Airport Transfer (Bandara)</option>
                  <option value="Sewa Mobil 12 Jam">Sewa Mobil 12 Jam</option>
                  <option value="Sewa Mobil 24 Jam">Sewa Mobil 24 Jam</option>
                  <option value="Jasa Suruh">Jasa Suruh Harian</option>
                  <option value="Teman Aktivitas">Teman Aktivitas</option>
                  <option value="Rekber Zayn">Zayn Rekber</option>
                </select>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Ulasan / Pesan Anda:
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ceritakan kepuasan Anda tentang supir, ketepatan waktu, atau amannya transaksi..."
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                Kirim Penilaian
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">Terima Kasih!</h4>
            <p className="text-xs text-neutral-400">
              Penilaian Anda telah dipublikasikan dan ditampilkan di ulasan pelanggan.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
