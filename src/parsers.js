import yaml from 'js-yaml';

const parser = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (pathToContent, format) => {
  if (parser[format]) {
    return parser[format](pathToContent);
  }
  throw new Error(`Unsupported format ${format}`);
};

export default parse;
