import { Stack } from '@mui/material';
import SearchParamView from './SearchParamView';
import { useWindowState } from './WindowContext';
import WindowFooter from './WindowFooter';

export default function SearchParamsEditor() {
	const { params } = useWindowState();
	return (
		<FadeMotion>
			<Stack padding="10px" spacing="20px" paddingBottom="50px">
				{params.map((p) => (
					<SearchParamView edit key={p.name} name={p.name} decoded_name={p.decoded_name} values={p.values} />
				))}
			</Stack>
			<WindowFooter />
		</FadeMotion>
	);
}
