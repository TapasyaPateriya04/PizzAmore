import path from 'path';

export default {
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, 'src/components'), // Alias @components to src/components
      // eslint-disable-next-line no-undef
      '@pages': path.resolve(__dirname, 'src/pages'),           // Alias @pages to src/pages
      // eslint-disable-next-line no-undef
      '@styles': path.resolve(__dirname, 'src/styles'),         // Alias @styles to src/styles
      // eslint-disable-next-line no-undef
      '@assets': path.resolve(__dirname, 'src/assets'),         // Alias @assets to src/assets
    },
    server: {
      historyApiFallback: true,
    },
  },
  
};
