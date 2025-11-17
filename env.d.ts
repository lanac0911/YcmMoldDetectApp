declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL_PREFIX: string;
    WOO_CONSUMER_KEY: string;
    WOO_CONSUMER_SECRET: string;
    OPENAI_API_KEY: string;
  }

  const Config: NativeConfig;
  export default Config;
}
