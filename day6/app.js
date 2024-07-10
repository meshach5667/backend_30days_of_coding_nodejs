const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // ("/") index url
        if (req.url === '/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Welcome to the Home Page!\n');
        } else if (req.url === '/about') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('This is the About Page.\n');
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Page Not Found\n');
        }
    } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method Not Allowed\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
