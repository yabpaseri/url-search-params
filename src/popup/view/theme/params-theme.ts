import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const paramsTheme = createTheme({
	palette: {
		params: {
			main: grey[600],
			contrastText: grey[800],
		},
	},
});
