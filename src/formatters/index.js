//  тут реализовать выбор форматтеров ???
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const selectFormatter = (formatterName, diffTree) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree);
    default:
      throw new Error(`Unknown ${formatterName}`);
  }
};

export default selectFormatter;
