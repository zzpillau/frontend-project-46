import _ from 'lodash';

const makeString = (data1, data2, indent = '  ') => {
  const doubleIndent = indent.repeat(2);
  const allKeys = _.union([...Object.keys(data1), ...Object.keys(data2)]).sort();
  const lines = allKeys.map((key) => {
    if (Object.hasOwn(data2, key)) {
      if (!Object.hasOwn(data1, key)) {
        return `${indent}+ ${key}: ${data2[key]}`;
      }
      return data1[key] === data2[key] ? `${doubleIndent}${key}: ${data1[key]}` : `${indent}- ${key}: ${data1[key]}\n${indent}+ ${key}: ${data2[key]}`;
    }
    return `${indent}- ${key}: ${data1[key]}`;
  });

  return ['{', ...lines, '}'].join('\n');
};

export default makeString;
