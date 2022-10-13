import { SearchParamValue } from './search-param-value';

export type SearchParam = {
	name: string;
	values: SearchParamValue[];
};

// ex:
// ?foo=1&foo=2&bar=3
// => { name: 'foo', values: ['1', '2'] };
// => { name: 'bar', values: ['3'] };
