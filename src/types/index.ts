export interface ProductImage {
  id: string;
  label: string;
  viewName: string;
  url: string;
  alt: string;
  webpUrl?: string;
  webpSrcSet?: string;
  jpgSrcSet?: string;
  thumbnailUrl?: string;
  thumbnailWebpUrl?: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  formattedPrice: string;
  color: string;
  colorHex: string;
  description: string;
  images: ProductImage[];
  details: string[];
  materials: string[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
    strapDrop: string;
  };
  shippingInfo: string;
  returnsInfo: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface EditorialStory {
  id: string;
  title: string;
  subtitle?: string;
  edition?: string;
  category?: string;
  description: string;
  image: string;
  webpUrl?: string;
  webpSrcSet?: string;
  jpgSrcSet?: string;
  width?: number;
  height?: number;
  label?: string;
  year?: string;
}
