const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err) {
        return console.log('Cannot connect to MongoDB');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');
    
    /* delete one*/
    db.collection('Todos').deleteOne({text: 'Machine Learning'}).then((res)=> {
        console.log(res);
    },(err)=> {
        console.log('Unable to delete',err);
    });

    /* find one and delete */
    db.collection('Todos').findOneAndDelete({
        _id: new ObjectID('5bc2ee2e15df1294b13d552e')
    }).then((res) => {
        console.log(res);
    }, (err) => {
        console.log('Unable to delete',err);
    });

    /* delete many */
    db.collection('Todos').deleteMany({text: 'Machine Learning'}).then((res)=>{
        console.log(res);
    },(err) => {
        console.log('Unable to delete',err);
    });

    client.close();
});