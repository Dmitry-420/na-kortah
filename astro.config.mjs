import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dmitry-420.github.io',
  base: '/na-kortah',
  integrations: [vue(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});