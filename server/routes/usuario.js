const express = require('express');
const Usuario = require('../models/usuario');
const app = express();


const bcrypt = require('bcrypt');
const _ = require('underscore')
const { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion')



app.get('/usuario', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    length: conteo
                })
            })

        })
})


// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Obtener un usuario por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/usuario/:id', verificaToken, (req, res) => {
    // populate usuario categoria
    // paginado
    let id = req.params.id
    Usuario.findById(id)
        .exec((err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es valido'
                    }
                })

            }
            res.json({
                ok: true,
                usuario: usuarioDB
            })
        })
})


app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        //img:body.img,
        role: body.role
    })
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuarioDB.password = null
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    let bodys = req.body;
    let body = _.pick(req.body, ['apellido', 'password', 'nombre', 'email', 'img', 'role', 'estado']);
    if (body['password']) {
        body['password'] = bcrypt.hashSync(body['password'], 10)
    }

    console.log(body);
    // Usuario.findById(id, (err, usuarioDB) => {
    //     usuarioDB.save
    // })
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})


app.delete('/usuario/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})


module.exports = app;