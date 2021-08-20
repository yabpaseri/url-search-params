import { browser } from "webextension-polyfill-ts";

// keys
const WIDTH = "width";
const HEIGHT = "height";
const MODE = "mode";
const DECODE = "decode";
const INCLUDE = "include";
const EXCLUDE = "exclude";

export type Mode = 'none' | 'include' | 'exclude';

export type ConfigParams = {
	[WIDTH]: number,
	[HEIGHT]: number,
	[MODE]: Mode,
	[DECODE]: boolean,
	[INCLUDE]: string[],
	[EXCLUDE]: string[],
}

export const DEFAULT_CONFIG_PARAMS: ConfigParams = {
	[WIDTH]: 500,
	[HEIGHT]: 500,
	[MODE]: "none",
	[DECODE]: true,
	[INCLUDE]: [],
	[EXCLUDE]: [],
}

// 設定の保存以外にstorage使うことはないと思うけど
type All = ConfigParams;
type AllKey = keyof All;
const DEFAULT_ALL = DEFAULT_CONFIG_PARAMS;

export const init = () => {
	browser.storage.local.get(null)
		.then(exists => {
			const def: Partial<All> = {};
			(<AllKey[]>Object.keys(DEFAULT_ALL)).forEach(key => !exists[key] && (def[key] = <any>DEFAULT_ALL[key]));
			browser.storage.local.set(def);
		});
}

export const getConfigParams = async (): Promise<ConfigParams> => {
	const result = await browser.storage.local.get(Object.keys(DEFAULT_CONFIG_PARAMS));
	return <ConfigParams>result;
}

export const setConfigParams = (params: Partial<ConfigParams>): Promise<void> => {
	return browser.storage.local.set(params);
}