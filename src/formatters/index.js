//  тут реализовать выбор форматтеров ???
import stylish from './stylish.js';
import plain from './plain.js';

const selectFormatter = (formatterName, data) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`Unknown ${formatterName}`);
  }
};

export default selectFormatter;
