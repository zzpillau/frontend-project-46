import makeString from './build-string.js';
import prepareData from './prepareData.js';

// сделать это все методами!!!

const genDiff = (filepath1, filepath2) => {
  const data1 = prepareData(filepath1);
  const data2 = prepareData(filepath2);

  return makeString(data1, data2); // пропустить через форматтер
};

// console.log(genDiff('file1plain.json', 'file2plain.json'));

export default genDiff;
