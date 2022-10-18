import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { blueGrey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { KeyboardEventHandler, memo, useCallback, useMemo, useState } from 'react';
import { usePopupDispatch, usePopupState } from '../../context/popup-context';
import i18n from '../../i18n';
import { MemoizedInput } from '../components';
import { ArrowTooltip } from '../components/arrow-tooltip';

export const EditorsFooter = memo(() => {
	const { params_names } = usePopupState();
	const dispatch = usePopupDispatch();

	const [input, setInput] = useState('');
	const handleInputChange = useCallback((value: string) => setInput(value), []);
	const handleAddClick = useCallback(() => {
		dispatch({ type: 'ADD_PARAM_VALUE', name: input, value: '' });
		setInput('');
	}, [dispatch, input]);

	const duplication = useMemo(() => params_names.includes(input), [input, params_names]);
	const handleInputKeydown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
		(e) => {
			if (e.key !== 'Enter' || !input || duplication) return;
			e.preventDefault();
			handleAddClick();
		},
		[duplication, handleAddClick, input]
	);

	return (
		<S.AppBar position="fixed">
			<S.Toolbar variant="dense">
				<S.Typography variant="subtitle2">key</S.Typography>
				<S.Tooltip title={i18n('ALREADY_EXIST')} placement="top" open={duplication}>
					<S.MemoizedInput
						fullWidth
						size="small"
						error={duplication}
						value={input}
						onChange={handleInputChange}
						onKeyDown={handleInputKeydown}
					/>
				</S.Tooltip>
				<ArrowTooltip title={i18n('ADD_NEW_KEY')}>
					<S.IconButtonWrapper aria-disabled={!input || duplication} component="span">
						<S.IconButton onClick={handleAddClick} size="small" color="inherit" disabled={!input || duplication}>
							<AddIcon />
						</S.IconButton>
					</S.IconButtonWrapper>
				</ArrowTooltip>
			</S.Toolbar>
		</S.AppBar>
	);
});
EditorsFooter.displayName = 'EditorsFooter';

const S = {
	AppBar: styled(AppBar)({
		backgroundColor: blueGrey[400],
		top: 'auto',
		bottom: 0,
	}),
	Toolbar: styled(Toolbar)({
		color: 'white',
		minHeight: 'unset',
		paddingTop: '5px',
		paddingBottom: '5px',
	}),
	Typography: styled(Typography)({
		marginRight: '10px',
	}),
	Tooltip: styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.common.white,
			color: theme.palette.error.light,
			border: `1px solid ${theme.palette.error.light}`,
			boxShadow: theme.shadows[3],
			fontSize: 13,
			marginBottom: '7px !important',
		},
	})),
	MemoizedInput: styled(MemoizedInput)({
		'& .MuiInputBase-root': {
			backgroundColor: 'white',
		},
		'& .MuiInputBase-input': {
			paddingTop: '3px',
			paddingBottom: '4px',
		},
	}),
	IconButtonWrapper: styled(Box)({
		'&[aria-disabled="true"]': {
			// When button is disabled, Tooltip is not displayed.
			pointerEvents: 'none',
		},
	}),
	IconButton: styled(IconButton)({
		padding: '3px',
		marginLeft: '10px',
	}),
};
