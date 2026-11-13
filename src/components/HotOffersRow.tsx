import React, { useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Flame, ShoppingBag } from 'lucide-react';
import { calcMonthlyHint, formatGEL } from '../data/products';
import type { Product } from '../types';

interface HotOffersRowProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HotOffersRow: React.FC<HotOffersRowProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleScroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = dir === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            სულსწრაფი შეთავაზებები
          </h2>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            HOT
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            aria-label="მარცხნივ გადახვევა"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#12151E] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-500 flex items-center justify-center shadow-xs transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="მარჯვნივ გადახვევა"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#12151E] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-500 flex items-center justify-center shadow-xs transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Showcase Cards with Background-Free Transparent PNG Cutouts */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-2"
      >
        {products.map((product) => {
          const isAdded = addedId === product.id;
          return (
            <div
              key={product.id}
              onClick={() => onQuickView(product)}
              className="group relative w-[185px] sm:w-[202px] shrink-0 rounded-2xl bg-white dark:bg-[#12151E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
            >
              {/* Top-left Orange Circular e-SIM Badge + Background-Free Cutout */}
              <div className="relative h-40 w-full rounded-xl flex items-center justify-center p-1.5">
                {product.esimBadge ? (
                  <span className="absolute top-1.5 left-1.5 z-20 w-7 h-7 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white text-[8px] font-black flex flex-col items-center justify-center leading-none shadow-md border border-white/50">
                    <span>e</span>
                    <span className="text-[6px]">SIM</span>
                  </span>
                ) : product.discountPercent ? (
                  <span className="absolute top-1.5 left-1.5 z-20 px-1.5 py-0.5 rounded-md bg-orange-500 text-white text-[10px] font-extrabold tabular-nums shadow-sm">
                    -{product.discountPercent}%
                  </span>
                ) : null}

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain object-center drop-shadow-[0_10px_16px_rgba(15,23,42,0.16)] group-hover:scale-108 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="mt-2 space-y-1">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-2 min-h-[2rem] leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {product.name}
                </h3>

                <div className="pt-1 flex items-baseline gap-1.5">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {formatGEL(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[11px] text-slate-400 line-through tabular-nums">
                      {formatGEL(product.oldPrice)}
                    </span>
                  )}
                </div>

                <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  თვეში {calcMonthlyHint(product.price, 24)} ₾-დან
                </p>

                <button
                  type="button"
                  onClick={(e) => handleAdd(e, product)}
                  className={`mt-1.5 w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-white/10 hover:bg-indigo-600 hover:text-white text-slate-800 dark:text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>დაემატა</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>კალათაში</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
