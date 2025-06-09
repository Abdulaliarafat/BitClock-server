const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 3000;
require('dotenv').config()
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g02ycwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const foodCollection = client.db('FoodExpo').collection('Foods');
    //  Food API
    // get API
    app.get('/food', async (req, res) => {
      const result = await foodCollection.find().toArray();
      res.send(result);
    })
    // get with Nearly expirydate and expirydate
    app.get('/food/nearly', async (req, res) => {
      const today = new Date().toISOString().slice(0, 10)
      const nextFiveDate = new Date();
      nextFiveDate.setDate(new Date().getDate() + 5);
      const nextFiveDates = nextFiveDate.toISOString().slice(0, 10)
      const type=req.query.type
      let query ={}
      if(type === 'expired'){
        query = { expirydate: { $lt: today } };
      }
      else{
        query = {expirydate: { $gte: today, $lte: nextFiveDates }}
      }
      const result = await foodCollection.find(query).limit(6).toArray();
      res.send(result);
    })
    // post API
    app.post('/food', async (req, res) => {
      const foodData = req.body;
      console.log(foodData)
      const result = await foodCollection.insertOne(foodData);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Food are ready to explore')
})

app.listen(port, () => {
  console.log(`Food experiment on port ${port}`)
})
