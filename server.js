// Definition
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = 8081;
var server = require('http').Server(app);

// API file for interacting with MongoDB
var api = require('./server/mongo');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var io = require('socket.io')(server);

//call mongo to init self
api.getProducts();

// Sockets
io.on('connection', function(socket){
	console.log('store connected');

	var products = api.getProducts();
	for (prod in products){
		console.log('sending products');
		socket.emit('new-product', products[prod])
	}

    socket.on('disconnect', function() {
        console.log('store disconnected');
    });

    socket.on('send-message', (message) => {
		console.log('received message: ' + message);
    });
});

// Listen to port {port}
server.listen(port, () => console.log(`Running on localhost:${port}`));
