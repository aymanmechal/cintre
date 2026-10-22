export interface ApiProduct {
  id: number;
  title: string;
  brand?: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  description?: string;
  images?: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
}

export interface ApiProductList {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiSavedProduct {
  id: number;
  title?: string;
  brand?: string | null;
  price?: number;
  thumbnail?: string;
  isDeleted?: boolean;
}
