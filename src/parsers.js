import yaml from 'js-yaml';

const parse = (pathToContent, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(pathToContent);
    case 'yaml':
      return yaml.load(pathToContent);
    case 'yml':
      return yaml.load(pathToContent);
    default:
      throw new Error(`Unknown format ${format}`);
  }
};

export default parse;
