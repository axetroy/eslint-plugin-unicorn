# Prefer immutable array methods to generate new arrays over modifying original array objects

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/sindresorhus/eslint-plugin-unicorn#preset-configs-eslintconfigjs).

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->
<!-- Do not manually modify this header. Run: `npm run fix:eslint-docs` -->

`Array#sort()`, `Array#reverse()`, `Array#splice()`, and `Array#[index]` modify the original array, which can lead to unexpected behavior and bugs. To avoid these issues, prefer using immutable methods like `Array#toSorted()`, `Array#toReversed()`, `Array#toSpliced()`, and `Array#with()` to generate new arrays without altering the original one.

## Examples

```js
const newArray = [3,2,1].sort() // ❌
const newArray = [3,2,1].toSorted() // ✅

const newArray = array.reverse() // ❌
const newArray = array.toReversed() // ✅

const newArray = array.splice(start, deleteCount) // ❌
const newArray = array.toSpliced(start, deleteCount) // ✅

array[0] = 'changed' // ❌
array.with(0, 'changed') // ✅
```
