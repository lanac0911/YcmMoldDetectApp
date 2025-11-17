// 商品圖片
export interface ProductImage {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

// 商品分類
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

// 商品品牌（Woo 可能沒有，但你的 JSON 有）
export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
}

// Woo 的 Meta Data
export interface ProductMetaData {
  id: number;
  key: string;
  value: any;
}

// WooCommerce 商品主體
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;

  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;

  type: string;
  status: string;
  featured: boolean;

  catalog_visibility: string;
  description: string; // HTML
  short_description: string; // HTML

  sku: string | null;
  price: string; // Woo 會以 string 回傳
  regular_price: string;
  sale_price: string;

  date_on_sale_from: string | null;
  date_on_sale_from_gmt: string | null;
  date_on_sale_to: string | null;
  date_on_sale_to_gmt: string | null;
  on_sale: boolean;

  purchasable: boolean;
  total_sales: number;

  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;

  external_url: string;
  button_text: string;

  tax_status: string;
  tax_class: string;

  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;

  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };

  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;

  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;

  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;

  purchase_note: string;

  categories: ProductCategory[];
  brands?: ProductBrand[];
  tags: any[];

  images: ProductImage[];
  attributes: any[];
  default_attributes: any[];
  variations: number[];
  grouped_products: any[];

  menu_order: number;
  price_html: string;

  related_ids: number[];

  meta_data: ProductMetaData[];

  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  has_options: boolean;

  post_password: string;
  global_unique_id: string | null;

  _links: {
    self: { href: string; targetHints?: any }[];
    collection: { href: string }[];
  };
}

// 標準化過後用的 API Response
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  RF: string;
}
