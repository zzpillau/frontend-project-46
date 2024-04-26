import _ from 'lodash';

const convertValue = (value) => {
  if (_.isObject(value)) {
    return `[complex value]`;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (data) => {
  const iter = (currenData, currentKeyName = '') => {
    const lines = currenData.flatMap((node) => {
      const { key, type, children, value, modifiedValue } = node;

      const pathToKey = `${currentKeyName}${key}`;

      const convertedValue = convertValue(value);

      switch (type) {
        case 'changed':
          return `Property '${pathToKey}' was updated. From ${convertedValue} to ${convertValue(modifiedValue)}`;
        case 'deleted':
          return `Property '${pathToKey}' was removed`;
        case 'added':
          return `Property '${pathToKey}' was added with value: ${convertedValue}`;
        case 'nested':
          return iter(children, `${pathToKey}.`);
        default:
          return [];
      }
    });
    return [...lines].join('\n');
  };
  return iter(data);
};

export default plain;
