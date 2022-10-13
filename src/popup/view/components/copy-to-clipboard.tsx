import Tooltip from '@mui/material/Tooltip';
import { ComponentProps, memo, useCallback, useState } from 'react';

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
	const handleExited = useCallback(() => setTitle(defaultTitle), [defaultTitle]);

	return (
		<Tooltip disableInteractive arrow title={title} onClick={handleClick} TransitionProps={{ onExited: handleExited }}>
			{children}
		</Tooltip>
	);
});
CopyToClipboard.displayName = 'CopyToClipboard';
