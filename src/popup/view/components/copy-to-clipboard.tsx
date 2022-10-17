import Tooltip from '@mui/material/Tooltip';
import { ComponentProps, memo, useCallback, useEffect, useRef, useState } from 'react';

type TProps = Pick<ComponentProps<typeof Tooltip>, 'children'> & {
	defaultTitle?: string;
	text: string;
};

export const CopyToClipboard = memo<TProps>(({ defaultTitle, text, children }) => {
	const [title, setTitle] = useState(defaultTitle);
	const handleClick = useCallback(() => {
		window.navigator.clipboard.writeText(text);
		setTitle('Copied!');
	}, [text]);

	// TransitionProps.onExited was used to return the value to default.
	// However, I found that Tooltip is not unmounted when I override onExited.
	// I had no choice but to substitute setTimeout.
	//     const handleExited = useCallback(() => setTitle(defaultTitle), [defaultTitle]);
	//     <Tooltip TransitionProps={{ onExited: handleExited }} .../>
	const timeout = useRef<NodeJS.Timeout | null>(null);
	const resetTimeout = useCallback(() => {
		if (timeout.current) {
			clearTimeout(timeout.current);
			timeout.current = null;
		}
	}, []);
	useEffect(() => () => resetTimeout(), [resetTimeout]);
	const handleClose = useCallback(() => {
		resetTimeout();
		timeout.current = setTimeout(() => setTitle(defaultTitle), 200);
	}, [defaultTitle, resetTimeout]);

	return (
		<Tooltip disableInteractive arrow title={title} onClick={handleClick} TransitionProps={{ onExit: handleClose }}>
			{children}
		</Tooltip>
	);
});
CopyToClipboard.displayName = 'CopyToClipboard';
