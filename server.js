var express = require('express');
var app = express();

app.use(express.static('public'));

app.use('/scripts', express.static(__dirname + '/node_modules/babel-core/lib/api'));
app.use('/scripts', express.static(__dirname + '/node_modules/react/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/react-dom/dist'));
app.use('/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.listen(3000, function () {
    console.log('Express server is up on port 3000');
});


