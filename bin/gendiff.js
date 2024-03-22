#!/usr/bin/env node

import { program } from 'commander'
// import genFilesDiff from '../src/index.js'

import fs from 'fs';
import path from 'path'
// import parseJSON from './parse.js'
import _ from 'lodash'


const parseJSON = (filepath) => {
  const absPath = path.resolve(filepath);
  console.log('absPath', absPath);
  const readFile = fs.readFileSync(absPath).toString();
  console.log('readFile', readFile);
  return JSON.parse(readFile);
}


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

// const genFilesDiff = (filepath1, filepath2, format = 'json') => {
//   const parseFile1 = parseJSON(filepath1);
//   const parseFile2 = parseJSON(filepath2);
//   console.log(parseFile1);
//   console.log(parseFile2);
//   console.log(getDifference(parseFile1, parseFile2));
// }



program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('filepath1 filepath2')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
      const parseFile1 = parseJSON(filepath1);
      const parseFile2 = parseJSON(filepath2);
      console.log(parseFile1);
      console.log(parseFile2);
      console.log(getDifference(parseFile1, parseFile2));
    })
  .parse(process.argv)


