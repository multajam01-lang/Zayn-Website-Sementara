import React from 'react';
import { Star, MessageSquarePlus, CheckCircle } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onOpenReviewModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenReviewModal,
}) => {
  const avgRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section id="ulasan" className="py-20 lg:py-28 bg-neutral-900/40 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              BUKTI KEPUASAN
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              Penilaian Pelanggan
            </h2>
            
            {/* Score & Stars */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-base font-bold text-white font-mono tabular-nums">
                {avgRating} / 5
              </span>
              <span className="text-neutral-400 text-sm">
                dari {reviews.length} ulasan
              </span>
            </div>
          </div>

          {/* Kirim Penilaian Action Button */}
          <button
            type="button"
            onClick={onOpenReviewModal}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-xl transition-all shadow-md self-start md:self-auto whitespace-nowrap"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Kirim Penilaian</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(Math.floor(rev.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-neutral-200 leading-relaxed mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-850">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                    {rev.date}
                  </span>
                </div>
                <div className="text-[11px] text-amber-300/80 font-medium">
                  {rev.serviceType}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
