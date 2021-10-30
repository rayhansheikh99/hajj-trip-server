const express = require('express')
const cors = require("cors");
require('dotenv').config()
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ouksj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('hajj_trip');
        const productCollection = database.collection('services');
        // const orderCollection = database.collection('orders');

        //GET Products API
        app.get('/services', async (req, res) => {
            const cursor = productCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
            console.log(services);
            // const page = req.query.page;
            // const size = parseInt(req.query.size);
            // let products;
            // const count = await cursor.count();

            // if (page) {
            //     products = await cursor.skip(page * size).limit(size).toArray();
            // }
            // else {
            //     products = await cursor.toArray();
            // }

        //     res.send({
        //         count,
        //         products
        //     });
        });
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })

    }

        finally {
            // await client.close();
        }
    }
    run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Get Ready to Fight')
})

app.listen(port, () => {
  console.log(`Server is running`,port)
})