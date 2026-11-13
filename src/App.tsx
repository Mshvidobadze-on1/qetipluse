import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, PackageSearch } from 'lucide-react';
import { BentoHero } from './components/BentoHero';
import { CartDrawer } from './components/CartDrawer';
import { CompareBar } from './components/CompareBar';
import { CompareModal } from './components/CompareModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HotOffersRow } from './components/HotOffersRow';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CATEGORIES, PRODUCTS } from './data/products';
import type {
  CartItem,
  CategoryId,
  Product,
} from './types';

const CATALOG_SECTION_ORDER: Exclude<CategoryId, 'all'>[] = [
  'smartphones',
  'drones',
  'tablets',
  'smartwatches',
  'laptops',
  'audio-tv',
  'gaming',
  'tv-monitors',
  'photo-video',
];

export function App() {
  const [isDark, setIsDark] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // Interactive Collections
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'iphone-18-pro-max-burgundy',
    'dji-mavic-3-pro-cine',
    'airpods-pro-2',
  ]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewTab, setQuickViewTab] = useState<'specs' | 'installment'>('installment');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const flagshipProduct = useMemo(
    () => PRODUCTS.find((p) => p.isFlagship) || PRODUCTS[0],
    []
  );
  const flashProduct = useMemo(
    () => PRODUCTS.find((p) => p.isFlashDeal) || PRODUCTS[1],
    []
  );
  const hotOfferProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isHotOffer),
    []
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'gaming') {
          if (p.category !== 'gaming' && p.id !== 'asus-rog-strix-g16') return false;
        } else if (selectedCategory === 'photo-video') {
          if (p.category !== 'photo-video' && p.category !== 'drones') return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      if (query) {
        const haystack = `${p.name} ${p.brand} ${p.category} ${p.shortDescription}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const compareProducts = useMemo(
    () => PRODUCTS.filter((p) => compareIds.includes(p.id)),
    [compareIds]
  );

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory);

  const showGroupedCatalog = selectedCategory === 'all' && !searchQuery.trim();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090A0F] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        showAnnouncement={showAnnouncement}
        onDismissAnnouncement={() => setShowAnnouncement(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        compareCount={compareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onResetHome={() => {
          handleClearFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main>
        {/* Top Sidebar + Hero Banner Carousel */}
        {!searchQuery.trim() && (
          <BentoHero
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            flagshipProduct={flagshipProduct}
            flashProduct={flashProduct}
            onBuyNow={handleBuyNow}
            onOpenInstallment={(p) => {
              setQuickViewTab('installment');
              setQuickViewProduct(p);
            }}
            onQuickView={(p) => {
              setQuickViewTab('specs');
              setQuickViewProduct(p);
            }}
          />
        )}

        {/* სულსწრაფი შეთავაზებები (Hot Offers Horizontal Showcase) */}
        {!searchQuery.trim() && selectedCategory === 'all' && (
          <HotOffersRow
            products={hotOfferProducts}
            onQuickView={(p) => {
              setQuickViewTab('installment');
              setQuickViewProduct(p);
            }}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Product Catalog */}
        {showGroupedCatalog ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10">
            {CATALOG_SECTION_ORDER.map((catId) => {
              const catMeta = CATEGORIES.find((c) => c.id === catId);
              const catProducts = PRODUCTS.filter((p) => p.category === catId);
              if (catProducts.length === 0) return null;

              return (
                <section key={catId} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-fuchsia-500" />
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {catMeta?.label}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 tabular-nums">
                        {catProducts.length} მოდელი
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCategory(catId);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 cursor-pointer"
                    >
                      <span>ყველას ნახვა</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {catProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isWishlisted={wishlistIds.includes(product.id)}
                        isCompared={compareIds.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onToggleCompare={handleToggleCompare}
                        onAddToCart={handleAddToCart}
                        onQuickView={(p) => {
                          setQuickViewTab('installment');
                          setQuickViewProduct(p);
                        }}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {selectedCategory === 'all'
                    ? 'სრული კატალოგი'
                    : activeCategoryMeta?.label || 'კატალოგი'}
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={handleClearFilters}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                  >
                    ყველა კატეგორია
                  </button>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                სულ {filteredProducts.length} მოდელი
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#12151E] p-12 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <PackageSearch className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  პროდუქტები ვერ მოიძებნა
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  სცადეთ სხვა საძიებო სიტყვა ან გაასუფთავეთ არჩეული ფილტრები სრული კატალოგის სანახავად.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                >
                  ყველა პროდუქტის ჩვენება
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    isCompared={compareIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => {
                      setQuickViewTab('installment');
                      setQuickViewProduct(p);
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />

      {/* Floating Compare Bar */}
      <CompareBar
        products={compareProducts}
        onRemove={handleToggleCompare}
        onClear={() => setCompareIds([])}
        onOpenModal={() => setIsCompareOpen(true)}
      />

      {/* Quick View & Georgian Bank Installment Modal */}
      <QuickViewModal
        key={quickViewProduct?.id ?? 'closed'}
        product={quickViewProduct}
        initialTab={quickViewTab}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        isCompared={quickViewProduct ? compareIds.includes(quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onToggleCompare={handleToggleCompare}
      />

      {/* Slide-Over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      {/* Slide-Over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        products={wishlistProducts}
        onClose={() => setIsWishlistOpen(false)}
        onRemove={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => {
          setQuickViewTab('installment');
          setQuickViewProduct(p);
        }}
      />

      {/* Side-by-Side Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        products={compareProducts}
        onClose={() => setIsCompareOpen(false)}
        onRemove={handleToggleCompare}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
