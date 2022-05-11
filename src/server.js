// -----------------------------------
//  Modules import
// -----------------------------------
require('dotenv').config();
const express = require('express');
const app = express();

// -----------------------------------
//  External scripts import
// -----------------------------------
const varietiesRoute = require('./routers/varietiesRoute');
const speciesRoute = require('./routers/speciesRoute');

// -----------------------------------
//  Server config
// -----------------------------------
app.use(express.json());

// -----------------------------------
//  Routes config
// -----------------------------------
app.use('/varieties', varietiesRoute);
app.use('/species', speciesRoute);

// -----------------------------------
//  Server launching
// -----------------------------------
const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}...`));