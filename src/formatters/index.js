//  тут реализовать выбор форматтеров ???
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// привести в порядок: форматтер и его вызов тоже вынести в объект

const selectFormatter = (formatterName, data) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`Unknown ${formatterName}`);
  }
};

export default selectFormatter;
