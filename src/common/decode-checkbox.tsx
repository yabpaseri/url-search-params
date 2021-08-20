import { Checkbox, createStyles, FormControlLabel, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useContext } from "react";
import { useCommonStyles } from "./common-styles";
import { ConfigContext } from "./config-context";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		width: "fit-content",
	},
}));

export const DecodeCheckbox = React.memo(() => {
	const css = useStyles();
	const ccss = useCommonStyles();
	const config_ctx = useContext(ConfigContext);

	const onChange = useCallback(() => {
		config_ctx.setDecode(!config_ctx.decode);
	}, [config_ctx.decode]);

	return (
		<FormControlLabel
			className={css.root}
			label={<Typography className={ccss.select_none}>Decode the parameters</Typography>}
			control={<Checkbox checked={config_ctx.decode} color="primary" onChange={onChange} />}
		/>
	);
});