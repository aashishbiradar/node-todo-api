const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: "Fisrt test todo"
    },
    {
        _id: new ObjectID(),
        text: "Second test todo"
    }
]

beforeEach((done) => {
    Todo.remove({}).then(()=> {
        Todo.insertMany(todos).then(()=> done());
    });
    
});

describe('Post /todos',() => {
    it('should create a new todo',(done) => {
        var text = 'Test todo';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res) => {
            if(err) {
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });
    it('should not create todo with invalid data',(done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res) => {
            if(err) {
                return done(err);
            }

            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos',() => {
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});

var testId = todos[0]._id.toHexString();

describe('GET /todos/:id',()=>{
    it('should get todo from id',(done)=>{
        request(app)
        .get(`/todos/${testId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
    it('should return 404 for invalid ID',(done) => {
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
    it('should return 404 for invalid ID',(done) => {
        var newId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${newId}`)
        .expect(404)
        .end(done);
    });
});

var hexId = todos[1]._id.toHexString();

describe('DELETE /todos/:id', () => {
    it('should delete todo with id', (done) => {
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err,res) => {
            if(err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo)=>{
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => done(e));
        });
    });
    
    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
    
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });
});