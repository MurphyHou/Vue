const path = require("path")
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require("autoprefixer")
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    publicPath: './',
    //publicPath: process.env.NODE_ENV === 'production' ? 'https://www.xxxx.com'
    outputDir: 'dist',
    //放置生成的静态资源(js、css、img、fonts)的目录。
    assetsDir: 'static',
    indexPath: 'index.html',
    filenameHashing: true,
    //是否保存时候使用 eslint-loder进行检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的 Vue 构建版本。
    runtimeCompiler: false,
    // 生产环境的 source map
    productionSourceMap: false,
    crossorigin: "anonymous", //浏览器跨域安全相关

    //配置css
    css: {
        /* extract: IS_PROD,
        requireModuleExtension: true, // 去掉文件名中的 .module
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 75,
                        propList: ['*'],
                    })
                ],
            },
        } */
        loaderOptions: {
            postcss: {
                plugins: [
                    require("autoprefixer")({
                        // 配置使用 autoprefixer
                        overrideBrowserslist: ["last 15 versions"]
                    }),
                    require("postcss-pxtorem")({
                        rootValue: 37.5, // 换算的基数 vant是基准尺寸是375，如果要保持vant的原有样式就必须是37.5配置，如果设计图是750，请除以2再写样式。
                        // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
                        //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                        selectorBlackList: ["ig"],
                        propList: ["*"],
                        //exclude: /node_modules/
                        exclude: /node_modules|folder_name/i
                    })
                ]
            }
        }
    },

    //chainWebpack是一个函数，允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: (config) => {
        // 配置别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'));

        //压缩图片  npm i -D image-webpack-loader
        config.module
            .rule("images")
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                optipng: {
                    enabled: false
                },
                pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4
                },
                gifsicle: {
                    interlaced: false
                },
                webp: {
                    quality: 75
                }
            });

        config.optimization.minimizer('terser').tap((args) => {
            // 去除生产环境console
            args[0].terserOptions.compress.drop_console = true
            return args
        })
    },
    configureWebpack: config => {
        // 开启 gzip 压缩 npm i -D compression-webpack-plugin
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,

    devServer: {
        host: '0.0.0.0',
        port: 8070, // 端口号
        https: false, // https:{type:Boolean}
        hotOnly: false, //编译失败不刷新页面
        open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
        // 配置多个代理
        proxy: {
            '/api': {
                target: 'https://www.mock.com',
                ws: true, // 代理的WebSockets
                changeOrigin: true, // 允许websockets跨域
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
}