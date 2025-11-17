import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';

export const BASE_URL_PREFIX = Config.BASE_URL_PREFIX;
const BASE_URL = `${BASE_URL_PREFIX}/wp-json/wc/v3`;

const consumer_key = Config.WOO_CONSUMER_KEY;
const consumer_secret = Config.WOO_CONSUMER_SECRET;

// ------- Types -------- //
type AsyncRequest<T> = () => Promise<AxiosResponse<T>>;
type SuccessCallback<T> = (data: T) => void | Promise<void>;
type ErrorCallback = (error: any) => void | Promise<void>;
type FinalCallback = () => void;

type WooHandleRequestOptions<T> = {
  asyncRequest: AsyncRequest<T>;
  successCallback: SuccessCallback<T>;
  errorCallback?: ErrorCallback;
  finalCallback?: FinalCallback;
  toast?: any;
  erMsg?: string;
};

// ------- Axios Instance -------- //
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: consumer_key,
    password: consumer_secret,
  },
  timeout: 15000,
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    Connection: 'keep-alive',
  },
});

// ------- API handler -------- //
export const handleApiRequest = async <T>(
  options: WooHandleRequestOptions<T>,
) => {
  const {
    asyncRequest,
    successCallback,
    errorCallback,
    finalCallback,
    toast,
    erMsg,
  } = options;

  try {
    const response = await asyncRequest();

    if (response.status >= 200 && response.status < 300) {
      await successCallback(response.data);
    }
  } catch (error) {
    errorCallback && (await errorCallback(error));

    toast?.show?.({
      description: erMsg || `WooCommerce API 錯誤：${error}`,
      placement: 'top',
    });
  } finally {
    finalCallback && finalCallback();
  }
};
