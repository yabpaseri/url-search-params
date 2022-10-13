import { SearchParam } from '../type';

/**
 * @param search `?foo=1&bar=2`
 */
export const convert2Params = (search: string): SearchParam[] => {
	while (search.startsWith('?')) search = search.slice(1);
	if (!search) return [];

	const map: Map<string, string[]> = new Map();
	for (const v of search.split('&')) {
		// ok: foo=bar, foo=
		// ng: =bar, foobar
		if (!v.includes('=') || v.startsWith('=')) continue;
		const [key, ...others] = v.split('=');
		const value = others.join('=');
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
