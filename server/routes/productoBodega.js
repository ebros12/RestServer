const express = require('express')
const { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion');
const _ = require('underscore')
let app = express();
let ProductosBodega = require('../models/ProductosBodegas');
var groupBy = require('group-by');
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Obtener un ProductosBodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/ProductosBodega', (req, res) => {
    // populate usuario categoria
    // paginado
    let id = req.params.id
    ProductosBodega.find({ disponible: true })
        .populate('categoria', 'nombre')
        .populate('producto', 'nombre')
        .populate('bodega', 'nombre')
        .exec((err, ProductosBodegaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!ProductosBodegaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es valido'
                    }
                })

            }
            res.json({
                ok: true,
                ProductosBodega: groupBy(ProductosBodegaDB, 'nombre')
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Obtener un ProductosBodega por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/ProductosBodega/:id', verificaToken, (req, res) => {
    // populate usuario categoria
    // paginado
    let id = req.params.id
    ProductosBodega.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, ProductosBodegaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!ProductosBodegaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es valido'
                    }
                })

            }
            res.json({
                ok: true,
                ProductosBodega: groupBy(ProductosBodegaDB, 'nombre')
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Buscar ProductosBodegaDB
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/ProductosBodega/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino
    let regex = new RegExp(termino, 'i');
    ProductosBodega.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .populate('producto', 'nombre')
        .populate('bodega', 'nombre')
        .exec((err, ProductosBodega) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                ProductosBodega: groupBy(ProductosBodega, 'nombre')
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea un  ProductosBodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/ProductosBodega', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let body = req.body;
    ProductosBodega.countDocuments({}, (err, conteo) => {
        let productosBodega = new ProductosBodega({
            IVA: body.IVA,
            nombre: body.nombre,
            CodigoProductoBodega: "CPB00" + conteo + "ros12",
            ValorTotal: body.ValorTotal,
            ValorIVA: body.ValorIVA,
            ValorUnidad: body.ValorUnidad,
            cantidad: body.cantidad,
            concepto: body.concepto,
            producto: body.producto,
            bodega: body.bodega,
            OrdenCompra: body.OrdenCompra,
            NumeroCorrelativo: body.NumeroCorrelativo,
            usuario: req.params.id
        })


        productosBodega.save((err, ProductosBodegaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!ProductosBodegaDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })

            }
            //usuarioDB.password = null

            res.json({
                ok: true,
                ProductosBodega: ProductosBodegaDB,
            })

        });
    })
})




// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actuaizar un  ProductosBodegaDB
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/ProductosBodega/:id', (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let id = req.params.id;
    let body = _.pick(req.body, ['IVA',
        'nombre',
        'CodigoProductoBodega',
        'ValorTotal',
        'ValorIVA',
        'ValorUnidad',
        'cantidad',
        'concepto',
        'producto',
        'bodega',
        'OrdenCompra',
        'NivelStock',
        'usuario'
    ]);

    // Usuario.findById(id, (err, usuarioDB) => {
    //     usuarioDB.save
    // })
    ProductosBodega.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, ProductosBodega) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            ProductosBodega
        })
    })
})


// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borrar un  ProductosBodega
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/ProductosBodega/:id', verificaToken, (req, res) => {
    // disponible false
    let id = req.params.id;
    let cambiaEstado = {
        disponible: false
    }
    ProductosBodega.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ProductosBodegaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!ProductosBodegaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            ProductosBodega: ProductosBodegaBorrado
        })
    })
})



// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borra categoria
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/ProductosBodegaB/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo admin
    //categoria findbyidandremove

    let id = req.params.id;
    ProductosBodega.findOneAndRemove(id, (err, ProductosBodegaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!ProductosBodegaBorrado) {
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
                message: 'Productos Bodega Borrado'
            }
        })
    })
})
module.exports = app;