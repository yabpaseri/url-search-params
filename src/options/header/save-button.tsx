import { IconButton } from "@material-ui/core";
import { Save as SaveIcon } from "@material-ui/icons";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useCallback, useContext } from "react";
import { ConfigContext } from "../../common/config-context";
import log from "../../util/log";
import { setConfigParams } from "../../util/storage";

export const SaveButton = React.memo(() => {
	return (
		<SnackbarProvider maxSnack={3}>
			<InSaveButton />
		</SnackbarProvider>
	);
});

const InSaveButton = React.memo(() => {
	const { enqueueSnackbar } = useSnackbar();
	const config_ctx = useContext(ConfigContext);
	const save = useCallback(() => {
		log("saving...", config_ctx);
		return setConfigParams({
			width: config_ctx.width,
			height: config_ctx.height,
			mode: config_ctx.mode,
			decode: config_ctx.decode,
			include: config_ctx.include,
			exclude: config_ctx.exclude,
		}).then(() => {
			const now = new Date().toLocaleString();
			enqueueSnackbar(`Saved options! (${now})`, { autoHideDuration: 1500 });
		}).catch((reason) => {
			log(reason);
			const now = new Date().toLocaleString();
			enqueueSnackbar(`Failed to save options. ${now}`, { variant: "error" });
		});
	}, [config_ctx.width, config_ctx.height, config_ctx.mode, config_ctx.decode, config_ctx.include, config_ctx.exclude]);

	return (
		<IconButton color="inherit" size="small" title="Save" onClick={save}>
			<SaveIcon />
		</IconButton>
	);
});