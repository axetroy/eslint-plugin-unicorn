import outdent from 'outdent';
import {getTester} from './utils/test.mjs';

const {test} = getTester(import.meta);

test.snapshot({
	valid: [
		'const foo = new Foo();',
		outdent`
			const foo = new Foo();
			const bar = foo.getBar();
		`,
		outdent`
			const foo = new Foo()
			const Bar = foo.Bar;
		`,
		outdent`
			const {Bar} = foo;
			const bar = new Bar();
		`,
	],
	invalid: [
		'const bar = new Foo().getBar();',
		'const Bar = new Foo().Bar;',
		'const Bar = new (Foo());',
		'const Bar = new (Foo())();',
		'const Bar = new (Foo().Bar);',
		'const bar = new foo.Bar();',
		'const bar = new (foo.Bar)();',
		'const bar = (new foo).Bar();',
		'const bar = new foo().Bar();',
		outdent`
			function foo() {
				return {
					Bar: function () {}
				}
			}

			const bar = new (foo().Bar)();
		`,
		'const bar = new ((0, Foo)).Bar();',
		'const bar = new ((() => Foo)()).Bar();',
	],
});
