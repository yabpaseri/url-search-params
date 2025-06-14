import { SearchParam } from '@/types';
import { createContext, Dispatch, ReactNode } from 'react';

const WindowContext = createContext<WindowState | undefined>(void 0);
export type WindowState = {
	parentWindow: number | undefined;
	url: URL | undefined;
	params: SearchParam[];
	mode: 'read' | 'edit';
};

const initState = (): WindowState => ({
	parentWindow: void 0,
	url: void 0,
	params: [],
	mode: 'read',
});

const WindowDispatchContext = createContext<WindowDispatch | undefined>(void 0);
type WindowDispatch = Dispatch<Action>;
type Action =
	| { type: 'RESET' }
	| { type: 'SET_PARENT_WINDOW'; parentWindow: number | undefined }
	| { type: 'SET_URL'; url: URL | undefined }
	| { type: 'SET_PARAMS'; params: SearchParam[] }
	| { type: 'SET_PARAM'; param: SearchParam }
	| { type: 'ADD_PARAM_VALUE'; name: string; value: string }
	| { type: 'REMOVE_PARAM'; name: string }
	| { type: 'REMOVE_PARAM_VALUE'; name: string; id: string }
	| { type: 'EDIT_PARAM_VALUE'; name: string; id: string; value: string }
	| { type: 'TOGGLE_MODE' };

const reducer = (state: WindowState, action: Action): WindowState => {
	switch (action.type) {
		case 'RESET':
			return initState();
		case 'SET_PARENT_WINDOW': {
			return { ...state, parentWindow: action.parentWindow };
		}
		case 'SET_URL': {
			return { ...state, url: action.url };
		}
		case 'SET_PARAMS': {
			const params = action.params.sort((a, b) => compare(a.decoded_name, b.decoded_name));
			return { ...state, params };
		}
		case 'SET_PARAM': {
			const index = state.params.findIndex((p) => p.name === action.param.name);
			const params = state.params.filter((p) => p.name !== action.param.name); // Shallow copy + filter
			const next = { ...state, params };
			if (index < 0) {
				params.push(action.param);
				params.sort((a, b) => compare(a.decoded_name, b.decoded_name));
			} else {
				params.splice(index, 0, action.param);
			}
			return next;
		}
		case 'ADD_PARAM_VALUE': {
			const index = state.params.findIndex((v) => v.name === action.name);
			const value = SearchParams.toValue(action.value);
			if (index < 0) {
				return reducer(state, {
					type: 'SET_PARAM',
					param: { name: action.name, decoded_name: SearchParams.decode(action.name), values: [value] },
				});
			}
			const params = [...state.params];
			const param = { ...params[index] };
			param.values.push(value);
			params[index] = param;
			return { ...state, params };
		}
		case 'REMOVE_PARAM': {
			const params = state.params.filter((v) => v.name !== action.name);
			if (state.params.length === params.length) {
				return state;
			}
			return { ...state, params };
		}
		case 'REMOVE_PARAM_VALUE': {
			const index = state.params.findIndex((v) => v.name === action.name);
			if (index < 0) {
				return state;
			}
			const params = [...state.params];
			const param = { ...params[index] };
			const values = param.values.filter((v) => v.id !== action.id);
			if (param.values.length === values.length) {
				return state;
			}
			param.values = values;
			params[index] = param;
			return { ...state, params };
		}
		case 'EDIT_PARAM_VALUE': {
			const index = state.params.findIndex((v) => v.name === action.name);
			if (index < 0) {
				return state;
			}

			const params = [...state.params];
			const param = { ...params[index] };
			const vIndex = param.values.findIndex((v) => v.id === action.id);
			if (vIndex < 0) {
				return state;
			}
			param.values[vIndex].value = action.value;
			params[index] = param;
			return { ...state, params };
		}
		case 'TOGGLE_MODE': {
			const mode: WindowState['mode'] = state.mode === 'edit' ? 'read' : 'edit';
			return { ...state, mode };
		}
	}
};

export const WindowContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initState());
	return (
		<WindowDispatchContext.Provider value={dispatch}>
			<WindowContext.Provider value={state}>{children}</WindowContext.Provider>
		</WindowDispatchContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWindowState = () => {
	const state = useContext(WindowContext);
	if (!state) throw new Error('WindowContext not found');
	return state;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useWindowDispatch = () => {
	const dispatch = useContext(WindowDispatchContext);
	if (!dispatch) throw new Error('WindowDispatchContext not found');
	return dispatch;
};
