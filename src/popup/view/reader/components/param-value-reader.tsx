import AssignmentIcon from '@mui/icons-material/Assignment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { memo, useCallback, useMemo, useState } from 'react';
import { CopyToClipboard, MemoizedInput, OutlinedIconButton } from '../../components';

type TProps = {
	value: string;
};

export const ParamValueReader = memo<TProps>(({ value }) => {
	const decoded = useMemo(() => new URLSearchParams(`_=${value}`).get('_') as string, [value]);

	const [hover, setHover] = useState(false);
	const handleMouseEnter = useCallback(() => setHover(true), []);
	const handleMouseLeave = useCallback(() => setHover(false), []);

	return (
		<Stack direction="row" spacing="5px">
			<S.MemoizedInput value={hover ? decoded : value} size="small" fullWidth />
			<CopyToClipboard defaultTitle="Copy" text={value}>
				<S.OutlinedIconButton icon={<AssignmentIcon />} size="small" />
			</CopyToClipboard>
			<CopyToClipboard defaultTitle="Copy (decoded)" text={decoded}>
				<S.OutlinedIconButton
					icon={<IntegrationInstructionsIcon />}
					size="small"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			</CopyToClipboard>
		</Stack>
	);
});
ParamValueReader.displayName = 'ParamValue';

const S = {
	MemoizedInput: styled(MemoizedInput)({
		'& .MuiInputBase-input': {
			paddingTop: '5px',
			paddingBottom: '5px',
		},
	}),
	OutlinedIconButton: styled(OutlinedIconButton)({
		minWidth: 'unset',
		padding: '3px 3.5px', // && size:small && minWidh:unset === square
	}),
};
