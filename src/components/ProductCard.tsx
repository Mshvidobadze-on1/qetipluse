import React, { useState } from 'react';
import { Check, Heart, Scale, ShoppingBag, Star } from 'lucide-react';
import { calcMonthlyHint, formatGEL } from '../data/products';
import type { Product } from '../types';
import { BrandIcon } from './BrandIcon';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onAddToCart,
  onQuickView,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const monthlyHint = calcMonthlyHint(product.price, 24);

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 hover:border-indigo-500/70 dark:hover:border-indigo-400/60 bg-white dark:bg-[#12151E] backdrop-blur-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
    >
      {/* 1. Top Badges & Actions */}
      <div className="flex items-start justify-between gap-2 z-10">
        <div className="flex flex-wrap items-center gap-1.5">
          {product.esimBadge && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-orange-500 text-white shadow-xs">
              e-SIM
            </span>
          )}
          {product.discountPercent ? (
            <span className="px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 tabular-nums">
              -{product.discountPercent}%
            </span>
          ) : null}
          {product.zeroInstallment && (
            <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              0% განვადება
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label="სურვილებში დამატება"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-500'
                : 'bg-slate-100/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product.id);
            }}
            aria-label="შედარებაში დამატება"
            title="შედარება"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isCompared
                ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-500 dark:text-indigo-300'
                : 'bg-slate-100/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-500'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Product Visual + 3 Micro-Spec Pills */}
      <div className="my-3">
        <div className="relative h-44 rounded-xl bg-slate-50 dark:bg-[#090A0F]/60 border border-slate-100 dark:border-white/5 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
            <ProductVisual
              type={product.visualType}
              imageUrl={product.imageUrl}
              alt={product.name}
              accentColor={product.accentColor}
              size="md"
            />
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-white border border-white/15">
                ამოიწურა
              </span>
            </div>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {product.microSpecs.map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Title, Brand & Rating */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <BrandIcon brand={product.brand} className="w-3.5 h-3.5" />
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {product.rating.toFixed(1)}
            <span className="text-slate-400">({product.reviewCount})</span>
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
          {product.name}
        </h3>
      </div>

      {/* 4. Pricing Block & 1-Click Add to Cart */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 space-y-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
              {formatGEL(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatGEL(product.oldPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
            ან {monthlyHint} ₾ / თვეში
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          disabled={!product.inStock}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            !product.inStock
              ? 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed'
              : justAdded
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/20'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>დამატებულია ✓</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{product.inStock ? 'კალათაში' : 'არ არის მარაგში'}</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
