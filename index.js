// snapmaster middleware 

// if the /metadata endpoint was requested, return the 
// parsed 'actions.yml' definition file as a JSON payload
exports.snapmaster = (req, res, next) => {
  if (req.path === '/metadata') {
    const provider = getDefinition();
    res.status(200).send(provider);
  } else {
    next();
  }
}

const getDefinition = () => {
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