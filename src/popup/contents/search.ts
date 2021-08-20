import { TConfigContext } from "../../common/config-context";

type SearchData = {
	enckey: string,
	encvalue: string,
	deckey: string,
	decvalue: string,
}

// window.location.searchから作成するクエリのマスターデータ。
// エンコード前後の値をSearchDataの配列で保持する
const SEARCH: SearchData[] = (() => {
	const search = window.location.search.slice(1); // 先頭の?を除くクエリパラメタ
	if (!search) return [];
	const result: SearchData[] = [];
	for (const keyvalue of search.split("&")) {
		const [enckey, ...v] = keyvalue.split("=");
		const encvalue = v.join("=");
		if (!enckey) continue; // keyがないならcontinue (?=foo&...)的な
		const [deckey, decvalue] = (() => {
			const tmp: string[] = new URLSearchParams(`${enckey}=${encvalue}`).entries().next().value;
			return [tmp[0], tmp[1]];
		})();
		result.push({ enckey, encvalue, deckey, decvalue });
	}
	return result;
})();

export type SearchEntry = {
	key: string,
	values: string[],
}
type Entry = {
	key: string,
	value: string,
}

export const makeSearchEntries = (context: TConfigContext): SearchEntry[] => {
	// keyがmodeとinclude/excludeの値において表示対象かどうか
	const isTarget = (key: string): boolean => {
		switch (context.mode) {
			case "none":
				return true;
			case "include":
				return context.include.indexOf(key) !== -1;
			case "exclude":
				return context.exclude.indexOf(key) === -1;
		}
	}
	const toEntry = (data: SearchData): Entry => {
		if (context.decode) return { key: data.deckey, value: data.decvalue };
		else return { key: data.enckey, value: data.encvalue };
	}

	const map = new Map<string, string[]>();
	for (const data of SEARCH) {
		if (!isTarget(data.enckey)) continue;
		const entry = toEntry(data);
		if (map.has(entry.key)) {
			map.get(entry.key)?.push(entry.value);
		} else {
			map.set(entry.key, [entry.value]);
		}
	}
	return Array.from(map, ([key, values]): SearchEntry => ({ key, values }));
}