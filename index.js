const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lygbk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

 const app = express();
 app.use(bodyParser.json());
 app.use(cors());  
 const port =5000;


 app.get("/", (req, res) => {
     res.send("hello i am from mongodb it's working working")
 })


 
 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const MostafasInfo = client.db("21Mostafa").collection("userInformation");

  app.post("/Contract",(req, res) => {
        const peopleInput = req.body;
        MostafasInfo.insertOne(peopleInput)
        .then(result => {
            res.send(result.insertedCount > 0);
        })
  })

   
});



 app.listen(port)