import { SearchParam, SearchParamValue } from '@/types';

export class SearchParams {
	static convertTo(params: SearchParam[]): string {
		const entries: string[] = [];
		for (const p of params) {
			for (const v of p.values) {
				entries.push(`${p.name}=${v.value}`);
			}
		}
		return entries.join('&');
	}

	static convertFrom(search: string): SearchParam[] {
		if (search.length === 0) return [];

		const map: Map<string, string[]> = new Map();
		for (const q of search.split('&')) {
			if (q === '') continue;
			const index = q.indexOf('=');
			const [name, value] = index < 0 ? [q, ''] : [q.slice(0, index), q.slice(index + 1)];
			const values = map.get(name) ?? [];
			values.push(value);
			map.set(name, values);
		}

		return map
			.entries()
			.map(
				([name, values]) =>
					<SearchParam>{
						name,
						decoded_name: this.decode(name),
						values: values.map(this.toValue),
					},
			)
			.toArray();
	}

	public static decode(v: string): string {
		return new URLSearchParams(`_=${v}`).get('_') || '';
	}

	public static encode(v: string): string {
		return new URLSearchParams(`_=${v}`).toString().slice(2);
	}

	public static toValue(value: string): SearchParamValue {
		return { id: crypto.randomUUID(), value };
	}
}
