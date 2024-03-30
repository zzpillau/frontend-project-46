import fs from 'fs';
import path from 'path';
import __dirname from './utils.js';
import yaml from 'js-yaml';

const makeAbsPath = (filepath) => path.resolve(__dirname, '..', '__fixtures__', filepath);

const getFormat = (filePath) => path.extname(filePath).slice(1);

const parse = (filepath) => {
  const readFile = fs.readFileSync(makeAbsPath(filepath)).toString();
  const format = getFormat(filepath);

  switch (format) {
    case 'json':
      return JSON.parse(readFile);
    case 'yaml':
      return yaml.load(readFile);
    case 'yml':
      return yaml.load(readFile);
    default:
      throw new Error(`Unknown format ${format}`);
  }
};

export default parse;
