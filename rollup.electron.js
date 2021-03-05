import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import typescript from "@rollup/plugin-typescript";

const production = !process.env.ROLLUP_WATCH;

export default {
    input: "src/discore/main/main.ts",
    output: {
        sourcemap: true,
        file: "src/discore/main/main.comp.js",
        format: "cjs",
    },
    plugins: [
        commonjs(),

        typescript({
            // See https://github.com/rollup/plugins/issues/272
            noEmitOnError: production,
            module: "es6",
        }),

        // This avoids the following warning:
        //
        // (!) Unresolved dependencies
        // https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
        externals({ builtins: true, deps: true }),
    ],
}