import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { Assignment as AssignmentIcon } from "@material-ui/icons";
import { useSnackbar, VariantType } from "notistack";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: "flex",
		margin: "10px",
		"& > .MuiButton-root": {
			padding: "2px",
			minWidth: "30px",
			width: "30px",
			marginLeft: "5px",
			"& > .MuiButton-label": {
				width: "100%",
				height: "100%",
				"& > .MuiSvgIcon-root": {
					width: "100%",
					height: "100%",
				},
			},
		},
	},
	text: {
		flex: 1,
		"& > .MuiInputBase-root": {
			height: "30px",
			"& > .MuiInputBase-input": {
				padding: "0 0 0 14px",
			},
		},
	},
}));

export type TContentItemProps = {
	value: string,
}

export const ContentItem = React.memo((props: TContentItemProps) => {
	const css = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const callEnqueueSnackbar = (message: string, type: VariantType | undefined, duration: number | undefined) => {
		enqueueSnackbar(message, {
			variant: type,
			autoHideDuration: duration, // undefined = 3000 だったかな
		});
	}
	const clipboard = async () => {
		try {
			await navigator.clipboard.writeText(props.value);
			callEnqueueSnackbar("Copied to clipboard", undefined, 1500);
		} catch (error) {
			callEnqueueSnackbar("Failed to copy to clipboard", "error", undefined);
		}
	}

	return (
		<div className={css.root}>
			<TextField
				className={css.text}
				value={props.value}
				variant="outlined"
			/>
			<Button size="small" onClick={clipboard} variant="outlined" title="Copy">
				<AssignmentIcon />
			</Button>
		</div>
	);
});