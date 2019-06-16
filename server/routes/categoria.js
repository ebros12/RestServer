const express = require('express');
const Usuario = require('../models/usuario');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/Autenticacion');

let app = express();

let Categoria = require('../models/categoria');
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra Todas las Categorias
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion ')
        .populate('usuario', 'nombre email ')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                categorias
            })
        })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Muestra una categoria por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es valido'
                }
            })

        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })



})




// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Crea nueva categoria
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id,

    })
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        //usuarioDB.password = null
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Actualiza una nueva categoria
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.put('/categoria/:id', (req, res) => {
    // nombre categoria
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    // Usuario.findById(id, (err, usuarioDB) => {
    //     usuarioDB.save
    // })
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Borra categoria
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo admin
    //categoria findbyidandremove

    let id = req.params.id;
    Categoria.findOneAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
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
                message: 'Categoria Borrada'
            }
        })
    })
})



module.exports = app;