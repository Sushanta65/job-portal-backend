const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5200;
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.uksn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    //Auth Releated Apis
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, "secret", { expiresIn: "1hr" });
      console.log(user.email)
      res.send(token);
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Your app is running.");
});

app.listen(port, (req, res) => {
  console.log(`App is Running at Port : ${port}`);
});
