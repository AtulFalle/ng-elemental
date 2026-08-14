import { extractHostClassNames, isBemClassName } from '../utils/bem.mjs';

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require NgElemental BEM class names (el-block, el-block__element, el-block--modifier) in component host metadata',
    },
    schema: [],
    messages: {
      invalidBemClass:
        'Class "{{name}}" must follow BEM with the el- prefix (e.g. el-button, el-button--primary, el-label__required).',
    },
  },
  create(context) {
    return {
      'Decorator[expression.callee.name="Component"] ObjectExpression > Property[key.name="host"] ObjectExpression'(
        hostNode,
      ) {
        for (const className of extractHostClassNames(hostNode)) {
          if (!isBemClassName(className)) {
            context.report({
              node: hostNode,
              messageId: 'invalidBemClass',
              data: { name: className },
            });
          }
        }
      },
    };
  },
};

export default rule;
