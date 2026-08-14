import { extractTemplateClassNames, isBemClassName } from '../utils/bem.mjs';

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require NgElemental BEM class names on static class attributes in Angular templates',
    },
    schema: [],
    messages: {
      invalidBemClass:
        'Class "{{name}}" must follow BEM with the el- prefix (e.g. el-button, el-button--primary, el-label__required).',
    },
  },
  create(context) {
    const parserServices = context.sourceCode.parserServices;
    const templateVisitor =
      parserServices?.defineTemplateBodyVisitor ??
      parserServices?.defineTemplateVisitor;

    if (!templateVisitor) {
      return {};
    }

    return templateVisitor({
      TextAttribute(node) {
        if (node.name !== 'class' || !node.value) {
          return;
        }

        for (const className of extractTemplateClassNames(node.value)) {
          if (!isBemClassName(className)) {
            context.report({
              loc: node.sourceSpan
                ? {
                    start: parserServices.convertNodeSourceSpanToLoc(node)
                      .start,
                    end: parserServices.convertNodeSourceSpanToLoc(node).end,
                  }
                : node.loc,
              messageId: 'invalidBemClass',
              data: { name: className },
            });
          }
        }
      },
    });
  },
};

export default rule;
