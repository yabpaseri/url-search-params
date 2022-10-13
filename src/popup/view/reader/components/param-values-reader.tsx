import { blueGrey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { SearchParam } from '../../../type';
import { ParamValueReader } from './param-value-reader';

type TProps = {
	param: SearchParam;
};

export const ParamValuesReader = memo<TProps>(({ param: { name, values } }) => {
	return (
		<Stack spacing="5px">
			<S.Typography variant="h6">{name}</S.Typography>
			{values.map((v) => (
				<ParamValueReader key={v.id} value={v.value} />
			))}
		</Stack>
	);
});
ParamValuesReader.displayName = 'ParamValues';

const S = {
	Typography: styled(Typography)({
		paddingLeft: '10px',
		backgroundColor: blueGrey[400],
		color: 'white',
	}),
};
