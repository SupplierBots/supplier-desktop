module.exports = {
  babel: {
    plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components'],
  },
  webpack: {
    configure: webpackConfig => {
      webpackConfig.target = 'node-webkit';
      webpackConfig.optimization.splitChunks = false;
      webpackConfig.optimization.runtimeChunk = false;
      return webpackConfig;
    },
  },
};
