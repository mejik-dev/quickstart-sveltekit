import { createClient } from 'microgen-v3-sdk';

export const microgen = createClient({
  apiKey: import.meta.env.VITE_SVELTE_APP_MICROGEN_API_KEY,
});
