require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const puerto = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.json('Get user list')
});

//add
app.post('/usuario', function(req, res) {
    let body = req.body;
    res.json({
        usuario: body
    });
});

//upd
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
})

//set status
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json('Set user status to inactive')
})

app.listen(puerto, () => console.log(`Escuchando puerto ${puerto}`))