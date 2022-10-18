import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import LaunchIcon from '@mui/icons-material/Launch';
import AppBar from '@mui/material/AppBar';
import { blueGrey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useMemo } from 'react';
import { usePopupDispatch, usePopupState } from '../context/popup-context';
import { convert2Search, getOrCreateNormalWindow } from '../functions';
import i18n from '../i18n';
import { CopyToClipboard } from './components';
import { ArrowTooltip } from './components/arrow-tooltip';

export const ViewsHeader = memo(() => {
	const { mode, url: origin, params, parent_window } = usePopupState();
	const dispatch = usePopupDispatch();
	const handleModeClick = useCallback(() => dispatch({ type: 'TOGGLE_MODE' }), [dispatch]);
	const url = useMemo(() => {
		if (!origin) return void 0;
		const editing = new URL(origin.toString());
		editing.search = convert2Search(params);
		return editing.toString();
	}, [origin, params]);

	const handleLaunchClick = useCallback(async () => {
		if (!url) return;
		const [win, created] = await getOrCreateNormalWindow(parent_window, url);
		if (!created) chrome.tabs.create({ active: true, url, windowId: win.id });
	}, [parent_window, url]);

	return (
		<S.AppBar position="sticky">
			<S.MainToolbar variant="dense">
				<Typography variant="h6" color="inherit" component="div" flexGrow={1}>
					URL Search Params
				</Typography>
				<S.IconsStack direction="row" justifyContent="flex-end">
					<ArrowTooltip title={mode === 'reader' ? i18n('ENTER_EDIT_MODE') : i18n('EXIT_EDIT_MODE')}>
						<IconButton onClick={handleModeClick} color="inherit" size="small">
							{mode === 'reader' && <EditIcon />}
							{mode === 'editor' && <EditOffIcon />}
						</IconButton>
					</ArrowTooltip>
				</S.IconsStack>
			</S.MainToolbar>
			<S.URLToolbar variant="dense" hidden={!origin}>
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
				<S.IconsStack direction="row">
					<CopyToClipboard defaultTitle={i18n('COPY')} text={url || ''}>
						<IconButton color="inherit" size="small">
							<AssignmentIcon />
						</IconButton>
					</CopyToClipboard>
					<ArrowTooltip title={i18n('OPEN')}>
						<IconButton onClick={handleLaunchClick} color="inherit" size="small">
							<LaunchIcon />
						</IconButton>
					</ArrowTooltip>
				</S.IconsStack>
			</S.URLToolbar>
		</S.AppBar>
	);
});
ViewsHeader.displayName = 'ViewsHeader';

const S = {
	AppBar: styled(AppBar)({
		color: 'white',
		backgroundColor: blueGrey[800],
	}),
	MainToolbar: styled(Toolbar)({
		paddingRight: 0,
		'@media (min-width: 600px)': {
			paddingRight: 0,
		},
	}),
	URLToolbar: styled(Toolbar)({
		minHeight: 'unset',
		paddingRight: 0,
		'@media (min-width: 600px)': {
			paddingRight: 0,
		},
		'&[hidden]': {
			display: 'none',
		},
	}),
	Divider: styled(Divider)({
		borderColor: 'white',
	}),
	IconButton: styled(IconButton)({
		marginRight: '5px',
		marginLeft: '5px',
	}),
	IconsStack: styled(Stack)({
		minWidth: '68px', // IconButton.size='small' x2
		marginRight: '5px',
		marginLeft: '5px',
	}),
};
