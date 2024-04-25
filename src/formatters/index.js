//  тут реализовать выбор форматтеров ???
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = {
  stylish: (data) => stylish(data),
  plain: (data) => plain(data),
  json: (data) => json(data),
};

const selectFormatter = (formatterName, data) => {
  if (formatter[formatterName]) {
    return formatter[formatterName](data);
  }
  throw new Error(`Unknown ${formatterName}`);
};

export default selectFormatter;
