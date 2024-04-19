// import _ from 'lodash';
// // import buildASTree from '../buildASTree.js';
// // import prepareData from '../prepareData.js';

// // const ASTree = buildASTree(prepareData('file1.json'), prepareData('file2.json'));
// // console.log(ASTree);
// // console.log(JSON.stringify(ASTree, null, '  '));

// const mark = {
//   added: '+',
//   deleted: '-',
//   unchanged: ' ',
//   changed: ['-', '+'],
//   nested: ' ',
// };

// const stylish = (data, depth = 1, replacer = '    ', spaceCount = 1) => {
//   // const iter = (currenData, depth) => {
//     const indentSize = depth * spaceCount;
//     const bracketIndent = replacer.repeat(indentSize - spaceCount);

//   const currentIndent = (depth) => replacer.repeat(depth);
//   const newIndent = (diffMark) => {
//     const additionalSpace = ' ';
//     const typeIndent = `${diffMark}${additionalSpace}`;
//     return currentIndent(depth).slice(2).concat(typeIndent);
//   };

//   const convertValue = (values, depth) => {
//     if (_.isObject(values)) {
//       const objectIndent = currentIndent(depth + 1);
//       const objectContent = Object.entries(values)
//         .map(([key, value]) => `${objectIndent}${key}: ${convertValue(value, depth + 1)}`)
//         .join('\n');
//       return `{\n${objectContent}\n${currentIndent(depth)}}`;
//     }
//     return `${values}`;
//   };

//   const lines = data.map((node) => {
//     const {
//       key,
//       value,
//       type,
//       children,
//     } = node;

//     // нет детей
//     if (children.length === 0) {
//       // type changed
//       if (type === 'changed') {
//         const [valDeleted, valAdded] = value;
//         const [delMark, addMark] = mark.changed;
//         const deletedStr = `${newIndent((delMark))}${key}: ${convertValue(valDeleted, depth)}`;
//         const addedStr = `${newIndent(addMark)}${key}: ${convertValue(valAdded, depth)}`;
//         return [deletedStr, addedStr].join('\n');
//       }
//       // нет детей, все остальные типы added deleted unchanged
//       return `${newIndent(mark[type])}${key}: ${convertValue(value, depth)}`;
//     }
//     // type nested!!! iter запускается на children, глубина увеличивается
//     const parentStr = `${newIndent(mark[type])}${key}: {`;
//     const childStr = `${stylish(children, depth + 1)}`;
//     return [parentStr, childStr].join('\n');
//   });

//   return [...lines, `${bracketIndent}}`].join('\n');
// };
//   // return `{\n${iter(data, 1)}`;
// // };

// // console.log(JSON.stringify(stylish(ASTree), null, '  '));
// // console.log(stylish(ASTree));

// export default stylish;
