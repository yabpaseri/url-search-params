import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { ComponentProps } from 'react';
import { createRoot } from 'react-dom/client';
import { PopupContextProvider } from './context/popup-context';
import ParamsView from './view/params-view';
import { paramsTheme } from './view/theme/params-theme';

(function main() {
	const container = document.getElementById('root');
	if (!container) {
		throw new Error('$(div#root) was not found.');
	}

	const gStyles: ComponentProps<typeof GlobalStyles>['styles'] = {
		pre: { margin: '0' },
	};

	const root = createRoot(container);
	root.render(
		<>
			<CssBaseline />
			<GlobalStyles styles={gStyles} />
			<ThemeProvider theme={paramsTheme}>
				<PopupContextProvider>
					<ParamsView />
				</PopupContextProvider>
			</ThemeProvider>
		</>
	);
})();
