const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const tasks = [];

app.post('/tasks', (request, response) => {
    console.log('executou inclusao de registro')
    const { body } = request; //destruct object
    //const body = request.body;
    const task = {
        id: Math.random().toString().replace('0.', ''),
        title: body.title,
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority
    };
//utilizar o objectAssign para criar um novo objeto (concatenar)
    tasks.push(task);
    response.status(201);
    response.send(task);
});

app.get('/tasks', (request, response) => {
    console.log('executou consulta todos')
    response.send(tasks);
});

app.get('/tasks/:taskId', (request, response) => {
    console.log('executou consulta task id')
    const task = tasks.filter(t => t.id === request.params.taskId);
    if (task){
        response.send(task);
    } else {
        response.status(404);
        response.send();
    }
});

app.put('/tasks/:taskId', (request, response) => {
    console.log('executou alteracao task id')
    const { body } = request;
    const task = tasks.find(t => t.id == request.params.taskId);
   
    if (task) {
        task.title = body.title;
        task.resume = body.resume;
        task.isDone = body.isDone;
        task.isPriority = body.isPriority;
        response.send(task);
    } else {
        response.status(404);
        response.send();
    }
});

app.delete('/tasks/:taskId', (request, response) => {
    console.log('executou delete')
    const task = tasks.find(t => t.id == request.params.taskId);
    if (task) {
        tasks.pop(task);
        response.send(task);
    } else {
        response.status(404);
        response.send();
    }
});

app.listen(3000, () => {
    console.log('Server Running on port 3000');
});