const path = require('path');

module.exports = {
  entry: {
    kiplib: './src/kiplib.js',
    kip: './src/kip.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
