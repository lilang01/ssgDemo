module.exports = {
    publicPath: './',
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                // secure: false,          // 设置支持https协议的代理
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    // css: {
    //     loaderOptions: {
    //         css: {
    //             publicPath: '../../',
    //         }
    //     }
    // },
    productionSourceMap: false
}