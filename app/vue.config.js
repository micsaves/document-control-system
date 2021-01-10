var webpack = require('webpack')

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: '9000',
    public: '0.0.0.0:9000',
    disableHostCheck: true,
    noInfo: true
  },
  chainWebpack: config =>{
    config
      .plugin('provide')
      .use(webpack.ProvidePlugin,[{ $: 'jquery', jQuery: "jquery" }])
   
    }
  
}
