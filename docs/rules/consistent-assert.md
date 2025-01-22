# Enforce consistent assertion styles with `node:assert`

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/sindresorhus/eslint-plugin-unicorn#preset-configs-eslintconfigjs).

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->
<!-- Do not manually modify this header. Run: `npm run fix:eslint-docs` -->

Prefer `assert.ok` for its explicit intent and better readability. It aligns with other assert methods, ensuring consistency and making code easier to maintain and understand.

## Examples

```js
import assert from 'node:assert';

// ❌
assert(true);

// ✅
assert.ok(true);
```

```js
import {strict as assert} from 'node:assert';

// ❌
assert(true);

// ✅
assert.ok(true);
```

```js
import assert from 'node:assert/strict';

// ❌
assert(true);

// ✅
assert.ok(true);
```
