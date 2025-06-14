import { Tooltip } from '@mui/material';
import { ComponentProps, memo } from 'react';

type TProps = Omit<ComponentProps<typeof Tooltip>, 'arrow' | 'disableInteractive'>;

export const ArrowTooltip = memo<TProps>((props) => {
	return <Tooltip arrow disableInteractive {...props} />;
});
ArrowTooltip.displayName = 'ArrowTooltip';
