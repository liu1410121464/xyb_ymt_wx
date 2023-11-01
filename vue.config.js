// 20230306 devx add 文件路径添加时间戳

module.exports = {
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    devServer: {
        proxy: {
            '/': { // 这里最好有一个 /
                target: process.env.VUE_APP_BASE_HOST, // 后台接口域名
                ws: false, // 如果要代理 websockets，配置这个参数
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    },

    publicPath: './',
    // outputDir: process.env.NODE_ENV === 'staging' ? 'dist' : 'prod', // 配置这个地方
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    filenameHashing: false // 打包的时候用时间戳来确定文件
}