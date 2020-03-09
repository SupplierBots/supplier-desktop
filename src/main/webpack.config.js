const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackMessages = require('webpack-messages');
const ENTRY_FILE = path.resolve(__dirname, 'main');
const OUTPUT_PATH = path.resolve(__dirname, '..', '..', 'public');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  bail: true,
  entry: ENTRY_FILE,
  target: 'electron-main',
  node: {
    __dirname: false,
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval' : '(none)',
  output: {
    filename: 'app.js',
    path: OUTPUT_PATH,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: 'react-dev-utils/eslintFormatter',
              eslintPath: 'eslint',

              baseConfig: {
                extends: ['eslint-config-react-app'],
              },
              ignore: false,
              useEslintrc: false,
              failOnError: true,
            },
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true,
  },
  externals: [nodeExternals()],
  plugins: [
    new WebpackMessages({
      name: 'main-process',
      logger: str => console.log(`>> ${str}`),
    }),
  ],
};
