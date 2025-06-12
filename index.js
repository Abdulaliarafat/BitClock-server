const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
// firebase Admin
const admin = require("firebase-admin");
const decoded = Buffer.from(process.env.FB_SERVECE_KEY,'base64'.toString('utf8'))
const serviceAccount = JSON.parse(decoded)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// verify firebase accessToken
const verifyFirebaseAccessToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: "Forbedden access" })
  }
  const token = authHeader.split(' ')[1]
  const decoded = await admin.auth()
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded
    console.log(decoded)
    next()
  }
  catch {
   return res.status(403).send({ message: "Forbedden access" })
  }
}
// verify email
const verifyEmail=async(req,res,next)=>{
  if(req.query.email !== req.decoded.email){
    return res.status(403).send({message:"Unauthorized"})
  }
  next()
}
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const foodCollection = client.db('FoodExpo').collection('Foods');
    //  Food API
    // app.get('/food', async (req, res) => {
    //   const result = await foodCollection.find().toArray();
    //   res.send(result);
    // })
    // get API with search API
    app.get('/food', async (req, res) => {
      const search = req.query.search || ''
      const query = {
        $or: [
          { foodtitle: { $regex: search, $options: 'i' } },
          { foodcategory: { $regex: search, $options: 'i' } }
        ]
      }
      const result = await foodCollection.find(query).toArray();
      res.send(result);
    })

    // email query and jwt auth firebase
    app.get('/food/email', verifyFirebaseAccessToken,verifyEmail, async (req, res) => {
      const email = req.query.email;
      const query = { email: email }
      const result = await foodCollection.find(query).toArray();
      res.send(result)
    })
    // get with Nearly expirydate and expirydate
    app.get('/food/nearly', async (req, res) => {
      const today = new Date().toISOString().slice(0, 10)
      const nextFiveDate = new Date();
      nextFiveDate.setDate(new Date().getDate() + 5);
      const nextFiveDates = nextFiveDate.toISOString().slice(0, 10)
      const type = req.query.type
      let query = {}
      let cursor
      if (type === 'expired') {
        query = { expirydate: { $lt: today } };
        cursor = foodCollection.find(query);
      }
      else {
        query = { expirydate: { $gte: today, $lte: nextFiveDates } }
        cursor = foodCollection.find(query).limit(6)
      }
      const result = await cursor.toArray();
      // add status ..
      const data = result.map(item => {
        const status = new Date(item.expirydate).toISOString().slice(0, 10) < today ? 'Expired' : 'Nearly'
        return { ...item, status }
      })
      res.send(data);
    })
    // get Details of food with ID
    app.get('/food/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.findOne(query)
      res.send(result)
    })
    // put API
    app.put('/food/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const update = req.body;
      const updatefood = {
        $set: update
      }
      const result = await foodCollection.updateOne(filter, updatefood);
      res.send(result)
    })
    // post API
    app.post('/food', async (req, res) => {
      const foodData = req.body;
      console.log(foodData)
      const result = await foodCollection.insertOne(foodData);
      res.send(result)
    })

    // patch API
    app.patch('/food/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          noteData: req?.body
        }
      }
      const result = await foodCollection.up(filter, updateDoc);
      res.send(result)
    })
    // delete food items
    app.delete('/food/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.deleteOne(query);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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
