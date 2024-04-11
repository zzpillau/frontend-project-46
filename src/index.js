// import path from 'path'
import parse from './parsers.js';
import makeString from './build-string.js';

const genDiff = (filepath1, filepath2) => {
// сюда перенести путь до файла и чтение

  const parseFile1 = parse(filepath1);
  const parseFile2 = parse(filepath2);
  return makeString(parseFile1, parseFile2); // пропустить через форматтер
};

export default genDiff;
