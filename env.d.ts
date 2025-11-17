declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL_PREFIX: string;
    WOO_CONSUMER_KEY: string;
    WOO_CONSUMER_SECRET: string;
  }

  const Config: NativeConfig;
  export default Config;
}
