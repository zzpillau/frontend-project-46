import prepareData from './prepareData.js';
// import plain from './formatters/plain.js';
import stylish from './formatters/stylish.js';
import buildASTree from './buildASTree.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = prepareData(filepath1);
  const data2 = prepareData(filepath2);

  const tree = buildASTree(data1, data2);

  switch (formatter) {
    // case 'plain':
    //   return plain(data1, data2);
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Unknown ${formatter}`);
  }
};

// console.log(genDiff('file1.json', 'file2.json'));

export default genDiff;
