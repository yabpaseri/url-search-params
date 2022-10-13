import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { PopupContextProvider } from './context/popup-context';
import ParamsView from './view/params-view';
import { paramsTheme } from './view/theme/params-theme';

(function main() {
	const container = document.getElementById('root');
	if (!container) {
		throw new Error('$(div#root) was not found.');
	}

	const root = createRoot(container);
	root.render(
		<>
			<CssBaseline />
			<ThemeProvider theme={paramsTheme}>
				<PopupContextProvider>
					<ParamsView />
				</PopupContextProvider>
			</ThemeProvider>
		</>
	);
})();
