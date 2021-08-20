import { createStyles, InputAdornment, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: "flex",
	},
	caption: {
		display: "flex",
		alignItems: "flex-end",
		marginRight: "5px",
		userSelect: "none",
		"&:after": {
			content: "':'",
		},
	},
	input: {
		textAlign: "end",
	},
}));

export type TSizeFieldProps = {
	caption: string,
	value: number,
	onChange: (v: number) => void,
	default: number,
}

export const SizeField = React.memo((props: TSizeFieldProps) => {
	const css = useStyles();
	const value = useRef(nanTo(parsePositiveInt(props.value), props.default));
	const [raw, setRaw] = useState(`${nanTo(parsePositiveInt(props.value), props.default)}`);
	const error = useMemo(() => {
		const num = parsePositiveInt(raw);
		return Number.isNaN(num);
	}, [raw]);

	// props.valueの変化は最優先。
	useEffect(() => {
		value.current = nanTo(parsePositiveInt(props.value), props.default);
		setRaw(`${nanTo(parsePositiveInt(props.value), props.default)}`);
	}, [props.value]);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const r = e.target.value;
		setRaw(r);
		const n = parsePositiveInt(r);
		if (!Number.isNaN(n)) value.current = n;
	}, []);

	const onBlur = useCallback(() => {
		props.onChange(value.current);
		if (error) {
			setRaw(String(value.current));
		}
	}, [value, error]);

	return (
		<div className={css.root}>
			<Typography className={css.caption} variant="subtitle1">
				{props.caption}
			</Typography>
			<TextField
				required
				error={error}
				value={raw}
				type="Number"
				onChange={onChange}
				onBlur={onBlur}
				inputProps={{ min: 1 }}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end" disablePointerEvents>
							px
						</InputAdornment>
					),
					classes: { input: css.input }
				}}
			/>
		</div>
	);
});

const parsePositiveInt = (value: string | number): number => {
	if (/^[-+]?(\d+)$/.test(`${value}`)) {
		const n = Number(`${value}`);
		return (0 < n) ? n : NaN;
	} else {
		return NaN;
	}
}
const nanTo = (num: number, ifNaN: number): number => {
	return Number.isNaN(num) ? ifNaN : num;
}