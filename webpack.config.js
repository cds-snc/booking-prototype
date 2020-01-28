const webpack = require('webpack')
const path = require('path')
const FileListPlugin = require('./FileListPlugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  console.info('running in mode:', argv.mode)

  let config = {
    mode: argv.mode,
    entry: {
      styles: './assets/scss/app.scss',
      personal: './routes/personal/js/personal.js',
      book: './routes/book/js/book.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public/dist'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
      new FileListPlugin({ options: true }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new CleanWebpackPlugin(),
    ],
  }

  return config
}