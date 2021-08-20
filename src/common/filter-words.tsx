import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { useContext } from "react";
import { ConfigContext } from "./config-context";
import { FilterInput } from "./filter-input";
import { FilterList } from "./filter-list";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		padding: "5px",
		marginTop: "10px",
		width: "100%",
		maxWidth: "none",
		display: "flex",
		flexDirection: "column",
		overflowY: "hidden",
	}
}));

export const FilterWords = React.memo(() => {
	const css = useStyles();
	const config_ctx = useContext(ConfigContext);

	return (config_ctx.mode === "none") ? <></> : (
		<Paper className={css.root} variant="outlined">
			<FilterInput />
			<FilterList />
		</Paper>
	);
});