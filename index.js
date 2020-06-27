// snapmaster middleware 
const fs = require('fs');
const YAML = require('yaml');

// if the /metadata endpoint was requested, return the 
// parsed 'actions.yml' definition file as a JSON payload
module.exports = (req, res, next) => {
  if (req.path === '/__metadata') {
    const provider = getDefinition(req);
    res.status(200).send(provider);
  } else {
    next();
  }
}

const getDefinition = (req) => {
  try {
    const definition = fs.readFileSync(`./actions.yml`, 'utf8');
    const provider = YAML.parse(definition);
    provider.text = definition;
    provider.url = req.protocol + '://' + req.get('host');
    // TODO: validation
    return provider;
  } catch (error) {
    console.log(`getDefinition: caught exception: ${error}`);
    return null;
  }
}
