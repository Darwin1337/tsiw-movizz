const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use('/',serveStatic(path.join(__dirname,'/dist')));
app.use(history());    
app.use(serveStatic(__dirname))

app.listen(port);