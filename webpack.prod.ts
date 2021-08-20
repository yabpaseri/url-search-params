import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common";

const config = merge<Configuration>(common, {
	mode: 'production',
});
export default config;