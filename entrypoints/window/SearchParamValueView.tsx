import { SearchParamValue } from '@/types';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Stack, styled, ToggleButton } from '@mui/material';
import { memo } from 'react';
import { useToggle } from 'react-use';
import { useWindowDispatch } from './WindowContext';

type TProps = SearchParamValue & {
	name: string;
	edit: boolean;
};

const SearchParamValueView = memo<TProps>(({ id, name, value, edit }) => {
	const dispatch = useWindowDispatch();
	const decodedValue = SearchParams.decode(value);

	const handleValueChange = useCallback(
		(value: string) => {
			dispatch({ type: 'EDIT_PARAM_VALUE', name, id, value });
		},
		[dispatch, id, name],
	);
	const handleDecodedValueChange = useCallback(
		(value: string) => {
			value = SearchParams.encode(value);
			dispatch({ type: 'EDIT_PARAM_VALUE', name, id, value });
		},
		[dispatch, id, name],
	);

	const handleDeleteClick = useCallback(() => {
		dispatch({ type: 'REMOVE_PARAM_VALUE', name, id });
	}, [dispatch, id, name]);

	const [decoded, toggleDecoded] = useToggle(edit);
	const changeToDecoded = useCallback(() => toggleDecoded(true), [toggleDecoded]);
	const changeToEncoded = useCallback(() => toggleDecoded(false), [toggleDecoded]);

	return (
		<Stack spacing="5px" direction="row">
			<S.Input
				fullWidth
				size="small"
				value={decoded ? decodedValue : value}
				onChange={!edit ? void 0 : decoded ? handleDecodedValueChange : handleValueChange}
			/>
			{!edit && (
				<>
					<CopyToClipboard title={i18n.t('COPY')} value={value}>
						<S.IconButton icon={<AssignmentIcon />} size="small" />
					</CopyToClipboard>
					<CopyToClipboard title={i18n.t('COPY_DECODED')} value={decodedValue}>
						<S.IconButton
							icon={<IntegrationInstructionsIcon />}
							size="small"
							onMouseEnter={changeToDecoded}
							onMouseLeave={changeToEncoded}
						/>
					</CopyToClipboard>
				</>
			)}
			{edit && (
				<>
					<ArrowTooltip title={decoded ? i18n.t('EDIT_ENCODED_VALUES') : i18n.t('EDIT_DECODED_VALUES')}>
						<S.ToggleButton value={decoded} selected={decoded} onChange={toggleDecoded}>
							<CodeIcon />
						</S.ToggleButton>
					</ArrowTooltip>
					<ArrowTooltip title={i18n.t('DELETE')}>
						<S.IconButton icon={<DeleteIcon />} onClick={handleDeleteClick} />
					</ArrowTooltip>
				</>
			)}
		</Stack>
	);
});
SearchParamValueView.displayName = 'SearchParamValueView';

export default SearchParamValueView;

const S = {
	Input: styled(SimpleInput)({
		'& .MuiInputBase-input': {
			paddingTop: '5px',
			paddingBottom: '5px',
		},
	}),
	ToggleButton: styled(ToggleButton)(({ theme }) => ({
		padding: '3.5px',
		borderColor: theme.palette.calm[400],
		'&.Mui-selected': {
			backgroundColor: theme.palette.calm[300],
		},
	})),
	IconButton: styled(OutlinedIconButton)({
		minWidth: 'unset',
		padding: '3px 3.5px', // && size:small && minWidh:unset === square
	}),
};
