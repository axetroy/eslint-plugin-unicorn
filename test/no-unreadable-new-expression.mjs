import outdent from 'outdent';
import {getTester} from './utils/test.mjs';

const {test} = getTester(import.meta);

test.snapshot({
	valid: [
		'const foo = new Foo();',
	],
	invalid: [
		'const bar = new Foo().getBar();',
	],
});
