import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { ConfigContext } from "../../common/config-context";
import { OptionCaption } from "./option-caption";
import { SizeField } from "./size-field";

export const SizeForm = React.memo(() => {
	const config_ctx = useContext(ConfigContext);

	return (
		<Grid container direction="column">
			<Grid item>
				<OptionCaption>Window Size</OptionCaption>
			</Grid>
			<Grid item container direction="row" spacing={3}>
				<Grid item>
					<SizeField
						caption="width"
						value={config_ctx.width}
						onChange={config_ctx.setWidth}
						default={1920}
					/>
				</Grid>
				<Grid item>
					<SizeField
						caption="height"
						value={config_ctx.height}
						onChange={config_ctx.setHeight}
						default={1080}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
});