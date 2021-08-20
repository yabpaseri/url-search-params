import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useContext } from "react";
import { Mode } from "../util/storage";
import { useCommonStyles } from "./common-styles";
import { ConfigContext } from "./config-context";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		width: "100%",
	},
}));

export const ModeSelect = React.memo(() => {
	const css = useStyles();
	const ccss = useCommonStyles();
	const config_ctx = useContext(ConfigContext);

	const onChange = useCallback((e: React.ChangeEvent<{ value: unknown }>) => {
		config_ctx.setMode(e.target.value as Mode);
	}, []);

	return (
		<FormControl className={css.root}>
			<InputLabel shrink>
				<Typography className={ccss.select_none}>Filter</Typography>
			</InputLabel>
			<Select value={config_ctx.mode} onChange={onChange}>
				<MenuItem value="none">None</MenuItem>
				<MenuItem value="include">Include</MenuItem>
				<MenuItem value="exclude">Exclude</MenuItem>
			</Select>
		</FormControl>
	);
});