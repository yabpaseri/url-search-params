import { SearchParam } from '../type';

/**
 * @returns `?foo=1&bar=2`
 */
export const convert2Search = (params: SearchParam[]): string => {
	const flatted: string[] = [];
	for (const param of params) {
		for (const v of param.values) {
			flatted.push(`${param.name}=${v.value}`);
		}
	}
	return flatted.length !== 0 ? '?' + flatted.join('&') : '';
};
