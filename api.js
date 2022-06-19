import http from 'http';
import {v4 as uuidv4} from 'uuid';

const server = http.createServer((request, response) => {
    let arr = [];
    let msg = 'Please send data in the correct format!'

    if (request.method === 'GET') {
        console.log(request.url)
        let test = request.url.split('/');
        console.log(test)
        if (request.url === '/api/users' && test.length === 3) {
            console.log(request.url);
            console.log(test)
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(arr));
        } else if (request.url === '/api/users' && test.length > 3) {
            console.log(test[3].length)
            if (test[3].split('').length < 36) {
                response.statusCode = 400;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(msg));
            } else {
                let foundItem = {};
                arr.forEach((item)=>{
                    if (item.id === test[2]) {
                        foundItem = item; 
                    }
                });
                if (foundItem.length!=0) {
                    response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.end(JSON.stringify(founditem));
                } else {
                    response.statusCode = 404;
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify("Item not found"));
                }
            }
        } else {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(msg));
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