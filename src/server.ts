import express from 'express';
import { v4 } from 'uuid';

const app = express();
app.use(express.json());

const users: Array<string> = [];

app.get('/users', (request, response) => {
  return response.json(users);
});

app.post('/users', (request, response) => {
  const { name, age } = request.body;

  const user = {
    id: v4(),
    name,
    age
  };

  users.push(user);

  return response.json(user);
});

app.put('/users/:id', (request, response) => {
  const { id } = request.params;
  const { name, age } = request.body;

  const usersIndex = users.findIndex(user => user.id === id);

  if (usersIndex < 0) {
    return response.status(400).json({ message: "Usuário não encontrado" });
  }

  const user = {
    id: id,
    name,
    age
  };

  users[usersIndex] = user;

  return response.status(200).json(user);
});

app.delete('/users/:id', (request, response) => {
  const { id } = request.params;

  const usersIndex = users.findIndex(user => user.id === id);

  if (usersIndex < 0) {
    return response.status(400).json({ message: "Usuário não encontrado" });
  }

  users.splice(usersIndex, 1);

  return response.status(200).send();
});

app.listen(3333, () => {
  console.log('Back-end started!');
});
