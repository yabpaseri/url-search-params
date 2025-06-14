export const catchTo = <T1, T2>(supplier: () => T1, def: T2): T1 | T2 => {
	try {
		return supplier();
	} catch {
		return def;
	}
};
