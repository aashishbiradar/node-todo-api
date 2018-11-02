const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err) {
        return console.log('Cannot connect to MongoDB');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');
    
    //1
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('Unable to find docs',err);
    });

    //2
    db.collection('Todos').find({complete:true}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('Unable to find docs',err);
    });

    //3
    db.collection('Todos').find({
        _id: new ObjectID('5bc2e49f15df1294b13d5455')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('Unable to find docs',err);
    });

    //4
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to find count of todos',err);
    });

    //5
    db.collection('Users').find({location:'Delhi'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('Unable to find Users',err);
    });

    client.close();
});