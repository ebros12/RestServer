const express = require('express');
const Usuario = require('../models/usuario');
const Distribucion = require('../models/distribucion');
const _ = require('underscore')
let { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion');

let app = express();

let historialMovimiento = require('../models/HistorialMovimientos');
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra Todos los HistorialOrden
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/historialMovimiento', verificaToken, (req, res) => {
    historialMovimiento.find({})
        .populate('usuario', 'nombre email')
        .populate('categoria', '')
        .exec((err, historialMovimientoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                historialMovimientoDB
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra una HistorialOrden por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/historialMovimiento/:id', verificaToken, (req, res) => {
    let id = req.params.id
    historialMovimiento.findOne({ NMovimiento: id })
        .populate('usuario', 'nombre email')
        .populate('proveedor', 'descripcion')
        .exec((err, historialMovimientoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!historialMovimientoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es valido'
                    }
                })

            }
            res.json({
                ok: true,
                historialMovimiento: historialMovimientoDB
            })
        })



})




// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea nueva HistorialOrden
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/historialMovimiento', verificaToken, (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let bodytodo = []
    bodytodo = body

    console.log("productos", body);

    historialMovimiento.countDocuments({}, (err, conteo) => {
        console.log(body);
        let HistorialMovimiento = new historialMovimiento({
            NMovimiento: "NM00" + conteo + "eb12",
            FechaInicio: body.FechaInicio,
            FechaFin: body.FechaFin,
            FechaCreacion: body.FechaCreacion,
            Productos: body.Productos,
            Comentarios: body.Comentarios,
            usuario: req.usuario._id,
            NombreEmpresa: body.NombreEmpresa,
            RutEmpresa: body.RutEmpresa,
            TelEmpresa: body.TelEmpresa,
            CorremEmpresa: body.CorremEmpresa,
            RolEmpresa: body.RolEmpresa
        })
        HistorialMovimiento.save((err, historialMovimientoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!historialMovimientoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })

            }
            //usuarioDB.password = null

            res.json({
                ok: true,
                historialMovimiento: historialMovimientoDB,
            })

        });
    })

})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actualiza una nueva historial MovimientoDB
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/historialMovimiento/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['NMovimiento',
        'FechaInicio',
        'FechaFin',
        'FechaCreacion',
        'Productos',
        'Comentarios',
        'NombreEmpresa',
        'RutEmpresa',
        'TelEmpresa',
        'CorremEmpresa',
        'RolEmpresa'
    ]);

    historialMovimiento.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, historialMovimientoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!historialMovimientoDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            historialMovimiento: historialMovimientoDB
        })
    })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borra bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/historialMovimiento/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    historialMovimiento.findOneAndRemove(id, (err, historialMovimientoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!historialMovimientoDB) {
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
                message: 'HistorialOrden Borrado'
            }
        })
    })
})



module.exports = app;