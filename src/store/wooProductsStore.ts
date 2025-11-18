import { create } from 'zustand';
import axios from 'axios';
import { apiInstance, handleApiRequest } from '@services/apiManager';
import { WooProduct } from '@typedef/productAPI';

import { BASE_URL_PREFIX } from '@env';

let cancelTokenSource = axios.CancelToken.source();

interface WooProductsState {
  products: WooProduct[];
  loading: boolean;
  refreshing: boolean;
  nextPage: number;
  hasMoreData: boolean;
  searchKeyword: string;

  getProducts: (page: number) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const PAGE_SIZE = 3;

// -------------------------------
// 圖片的 local host -> ngrok url
// -------------------------------
export const LOCAL_PREFIX = 'https://127.0.0.1';

const normalizeWooProducts = (items: WooProduct[]): WooProduct[] => {
  return items.map(item => ({
    ...item,
    images: item.images?.map(img => ({
      ...img,
      src: img.src.replace(LOCAL_PREFIX, BASE_URL_PREFIX),
    })),
    description: item.description?.replace(LOCAL_PREFIX, BASE_URL_PREFIX),
  }));
};

export const useWooProductsStore = create<WooProductsState>((set, get) => ({
  products: [],
  loading: false,
  refreshing: false,
  nextPage: 0,
  hasMoreData: true,
  searchKeyword: '',

  // -----------------------------
  // GET 商品
  // -----------------------------
  getProducts: async (page: number) => {
    if (get().loading) return;

    set({ loading: true });

    cancelTokenSource.cancel();
    const newCancelToken = axios.CancelToken.source();
    cancelTokenSource = newCancelToken;

    const asyncRequest = () =>
      apiInstance.get('/products', {
        params: {
          page: page + 1,
          per_page: PAGE_SIZE,
          search: get().searchKeyword || undefined,
        },
        cancelToken: newCancelToken.token,
      });

    const successCallback = async (data: WooProduct[]) => {
      const normalized = normalizeWooProducts(data);

      set(state => ({
        products: [...state.products, ...normalized],
        nextPage: state.nextPage + 1,
        hasMoreData: data.length >= PAGE_SIZE,
      }));
    };

    await handleApiRequest({
      asyncRequest,
      successCallback,
      finalCallback: () => set({ loading: false }),
    });
  },

  // -----------------------------
  // Refresh
  // -----------------------------
  refreshProducts: async () => {
    set({
      products: [],
      nextPage: 0,
      hasMoreData: true,
      refreshing: true,
    });

    await get().getProducts(0);
    set({ refreshing: false });
  },
}));
