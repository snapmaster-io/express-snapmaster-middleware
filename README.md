![SnapMaster](https://github.com/snapmaster-io/snapmaster/raw/master/public/SnapMaster-logo-220.png)
# SnapMaster 
## Master your DevOps toolchain

SnapMaster is the definitive DevOps integration platform.  

## Purpose

This repository contains the SnapMaster Actions Express middleware. 

This middleware makes it easy to create a SnapMaster Action - for 
example as a Cloud Function.

A SnapMaster Action implements the Action Contract.  This includes 
honoring the request for Action Metadata via the `/__metadata` endpoint.

The middleware processes the `/__metadata` endpoint request and returns 
a JSON representation of the parsed `actions.yml` file that defines the 
actions supported by the SnapMaster action provider.

Note that this middlware is used by the more turnkey package 
[express-snapmaster](https://github.com/snapmaster-io/express-snapmaster).
Users that don't require control over the Express server can just use 
the above package.

## Usage

```
const express = require('express');
const bodyParser = require('body-parser');
const snapmaster = require('snapmaster-express-middleware');

const app = express();
app.use(bodyParser.json());

// enable the snapmaster middleware for ALL requests
app.use(snapmaster);

// ...OR, include the 'snapmaster' middleware in the express route
app.use('/send', snapmaster, (req, res) => {
  res.status(200).send({ message: success });
});
```

