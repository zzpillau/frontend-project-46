// import path from 'path'
import parse from './parsers.js';
import makeString from './build-string.js';

const genDiff = (filepath1, filepath2) => {
  const parseFile1 = parse(filepath1);
  const parseFile2 = parse(filepath2);
  // console.log(parseFile1);
  // console.log(parseFile2);
  return makeString(parseFile1, parseFile2);
};

// console.log(genDiff(filepath1, filepath2));
export default genDiff;
