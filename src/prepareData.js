import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import __dirname from './utils.js';

const prepareData = (relativePath) => {
  const methods = {
    makeAbsPath: () => path.resolve(__dirname, '..', '__fixtures__', relativePath),
    readFile: () => fs.readFileSync(methods.makeAbsPath(), 'utf-8'),
    getFormat: () => path.extname(relativePath).slice(1),
  };

  // console.log('getFormat', methods.getFormat());
  // console.log('readFile', methods.readFile());
  // console.log('makeAbsPath', methods.makeAbsPath());

  return parse(methods.readFile(), methods.getFormat());
};

// const makeAbsPath = (filepath) => path.resolve(__dirname, '..', '__fixtures__', filepath);

// const readFile = (filepath) => fs.readFileSync(makeAbsPath(filepath)).toString();

// const getFormat = (filePath) => path.extname(filePath).slice(1);

// const prepareData = (filepath) => {
//   const format = getFormat(filepath);
//   const pathToContent = makeAbsPath(filepath);
//   const content = readFile(pathToContent);
//   return parse(content, format);
// };

export default prepareData;
