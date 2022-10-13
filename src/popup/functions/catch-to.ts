export const catchTo = <T>(supplier: () => T, if_catch: T) => {
	try {
		return supplier();
	} catch {
		return if_catch;
	}
};
