import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ComponentProps, forwardRef } from 'react';

import { memo, ReactNode } from 'react';

type TProps = Pick<ComponentProps<typeof IconButton>, 'size' | 'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'ref' | 'itemRef' | 'touchRippleRef'> & {
	icon: ReactNode;
};

export const OutlinedIconButton = memo(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	forwardRef<any, TProps>(({ icon, ...props }, ref) => {
		return (
			<Button variant="outlined" color="params" {...props} ref={ref}>
				{icon}
			</Button>
		);
	})
);
OutlinedIconButton.displayName = 'OutlinedIconButton';
