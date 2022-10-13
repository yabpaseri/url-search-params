import {} from '@mui/material/styles';
declare module '@mui/material/styles' {
	interface Palette {
		params: Palette['primary'];
	}
	interface PaletteOptions {
		params: PaletteOptions['primary'];
	}
}

import {} from '@mui/material/Button';
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		params;
	}
}

import {} from '@mui/material/TextField';
declare module '@mui/material/TextField' {
	interface TextFieldPropsColorOverrides {
		params;
	}
}

import {} from '@mui/material/ToggleButton';
declare module '@mui/material/ToggleButton' {
	interface ToggleButtonPropsColorOverrides {
		params;
	}
}
