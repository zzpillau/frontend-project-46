// import path from 'path'
import parseJSON from './parse.js'
import _ from 'lodash'

// const filepath1 = '/home/zzpillau/frontend-project-46/__fixtures__/file1.json'
// const filepath2 = '/home/zzpillau/frontend-project-46/__fixtures__/file2.json'


// const getNameAndExt = (filePath) => {
//   const fileName = path.basename(filePath);
//   const extName = path.extname(filePath);
//   return {fileName, extName}
// }

// console.log('parseJSON', parseJSON(filepath1));

const makeString = (data1, data2, indent = '  ') => {
  const allKeys = _.union([...Object.keys(data1), ...Object.keys(data2)]);
  // console.log(allKeys);
  // const diffInfo = {};

  // allKeys.forEach((key) => {
  //   // console.log(!!data1[key], '!!data1[key]', key);
  //   // console.log(data1[key] === data2[key], 'data1[key] === data2[key]', key);

  //   if (Object.hasOwn(data2, key)) {
  //     diffInfo[key] = !!data1[key] && data1[key] === data2[key] ? 'unchanged' : 'changed';
  //     if (!Object.hasOwn(data1, key)) {
  //       diffInfo[key] = 'added';
  //     }
  //   } else {
  //     diffInfo[key] = 'deleted';
  //   }
  // })
  // console.log(diffInfo);

  const lines = allKeys.map((key) => {
    if (Object.hasOwn(data2, key)) {
      if (!Object.hasOwn(data1, key)) {
        return `${indent}+ ${key}: ${data2[key]}`
      }
      return data1[key] === data2[key] ? `${indent.repeat(2)}${key}: ${data1[key]}` : `${indent}- ${key}: ${data1[key]}\n${indent}+ ${key}: ${data2[key]}`;
    }
    return `${indent}- ${key}: ${data1[key]}`
  })



  return ['{', ...lines, '}'].join('\n');
}

  // реализовать рекурсивный стингифай для объектов



const genFilesDiff = (filepath1, filepath2, format = 'json') => {
  const parseFile1 = parseJSON(filepath1);
  const parseFile2 = parseJSON(filepath2);
  console.log(parseFile1);
  console.log(parseFile2);
  return makeString(parseFile1, parseFile2);
}

// console.log(genFilesDiff(filepath1, filepath2));
export default genFilesDiff;


