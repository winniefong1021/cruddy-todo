const Todo = require('./datastore');

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));

app.post('/todo', (req, res) => {
  Todo.create(req.body.todoText, (err, newTodo) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(newTodo);
    }
  });
});

app.get('/todo', (req, res) => {
  Todo.readAll((err, todos) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(todos);
    }
  });
});

app.get('/todo/:id', (req, res) => {
  Todo.readOne(req.params.id, (err, todo) => {
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.sendStatus(404);
    }
  });
});

app.put('/todo/:id', (req, res) => {
  Todo.update(req.params.id, req.body.todoText, (err, todo) => {
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.sendStatus(404);
    }
  });
});

app.delete('/todo/:id', (req, res) => {
  Todo.delete(req.params.id, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('CRUDdy Todo server is running in the terminal');
  console.log(`To get started, visit: http://localhost:${port}`);
});

Todo.initialize();
