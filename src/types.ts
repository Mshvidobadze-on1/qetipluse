export type CategoryId =
  | 'all'
  | 'smartphones'
  | 'tablets'
  | 'smartwatches'
  | 'laptops'
  | 'audio-tv'
  | 'gaming'
  | 'tv-monitors'
  | 'photo-video'
  | 'drones';

export type BrandName =
  | 'Apple'
  | 'Samsung'
  | 'Xiaomi'
  | 'Google'
  | 'Sony'
  | 'ASUS'
  | 'LG'
  | 'Dyson'
  | 'Marshall'
  | 'Nintendo'
  | 'DJI'
  | 'Canon'
  | 'GoPro'
  | 'Garmin'
  | 'JBL';

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'discount';

export type PriceRangeId = 'all' | 'under-1000' | '1000-3000' | 'over-3000';

export type BankId = 'tbc' | 'bog' | 'credo';

export type ProductVisualType =
  | 'phone'
  | 'tablet'
  | 'laptop'
  | 'console'
  | 'earbuds'
  | 'watch'
  | 'tv'
  | 'speaker'
  | 'vacuum'
  | 'camera';

export interface ProductSpecs {
  screen: string;
  processor: string;
  memory: string;
  battery: string;
  warranty: string;
}

export interface Product {
  id: string;
  name: string;
  brand: BrandName;
  category: Exclude<CategoryId, 'all'>;
  visualType: ProductVisualType;
  imageUrl: string;
  imageFit?: 'cover' | 'contain';
  accentColor: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  zeroInstallment: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  popularityScore: number;
  microSpecs: [string, string, string];
  shortDescription: string;
  specs: ProductSpecs;
  isFlagship?: boolean;
  isFlashDeal?: boolean;
  isHotOffer?: boolean;
  esimBadge?: boolean;
  tradeInBadge?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
