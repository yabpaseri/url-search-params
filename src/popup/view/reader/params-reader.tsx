import Stack from '@mui/material/Stack';
import { memo } from 'react';
import { usePopupState } from '../../context/popup-context';
import { FadeMotion } from '../components';
import { ParamValuesReader } from './components';

export const ParamsReader = memo(() => {
	const { params } = usePopupState();
	return (
		<FadeMotion>
			<Stack padding="10px" spacing="20px">
				{params.map((param) => (
					<ParamValuesReader key={param.name} param={param} />
				))}
			</Stack>
		</FadeMotion>
	);
});
ParamsReader.displayName = 'ParamsReader';

export default ParamsReader;
