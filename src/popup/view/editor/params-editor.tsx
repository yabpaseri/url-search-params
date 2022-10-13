import Stack from '@mui/material/Stack';
import { memo } from 'react';
import { usePopupState } from '../../context/popup-context';
import { FadeMotion } from '../components/fade-motion';
import { ParamValuesEditor } from './components/param-values-editor';
import { EditorsFooter } from './editors-footer';

export const ParamsEditor = memo(() => {
	const { params } = usePopupState();
	return (
		<FadeMotion>
			<Stack padding="10px" paddingBottom="50px" spacing="20px">
				{params.map((param) => (
					<ParamValuesEditor key={param.name} param={param} />
				))}
			</Stack>
			<EditorsFooter />
		</FadeMotion>
	);
});
ParamsEditor.displayName = 'ParamsEditor';

export default ParamsEditor;
