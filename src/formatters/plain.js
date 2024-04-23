import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return `[complex value]`;
  }
  if (_.isString(value)) {
    return value === 'null' ? `${value}` : `'${value}'`;
  }
  return value;
};

const makePathToKey = (someData, someKey) =>
  someData.reduce((acc, item) => {
    const { key, children } = item;
    if (key !== someKey) {
      const hasChildren = children.length > 0;
      if (hasChildren && !acc.includes(someKey)) {
        return [key, makePathToKey(children, someKey)].flat();
      }
    } else {
      return [key];
    }
    return acc;
  }, []);

const plain = (data) => {
  const formatPlain = (tree) => {
    const lines = tree.flatMap((node) => {
      const { key, value, type, children } = node;

      const pathToKey = makePathToKey(data, key).join('.');

      const formattedValue = formatValue(value);

      if (children.length === 0) {
        if (type === 'changed') {
          const [valDeleted, valAdded] = value;
          return `Property '${pathToKey}' was updated. From ${formatValue(valDeleted)} to ${formatValue(valAdded)}`;
        }
        if (type === 'deleted') {
          return `Property '${pathToKey}' was removed`;
        }
        if (type === 'added') {
          return `Property '${pathToKey}' was added with value: ${formattedValue}`;
        }
        return [];
      }
      return formatPlain(children);
    });
    return [...lines].join('\n');
  };
  return formatPlain(data);
};

export default plain;
