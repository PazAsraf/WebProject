// Definition
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8081;
const http = require('http');

// API file for interacting with MongoDB
const api = require('./server/mongo');

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

const server = http.createServer(app);
var io = require('socket.io').listen(server);

// Sockets
io.sockets.on('connection', function (client) {

		client.on('categories', function(data){
				console.log('cat!');
				console.log(data);
				client.broadcast.emit("categories", data);
		});
		console.log("Connected!");
		console.log(client.id);
});

// Listen to port 8080
server.listen(port, () => console.log(`Running on localhost:${port}`));
