const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const isDev = process.env.NODE_ENV === "development";

const postcssOpts = {
    postcssOptions: {
        plugins: [
            tailwindcss("./tailwind.config.js"),
            autoprefixer,
        ],
    },
};

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: "./src/index.tsx",
    },
    output: {
        path: `${__dirname}/build`,
        publicPath: "/",
        filename: (pathData) => {
            return isDev
                ? "[name].js"
                : "[name].[chunkhash].js";
        },
        chunkFilename: isDev
            ? "[name].js"
            : "[name].[chunkhash].js",
        assetModuleFilename: "asset/[contenthash][ext][query]",
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: `${__dirname}/src/index.html`,
            chunks: ["index"],
            favicon: `${__dirname}/src/asset/favicon/favicon-48x48.png`,
            inject: true,
        }),
        new WebpackPwaManifest({
            name: "sve-helper",
            short_name: "sve-helper",
            description: "sve help app",
            background_color: "#FFF",
            display: "standalone",
            start_url: "/",
            inject: true,
            icons: [
                {
                    src: `${__dirname}/src/asset/favicon/favicon-48x48.png`,
                    sizes: [48], // multiple sizes
                    destination: "asset/favicon",
                },
                {
                    src: `${__dirname}/src/asset/favicon/favicon-256x256.png`,
                    sizes: [72, 96, 128, 256], // multiple sizes
                    destination: "asset/favicon",
                },
            ],
        }),
        !isDev && new WorkboxPlugin.InjectManifest({
            swSrc: `${__dirname}/src/sw.js`,
            swDest: "sw.js",
        }),
        !isDev && new CleanWebpackPlugin(),
        isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),

    module: {
        rules: [
            {
                test: /\.(js|ts(x?))$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: postcssOpts,
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: postcssOpts,
                    },
                ],
            },
            {
                test: /\.css$/i,
                include: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset",
            },
        ],
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": `${__dirname}/src`,
        },
    },

    devServer: {
        open: true,
        port: 8090,
        historyApiFallback: true,

        proxy: {
            "/api/**": {
                target: "http://127.0.0.1:8080",
                secure: false,
            },
        },
    },
};
