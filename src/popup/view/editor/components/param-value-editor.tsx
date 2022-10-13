import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import { memo, useCallback, useMemo, useState } from 'react';
import { usePopupDispatch } from '../../../context/popup-context';
import { SearchParamValue } from '../../../type';
import { MemoizedInput, OutlinedIconButton } from '../../components';
import { ArrowTooltip } from '../../components/arrow-tooltip';

type TProps = SearchParamValue & {
	name: string;
};

export const ParamValueEditor = memo<TProps>(({ name, id, value }) => {
	const dispatch = usePopupDispatch();
	const decoded = useMemo(() => new URLSearchParams(`_=${value}`).get('_') as string, [value]);

	const handleValueChange = useCallback(
		(value: string) => {
			dispatch({ type: 'EDIT_PARAM_VALUE', name, id, value });
		},
		[dispatch, id, name]
	);
	const handleDecodedChange = useCallback(
		(value: string) => {
			// '_=xxxxxx'.slice(2); // => 'xxxxxx'
			value = new URLSearchParams({ _: value }).toString().slice(2);
			dispatch({ type: 'EDIT_PARAM_VALUE', name, id, value });
		},
		[dispatch, id, name]
	);

	const [decodeMode, setDecodeMode] = useState(true);
	const handleModeChange = useCallback((_: unknown, value: boolean) => {
		setDecodeMode(!value);
	}, []);
	const handleDeleteClick = useCallback(() => {
		dispatch({ type: 'REMOVE_PARAM_VALUE', name, id });
	}, [dispatch, id, name]);

	return (
		<Stack direction="row" spacing="5px">
			<S.MemoizedInput
				fullWidth
				value={decodeMode ? decoded : value}
				onChange={decodeMode ? handleDecodedChange : handleValueChange}
				size="small"
			/>
			<ArrowTooltip title={decodeMode ? 'Edit encoded values' : 'Edit decoded values'}>
				<S.ToggleButton value={decodeMode} selected={decodeMode} onChange={handleModeChange}>
					<CodeIcon />
				</S.ToggleButton>
			</ArrowTooltip>
			<ArrowTooltip title="Delete">
				<S.OutlinedIconButton onClick={handleDeleteClick} icon={<DeleteIcon />} />
			</ArrowTooltip>
		</Stack>
	);
});
ParamValueEditor.displayName = 'ParamValueEditor';

const S = {
	MemoizedInput: styled(MemoizedInput)({
		'& .MuiInputBase-input': {
			paddingTop: '5px',
			paddingBottom: '5px',
		},
	}),
	ToggleButton: styled(ToggleButton)(({ theme }) => ({
		padding: '3.5px',
		borderColor: theme.palette.grey[400],
		'&.Mui-selected': {
			backgroundColor: theme.palette.grey[300],
		},
	})),
	OutlinedIconButton: styled(OutlinedIconButton)({
		minWidth: 'unset',
		padding: '3px 3.5px', // && size:small && minWidh:unset === square
	}),
};
