import { Button, createStyles, Dialog, IconButton, makeStyles, Theme } from "@material-ui/core";
import { Settings as SettingsIcon } from "@material-ui/icons";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ConfigContext } from "../../common/config-context";
import { DecodeCheckbox } from "../../common/decode-checkbox";
import { Mode } from "../../util/storage";
import { ModeSelect } from "../../common/mode-select";
import { FilterWords } from "../../common/filter-words";

const useStyles = makeStyles((theme: Theme) => createStyles({
	dialog: {
		padding: "15px",
		maxWidth: "none",
		width: "100%",
		overflowY: "hidden",
	},
	buttons: {
		marginTop: "15px",
		display: "flex",
		justifyContent: "flex-end",
		"& > .MuiButton-root:nth-child(n+2)": {
			marginLeft: "5px",
		},
	},
}))

export const ConfigDialog = React.memo(() => {
	const css = useStyles();
	const config_ctx = useContext(ConfigContext);

	// 開閉系
	const [isOpen, setOpen] = useState(false);
	const open = useCallback(() => setOpen(true), []);
	const close = useCallback(() => setOpen(false), []);

	// open時の値を保持(cancel時に戻すため)
	const old_mode = useRef<Mode>("none");
	const old_decode = useRef<boolean>(true);
	const old_include = useRef<string[]>([]);
	const old_exclude = useRef<string[]>([]);
	useEffect(() => {
		if (isOpen) {
			old_mode.current = config_ctx.mode;
			old_decode.current = config_ctx.decode;
			old_include.current = config_ctx.include.concat();
			old_exclude.current = config_ctx.exclude.concat();
		}
	}, [isOpen]);

	const cancel = useCallback(() => {
		close();
		// modelが閉じ切った後に値を戻したい。もっといい方法ないのかな？
		setTimeout(() => {
			config_ctx.setMode(old_mode.current);
			config_ctx.setDecode(old_decode.current);
			config_ctx.setInclude(old_include.current);
			config_ctx.setExclude(old_exclude.current);
		}, 225);
	}, []);

	return (
		<>
			<IconButton size="small" color="inherit" onClick={open}>
				<SettingsIcon />
			</IconButton>
			<Dialog open={isOpen} classes={{ paper: css.dialog }} keepMounted>
				<DecodeCheckbox />
				<ModeSelect />
				<FilterWords />
				<div className={css.buttons}>
					<Button onClick={cancel} variant="outlined">cancel</Button>
					<Button onClick={close} variant="outlined">ok</Button>
				</div>
			</Dialog>
		</>
	);
});