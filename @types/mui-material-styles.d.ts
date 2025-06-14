import { PaletteColorOptions } from '@mui/material/styles';

import '@mui/material/styles';
declare module '@mui/material/styles' {
	interface Palette {
		custom: PaletteCustom;
		calm: PaletteColor;
	}
	interface PaletteOptions {
		custom: PaletteCustom;
		calm: PaletteColorOptions;
	}
}

import '@mui/material/Button';
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		calm;
	}
}

import '@mui/material/TextField';
declare module '@mui/material/TextField' {
	interface TextFieldPropsColorOverrides {
		calm;
	}
}

import '@mui/material/ToggleButton';
declare module '@mui/material/ToggleButton' {
	interface ToggleButtonPropsColorOverrides {
		calm;
	}
}

interface PaletteCustom {
	header: {
		background: string;
		color: string;
	};
	params_name: {
		background: string;
		color: string;
	};
}
