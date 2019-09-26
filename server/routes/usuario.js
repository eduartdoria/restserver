const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const _ = require('underscore');


//GET
app.get('/usuario', function(req, res) {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    let filter = { estado: true };
    Usuario.find(filter, 'name estado role email google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments(filter, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });

        });
});


app.get('/usuario/all', function(req, res) {
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    Usuario.find({}, 'name estado role email google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });

        });
});

//add
app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        name: body.name,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // console.log(usuarioDB);
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

});

//upd
app.put('/usuario/:id', function(req, res) {
    let body = _.pick(req.body, ['nombre', 'email', 'img']);
    let id = req.params.id;

    // delete body.password;
    // delete body.google;
    // delete body.email;

    console.log(id);

    const options = {
        new: true,
        runValidators: true
    }

    Usuario.findByIdAndUpdate(id, body, options, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });


});

//set status
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    const options = {};

    //Usuario.findByIdAndRemove(id, options, (err, usuarioDB) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: 'No se encuentra el usuario'
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

module.exports = app;