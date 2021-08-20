import { createStyles, IconButton, makeStyles, TextField, Theme } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { ConfigContext } from "./config-context";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		width: "100%",
	}
}));

export const FilterInput = React.memo(() => {
	const css = useStyles();
	const config_ctx = useContext(ConfigContext);

	const [value, setValue] = useState("");
	const [error, setError] = useState(false);
	const error_msg = useMemo(() => error ? "Already exists." : "", [error]);

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

	const add = useCallback(() => {
		if (filter.indexOf(value) === -1) {
			const next = filter.concat([value]);
			setFilter(next);
			setValue("");
			setError(false);
		} else {
			setError(true);
		}
	}, [value, filter, setFilter]);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		setValue(e.target.value);
	}, []);
	const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" && value.length !== 0) add();
	}, [value]);

	return (
		<TextField
			className={css.root}
			value={value}
			placeholder="Enter the key to use for filtering"
			error={error}
			helperText={error_msg}
			onChange={onChange}
			onKeyPress={onKeyPress}
			InputProps={{
				endAdornment:
					<IconButton onClick={add} size="small" disabled={error || filter.length === 0}>
						<AddIcon />
					</IconButton>
			}}
		/>
	);
});