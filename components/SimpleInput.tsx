import TextField from '@mui/material/TextField';
import { ChangeEvent, ComponentProps, forwardRef, memo, useCallback } from 'react';

type TProps = Omit<ComponentProps<typeof TextField>, 'value' | 'onChange' | 'color'> & {
	value?: string;
	onChange?: (value: string) => void;
};

export const SimpleInput = memo(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	forwardRef<any, TProps>(({ onChange, ...props }, ref) => {
		const handleChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				if (onChange) onChange(e.target.value);
			},
			[onChange],
		);
		return <TextField color="calm" onChange={handleChange} ref={ref} {...props}></TextField>;
	}),
);
SimpleInput.displayName = 'SimpleInput';
