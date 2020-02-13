module.exports = {
  babel: {
    plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components'],
  },
  webpack: {
    configure: webpackConfig => {
      webpackConfig.target = 'node-webkit';
      webpackConfig.optimization.splitChunks = false;
      webpackConfig.optimization.runtimeChunk = false;
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        {
          // regex for the files that are problematic
          test: /puppeteer-extra\/dist\/index\.esm\.js/,
          loader: 'string-replace-loader',
          options: {
            // match a require function call where the argument isn't a string
            // also capture the first character of the args so we can ignore it later
            search: 'require[(]([^\'"])',
            // replace the 'require(' with a '__non_webpack_require__(', meaning it will require the files at runtime
            // $1 grabs the first capture group from the regex, the one character we matched and don't want to lose
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
