import React from 'react';
import { ArrowRight, Scale, Trash2, X } from 'lucide-react';
import type { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface CompareBarProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenModal: () => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({
  products,
  onRemove,
  onClear,
  onOpenModal,
}) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">
      <div className="rounded-2xl border border-indigo-500/40 bg-white/95 dark:bg-[#12151E]/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/20 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mr-1">
            <Scale className="w-4 h-4" />
            <span>შედარება ({products.length}/3)</span>
          </div>

          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
            >
              <ProductVisual
                type={p.visualType}
                imageUrl={p.imageUrl}
                alt={p.name}
                accentColor={p.accentColor}
                size="sm"
                className="!w-7 !h-7"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[110px] truncate">
                {p.name}
              </span>
              <button
                onClick={() => onRemove(p.id)}
                aria-label="ამოშლა"
                className="text-slate-400 hover:text-rose-500 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onClear}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="გასუფთავება"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/25 cursor-pointer"
          >
            <span>შედარება</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
