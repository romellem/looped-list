import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const commonConfig = {
	input: 'src/index.js',
	output: {
		name: 'looped-list',
		sourcemap: true,
	},
	plugins: [
		resolve(),
		commonjs(),
	],
};

// ESM config
const esmConfig = Object.assign({}, commonConfig);
esmConfig.output = Object.assign({}, commonConfig.output, {
	file: 'lib/esm/looped-list.esm.js',
	format: 'esm',
});

// ESM prod config
const esmProdConfig = Object.assign({}, esmConfig);
esmProdConfig.output = Object.assign({}, esmConfig.output, {
	file: 'lib/esm/looped-list.esm.min.js',
	sourcemap: false,
});
esmProdConfig.plugins = [...esmConfig.plugins, terser()];

// CJS config
const cjsConfig = Object.assign({}, commonConfig);
cjsConfig.output = Object.assign({}, commonConfig.output, {
	file: 'lib/cjs/looped-list.js',
	format: 'cjs',
});
cjsConfig.plugins = [
	...commonConfig.plugins,
	babel({
		babelHelpers: 'bundled',
		exclude: 'node_modules/**',
	}),
];

let configurations = [];

// prettier-ignore
configurations.push(
	esmConfig,
	esmProdConfig,
	cjsConfig,
);

for (let configuration of configurations) {
	configuration.plugins.push(filesize({ showMinifiedSize: false }));
}

export default configurations;
