import { SearchParam } from '../type';

/**
 * @param search `?foo=1&bar=2`
 */
export const convert2Params = (search: string): SearchParam[] => {
	while (search.startsWith('?')) search = search.slice(1);
	if (!search) return [];

	const map: Map<string, string[]> = new Map();
	for (const v of search.split('&')) {
		if (v === '') continue;
		const eqIndex = v.indexOf('=');
		const [key, value] = eqIndex < 0 ? [v, ''] : [v.slice(0, eqIndex), v.slice(eqIndex + 1)];
		const values = map.get(key) || [];
		values.push(value);
		map.set(key, values);
	}
	const result: SearchParam[] = [];
	for (const [name, values] of map) {
		result.push({ name, values: values.map((value) => ({ id: crypto.randomUUID(), value })) });
	}
	return result;
};
