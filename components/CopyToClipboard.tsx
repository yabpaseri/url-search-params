import { ComponentProps, memo } from 'react';
import { useCopyToClipboard } from 'react-use';

type TProps = Pick<ComponentProps<typeof ArrowTooltip>, 'title' | 'children'> & {
	value: string;
};

export const CopyToClipboard = memo<TProps>(({ title, value, children }) => {
	const [message, setMessage] = useState(title);
	const [, copyToClipboard] = useCopyToClipboard();

	const handleClick = useCallback(() => {
		copyToClipboard(value);
		setMessage(i18n.t('COPIED'));
	}, [copyToClipboard, value]);

	const timeout = useRef<NodeJS.Timeout | null>(null);
	const resetTimeout = useCallback(() => {
		if (timeout.current) {
			clearTimeout(timeout.current);
			timeout.current = null;
		}
	}, []);
	const handleClose = useCallback(() => {
		resetTimeout();
		timeout.current = setTimeout(() => setMessage(title), 200);
	}, [resetTimeout, title]);

	useEffect(() => resetTimeout, [resetTimeout]);

	return (
		<ArrowTooltip title={message} onClick={handleClick} slotProps={{ transition: { onExit: handleClose } }}>
			{children}
		</ArrowTooltip>
	);
});
CopyToClipboard.displayName = 'CopyToClipboard';
