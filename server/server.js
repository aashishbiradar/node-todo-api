require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT;
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
        res.send({todos});
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
        res.send({todo});
    },(err) => {
        res.status(400).send(err);
    });
});

app.delete('/todos/:id',(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({err:"Invalid ID"});
    }

    Todo.findByIdAndDelete(id).then((todo) => {
        if(!todo) {
            return res.status(404).send({err: "Id Not Found"});
        }
        res.send({todo});
    },(err) => {
        res.status(400).send(err);
    });
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send({err:"Invalid ID"});
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = Date.now();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send({err:"Id not found"}); 
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(port,() => {
    console.log(`started on port ${port}`)
});

module.exports = {app};