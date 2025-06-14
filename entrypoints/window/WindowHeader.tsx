import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import LaunchIcon from '@mui/icons-material/Launch';
import { AppBar, Divider, IconButton, Stack, styled, Toolbar, Typography } from '@mui/material';
import { useWindowDispatch, useWindowState } from './WindowContext';

export default function WindowHeader() {
	const { mode, url: original, params, parentWindow } = useWindowState();
	const dispatch = useWindowDispatch();

	const url = useMemo(() => {
		if (!original) return void 0;
		const editing = new URL(original);
		const search = SearchParams.convertTo(params);
		editing.search = search ? `?${search}` : '';
		return editing.toString();
	}, [original, params]);

	const handleModeChangeClick = useCallback(() => {
		dispatch({ type: 'TOGGLE_MODE' });
	}, [dispatch]);

	const handleLaunchClick = useCallback(() => {
		if (!url) return;
		createTab(parentWindow, url);
	}, [parentWindow, url]);

	return (
		<S.AppBar position="sticky">
			<S.MainToolbar variant="dense">
				<Typography variant="h6" color="inherit" component="div" flexGrow={1}>
					URLSearchParams
				</Typography>
				<S.IconStack direction="row" justifyContent="flex-end">
					<ArrowTooltip title={mode === 'read' ? i18n.t('ENTER_EDIT_MODE') : i18n.t('EXIT_EDIT_MODE')}>
						<IconButton onClick={handleModeChangeClick} color="inherit" size="small">
							{mode === 'read' && <EditIcon />}
							{mode === 'edit' && <EditOffIcon />}
						</IconButton>
					</ArrowTooltip>
				</S.IconStack>
			</S.MainToolbar>
			<S.URLToolbar variant="dense" hidden={!original}>
				<Typography
					title={url}
					variant="caption"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
					flexGrow={1}
					paddingRight="5px"
				>
					{url}
				</Typography>
				<S.Divider flexItem variant="middle" orientation="vertical" />
				<S.IconStack direction="row">
					<CopyToClipboard title={i18n.t('COPY')} value={url || ''}>
						<IconButton color="inherit" size="small">
							<AssignmentIcon />
						</IconButton>
					</CopyToClipboard>
					<ArrowTooltip title={i18n.t('OPEN')}>
						<IconButton onClick={handleLaunchClick} color="inherit" size="small">
							<LaunchIcon />
						</IconButton>
					</ArrowTooltip>
				</S.IconStack>
			</S.URLToolbar>
		</S.AppBar>
	);
}

const S = {
	AppBar: styled(AppBar)(({ theme }) => ({
		backgroundColor: theme.palette.custom.header.background,
		color: theme.palette.custom.header.color,
	})),
	MainToolbar: styled(Toolbar)({
		paddingRight: 0,
		paddingLeft: '16px',
		'@media (min-width: 600px)': {
			paddingRight: 0,
			paddingLeft: '16px',
		},
	}),
	URLToolbar: styled(Toolbar)({
		paddingRight: 0,
		paddingLeft: '16px',
		minHeight: 'unset',
		'@media (min-width: 600px)': {
			paddingRight: 0,
			paddingLeft: '16px',
		},
		'&[hidden]': {
			display: 'none',
		},
	}),
	Divider: styled(Divider)(({ theme }) => ({
		borderColor: theme.palette.custom.header.color,
	})),
	IconStack: styled(Stack)({
		minWidth: '68px', // IconButton.size='small' x2
		marginRight: '5px',
		marginLeft: '5px',
	}),
};
