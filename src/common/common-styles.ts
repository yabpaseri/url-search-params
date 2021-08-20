import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useCommonStyles = makeStyles((theme: Theme) => createStyles({
	select_none: {
		userSelect: "none",
	},
}));