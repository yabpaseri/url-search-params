import AddIcon from '@mui/icons-material/Add';
import { AppBar, Box, IconButton, styled, Toolbar, Typography } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { KeyboardEventHandler } from 'react';
import { useWindowDispatch, useWindowState } from './WindowContext';

export default function WindowFooter() {
	const { params } = useWindowState();
	const dispatch = useWindowDispatch();

	const [input, setInput] = useState('');
	const duplicated = useMemo(() => params.some((p) => p.decoded_name === input), [input, params]);
	const [error, ready] = useMemo((): [boolean, boolean] => {
		return [!!input && duplicated, !!input && !duplicated];
	}, [duplicated, input]);

	const handleAdd = useCallback(() => {
		const name = SearchParams.encode(input);
		dispatch({ type: 'ADD_PARAM_VALUE', name, value: '' });
		setInput('');
	}, [dispatch, input]);

	const handleInputKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
		(e) => {
			if (ready && e.key === 'Enter') {
				e.preventDefault();
				handleAdd();
			}
		},
		[handleAdd, ready],
	);

	return (
		<S.AppBar position="fixed">
			<S.Toolbar variant="dense">
				<Typography variant="subtitle2" color="inherit">
					key
				</Typography>
				<S.Tooltip title={i18n.t('ALREADY_EXIST')} placement="top" open={error}>
					<S.Input fullWidth size="small" error={error} value={input} onChange={setInput} onKeyDown={handleInputKeyDown} />
				</S.Tooltip>
				<ArrowTooltip title={i18n.t('ADD_NEW_KEY')}>
					<Box component="span" sx={{ pointerEvents: ready ? 'auto' : 'none' }}>
						<S.IconButton size="small" color="inherit" disabled={!ready} onClick={handleAdd}>
							<AddIcon />
						</S.IconButton>
					</Box>
				</ArrowTooltip>
			</S.Toolbar>
		</S.AppBar>
	);
}

const S = {
	AppBar: styled(AppBar)(({ theme }) => ({
		backgroundColor: theme.palette.custom.params_name.background,
		color: theme.palette.custom.params_name.color,
		top: 'unset',
		bottom: 0,
	})),
	Toolbar: styled(Toolbar)({
		padding: '5px 16px',
		minHeight: 'unset',
		'@media (min-width: 600px)': {
			padding: '5px 16px',
		},
		'& > :not(style) ~ :not(style)': {
			marginLeft: '10px',
		},
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
	Input: styled(SimpleInput)({
		'& .MuiInputBase-root': {
			backgroundColor: 'white',
		},
		'& .MuiInputBase-input': {
			paddingTop: '3px',
			paddingBottom: '4px',
		},
	}),
	IconButton: styled(IconButton)({
		padding: '3px',
	}),
};
