// Filename: 0406-routingrequest.js
// Course: Dicoding- Back End Basics
// Description: Module 0406 Membangun Web Service menggunakan Node.js- Routing request
// Repository: 55-dicoding-backend-basic
//
// Author: Yugo Gautomo
// Status: Final August 01, 2021

const http = require('http');

const requestListener = (request, response) => {
	response.setHeader('Content-Type', 'text/html');
	response.statusCode = 200;

	const { method, url } = request;

	if(url === '/') {
		if(method === 'GET') {
			response.end('<h1>Ini adalah homepage</h1>');
		} else {
			response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
		}
	} else if(url === '/about') {
		if(method === 'GET') {
			response.end('<h1>Halo! Ini adalah halaman about</h1>');
		} else if(method === 'POST') {
			let body = [];

			request.on('data', (chunk) => {
				body.push(chunk);
			});

			request.on('end', () => {
				body = Buffer.concat(body).toString();
				const { name } = JSON.parse(body);
				response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
			});
		} else {
			response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
		}
	} else {
		response.end('<h1>Halaman tidak ditemukan!</h1>');
	}
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
// node 0406-routingrequest.js

// Endpoint on port 5000 with HTTP method, route and payloads
// Payloads {name: 'Dicoding'}
// [GET/POST] `http://localhost:5000/route`						// Visual Studio terminal
// [GET/POST] `http://{{IP_ADDRESS}}:5000/route`

// Test HTTP server status on port 5000 with method, route 'about' and payloads- returns API status
// Web `http://{{IP_ADDRESS}}:5000/about`
// Postman [GET/POST] `http://{{IP_ADDRESS}}:5000/about`		// Postman 0406-routingrequest

// curl [-X GET/POST] \
//	-d "{\"name\": \"Dicoding\"}" \
//	"http://{{IP_ADDRESS}}:5000"

// curl [-X GET/POST] \
//	-d "{\"name\": \"Dicoding\"}" \
//	"http://{{IP_ADDRESS}}:5000/about"