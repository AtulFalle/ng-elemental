/** BEM block/element/modifier pattern for NgElemental (`el-*` prefix). */
export const BEM_CLASS_PATTERN =
  /^el-[a-z][a-z0-9-]*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$/;

export function isBemClassName(name) {
  return BEM_CLASS_PATTERN.test(name);
}

/** Extract BEM class names from host metadata object keys and values. */
export function extractHostClassNames(hostNode) {
  const names = [];

  if (!hostNode || hostNode.type !== 'ObjectExpression') {
    return names;
  }

  for (const property of hostNode.properties) {
    if (property.type !== 'Property') {
      continue;
    }

    const key = property.key;

    if (
      key.type === 'Identifier' &&
      key.name === 'class' &&
      property.value.type === 'Literal' &&
      typeof property.value.value === 'string'
    ) {
      for (const part of property.value.value.split(/\s+/)) {
        if (part) {
          names.push(part);
        }
      }
      continue;
    }

    if (
      key.type === 'Literal' &&
      typeof key.value === 'string' &&
      key.value.startsWith('[class.')
    ) {
      const match = /^\[class\.([^\]]+)\]/.exec(key.value);
      if (match) {
        names.push(match[1]);
      }
    }
  }

  return names;
}

/** Extract static class names from HTML templates. */
export function extractTemplateClassNames(classAttrValue) {
  return classAttrValue
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}
