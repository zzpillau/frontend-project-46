import path from 'path';
import fs from 'fs';
import __dirname from './utils.js';
import parse from './parsers.js';
import buildASTree from './buildASTree.js';
import selectFormatter from './formatters/index.js';

const parseContent = (relativePath) => {
  const action = {
    setAbsPath: () => path.resolve(__dirname, '..', '__fixtures__', relativePath),
    readFile: () => fs.readFileSync(action.setAbsPath(), 'utf-8'),
    getFormat: () => path.extname(relativePath).slice(1),
  };

  return parse(action.readFile(), action.getFormat());
};

const genDiff = (path1, path2, formatName = 'stylish') => {
  const content1 = parseContent(path1);
  const content2 = parseContent(path2);

  const data = buildASTree(content1, content2);

  return selectFormatter(formatName, data);
};

// console.log(genDiff('file1.json', 'file2.json', plain));

export default genDiff;
