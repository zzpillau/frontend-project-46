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
    // console.log(currenData);
    // console.log(typeof currenData, 'typeof currenData');

    const lines = currenData.map((node) => {
      const { key, value, type, children } = node;

      // нет детей
      if (children.length === 0) {
        // type changed
        if (type === 'changed') {
          const [valDeleted, valAdded] = value;
          const [delMark, addMark] = mark.changed;
          const deletedStr = `${buildIndent(delMark)}${key}: ${convertValue(valDeleted, depth)}`;
          const addedStr = `${buildIndent(addMark)}${key}: ${convertValue(valAdded, depth)}`;
          return [deletedStr, addedStr].join('\n');
        }
        // нет детей, все остальные типы added deleted unchanged
        return `${buildIndent(mark[type])}${key}: ${convertValue(value, depth)}`;
      }
      // type nested!!! iter запускается на children, глубина увеличивается
      const parentStr = `${buildIndent(mark[type])}${key}: {`;
      const childStr = `${iter(children, depth + 1)}\n${currentIndent(depth)}}`;
      return [parentStr, childStr].join('\n');
    });
    return [...lines].join('\n');
  };
  return `{\n${iter(data, 1)}\n}`;
};

export default stylish;
