import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parseJSON = (filepath) => {
  const absPath = path.resolve(__dirname, '..', '__fixtures__', filepath);
  // console.log('absPath', absPath);
  const readFile = fs.readFileSync(absPath).toString();
  // console.log('readFile', readFile);
  return JSON.parse(readFile);
};

export default parseJSON;
