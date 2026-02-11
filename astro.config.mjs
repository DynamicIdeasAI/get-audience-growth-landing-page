import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  site: process.env.SITE_URL || 'https://getaudiencegrowth.com',

  env: {
    schema: {
      SITE_URL: envField.string({ context: 'server', access: 'public', optional: true }),
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_FORM_ENDPOINT: envField.string({ context: 'server', access: 'secret', optional: true }),
      NEWSLETTER_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_SITE_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
      BING_SITE_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },

  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],

  vite: {
    resolve: {
      alias: {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
    plugins: [tailwindcss()],
    // Mark native modules as external for OG image generation
    ssr: {
      external: ['@resvg/resvg-js'],
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },

  security: {
    checkOrigin: true,
    csp: {
      scriptDirective: {
        resources: [
          "'self'",
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
        ],
      },
      styleDirective: {
        resources: [
          "'self'",
        ],
      },
      directives: [
        "font-src 'self'",
        "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
        "img-src 'self' data: https://www.googletagmanager.com https://i.pravatar.cc https://www.southwellmedia.com",
      ],
    },
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
