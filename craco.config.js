module.exports = {
  babel: {
    plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components'],
  },
  webpack: {
    configure: webpackConfig => {
      webpackConfig.target = 'electron-renderer';
      webpackConfig.optimization.splitChunks = false;
      webpackConfig.optimization.runtimeChunk = false;
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          // Puppeteer fix: regex for the files that are problematic
          test: /puppeteer-extra\/dist\/index\.esm\.js/,
          loader: 'string-replace-loader',
          options: {
            search: 'require[(]([^\'"])',
            replace: '__non_webpack_require__($1',
            flags: 'g',
          },
        },
        {
          test: /\.js$/,
          use: 'unlazy-loader',
        },
      ];
      return webpackConfig;
    },
  },
};
