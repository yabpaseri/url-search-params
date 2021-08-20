import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		textDecoration: "underline",
		userSelect: "none",
	},
}));

export type TOptionCaptionProps = {
	children: string,
}

export const OptionCaption = React.memo((props: TOptionCaptionProps) => {
	const css = useStyles();

	return (
		<Typography className={css.root} variant="h6">
			{props.children}
		</Typography>
	);
});