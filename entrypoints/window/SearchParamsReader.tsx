import { Stack } from '@mui/material';
import SearchParamView from './SearchParamView';
import { useWindowState } from './WindowContext';

export default function SearchParamsReader() {
	const { params } = useWindowState();
	return (
		<FadeMotion>
			<Stack padding="10px" spacing="20px">
				{params.map((p) => (
					<SearchParamView key={p.name} {...p} />
				))}
			</Stack>
		</FadeMotion>
	);
}
