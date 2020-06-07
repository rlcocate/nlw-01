import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors({
    // origin: 'www.seudominio.com'
}));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(errors());

// const users = [
//     'Rodri',
//     'Evangelista',
//     'Alfred',
//     'Gustá'
// ];

// app.get('/users', (request, response) => {
//     const search = String(request.query.search);
//     const filtered = search ? users.filter(user => user.includes(search)) : users;
//     response.json(users);
// });

// app.get('/users/:id', (request, response) => {
//     const id = Number(request.params.id);

//     const user = users[id];

//     return response.json(user);
// })

// app.post('/users', (request, response) => {
//     const data = request.body; 
//     console.log(data);
//     return response.json(data);
// })

app.listen(3333);