import path from "path";
import sveltePreprocess from "svelte-preprocess";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import miniCssExtractPlugin from 'mini-css-extract-plugin';
// import optimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

interface Argv {
  mode?: "production" | "development";
}

const tsRule = {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: {
        loader: "ts-loader",
        options: {
            compilerOptions: {
                noEmit: false,
                module: "es6",
            },
        },
    },
};

function electronMain(_env: unknown, argv: Argv): webpack.Configuration {
    const mode = argv.mode || "development";
    return {
        name: "electronMain",
        entry: "./src/discore/main/main.ts",
        mode,
        cache: {
            type: "filesystem",
        },
        externals: ["fsevents"],
        target: "electron-main",
        externalsPresets: {
            electronMain: true,
            node: true
        },
        module: {
            rules: [tsRule],
        },
        resolve: {
            extensions: [".ts", ".js"],
        },
        output: {
            filename: "main.comp.js",
            path: path.resolve(__dirname, "out/native"),
        },
        optimization: {
            minimize: true,
        },
    };
}

function frontend(_env: unknown, argv: Argv): webpack.Configuration {
    const mode = argv.mode || "development";
    const isProduction = mode === "production";
    return {
        name: "frontend",
        entry: [
            "./public/css/colors.css",
            "./public/css/global.css",
            "./public/css/typography.css",
            "./src/ui/index.ts"
        ],
        mode,
        devtool: isProduction ? "source-map" : "eval-source-map",
        cache: {
            type: "filesystem",
        },
        performance: {
            hints: false,
        },
        target: "web",
        module: {
            rules: [
                {
                    test: /\.svelte$/,
                    use: {
                        loader: "svelte-loader",
                        options: {
                            compilerOptions: { dev: !isProduction },
                            preprocess: sveltePreprocess({
                                typescript: {
                                    compilerOptions: {
                                        module: "es6",
                                    },
                                },
                            }),
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: miniCssExtractPlugin.loader
                        },
                        'css-loader',
                    ]
                },
                tsRule,
            ],
        },
        resolve: {
            alias: {
                svelte: path.resolve("node_modules", "svelte")
            },
            extensions: [".svelte", ".ts", ".js"],
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "out/public"),
        },
        plugins: [
            new miniCssExtractPlugin({
                filename: '[name].css'
            }),
            new webpack.ProvidePlugin({
                process: "process",
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                meta: {
                    "Content-Security-Policy": {
                        "http-equiv": "Content-Security-Policy",
                        content: isProduction
                            ? "script-src 'self'"
                            : "script-src 'self' 'unsafe-eval'",
                    },
                },
            }),
        ],
    };
}

export default [frontend, electronMain];