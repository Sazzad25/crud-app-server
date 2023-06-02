const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { result } = require('lodash');
const app = express();
const port = process.env.PORT || 5000;

// middleware
// user: dbuser2
// password: 7mVpersutny9TLNF

app.use(cors());
app.use(express.json());

// mongo
const uri = "mongodb+srv://crudUser:dMT2oSex6oMD1sDj@cluster0.mwoallb.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const userCollection = client.db('crudTask').collection('information');

        app.get('/information', async(req, res) =>{
            const query ={};
            const cursor = userCollection.find(query);
            const information = await cursor.toArray();
           
            res.send(information);
          });

          app.get('/information/:id', async(req, res) =>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const inform = await userCollection.findOne(query);
            res.send(inform);
          })

       app.post('/information', async(req, res) =>{
        const user = req.body;
        console.log(user);
        const result = await userCollection.insertOne(user)
        res.send(result);
       });

       app.put('information/:id', async(req, res) =>{
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedUser = req.body;
        console.log(updatedUser);
       })

       app.delete('/information/:id', async(req, res) =>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await userCollection.deleteOne(query)
        console.log(result);
        res.send(result);
       });

    }
    finally{

    }
}

run().catch(err => console.log(err));

app.get('/', (req, res) =>{
    res.send('Hello task crud server');
});

app.listen(port, () =>{
    console.log(`Listening to port ${port}`);
})