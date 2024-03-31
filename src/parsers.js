import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import __dirname from './utils.js';

const makeAbsPath = (filepath) => path.resolve(__dirname, '..', '__fixtures__', filepath);

const getFormat = (filePath) => path.extname(filePath).slice(1);

const readFile = (filepath) => fs.readFileSync(makeAbsPath(filepath)).toString();

const parse = (filepath) => {
  const format = getFormat(filepath);

  switch (format) {
    case 'json':
      return JSON.parse(readFile(filepath));
    case 'yaml':
      return yaml.load(readFile(filepath));
    case 'yml':
      return yaml.load(readFile(filepath));
    default:
      throw new Error('Unknown format');
  }
};

export default parse;
