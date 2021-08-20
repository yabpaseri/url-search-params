import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { ConfigForm } from "./config-form";
import { SizeForm } from "./size-form";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		padding: "20px",
		"& > *:nth-child(n+2)": {
			marginTop: "20px",
		},
	},
}));

export const Contents = React.memo(() => {
	const css = useStyles();
	return (
		<div className={css.root}>
			<SizeForm />
			<ConfigForm />
		</div>
	);
});