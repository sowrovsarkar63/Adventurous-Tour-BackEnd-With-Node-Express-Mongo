const express = require("express");
const { MongoClient } = require("mongodb");
var cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const app = express();

// Middleware

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eyl5a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
async function run() {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        const database = client.db("adventure");
        const TourCollection = database.collection("TourCollection");
        const OrderCollection = database.collection("OrderCollection");
        console.log("Connected successfully to server");

        // toures api created. Now this route should provide touring place
        app.get("/toures", async (req, res) => {
            const cursor = TourCollection.find({});
            const allTour = await cursor.toArray();
            res.json(allTour);
        });
        // store place order
        app.post("/placeOrder", async (req, res) => {
            const data = req.body;
            const result = await OrderCollection.insertOne(data);
            console.log(data);
            res.json(result);
        });

        // get specific user place order in the ui

        app.get("/myorder", async (req, res) => {
            const cursor = OrderCollection.find({});
            const orders = await cursor.toArray();

            res.json(orders);
        });

        // delete order

        app.delete("/orders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await OrderCollection.deleteOne(query);

            console.log("deleting user with id ", result);

            res.json(result);
        });

        // add new touring place
        app.post("/addService", async (req, res) => {
            const newService = req.body;
            const result = await TourCollection.insertOne(newService);
            console.log("added user", result);
            res.json(result);
        });
    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);
app.get("/", (req, res) => {
    res.send("This is from express js server");
});

// app.get("/api", (req, res) => {
//     res.send("This is from api endpoints");
// });
app.listen(port, () => {
    console.log(`Adventureous-tour app listening at http://localhost:${port}`);
});
