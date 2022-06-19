import http from 'http';

const server = http.createServer((request, response) => {
    let arr = [];
    console.log(request)
    if (request.url === '/api/users' && request.method === 'GET') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(arr));
    }
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end();
});

const port = process.env.port || '4000';

server.listen(port, ()=> {console.log(`Server running on port ${port}`)});