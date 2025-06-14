import myTheme from '@/theme/myTheme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import { WindowContextProvider } from './WindowContext';

(function main() {
	const container = document.getElementById('container');
	if (!container) throw new Error('$(#container) was not found.');
	const root = createRoot(container);

	const inputGlobalStyles = (
		<GlobalStyles
			styles={{
				pre: { margin: '0' },
			}}
		/>
	);

	root.render(
		<ThemeProvider theme={myTheme}>
			<CssBaseline />
			{inputGlobalStyles}
			<WindowContextProvider>
				<App />
			</WindowContextProvider>
		</ThemeProvider>,
	);
})();
