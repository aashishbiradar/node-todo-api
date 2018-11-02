const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');
const {ObjectID} = require('mongodb');

/*
// Remove All

Todo.deleteMany({}).then((res) => {
    console.log(res);
});

*/

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Remove by Id
Todo.findByIdAndDelete('5bdc400f71e9fbd692258348').then((res) => {
    console.log(res);
});