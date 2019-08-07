// vue.config.js
module.exports = {
  publicPath: process.env.VUE_APP_URL_ROOT,
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
          })
    ]
  }
}