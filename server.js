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

// Sockets
var myio = io.on('connection', function(socket){
	console.log('store connected');

	var products = api.getProducts().then(products => {
		for (prod in products){
			socket.emit('new-product', products[prod])
		}
	});

    socket.on('disconnect', function() {
        console.log('store disconnected');
	});
	
	socket.on('add-product', function(product) {
		console.log("add product message");
		api.createProduct(product).then(product => {
			io.sockets.emit('new-product', product);
		});
	});

	socket.on('delete-product', function(product) {
		console.log("received delete product message");
		api.deleteProduct(product).then(product => {
			console.log("sending delete product message");
			io.sockets.emit('delete-product', product);
		});
	});

	socket.on('update-product', function(product) {
		console.log("received update product message");
		api.updateProduct(product).then(product => {
			console.log("sending update product message");
			io.sockets.emit('update-product', product);
		});
	});

    socket.on('send-message', (message) => {
		console.log('received message: ' + message);
	});
});


// Listen to port {port}
server.listen(port, () => console.log(`Running on localhost:${port}`));