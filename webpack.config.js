const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./server/config');

module.exports.mode = 'development';

module.exports.entry = [
  './client/react/index.js',
];

module.exports.output = {
  filename: './js/app.js',
  path: `${__dirname}/static`,
  publicPath: `${config.serverUrl}/`,
};

module.exports.resolve = {
  extensions: ['.js', '.jsx'],
};

module.exports.module = {
  rules: [
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader?sourceMap',
      ],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-object-rest-spread', 'transform-class-properties'],
        },
      },
    },
  ],
};

module.exports.plugins = [
  new MiniCssExtractPlugin({ filename: './css/style.css' }),
];
