import { AppBar, createStyles, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { SaveButton } from "./save-button";

const useStyles = makeStyles((theme: Theme) => createStyles({
	title: {
		flexGrow: 1,
		userSelect: "none",
	},
}));

export const Header = React.memo(() => {
	const css = useStyles();
	return (
		<AppBar position="sticky">
			<Toolbar variant="dense">
				<Typography variant="h6" className={css.title}>URL Params Parser Options</Typography>
				<SaveButton />
			</Toolbar>
		</AppBar>
	);
});