// Filename: 0404-methodrequest.js
// Course: Dicoding- Back End Basics
// Description: Module 0404 Membangun Web Service menggunakan Node.js- Method/verb request
// Repository: 55-dicoding-backend-basic
//
// Author: Yugo Gautomo
// Status: Final August 01, 2021

const http = require('http');

const requestListener = (request, response) => {
	response.setHeader('Content-Type', 'text/html');
	response.statusCode = 200;

	const { method } = request;

	if(method === 'GET') {
		response.end('<h1>Hello!</h1>');
	}

	if(method === 'POST') {
		response.end('<h1>Hai!</h2>');
	}

	if(method === 'PUT') {
		response.end('<h1>Bonjour!</h1>');
	}

	/* if(method === 'PATCH') {
		response.end('<h1>Welcome!</h1>');
	} */

	if(method === 'DELETE') {
		response.end('<h1>Salam!</h1>');
	}

	response.end('<h1>Error! No Handler Method</h1>');		// Default response
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
// node 0404-methodrequest.js

// Endpoint on port 5000 with HTTP method
// [GET/POST/PUT/PATCH/DELETE] `http://localhost:5000`					// Visual Studio terminal
// [GET/POST/PUT/PATCH/DELETE] `http://{{IP_ADDRESS}}:5000`

// Test HTP server status on port 5000 with method- returns API status
// Web `http://{{IP_ADDRESS}}:5000`
// Postman [GET/POST/PUT/PATCH/DELETE] `http://{{IP_ADDRESS}}:5000`		// Postman 0404-methodrequest
// curl [-X GET/POST/PUT/PATCH/DELETE] `http://{{IP_ADDRESS}}:5000`