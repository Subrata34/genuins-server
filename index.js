const express = require('express')
const app = express()
const cors=require('cors');
const port = 5000


app.get('/', (req, res) => {
  res.send('Hello World!')

})
//meadlewire
app.use(cors());
app.use(express.json());


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://GeniusMecanijom:vCcUtnOnXT0DfbuM@cluster0.g4aj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
        const database=client.db("connects");
        const servicescollection =database.collection('services');
        app.post('/services',async(req,res)=>{
          const service=req.body;
          console.log('hit the api',service);
          res.send('post hitted');
          
          const result =await servicescollection.insertOne(service);
         console.log(result);
         res.json(result)

        });
    } finally {
      //await client.close();
      
    }
  }
  run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})