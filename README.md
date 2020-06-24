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

## Usage

```
const express = require('express');
const bodyParser = require('body-parser');
const { snapmaster } = require('snapmaster-actions');

const app = express();
app.use(bodyParser.json());

// enable the snapmaster middleware for ALL requests
app.use(snapmaster);

// ...OR, include the 'snapmaster' middleware in the express route
app.use('/send', snapmaster, (req, res) => {
  res.status(200).send({ message: success });
});
```

## Running locally

`node index.js` in the root directory of this project will run an HTTP server on localhost:5555.

