import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		margin: "0 10px -5px",
		padding: "0 0 0 5px",
		userSelect: "none",
		backgroundColor: `${theme.palette.primary.main}26`, // 26 = opacity:16%
	},
	first: {
		marginTop: "10px",
	},
}));

export type TContentCaptionProps = {
	first?: boolean,
	children: string,
}

export const ContentCaption = React.memo((props: TContentCaptionProps) => {
	const css = useStyles();
	const className = css.root + ((props.first) ? ` ${css.first}` : "");
	return (
		<Typography className={className} variant="h6">
			{props.children}
		</Typography>
	);
});