import { Grid } from "@material-ui/core";
import React from "react";
import { DecodeCheckbox } from "../../common/decode-checkbox";
import { FilterWords } from "../../common/filter-words";
import { ModeSelect } from "../../common/mode-select";
import { OptionCaption } from "./option-caption";

export const ConfigForm = React.memo(() => {
	return (
		<Grid container direction="column">
			<Grid item>
				<OptionCaption>Default Settings</OptionCaption>
			</Grid>
			<Grid item>
				<DecodeCheckbox />
			</Grid>
			<Grid item>
				<ModeSelect />
			</Grid>
			<Grid item>
				<FilterWords />
			</Grid>
		</Grid>
	);
});