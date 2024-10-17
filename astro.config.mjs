// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; // Import the React integration

export default defineConfig({
  integrations: [react()], // Use react() to enable React support
  devToolbar: {
    enabled: false,
  },
});
