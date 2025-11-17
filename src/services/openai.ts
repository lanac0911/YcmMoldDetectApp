import { OpenAI } from 'openai';
import Config from 'react-native-config';

export const openai = new OpenAI({
  apiKey: Config.OPENAI_API_KEY,
});
