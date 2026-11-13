import React from 'react';
import { Scale, ShoppingBag, X } from 'lucide-react';
import { calcMonthlyHint, formatGEL } from '../data/products';
import type { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface CompareModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  products,
  onClose,
  onRemove,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const lowestPrice = products.length ? Math.min(...products.map((p) => p.price)) : 0;

  const rows: { label: string; render: (p: Product) => React.ReactNode }[] = [
    {
      label: 'ფასი',
      render: (p) => (
        <span
          className={`text-base font-extrabold tabular-nums ${
            products.length > 1 && p.price === lowestPrice
              ? 'text-emerald-500'
              : 'text-slate-900 dark:text-white'
          }`}
        >
          {formatGEL(p.price)}
          {products.length > 1 && p.price === lowestPrice && (
            <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">
              საუკეთესო ფასი
            </span>
          )}
        </span>
      ),
    },
    {
      label: 'განვადება (24 თვე)',
      render: (p) => (
        <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
          {formatGEL(calcMonthlyHint(p.price, 24))} / თვეში
        </span>
      ),
    },
    {
      label: 'მარაგი',
      render: (p) => (
        <span className={`font-bold ${p.inStock ? 'text-emerald-500' : 'text-rose-500'}`}>
          {p.inStock ? 'მარაგშია' : 'ამოიწურა'}
        </span>
      ),
    },
    { label: 'ეკრანი', render: (p) => p.specs.screen },
    { label: 'პროცესორი', render: (p) => p.specs.processor },
    { label: 'მეხსიერება', render: (p) => p.specs.memory },
    { label: 'ელემენტი', render: (p) => p.specs.battery },
    { label: 'გარანტია', render: (p) => p.specs.warranty },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#12151E] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              პროდუქტების შედარება
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-auto p-6">
          {products.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              აირჩიეთ 1–3 პროდუქტი ბარათზე ⚖️ ღილაკით შესადარებლად.
            </div>
          ) : (
            <table className="w-full min-w-[600px] border-collapse text-xs">
              <thead>
                <tr>
                  <th className="w-40 text-left p-3 text-slate-400 font-semibold align-bottom">
                    მახასიათებელი
                  </th>
                  {products.map((p) => (
                    <th key={p.id} className="p-3 text-left align-top">
                      <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090A0F]/60 p-3 space-y-2">
                        <button
                          onClick={() => onRemove(p.id)}
                          aria-label="წაშლა"
                          className="absolute top-2 right-2 p-1 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex justify-center">
                          <ProductVisual
                            type={p.visualType}
                            imageUrl={p.imageUrl}
                            alt={p.name}
                            accentColor={p.accentColor}
                            size="sm"
                            className="!w-20 !h-20"
                          />
                        </div>
                        <p className="text-[11px] font-bold text-indigo-500 uppercase">{p.brand}</p>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2 min-h-[2rem]">
                          {p.name}
                        </p>
                        <button
                          onClick={() => onAddToCart(p)}
                          disabled={!p.inStock}
                          className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          კალათაში
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {rows.map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-slate-500 dark:text-slate-400">
                      {row.label}
                    </td>
                    {products.map((p) => (
                      <td
                        key={p.id}
                        className="p-3 font-medium text-slate-800 dark:text-slate-200"
                      >
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
