import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import sveltePreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/ui/index.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
        json(),
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
            },
		}),

        css({ output: "css/bundle.css" }),

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
		typescript({
			// See https://github.com/rollup/plugins/issues/272
			noEmitOnError: production,
			sourceMap: !production,
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};