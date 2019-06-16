const express = require('express');
const Usuario = require('../models/usuario');
const _ = require('underscore')
let { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion');

let app = express();

let Distribucion = require('../models/distribucion');
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra Todas las Distribuciones
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/distribucion', verificaToken, (req, res) => {
    Distribucion.find({})
        .sort('descripcion')
        .populate('bodega', 'nombre')
        .exec((err, distribuciones) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                distribuciones
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra una Distribucion por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/distribucion/:id', verificaToken, (req, res) => {
    let id = req.params.id
    Distribucion.findById(id, (err, distribucionDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!distribucionDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es valido'
                }
            })

        }
        res.json({
            ok: true,
            distribucion: distribucionDB
        })
    })



})




// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea nueva Distribucion
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/distribucion', verificaToken, (req, res) => {
    let body = req.body;

    let distribucion = new Distribucion({
        nombre: body.nombre,
        bodega: body.bodega,
    })
    distribucion.save((err, distribucionDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!distribucionDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        //usuarioDB.password = null
        res.json({
            ok: true,
            distribucion: distribucionDB
        })
    });
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actualiza una nueva distribucion
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/distribucion/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Distribucion.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, distribucionDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!distribucionDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            distribucion: distribucionDB
        })
    })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borra bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/distribucion/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    Distribucion.findOneAndRemove(id, (err, distribucionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!distribucionDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })

        }
        res.json({
            ok: true,
            err: {
                message: 'Distribucion Borrada'
            }
        })
    })
})



module.exports = app;