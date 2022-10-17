import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { simpleCompare } from '../functions';
import { ParamsViewMode, SearchParam } from '../type';

const PopupContext = createContext<PopupState | undefined>(void 0);
export type PopupState = {
	parent_window: number | undefined;
	url: Readonly<URL> | undefined;
	params: SearchParam[];
	params_names: string[];
	mode: ParamsViewMode;
};

const initState = (): PopupState => ({
	parent_window: void 0,
	url: void 0,
	params: [],
	params_names: [],
	mode: 'reader',
});

const PopupDispatchContext = createContext<PopupDispatch | undefined>(void 0);
type PopupDispatch = Dispatch<Action>;
type Action =
	| { type: 'RESET' }
	| { type: 'SET_PARENT_WINDOW'; parent_window: number | undefined }
	| { type: 'SET_URL'; url: URL | undefined }
	| { type: 'SET_PARAMS'; params: SearchParam[] }
	| { type: 'SET_PARAM'; param: SearchParam }
	| { type: 'ADD_PARAM_VALUE'; name: string; value: string }
	| { type: 'REMOVE_PARAM'; name: string }
	| { type: 'REMOVE_PARAM_VALUE'; name: string; id: string }
	| { type: 'EDIT_PARAM_VALUE'; name: string; id: string; value: string }
	| { type: 'TOGGLE_MODE' };

const popupReducer = (state: PopupState, action: Action): PopupState => {
	switch (action.type) {
		case 'RESET': {
			return initState();
		}
		case 'SET_PARENT_WINDOW': {
			return { ...state, parent_window: action.parent_window };
		}
		case 'SET_URL': {
			return { ...state, url: action.url };
		}
		case 'SET_PARAMS': {
			const params = action.params.sort((a, b) => simpleCompare(a.name, b.name));
			const params_names = params.map((v) => v.name);
			return { ...state, params, params_names };
		}
		case 'SET_PARAM': {
			const index = state.params.findIndex((v) => v.name === action.param.name);
			const params = state.params.filter((v) => v.name !== action.param.name);
			const next: PopupState = { ...state };
			if (index < 0) {
				params.push(action.param);
				params.sort((a, b) => simpleCompare(a.name, b.name));
				next.params = params;
				next.params_names = params.map((v) => v.name);
			} else {
				params.splice(index, 0, action.param);
				next.params = params;
			}
			return next;
		}
		case 'ADD_PARAM_VALUE': {
			const index = state.params.findIndex((v) => v.name === action.name);
			if (index < 0) {
				return popupReducer(state, {
					type: 'SET_PARAM',
					param: { name: action.name, values: [{ id: crypto.randomUUID(), value: action.value }] },
				});
			}
			const params = [...state.params];
			const param = { ...params[index] };
			param.values.push({ id: crypto.randomUUID(), value: action.value });
			params[index] = param;
			return { ...state, params };
		}
		case 'REMOVE_PARAM': {
			const params = state.params.filter((v) => v.name !== action.name);
			if (state.params.length === params.length) {
				return state;
			}
			const params_names = params.map((v) => v.name);
			return { ...state, params, params_names };
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
			const mode: ParamsViewMode = state.mode === 'editor' ? 'reader' : 'editor';
			return { ...state, mode };
		}
	}
};

export const PopupContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(popupReducer, initState());
	return (
		<PopupDispatchContext.Provider value={dispatch}>
			<PopupContext.Provider value={state}>
				{/** In descendants, usePopupState and usePopupDispatch can be used. */}
				{children}
			</PopupContext.Provider>
		</PopupDispatchContext.Provider>
	);
};

export const usePopupState = () => {
	const state = useContext(PopupContext);
	if (!state) throw new Error('PopupContext not found');
	return state;
};
export const usePopupDispatch = () => {
	const dispatch = useContext(PopupDispatchContext);
	if (!dispatch) throw new Error('PopupDispatchContext not found');
	return dispatch;
};
