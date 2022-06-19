
import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import process from 'node:process';

const PORT = process.env.PORT;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if(req.method === 'GET' && req.url === '/api/users') {
    return getUsers(res);
  }
  else if(req.method === 'POST' && req.url === '/api/users') {
    return addUser(req, res);
  }
  else if(req.method === 'GET' && req.url?.startsWith('/api/users/')) {
    const id = req.url.split('/')[3];
    return getUserById(res, id);
  }
  else if(req.method === 'PUT' && req.url?.startsWith('/api/users/')) {
    const id = req.url.split('/')[3];
    return updateUser(req, res, id);
  }
  else if(req.method === 'DELETE' && req.url?.startsWith('/api/users/')) {
    const id = req.url.split('/')[3];
    return deleteUser(res, id);
  }
  else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify('Bad request: non-existent URL'));
    return;
  }
});

server.on('clientError', (err, socket) => {
  socket.end('400 Bad request');
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Go to http://localhost:${PORT}/`)
});
