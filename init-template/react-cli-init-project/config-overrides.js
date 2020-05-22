const { override, fixBabelImports } = require('customize-cra'); //addWebpackAlias
// const path = require('path');

// function resolve(dir) {
//   return path.join(__dirname, '/', dir)
// }
module.exports = override(
  // addWebpackAlias({'@': resolve('src')}),
  fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    })

);
