const express = require('express');
const Usuario = require('../models/usuario');
const _ = require('underscore')
let { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion');

let app = express();



let CountBodega = require('../models/countBodega');
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra Todas las Distribuciones
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/countBodega', verificaToken, (req, res) => {
    CountBodega.find({})
        .exec((err, CountBodega) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                CountBodega
            })
        })
})



// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra una Distribucion por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/countBodega/:id', verificaToken, (req, res) => {
    let id = req.params.id
    CountBodega.findById(id, (err, countBodegaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!countBodegaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es valido'
                }
            })

        }
        res.json({
            ok: true,
            countBodega: countBodegaDB
        })
    })



})


// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Buscar countBodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/countBodega/buscar/b', verificaToken, (req, res) => {
    let body = req.body;
    let nombreP = body.nombre
    console.log(body);
    CountBodega.find({ nombre: nombreP, bodega: body.bodega })
        .exec((err, countBodega) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                countBodega: countBodega
            })
        })
})


// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea nueva Distribucion
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/countBodega', verificaToken, (req, res) => {
    let body = req.body;

    let countBodega = new CountBodega({
        nombre: body.nombre,
        bodega: body.bodega,
        cantidad: body.cantidad,
        valor: body.valor,
    })
    countBodega.save((err, CountBodegaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!CountBodegaDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        //usuarioDB.password = null
        res.json({
            ok: true,
            CountBodega: CountBodegaDB
        })
    });
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actualiza una nueva distribucion
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/countBodega/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'bodega', 'cantidad']);

    CountBodega.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, CountBodegaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!CountBodegaDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            CountBodega: CountBodegaDB
        })
    })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borra bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/countBodega/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    CountBodega.findOneAndRemove(id, (err, CountBodegaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!CountBodegaDB) {
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