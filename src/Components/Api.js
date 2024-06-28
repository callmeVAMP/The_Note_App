const http = require('https');

const options = {
	method: 'GET',
	hostname: 'jokes-always.p.rapidapi.com',
	port: null,
	path: '/erJoke',
	headers: {
		'x-rapidapi-key': '8574de06bamsh966d874d6361876p1e066ajsnf9b89388ad37',
		'x-rapidapi-host': 'jokes-always.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();
