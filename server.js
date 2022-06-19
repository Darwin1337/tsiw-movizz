const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const history = require('connect-history-api-fallback');

app.use(history());    
app.use(serveStatic(__dirname))

app.listen(port);