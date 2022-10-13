import Tooltip from '@mui/material/Tooltip';
import { ComponentProps, memo } from 'react';

type TProps = Pick<ComponentProps<typeof Tooltip>, 'title' | 'children'>;

export const ArrowTooltip = memo<TProps>((props) => {
	return <Tooltip arrow disableInteractive {...props} />;
});
ArrowTooltip.displayName = 'ArrowTooltip';
