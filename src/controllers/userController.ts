import { ServerResponse, IncomingMessage } from 'node:http';
import { IUser } from '../models/userModel';
import {v4 as uuidv4, validate as uuidValidate} from 'uuid';

const store: IUser[] = [];

const validateId = async (id: string, res: ServerResponse) => {
  if (id === '/') {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(JSON.stringify('Bad request: non-existent URL'));
    return;
  }
  else if (!uuidValidate(id)) {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify('Bad request: invalid UUID format'));
    return;
  }
}

const getUsers = (res: ServerResponse) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(store));
};

const getUserById = (res: ServerResponse, id: string) => {
  validateId(id, res).then(() => {
    const user = store.find( user => user.id === id );
  
    if (!user) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify('User not found'));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(user));
    }
  });
};

const addUser = (req: IncomingMessage, res: ServerResponse) => {
  let reqData = '';

  req.on('data', (chunk) => {
    reqData += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(reqData);
    
      if (!(data.username && data.age && data.hobbies)) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('Bad request: invalid request payload'));
      } else {
          const user: IUser = {
            id: uuidv4(),
            username: data.username,
            age: data.age,
            hobbies: data.hobbies
          };
          store.push(user);
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(user));
      }
    } catch (err) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(`Internal Server Error: ${err}`));
    }
  });
};

const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  validateId(id, res).then(() => {
      const user = store.find(user => user.id === id );

      if (!user) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('User not found'));
      } else {
        let reqData = '';

        req.on('data', (chunk) => {
          reqData += chunk.toString();
        });
      
        req.on('end', () => {
          try {
            const data = JSON.parse(reqData);
            user.username = data.username;
            user.age = data.age;
            user.hobbies = data.hobbies;
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
          } catch (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(`Internal Server Error: ${err}`));
          }
        })
      }
  })
};

const deleteUser = (res: ServerResponse, id: string) => {
  validateId(id, res).then(() => {
      const user = store.find( user => user.id === id );

      if (!user) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('404 User not found'));
      } else {
        try {
          const index = store.indexOf(user);
          store.splice(index, 1);
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(id));
        } catch (err) {
          res.writeHead(500, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(`Internal Server Error: ${err}`));
        }
      }
  });
};

export { getUsers, getUserById, addUser, updateUser, deleteUser }
