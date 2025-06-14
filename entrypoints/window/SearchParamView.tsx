import { SearchParam } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, styled, Typography } from '@mui/material';
import SearchParamValueView from './SearchParamValueView';
import { useWindowDispatch } from './WindowContext';

type TProps = SearchParam & {
	edit?: boolean;
};

export default function SearchParamView({ name, decoded_name, values, edit }: TProps) {
	console.log(name, decoded_name, values);
	const dispatch = useWindowDispatch();
	const handleAddClick = useCallback(() => {
		dispatch({ type: 'ADD_PARAM_VALUE', name, value: '' });
	}, [dispatch, name]);
	const handleDeleteClick = useCallback(() => {
		dispatch({ type: 'REMOVE_PARAM', name });
	}, [dispatch, name]);

	return (
		<Stack spacing="5px">
			<S.Stack spacing="5px" direction="row">
				<S.Typography variant="h6" flexGrow={1}>
					{decoded_name || <pre> </pre>}
				</S.Typography>
				{edit && (
					<>
						<ArrowTooltip title={i18n.t('ADD_NEW_VALUE')}>
							<S.IconButton onClick={handleAddClick} size="small" color="inherit">
								<AddIcon />
							</S.IconButton>
						</ArrowTooltip>
						<ArrowTooltip title={i18n.t('DELETE')}>
							<S.IconButton onClick={handleDeleteClick} size="small" color="inherit">
								<DeleteIcon />
							</S.IconButton>
						</ArrowTooltip>
					</>
				)}
			</S.Stack>
			{values.map((v) => (
				<SearchParamValueView key={v.id} name={name} edit={!!edit} {...v} />
			))}
		</Stack>
	);
}

const S = {
	Stack: styled(Stack)(({ theme }) => ({
		backgroundColor: theme.palette.custom.params_name.background,
		color: theme.palette.custom.params_name.color,
	})),
	Typography: styled(Typography)({
		paddingLeft: '10px',
	}),
	IconButton: styled(IconButton)({
		padding: '4px 4.5px',
	}),
};
