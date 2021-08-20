import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React, { useContext, useMemo } from "react";
import { ConfigContext } from "../../common/config-context";
import { ContentCaption } from "./content-caption";
import { ContentItem } from "./content-item";
import { NoContents } from "./no-contents";
import { makeSearchEntries } from "./search";

const useStyles = makeStyles((theme: Theme) => createStyles({
	snackroot: {
		width: "fit-content",
		height: "fit-content",
		minWidth: "unset",
		"& > .MuiCollapse-container": {
			paddingRight: 0,
			"& > .MuiCollapse-wrapper": {
				margin: 0,
			},
		},
	},
	snack: {
		width: "fit-content",
		height: "fit-content",
		"& > div": {
			minWidth: "unset",
		},
	},
}));

export const Contents = React.memo(() => {
	const css = useStyles();
	const config_ctx = useContext(ConfigContext);
	const search = useMemo(() => {
		return makeSearchEntries(config_ctx)
	}, [config_ctx.mode, config_ctx.decode, config_ctx.include, config_ctx.exclude]);

	return (
		<SnackbarProvider maxSnack={1} classes={{ containerRoot: css.snackroot, root: css.snack }}>
			{
				(search.length === 0) ? (
					<NoContents />
				) : (
					search.map((entry, index) => (
						<>
							<ContentCaption first={index === 0}>{entry.key}</ContentCaption>
							{/* 重複を削除してからmap */}
							{entry.values.filter((v, i, a) => a.indexOf(v) === i).map(value => (
								<ContentItem key={value} value={value} />
							))}
						</>
					))
				)
			}
		</SnackbarProvider>
	);
});