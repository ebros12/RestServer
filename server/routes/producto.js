const express = require('express')
const { verificaToken } = require('../middlewares/Autenticacion');
const _ = require('underscore')
let app = express();
let Producto = require('../models/producto');

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Obtener un producto
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/productos', (req, res) => {
    // populate usuario categoria
    // paginado
    Producto.find({ disponible: true }, 'nombre precioUni descripcion Umedida')
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .populate('distribucion', 'nombre')


    .exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            productos
        })
    })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Obtener un producto por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/productos/:id', verificaToken, (req, res) => {
    // populate usuario categoria
    // paginado
    let id = req.params.id
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es valido'
                    }
                })

            }
            res.json({
                ok: true,
                producto: productoDB
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Buscar Productos
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino
    let regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                productos
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea un  producto
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/productos', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id,
        Umedida: body.Umedida,
        distribucion: body.distribucion

    })
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        //usuarioDB.password = null
        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    });
})


// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actuaizar un  producto
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/productos/:id', (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria', 'Umedida', ]);

    // Usuario.findById(id, (err, usuarioDB) => {
    //     usuarioDB.save
    // })
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, producto) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            producto: producto
        })
    })
})


// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borrar un  producto
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/productos/:id', verificaToken, (req, res) => {
    // disponible false
    let id = req.params.id;
    let cambiaEstado = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            producto: productoBorrado
        })
    })
})

module.exports = app;