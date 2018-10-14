//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err) {
        return console.log('Cannot connect to MongoDB');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');
    
    // //1
    // db.collection('Todos').insertOne({
    //     text:"Something todo",
    //     complete:false,
    // },(err,res) => {
    //     if(err) {
    //         return console.log('Not able to insert document');
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    // //2
    // db.collection('Users').insertOne({
    //     name : 'Raju',
    //     age: 25,
    //     location: 'Mumbai'
    // },(err,res) => {
    //     if(err) {
    //         return console.log('Not able to insert document');
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    // //3
    // db.collection('Users').insertOne({
    //     name : 'Ravi',
    //     age:30,
    //     location: 'Delhi'
    // },(err,res) => {
    //     if(err)
    //     {
    //         return console.log('Not able to insert doc into Users');
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    // //4
    db.collection('Users').insertOne({
        name : 'Rocky',
        age:27,
        location: 'Delhi'
    },(err,res) => {
        if(err)
        {
            return console.log('Not able to insert doc into Users');
        }
        console.log(JSON.stringify(res.ops,undefined,2));
    });
    client.close();
});