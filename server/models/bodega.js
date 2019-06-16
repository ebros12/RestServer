var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bodegaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es necesaria']
    },
    telefono: {
        type: String,
        required: [false, '']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario es nesesario']
    }

});


module.exports = mongoose.model('Bodega', bodegaSchema);