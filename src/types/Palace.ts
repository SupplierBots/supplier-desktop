import ProductFetcher from 'bot/palace/ProductFetcher';

export namespace Palace {
  export interface Collection {
    collection: {
      id: number;
      title: string;
      handle: string;
      description: string;
      published_at: string;
      updated_at: string;
      image?: string;
      products_count: number;
    };
  }

  export interface ProductLocation {
    name: string;
    url: string;
    fetcher?: ProductFetcher;
  }

  export interface ProductDetails {
    id: number;
    title: string;
    handle: string;
    description: string;
    published_at: string;
    created_at: string;
    vendor: string;
    type: string;
    tags: string[];
    price: number;
    price_min: number;
    price_max: number;
    available: boolean;
    price_varies: boolean;
    compare_at_price?: boolean;
    compare_at_price_min: number;
    compare_at_price_max: number;
    compare_at_price_varies: boolean;
    variants: Variant[];
    images: string[];
    featured_image: string;
    options: Option[];
    url: string;
    media: Medium[];
  }

  export interface CompactVariant {
    id: string;
    size: string;
  }

  interface Variant {
    id: number;
    title: string;
    option1: string;
    option2?: string;
    option3?: string;
    sku: string;
    requires_shipping: boolean;
    taxable: boolean;
    featured_image?: any;
    available: boolean;
    name: string;
    public_title: string;
    options: string[];
    price: number;
    weight: number;
    compare_at_price?: boolean;
    inventory_management: string;
    barcode: string;
  }

  interface Option {
    name: string;
    position: number;
    values: string[];
  }

  interface PreviewImage {
    aspect_ratio: number;
    height: number;
    width: number;
    src: string;
  }

  interface Medium {
    alt?: string;
    id: number;
    position: number;
    preview_image: PreviewImage;
    aspect_ratio: number;
    height: number;
    media_type: string;
    src: string;
    width: number;
  }
}
