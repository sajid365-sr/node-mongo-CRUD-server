const express = require('express'); // ShortCut use "req"
const cors = require('cors'); // ShortCut use "req"
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // to get post data as an object format otherwise data will be undefined.


// user: dbuser2
// pass: dkdeN6NypheiSkcH


const uri = "mongodb+srv://dbuser2:dkdeN6NypheiSkcH@cluster0.90qadcl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//  using async/await function
async function run(){

  try{
    const userCollection = client.db('nodeMongoCrud').collection('users');
    
    // READ
    app.get('/users', async(req, res) =>{

      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    })

    // UPDATE
    app.get('/users/:id', async(req,res) =>{
      const id = req.params.id;
      const query = { _id: ObjectId(id)};
      const user = await userCollection.findOne(query);

      res.send(user);

    })

    //PUT
    app.put('/users/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id:ObjectId(id)};
      const user = req.body;
      const options = {upsert: true}
      const updatedUser = {
        $set:{
          name: user.name,
          address: user.address,
          email: user.email
        }
      }
     const result = await userCollection.updateOne(filter, updatedUser, options);
     res.send(result);

    })


    // CREATE
    app.post('/users', async(req, res) =>{
      const user =  req.body;
      
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(result)
 
    })

    // DELETE
    app.delete('/users/:id', async(req, res) =>{
      const id = req.params.id;
      const query = { _id:ObjectId(id) }
      console.log('Trying to delete: ', id);

      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

  }
  finally{

  }


}


run().catch(e => console.error(e));


// Default server route
app.get('/', (req, res) =>{
    res.send('Hello from node mongo CRUD server');
})


// Listening app data
app.listen(port , () =>{
    console.log(`listening to port: ${port}`);
})
