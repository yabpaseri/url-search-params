import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		textAlign: "center",
		margin: "20px",
		userSelect: "none",
	},
}));

export const NoContents = React.memo(() => {
	const css = useStyles();
	return (
		<Typography className={css.root} variant="h6" color="textSecondary">
			Query Not Found
		</Typography>
	);
});