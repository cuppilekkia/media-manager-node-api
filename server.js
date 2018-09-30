let express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port);

let folderRoutes = require('./api/routes/folder');
folderRoutes(app);

let fileRoutes = require('./api/routes/file');
fileRoutes(app);

console.log('server started on: ' + port);