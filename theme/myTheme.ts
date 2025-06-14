import { blueGrey, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
	palette: {
		custom: {
			header: {
				background: blueGrey[800],
				color: '#FFF',
			},
			params_name: {
				background: blueGrey[400],
				color: '#FFF',
			},
		},
		calm: {
			main: grey[600],
			contrastText: grey[800],
			...grey,
		},
	},
});
