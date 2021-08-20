import { createContext, useState } from "react";
import log from "../util/log";
import { ConfigParams, DEFAULT_CONFIG_PARAMS, Mode } from "../util/storage";

// keys
const SET_WIDTH = "setWidth";
const SET_HEIGHT = "setHeight";
const SET_MODE = "setMode";
const SET_DECODE = "setDecode";
const SET_INCLUDE = "setInclude";
const SET_EXCLUDE = "setExclude";

export type TConfigContext = ConfigParams & {
	[SET_WIDTH]: (width: number) => void,
	[SET_HEIGHT]: (height: number) => void,
	[SET_MODE]: (mode: Mode) => void,
	[SET_DECODE]: (decode: boolean) => void,
	[SET_INCLUDE]: (include: string[]) => void,
	[SET_EXCLUDE]: (exclude: string[]) => void,
}

const empty = <T,>(v: T) => log("CALLED EMPTY METHOD.", v);

const DEFAULT_CONFIG_CONTEXT: TConfigContext = {
	[SET_WIDTH]: empty,
	[SET_HEIGHT]: empty,
	[SET_MODE]: empty,
	[SET_DECODE]: empty,
	[SET_INCLUDE]: empty,
	[SET_EXCLUDE]: empty,
	...DEFAULT_CONFIG_PARAMS,
}

export const useConfigContext = (): TConfigContext => {
	const [width, setWidth] = useState(DEFAULT_CONFIG_CONTEXT.width);
	const [height, setHeight] = useState(DEFAULT_CONFIG_CONTEXT.height);
	const [mode, setMode] = useState(DEFAULT_CONFIG_CONTEXT.mode);
	const [decode, setDecode] = useState(DEFAULT_CONFIG_CONTEXT.decode);
	const [include, setInclude] = useState(DEFAULT_CONFIG_CONTEXT.include);
	const [exclude, setExclude] = useState(DEFAULT_CONFIG_CONTEXT.exclude);
	return { width, setWidth, height, setHeight, mode, setMode, decode, setDecode, include, setInclude, exclude, setExclude }
}

/**
 * 使いたいところで
 * const config_ctx = useConfigContext();
 * <ConfigContext value={config_ctx} />
 * 
 * 子要素では
 * const config_ctx = useContext(ConfigContext);
 */
export const ConfigContext = createContext(DEFAULT_CONFIG_CONTEXT);