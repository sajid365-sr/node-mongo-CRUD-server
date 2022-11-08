const express = require('express'); // ShortCut use "req"
const cors = require('cors'); // ShortCut use "req"
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    
    app.post('/users', async(req, res) =>{
      const user =  req.body;
      
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(result)
 
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
