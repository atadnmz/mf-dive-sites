const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies: deps } = require('./package.json');
const { MFLiveReloadPlugin } = require('@module-federation/fmr');
module.exports = {
  entry: './src/index.tsx',
  output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Divesitesapp',
      filename: 'remoteEntry.js',
      exposes: {
        './Divesitesapp': './src/App.tsx',
      },
      shared: [
        {
          ...deps,
          react: { requiredVersion: deps.react, singleton: true },
          'react-dom': {
            requiredVersion: deps['react-dom'],
            singleton: true,
          },
        },
      ],
    }),
    new MFLiveReloadPlugin({
      port: 8082, // the port your app runs on
      container: 'Divesitesapp', // the name of your app, must be unique
      standalone: true, // false uses chrome extention
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', (stats) => {
          console.log('Compile is done !');
          setTimeout(() => {
            process.exit(0);
          });
        });
      },
    },
  ],
};
