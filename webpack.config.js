// module.exports = {
//   entry: './client/index.js', // the starting point for our program
//   output: {
//     path: __dirname + '/public', // the absolute path for the directory where we want the output to be placed
//     filename: 'bundle.js' // the name of the file that will contain our output - we could name this whatever we want, but bundle.js is typical
//   },
//   devtool: "source-map",
// }

const LiveReloadPlugin = require('webpack-livereload-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
   module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  // When we're in development, we can use this handy live-reload plugin
  // to refresh the page for us every time we make a change to our client-side
  // files. It's like `nodemon` for the front end!
  plugins: isDev ? [new LiveReloadPlugin({appendScriptTag: true})] : []
}
