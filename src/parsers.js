import yaml from 'js-yaml';

// привести в порядок: формат и парсер вынести в объект, по аналогии с другими модулями.
// В итоге не будет свитча

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
