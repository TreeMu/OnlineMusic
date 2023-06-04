const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: process.env.BASE_URL,
  devServer: {
    open:true,
    host: 'localhost',
    port: 8081,
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,
        pathRewrite:{
          "^/api":""
        },
      },
    },
  }
})
