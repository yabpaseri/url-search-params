export const compare = <T>(a: T, b: T) => {
	return a < b ? -1 : a > b ? 1 : 0;
};
