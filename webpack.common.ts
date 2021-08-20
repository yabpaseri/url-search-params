import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

// make paths
const _src = (...s: string[]): string => path.resolve(__dirname, 'src', ...s);
const _public = (...s: string[]): string => path.resolve(__dirname, 'public', ...s);
const _dist = (...s: string[]): string => path.resolve(__dirname, 'dist', ...s);

const config: Configuration = {
	entry: {
		'../background': _src('background', 'index.ts'),
		'popup': _src('popup', 'index.tsx'),
		'options': _src('options', 'index.tsx'),
	},
	output: {
		path: _dist('js'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: false }],
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: _public('html', 'popup.html'),
			filename: _dist('html', 'popup.html'),
			inject: true,
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			template: _public('html', 'options.html'),
			filename: _dist('html', 'options.html'),
			inject: true,
			chunks: ['options'],
		}),
		new CopyPlugin({
			patterns: [
				{ from: _public('css'), to: _dist('css') },
				{ from: _public('icons'), to: _dist('icons'), globOptions: { dot: true, gitignore: true, ignore: ['**/icon.*'] } },
				{ from: _public('manifest.json'), to: _dist('manifest.json') },
			],
		}),
	],
}
export default config;