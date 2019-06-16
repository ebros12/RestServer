const express = require('express');
const Usuario = require('../models/usuario');
const Distribucion = require('../models/distribucion');
const _ = require('underscore')
let { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion');

let app = express();

let Historiales = require('../models/HistorialOrden');
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra Todos los historiales
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/historiales', verificaToken, (req, res) => {
    Historiales.find({})
        .populate('usuario', 'nombre email')
        .populate('categoria', '')
        .exec((err, historiales) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                historiales
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra una Bodega por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/historiales/:id', verificaToken, (req, res) => {
    let id = req.params.id
    Historiales.findOne({ OrdenCompra: id })
        .populate('usuario', 'nombre email')
        .populate('proveedor', 'descripcion')
        .exec((err, HistorialDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!HistorialDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es valido'
                    }
                })

            }
            res.json({
                ok: true,
                Historial: HistorialDB
            })
        })



})




// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea nueva Bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/historiales', verificaToken, (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let bodytodo = []
    bodytodo = body
    console.log(bodytodo);

    Historiales.countDocuments({}, (err, conteo) => {
        console.log(conteo);
        let historiales = new Historiales({
            nombre: body.nombre,
            empresaPadre: body.empresaPadre,
            DireccionPadre: body.DireccionPadre,
            OrdenCompra: "OC00" + conteo + "eb12",
            HoraCreacion: body.HoraCreacion,
            HoraInicio: body.HoraInicio,
            HoraFin: body.HoraFin,
            DPTO: body.DPTO,
            proveedor: body.proveedor,
            Condicion: body.Condicion,
            Cantidad: body.Cantidad,
            Precio: body.Precio,
            Importe: body.Importe,
            Productos: body.Productos,
            Usuario: req.usuario._id,
            Total: body.Total,
            TotalIVA: body.TotalIVA,
            IVA: body.IVA

        })
        historiales.save((err, historialDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!historialDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })

            }
            //usuarioDB.password = null

            res.json({
                ok: true,
                historial: historialDB,
            })

        });
    })

})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actualiza una nueva Bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/historiales/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['HoraCreacion',
        'HoraInicio',
        'HoraFin',
        'DPTO',
        'Condicion',
        'Cantidad',
        'Precio',
        'Importe',
        'Productos',
        'Usuario'
    ]);

    Historiales.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, historialDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!historialDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            historial: historialDB
        })
    })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borra bodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/historiales/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    Historiales.findOneAndRemove(id, (err, historialDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!historialDB) {
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
                message: 'historial Borrado'
            }
        })
    })
})



module.exports = app;