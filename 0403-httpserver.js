// Filename: 0403-httpserver.js
// Course: Dicoding- Back End Basics
// Description: Module 0403 Membangun Web Service menggunakan Node.js- Membuat HTTP server
// Repository: 55-dicoding-backend-basic
//
// Author: Yugo Gautomo
// Status: Final August 01, 2021

const http = require('http');

const requestListener = (request, response) => {
	response.setHeader('Content-Type', 'text/html');

	response.statusCode = 200;
	response.end('<h1>Halo HTTP Server!</h1>');
};

const server = http.createServer(requestListener);

const port = 5000;
// const host = 'localhost';					// Restricted access from localhost only
const host = '0.0.0.0'; 						// Publicy access from any ip

server.listen(port, host, () => {
	console.log(`Server berjalan pada http://${host}:${port}`);
});

// Running command
// npm run start
// node 0403-httpserver.js

// Endpoint on port 5000
// GET `http://localhost:5000`					// Visual Studio terminal
// GET `http://{{IP_ADDRESS}}:5000`

// Test HTTP server status on port 5000- returns API status
// Web `http://{{IP_ADDRESS}}:5000`
// Postman GET `http://{{IP_ADDRESS}}:5000`		// Postman 0403-httpserver
// curl [-X GET] `http://{{IP_ADDRESS}}:5000`