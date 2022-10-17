import AddIcon from '@mui/icons-material/Add';
import { blueGrey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useCallback } from 'react';
import { usePopupDispatch } from '../../../context/popup-context';
import { SearchParam } from '../../../type';
import { ArrowTooltip } from '../../components/arrow-tooltip';
import { ParamValueEditor } from './param-value-editor';

type TProps = {
	param: SearchParam;
};

export const ParamValuesEditor = memo<TProps>(({ param: { name, values } }) => {
	const dispatch = usePopupDispatch();
	const handleDoubleClick = useCallback(() => {
		dispatch({ type: 'REMOVE_PARAM', name });
	}, [dispatch, name]);
	const handleAddClick = useCallback(() => {
		dispatch({ type: 'ADD_PARAM_VALUE', name, value: '' });
	}, [dispatch, name]);

	return (
		<Stack spacing="5px">
			<S.Stack spacing="5px" direction="row">
				<S.Typography variant="h6" flexGrow={1} onDoubleClick={handleDoubleClick}>
					{name}
				</S.Typography>
				<ArrowTooltip title="Add new value">
					<S.IconButton onClick={handleAddClick} size="small" color="inherit">
						<AddIcon />
					</S.IconButton>
				</ArrowTooltip>
			</S.Stack>
			{values.map((v) => (
				<ParamValueEditor key={v.id} name={name} {...v} />
			))}
		</Stack>
	);
});
ParamValuesEditor.displayName = 'ParamValuesEditor';

const S = {
	Stack: styled(Stack)({
		backgroundColor: blueGrey[400],
		color: 'white',
	}),
	Typography: styled(Typography)({
		paddingLeft: '10px',
	}),
	IconButton: styled(IconButton)({
		padding: '4px 4.5px',
	}),
};
