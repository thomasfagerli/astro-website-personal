import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    buildOptions: {
        // Disable automatic page prefetching
        pageStrategy: 'none',
      },
});
