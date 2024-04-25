import _ from 'lodash';

const diffMark = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const SPACE_COUNT = 4;
const REPLACER = ' ';

const currentReplacer = REPLACER.repeat(SPACE_COUNT);

const currentIndent = (depthLevel, replacer = currentReplacer) => replacer.repeat(depthLevel);

const buildIndent = (mark, depthLevel) => {
  const additionalSpace = ' ';
  const typeIndent = `${mark}${additionalSpace}`;
  const indent = currentIndent(depthLevel);
  return indent.slice(typeIndent.length).concat(typeIndent);
};
// console.log(buildIndent(diffMark.added, 1));

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

const stylish = (data) => {
  const iter = (currenData, depth) => {
    const lines = currenData.map((node) => {
      const { key, type, children, value, addedValue } = node;

      const build = {
        deletedLine: `${buildIndent(diffMark.deleted, depth)}${key}: ${convertValue(value, depth)}`,
        addedLine: `${buildIndent(diffMark.added, depth)}${key}: ${convertValue(addedValue, depth)}`,
        rootLine: `${buildIndent(diffMark[type], depth)}${key}: {`,
        childLine: `${iter(children, depth + 1)}\n${currentIndent(depth)}}`,
        defaultLine: `${buildIndent(diffMark[type], depth)}${key}: ${convertValue(value, depth)}`,
      };

      switch (type) {
        case 'changed':
          return [build.deletedLine, build.addedLine].join('\n');
        case 'nested':
          return [build.rootLine, build.childLine].join('\n');
        default:
          return build.defaultLine;
      }
    });
    return [...lines].join('\n');
  };
  return `{\n${iter(data, 1)}\n}`;
};

export default stylish;
