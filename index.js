// snapmaster middleware 
const fs = require('fs');
const YAML = require('yaml');

let definition = getDefinition();

// if the /metadata endpoint was requested, return the 
// parsed 'actions.yml' definition file as a JSON payload
module.exports = (req, res, next) => {
  if (!definition) {
    definition = getDefinition();
    if (!definition) {
      const message = `express-snapmaster-middleware: actions.yml not found`;
      console.error(message);
      res.status(200).send({ status: 'error', message: message });
      return;
    }
  }

  // if the metadata endpoint was requested, return it now
  if (req.path === '/__metadata') {
    const provider = getDefinition(req);
    res.status(200).send(provider);
    return;
  } 

  // check the parameters for the request against the YAML spec
  const error = checkParams(req);
  if (error) {
    res.status(200).send({ status: 'error', message: error });
    return;
  } 

  // pass the request forward
  next();
}

const getDefinition = (req) => {
  try {
    const definition = fs.readFileSync(`./actions.yml`, 'utf8');
    const provider = YAML.parse(definition);
    provider.text = definition;

    // TODO: validation
    return provider;
  } catch (error) {
    console.log(`getDefinition: caught exception: ${error}`);
    return null;
  }
}

const checkParams = (req) => {
  // get action name
  const action = req.path.split('/')[1];

  // get action definition
  const def = definition.actions && definition.actions.find(a => a.name === action);
  if (!def) {
    return `express-snapmaster-middleware: action ${action} not found`;    
  }

  for (const param of def) {
    if (param.required && !req.body[param.name]) {
      return `express-snapmaster-middleware: required parameter ${param.name} for ${action} not found`;
    }
  }

  // indicate success
  return null;
}