import { CssBaseline } from "@material-ui/core";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ConfigContext, useConfigContext } from "../common/config-context";
import { getConfigParams } from "../util/storage";
import { Contents } from "./contents/contents";
import { Header } from "./header/header";

const Root = () => {
	const config_ctx = useConfigContext();
	// マウント時にchrome.storage.localから設定を得て、contextに入れ込む。
	useEffect(() => {
		getConfigParams().then(value => {
			config_ctx.setMode(value.mode);
			config_ctx.setDecode(value.decode);
			config_ctx.setInclude(value.include);
			config_ctx.setExclude(value.exclude);
		});
	}, []);

	return (
		<ConfigContext.Provider value={config_ctx}>
			<CssBaseline />
			<Header />
			<Contents />
		</ConfigContext.Provider>
	);
}

ReactDOM.render(
	<Root />,
	document.getElementById('root')
);