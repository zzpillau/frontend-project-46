import fs from 'fs';
import path from 'path'
import parseJSON from './parse.js'
import _ from 'lodash'

const filepath1 = '/home/zzpillau/frontend-project-46/__fixtures__/file1.json'
const filepath2 = '/home/zzpillau/frontend-project-46/__fixtures__/file2.json'


const getNameAndExt = (filePath) => {
  const fileName = path.basename(filePath);
  const extName = path.extname(filePath);
  return {fileName, extName}
}

// console.log('parseJSON', parseJSON(filepath1));

const getDifference = (data1, data2) => {
  const allKeys = _.union([...Object.keys(data1), ...Object.keys(data2)]);
  console.log(allKeys);
  const result = {};
  allKeys.forEach((key) => {
    if (Object.hasOwn(data2, key)) {
      result[key] = (data1[key] === data2[key] ? 'unchanged' : 'changed');
      if (!Object.hasOwn(data1, key)) {
        result[key] = 'added';
      }
    } else {
      result[key] = 'deleted';
    }
  })
  return result;
}

const stringify = () => {
  // реализовать НЕ рекурсивный пока что стингифай. А можно и рекурсивный
}

const genFilesDiff = (filepath1, filepath2, format = 'json') => {
  const parseFile1 = parseJSON(filepath1);
  const parseFile2 = parseJSON(filepath2);
  console.log(parseFile1);
  console.log(parseFile2);
  console.log(getDifference(parseFile1, parseFile2));
}

// console.log(genFilesDiff(filepath1, filepath2));
export default genFilesDiff;


