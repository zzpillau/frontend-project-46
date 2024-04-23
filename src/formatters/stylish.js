import _ from 'lodash';

const mark = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  changed: ['-', '+'],
  nested: ' ',
};

const stylish = (data, replacer = '    ') => {
  const iter = (currenData, depth) => {
    const currentIndent = (level) => replacer.repeat(level);

    const buildIndent = (diffMark) => {
      const additionalSpace = ' ';
      const typeIndent = `${diffMark}${additionalSpace}`;
      return currentIndent(depth).slice(2).concat(typeIndent);
    };

    const convertValue = (values, depthLevel) => {
      if (_.isObject(values)) {
        const valueIndent = currentIndent(depthLevel + 1);
        const valueContent = Object.entries(values)
          .map(([key, value]) => `${valueIndent}${key}: ${convertValue(value, depthLevel + 1)}`)
          .join('\n');
        return `{\n${valueContent}\n${currentIndent(depthLevel)}}`;
      }
      return `${values}`;
    };

    const lines = currenData.map((node) => {
      const { key, value, type, children } = node;
      if (children.length === 0) {
        if (type === 'changed') {
          const [valDeleted, valAdded] = value;
          const deletedStr = `${buildIndent(mark.deleted)}${key}: ${convertValue(valDeleted, depth)}`;
          const addedStr = `${buildIndent(mark.added)}${key}: ${convertValue(valAdded, depth)}`;
          return [deletedStr, addedStr].join('\n');
        }
        return `${buildIndent(mark[type])}${key}: ${convertValue(value, depth)}`;
      }
      const parentLine = `${buildIndent(mark[type])}${key}: {`;
      const childLine = `${iter(children, depth + 1)}\n${currentIndent(depth)}}`;
      return [parentLine, childLine].join('\n');
    });
    return [...lines].join('\n');
  };
  return `{\n${iter(data, 1)}\n}`;
};

export default stylish;
