import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { usePopupDispatch, usePopupState } from '../context/popup-context';
import { catchTo, convert2Params } from '../functions';
import ParamsEditor from './editor/params-editor';
import ParamsReader from './reader/params-reader';
import { ViewsHeader } from './views-header';

const ParamsView = () => {
	const { mode } = usePopupState();
	const dispatch = usePopupDispatch();

	useEffect(() => {
		dispatch({ type: 'RESET' });

		const searchParams = new URLSearchParams(window.location.search);
		const target = searchParams.get('target');
		const windowId = searchParams.get('windowId');
		if (target == null) throw new Error('Parameter "target" does not exist in location.search');
		if (windowId == null) throw new Error('Parameter "windowId" does not exist in location.search');

		console.log(`location.search.target="${target}"`);
		console.log(`location.search.windowId=${windowId}`);

		const parent_window = parseInt(windowId);
		const url = catchTo(() => new URL(target), void 0);
		const params = convert2Params(url?.search || '');

		dispatch({ type: 'SET_PARENT_WINDOW', parent_window });
		dispatch({ type: 'SET_URL', url });
		dispatch({ type: 'SET_PARAMS', params });
	}, [dispatch]);

	return (
		<>
			<ViewsHeader />
			<AnimatePresence mode="wait">
				{mode === 'reader' && <ParamsReader key="r" />}
				{mode === 'editor' && <ParamsEditor key="e" />}
			</AnimatePresence>
		</>
	);
};

export default ParamsView;
