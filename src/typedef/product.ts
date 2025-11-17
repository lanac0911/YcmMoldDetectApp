export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number; // 商品 ID
  name: string; // 名稱
  slug: string; // URL slug
  permalink: string; // 商品網址

  price: string; // 顯示價格 (string 因為 Woo API 回傳字串)
  regular_price: string; // 原價
  sale_price: string; // 特價
  on_sale: boolean; // 是否特價中

  description: string; // 商品完整描述（HTML）
  short_description: string; // 商品簡短描述（HTML）

  images: ProductImage[]; // 圖片
  categories: ProductCategory[]; // 所屬分類

  stock_status: 'instock' | 'outofstock' | 'onbackorder'; // 庫存狀態

  date_created: string;
  date_modified: string;
}
