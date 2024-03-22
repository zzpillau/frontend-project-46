import fs from 'fs';
import path from 'path'


const parseJSON = (filepath) => {
  const absPath = path.resolve(filepath);
  console.log('absPath', absPath);
  const readFile = fs.readFileSync(absPath).toString();
  console.log('readFile', readFile);
  return JSON.parse(readFile);
}

export default parseJSON;