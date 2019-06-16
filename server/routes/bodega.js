const express = require('express');
const Usuario = require('../models/usuario');
const Distribucion = require('../models/distribucion');
const _ = require('underscore')
let { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion');

let app = express();

let Bodega = require('../models/bodega');
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra Todas las Bodegas
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/bodega', verificaToken, (req, res) => {
    Bodega.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, bodegas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                bodegas
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra una Bodega por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/bodega/:id', verificaToken, (req, res) => {
    let id = req.params.id
    Bodega.findById(id, (err, bodegaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!bodegaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es valido'
                }
            })

        }
        res.json({
            ok: true,
            bodega: bodegaDB
        })
    })



})




// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea nueva Bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/bodega', verificaToken, (req, res) => {
    let body = req.body;

    let bodega = new Bodega({
        nombre: body.nombre,
        direccion: body.direccion,
        telefono: body.telefono,
        usuario: req.usuario._id
    })
    bodega.save((err, bodegaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!bodegaDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        //usuarioDB.password = null
        res.json({
            ok: true,
            bodega: bodegaDB
        })
    });
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actualiza una nueva Bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/bodega/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'direccion', 'telefono']);

    Bodega.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, bodegaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!bodegaDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            bodega: bodegaDB
        })
    })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borra bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/bodega/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    Bodega.findOneAndRemove(id, (err, bodegaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!bodegaDB) {
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
                message: 'Bodega Borrada'
            }
        })
    })
})



module.exports = app;