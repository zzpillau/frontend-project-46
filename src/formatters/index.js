import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = {
  stylish: (diffTree) => stylish(diffTree),
  plain: (diffTree) => plain(diffTree),
  json: (diffTree) => json(diffTree),
};

const selectFormatter = (formatterName, diffTree) => {
  if (formatter[formatterName]) {
    return formatter[formatterName](diffTree);
  }
  throw new Error(`Unknown ${formatterName}`);
};

export default selectFormatter;
