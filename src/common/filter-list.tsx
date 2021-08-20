import { Chip, createStyles, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useContext, useMemo } from "react";
import { useCommonStyles } from "./common-styles";
import { ConfigContext } from "./config-context";


const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		marginTop: "10px",
		minHeight: "48px",
		overflowY: "auto",
		display: "flex",
		flexWrap: "wrap",
		listStyle: "none",
		padding: theme.spacing(0.5),
		"& .MuiChip-root": {
			margin: theme.spacing(0.5),
		},
		"& .MuiTypography-root": {
			display: "flex",
			alignItems: "center",
			paddingLeft: "5px",
		},
	},
}));

export const FilterList = React.memo(() => {
	const css = useStyles();
	const ccss = useCommonStyles();
	const config_ctx = useContext(ConfigContext);

	const filter = useMemo(() => {
		switch (config_ctx.mode) {
			case "include":
				return config_ctx.include;
			case "exclude":
				return config_ctx.exclude;
			default:
				return [];
		}
	}, [config_ctx.mode, config_ctx.include, config_ctx.exclude]);
	const setFilter = useMemo(() => {
		switch (config_ctx.mode) {
			case "include":
				return config_ctx.setInclude;
			case "exclude":
				return config_ctx.setExclude;
			default:
				return () => { };
		}
	}, [config_ctx.mode, config_ctx.setInclude, config_ctx.setExclude]);

	const remove = useCallback((v: string) => {
		const tmp = filter.concat();
		const idx = filter.indexOf(v);
		if (idx !== -1) tmp.splice(idx, 1);
		setFilter(tmp);
	}, [filter, setFilter]);

	return (
		<Paper component="ul" className={css.root} variant="outlined">
			{
				(filter.length === 0) ? (
					<Typography className={ccss.select_none} color="textSecondary">
						{
							(config_ctx.mode === "include") ? (
								"No Include Filter"
							) : (config_ctx.mode === "exclude") ? (
								"No Exclude Fiter"
							) : (
								"No Filter"
							)
						}
					</Typography>
				) : (
					filter.map((v, i) => (
						<li key={i}>
							<Chip label={v} onDelete={() => remove(v)} />
						</li>
					))
				)
			}
		</Paper>
	);
});