export namespace Supreme {
  interface Product {
    name: string;
    id: number;
    image_url: string;
    image_url_hi: string;
    price: number;
    sale_price: number;
    new_item: boolean;
    position: number;
    category_name: string;
    price_euro: number;
    sale_price_euro: number;
  }

  interface Size {
    name: string;
    id: number;
    stock_level: number;
  }

  interface Style {
    id: number;
    name: string;
    currency: string;
    description: string;
    image_url: string;
    image_url_hi: string;
    swatch_url: string;
    swatch_url_hi: string;
    mobile_zoomed_url: string;
    mobile_zoomed_url_hi: string;
    bigger_zoomed_url: string;
    sizes: Size[];
    additional: [];
  }

  interface Purchase {
    image: string;
    product_name: string;
    style_name: string;
    size_name: string;
    price: number;
    product_id: number;
    style_id: number;
    quantity: 1;
  }

  interface InvalidResponse {
    status: string;
    error: string;
  }

  export interface Stock extends InvalidResponse {
    unique_image_url_prefixes: [];
    products_and_categories?: {
      new?: Product[];
      Jackets?: Product[];
      Shirts?: Product[];
      'Tops/Sweaters'?: Product[];
      'T-Shirts'?: Product[];
      Sweatshirts?: Product[];
      Pants?: Product[];
      Shorts?: Product[];
      Hats?: Product[];
      Bags?: Product[];
      Accessories?: Product[];
      Skate?: Product[];
      Shoes?: Product[];
    };
    release_date: string;
    release_week: string;
  }

  export interface ProductDetails extends InvalidResponse {
    styles: Style[];
    description: string;
    can_add_styles: boolean;
    can_buy_multiple: boolean;
    ino: string;
    cod_blocked: boolean;
    canada_blocked: boolean;
    purchasable_qty: number;
    new_item: boolean;
    apparel: boolean;
    handling: number;
    no_free_shipping: false;
    can_buy_multiple_with_limit: number;
    non_eu_blocked: boolean;
    russia_blocked: boolean;
  }

  export type AddToCartResponse = { size_id: string; in_stock: boolean }[];

  export interface CheckoutResponse {
    status:
      | 'paid'
      | 'failed'
      | 'dup'
      | 'outOfStock'
      | 'queued'
      | '404'
      | '500'
      | 'cca'
      | 'cardinal_queued';
    slug?: string;
    error?: string;
    id?: string;
    acs_url?: string;
    page?: string;
    info?: {
      billing_name: string;
      email: string;
      purchases: Purchase[];
      item_total: number;
      shipping_total: number;
      tax_total: number;
      total: number;
      store_credit: 0;
      discount_total: 0;
      created_at: string;
      vat_discout: 0;
      manual_review: boolean;
    };
  }
}
