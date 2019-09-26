require('./config/config');
const express = require('express');
const app = express();

const routes = require('./routes/usuario');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const puerto = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(routes);

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});


// var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb://udemy:<password>@cluster0-shard-00-00-rfjbz.mongodb.net:27017,cluster0-shard-00-01-rfjbz.mongodb.net:27017,cluster0-shard-00-02-rfjbz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
// MongoClient.connect(uri, function(err, client) {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.listen(puerto, () => console.log(`Escuchando puerto ${puerto}`));