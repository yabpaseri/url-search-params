import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";

const config = merge<Configuration>(common, {
	mode: 'development',
	devtool: 'inline-source-map',
});
export default config;