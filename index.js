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

        app.post("/placeOrder", async (req, res) => {
            const data = req.body;
            const result = await OrderCollection.insertOne(data);
            console.log(data);
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
    console.log(`Example app listening at http://localhost:${port}`);
});
