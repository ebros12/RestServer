const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let historialMovimientoSchema = new Schema({
    NMovimiento: {
        type: String,
        required: [true, 'MotivoMovimiento nesesario']
    },
    FechaInicio: {
        type: String,
        required: [true, 'FechaInicio nesesario']
    },
    FechaFin: {
        type: String,
        required: [true, 'FechaFin nesesario']
    },
    FechaCreacion: {
        type: String,
        required: [true, 'FechaCreacion nesesario']
    },
    Productos: {
        type: String,
        required: [true, 'MotivoMovimiento nesesario']
    },
    Comentarios: {
        type: String,
        required: [false, 'Comentarios no nesesario']
    },
    NombreEmpresa: {
        type: String,
        required: [false, 'NombreEmpresa no nesesario']
    },
    RutEmpresa: {
        type: String,
        required: [false, 'RutEmpresa no nesesario']
    },
    TelEmpresa: {
        type: String,
        required: [false, 'TelEmpresa no nesesario']
    },
    CorremEmpresa: {
        type: String,
        required: [false, 'CorremEmpresa no nesesario']
    },
    RolEmpresa: {
        type: String,
        required: [false, 'RolEmpresa no nesesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario es nesesario']
    }
})
module.exports = mongoose.model('historialMovimiento', historialMovimientoSchema);