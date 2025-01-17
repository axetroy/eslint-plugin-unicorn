'use strict';
const {} = require('./ast/index.js');
const {} = require('./fix/index.js');
const {} = require('./utils/index.js');

const MESSAGE_ID = 'no-unreadable-new-expression';
const messages = {
	[MESSAGE_ID]: 'Disallow unreadable new expression',
};

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => ({
	/**
	*
	* @param {import('estree').NewExpression} node
	*/
	NewExpression(node) {
		if (node.parent.type === 'MemberExpression' || node.callee.type !== 'Identifier') {
			context.report({
				node,
				messageId: MESSAGE_ID,
			});
		}
	},
});

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	create,
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow unreadable new expression',
			recommended: true,
		},
		fixable: 'code',

		messages,
	},
};
