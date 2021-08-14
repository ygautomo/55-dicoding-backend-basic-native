// Filename: 0409-responsebody.js
// Course: Dicoding- Back End Basics
// Description: Module 0409 Membangun Web Service menggunakan Node.js- Response body
// Repository: 55-dicoding-backend-basic
//
// Author: Yugo Gautomo
// Status: Final August 01, 2021

const http = require('http');

const requestListener = (request, response) => {
	// response.setHeader('Content-Type', 'text/html');
	response.setHeader('Content-Type', 'application/json');
	response.setHeader('X-Powered-By', 'NodeJS');
	// response.statusCode = 200;

	const { method, url } = request;

	if(url === '/') {
		if(method === 'GET') {
			response.statusCode = 200;
			response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
		} else {
			response.statusCode = 400;
			response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
		}
	} else if(url === '/about') {
		if(method === 'GET') {
			response.statusCode = 200;
			response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
		} else if(method === 'POST') {
			let body = [];

			request.on('data', (chunk) => {
				body.push(chunk);
			});

			request.on('end', () => {
				body = Buffer.concat(body).toString();
				const { name } = JSON.parse(body);
				response.statusCode = 200;
				response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                }));
			});
		} else {
			response.statusCode = 400;
			response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method} request`
            }));
		}
	} else {
		response.statusCode = 404;
		response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
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
// node 0409-responsebody.js

// Endpoint on port 5000 with HTTP method, route and payloads
// Payloads {name: 'Dicoding'}
// [GET/POST/PUT/PATCH/DELETE] `http://localhost:5000/route`					// Visual Studio terminal
// [GET/POST/PUT/PATCH/DELETE] `http://{{IP_ADDRESS}}:5000/route`

// Test HTTP server status on port 5000 with method, route 'about' and payloads- returns API status, header and body
// Web `http://{{IP_ADDRESS}}:5000/about`
// Postman [GET/POST/PUT/PATCH/DELETE] `http://{{IP_ADDRESS}}:5000/about`		// Postman 0409-responsebody

// curl [-X GET/POST/PUT/PATCH/DELETE] \
//	-i \
//	-d "{\"name\": \"Dicoding\"}" \
//	"http://{{IP_ADDRESS}}:5000"

// curl [-X GET/POST/PUT/PATCH/DELETE] \
//	-i \
//	-d "{\"name\": \"Dicoding\"}" \
//	"http://{{IP_ADDRESS}}:5000/about"