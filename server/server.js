var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
var port=t = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.status(400).send(e);
    });
})

app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({err:"Invalid ID"});
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send({err: "Id Not Found"});
        }
        res.send(todo);
    },(err) => {
        res.status(400).send(err);
    });
});

app.listen(port,() => {
    console.log(`started on port ${port}`)
});

module.exports = {app};