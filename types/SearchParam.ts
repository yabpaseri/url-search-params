import { SearchParamValue } from './SearchParamValue';

// e.g. "fizz=1&fizz=2&buzz=3"
// [
// 	{name: 'fizz', values: [{id: "...", value: "1"}, {id: "...", value: "2"}]}
// 	{name: 'buzz', values: [{id: "...", value: "3"}]}
// ]

export type SearchParam = {
	// `key` is reserved in React, so using `name` instead.
	name: string;
	decoded_name: string;
	values: SearchParamValue[];
};
