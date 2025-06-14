import { AnimatePresence } from 'motion/react';
import { useEffectOnce } from 'react-use';
import SearchParamsEditor from './SearchParamsEditor';
import SearchParamsReader from './SearchParamsReader';
import { useWindowDispatch, useWindowState } from './WindowContext';
import WindowHeader from './WindowHeader';

export default function App() {
	const { mode } = useWindowState();
	const dispatch = useWindowDispatch();

	useEffectOnce(() => {
		dispatch({ type: 'RESET' });

		const searchParams = new URLSearchParams(window.location.search);
		const target = searchParams.get('target');
		const windowId = searchParams.get('windowId');
		console.log(`target="${target}"`);
		console.log(`windowId="${windowId}"`);
		if (target == null || windowId == null) return;

		const parentWindow = ((i) => (Number.isFinite(i) ? i : void 0))(parseInt(windowId, 10));
		const url = catchTo(() => new URL(target), void 0);
		const params = SearchParams.convertFrom(url?.search.slice(1) || '');

		dispatch({ type: 'SET_PARENT_WINDOW', parentWindow });
		dispatch({ type: 'SET_URL', url });
		dispatch({ type: 'SET_PARAMS', params });
	});

	return (
		<>
			<WindowHeader />
			<AnimatePresence mode="wait">
				{mode === 'read' && <SearchParamsReader key="r" />}
				{mode === 'edit' && <SearchParamsEditor key="e" />}
			</AnimatePresence>
		</>
	);
}
