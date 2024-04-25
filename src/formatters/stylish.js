import _ from 'lodash';

const diffMark = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const SPACE_COUNT = 4;
const SPACER = ' ';

const currentIndent = (depthLevel) => {
  const currentSpacer = SPACER.repeat(SPACE_COUNT);
  return currentSpacer.repeat(depthLevel);
};

const buildIndent = (mark, depthLevel) => {
  const additionalSpace = ' ';
  const typeIndent = `${mark}${additionalSpace}`;
  const indent = currentIndent(depthLevel);
  const indentLength = indent.length;
  return typeIndent.padStart(indentLength, SPACER);
};

const convertValue = (values, depthLevel) => {
  if (!_.isObject(values)) {
    return `${values}`;
  }
  const valueIndent = currentIndent(depthLevel + 1);
  const valueContent = Object.entries(values)
    .map(([key, value]) => `${valueIndent}${key}: ${convertValue(value, depthLevel + 1)}`)
    .join('\n');
  return `{\n${valueContent}\n${currentIndent(depthLevel)}}`;
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
