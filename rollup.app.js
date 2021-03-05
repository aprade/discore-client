import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
// import typescript from "@rollup/plugin-typescript";
import autoPreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/ui/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
        json(),
		svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
            },
            preprocess: autoPreprocess(),
			// // we'll extract any component CSS out into
			// // a separate file - better for performance
			// css: css => {
			// 	css.write('public/bundle.css');
			// }
		}),

        css({ output: "bundle.css" }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
            preferBuiltins: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),

        // typescript({
        //     // See https://github.com/rollup/plugins/issues/272
        //     noEmitOnError: production,
        // }),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	},

    // Skip certain warnings originated by third-party libraries
    onwarn: function (warning) {
        if (
            warning.code === "THIS_IS_UNDEFINED" &&
            warning.id.includes("node_modules/@ethersproject/")
        ) return;

        if (
            warning.code === "CIRCULAR_DEPENDENCY" &&
            warning.importer.includes("node_modules")
        ) return;

        // Pass on any other warnings
        console.warn(warning.message);
    }
};