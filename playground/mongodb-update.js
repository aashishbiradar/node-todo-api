const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err) {
        return console.log('Cannot connect to MongoDB');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bc239e844d77e2a574a9027')
    },{
        $set:{
            complete:true
        }
    },{
        returnOriginal:false
    }).then((res) => {
        console.log(res);
    });

    client.close();
});