'use strict';
const isMethodNamed = require('./utils/is-method-named.js');
const simpleArraySearchRule = require('./shared/simple-array-search-rule.js');
const {isLiteral, isNegativeOne} = require('./ast/index.js');

const MESSAGE_ID = 'prefer-includes';
const messages = {
	[MESSAGE_ID]: 'Use `.includes()`, rather than `.{{method}}()`, when checking for existence.',
};
// Ignore `{_,lodash,underscore}.{indexOf,lastIndexOf}`
const ignoredVariables = new Set(['_', 'lodash', 'underscore']);
const isIgnoredTarget = node => node.type === 'Identifier' && ignoredVariables.has(node.name);
const isLiteralZero = node => isLiteral(node, 0);
const isNegativeResult = node => ['===', '==', '<'].includes(node.operator);

const getProblem = (context, node, target, argumentsNodes) => {
	const {sourceCode} = context;
	const memberExpressionNode = target.parent;
	const dotToken = sourceCode.getTokenBefore(memberExpressionNode.property);
	const targetSource = sourceCode.getText().slice(memberExpressionNode.range[0], dotToken.range[0]);

	// Strip default `fromIndex`
	if (isLiteralZero(argumentsNodes[1])) {
		argumentsNodes = argumentsNodes.slice(0, 1);
	}

	const argumentsSource = argumentsNodes.map(argument => sourceCode.getText(argument));

	return {
		node: memberExpressionNode.property,
		messageId: MESSAGE_ID,
		data: {
			method: node.left.callee.property.name,
		},
		fix(fixer) {
			const replacement = `${isNegativeResult(node) ? '!' : ''}${targetSource}.includes(${argumentsSource.join(', ')})`;
			return fixer.replaceText(node, replacement);
		},
	};
};

const includesOverSomeRule = simpleArraySearchRule({
	method: 'some',
	replacement: 'includes',
});

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
	includesOverSomeRule.listen(context);

	context.on('BinaryExpression', node => {
		const {left, right, operator} = node;

		if (!isMethodNamed(left, 'indexOf') && !isMethodNamed(left, 'lastIndexOf')) {
			return;
		}

		const target = left.callee.object;

		if (isIgnoredTarget(target)) {
			return;
		}

		const {arguments: argumentsNodes} = left;

		// Ignore something.indexOf(foo, 0, another)
		if (argumentsNodes.length > 2) {
			return;
		}

		if (
			(['!==', '!=', '>', '===', '=='].includes(operator) && isNegativeOne(right))
			|| (['>=', '<'].includes(operator) && isLiteralZero(right))
		) {
			return getProblem(
				context,
				node,
				target,
				argumentsNodes,
			);
		}
	});
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Prefer `.includes()` over `.indexOf()`, `.lastIndexOf()`, and `Array#some()` when checking for existence or non-existence.',
			recommended: true,
		},
		fixable: 'code',
		hasSuggestions: true,
		messages: {
			...messages,
			...includesOverSomeRule.messages,
		},
	},
};
