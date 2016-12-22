const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    const sourceLoader = loaders.map(function (loader) {
      let extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('style-loader', sourceLoader)
    } else {
      return ['style-loader', sourceLoader].join('!')
    }
  }

  return {
    css: generateLoaders(['css', 'postcss']),
    less: generateLoaders(['css', 'less', 'postcss', 'resolve-url']),
    sass: generateLoaders(['css', 'sass?indentedSyntax', 'postcss', 'resolve-url']),
    scss: generateLoaders(['css', 'sass', 'postcss', 'resolve-url']),
    stylus: generateLoaders(['css', 'stylus', 'postcss', 'resolve-url']),
    styl: generateLoaders(['css', 'stylus', 'postcss', 'resolve-url'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  let output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}
