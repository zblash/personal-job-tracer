const svgLoader = require('./svg-loader');
const styleLoader = require('./style-loader');

module.exports = [
  ...svgLoader(),
  ...styleLoader(),
  {
    test: /\.tsx?$/,
    loader: 'babel-loader',
  },
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
      configFile: '../../tsconfig.json',
    },
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    exclude: /src\/assets\/icons/,
    include: /src\/assets\/images/,
    use: [
      'file-loader',
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true,
        },
      },
    ],
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: [/src\/assets\/icons/, /src\/assets\/images/],
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
];
