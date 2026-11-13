import React from 'react';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { formatGEL } from '../data/products';
import type { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  products,
  onClose,
  onRemove,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm" onClick={onClose}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-white dark:bg-[#12151E] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col"
      >
        <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              სურვილების სია ({products.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="დახურვა"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
              <Heart className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              სურვილების სია ცარიელია
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              მონიშნეთ სასურველი პროდუქტები გულის ღილაკით, რათა მარტივად დაუბრუნდეთ მოგვიანებით.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onClose();
                  onQuickView(p);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] hover:border-indigo-500/50 transition-all cursor-pointer"
              >
                <div className="p-1.5 rounded-xl bg-white dark:bg-[#090A0F] border border-slate-200 dark:border-white/10 shrink-0">
                  <ProductVisual
                    type={p.visualType}
                    imageUrl={p.imageUrl}
                    alt={p.name}
                    accentColor={p.accentColor}
                    size="sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {p.name}
                  </h4>
                  <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5 tabular-nums">
                    {formatGEL(p.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      disabled={!p.inStock}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-[11px] font-bold cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      კალათაში
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(p.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                      aria-label="წაშლა"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
};
