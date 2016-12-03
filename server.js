var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

// Manage https request
/*app.use(function (req, res, next) {
    if (req.headers['x-forward-proto'] == 'https') {
        res.redirect(`http://${req.hostname}${req.url}`);
    } else {
        next();
    }
});*/

app.use(express.static('public'));

/*
app.use('/scripts', express.static(__dirname + '/node_modules/babel-core/lib/api'));
app.use('/scripts', express.static(__dirname + '/node_modules/react/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/react-dom/dist'));
*/

app.listen(port, function () {
    console.log(`Express server is up on port ${port}`);
});


