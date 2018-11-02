const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');
const {ObjectID} = require('mongodb');

var id = '5bd5fda1ccbfdd45fd0e3fda';

if(!ObjectID.isValid(id)) {
    return console.log('Invalid Id');
}
Todo.find({
    _id:id
}).then((todos)=>{
    console.log('Todos',todos);
});

Todo.findOne({
    _id:id
}).then((todo)=>{
    console.log('Todo',todo);
});

Todo.findById(id).then((todo)=>{
    if(!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by Id',todo);
}).catch((e)=>{
    console.log(e);
});

var userId = '5bc61ef12421820c7154a9d6';

if(!ObjectID.isValid(userId)) {
    return console.log('Invalid usedID');
}

User.findById(userId).then((user) => {
    if(!user) {
        return console.log('Invalid userId');
    }
    console.log('User',user);
}).catch((e) => {
    console.log(e);
});