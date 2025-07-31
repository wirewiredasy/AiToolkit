// Build optimization configuration
export const optimizeDeps = {
  include: [
    'react',
    'react-dom',
    'wouter',
    '@tanstack/react-query',
    'clsx',
    'tailwind-merge',
    'class-variance-authority'
  ],
  exclude: [
    '@replit/vite-plugin-cartographer'
  ]
};

export const buildOptimization = {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        router: ['wouter'],
        ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        query: ['@tanstack/react-query'],
        utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
      },
      assetFileNames: 'assets/[name].[hash][extname]',
      chunkFileNames: 'assets/[name].[hash].js',
      entryFileNames: 'assets/[name].[hash].js'
    }
  },
  target: 'esnext',
  cssCodeSplit: true,
  assetsInlineLimit: 4096,
  chunkSizeWarningLimit: 1000,
  minify: 'terser',
  sourcemap: false
};