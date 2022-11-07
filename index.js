const express = require('express'); // ShortCut use "req"
const cors = require('cors'); // ShortCut use "req"
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // to get post data


//  using async/await function
async function run(){



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
