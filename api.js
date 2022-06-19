import http from 'http';
import {v4 as uuidv4} from 'uuid';

const server = http.createServer((request, response) => {
    let arr = [];
    let msg = 'Please send data in the correct format!'

    if (request.method === 'GET') {
        console.log(request.url)
        if (request.url === '/api/users') {
            console.log(request.url);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(arr));
        }
    }

    

    if (request.url === '/api/users' && request.method === 'POST') {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
            console.log(body);
        })

        request.on('end', () => {
            const test = JSON.parse(body);
            if (test.username !== '' && test.age !== '' && test.hobbies.length>0) {
                let user = {};
                user = {id: uuidv4(), ...test};
                arr.push(user);
                response.statusCode = 201;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(arr));
            } else {
                response.statusCode = 400;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(msg));
            }
        })
    }
});

const port = process.env.port || '4000';

server.listen(port, ()=> {console.log(`Server running on port ${port}`)});