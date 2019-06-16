var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var distribucionSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    bodega: {
        type: Schema.Types.ObjectId,
        ref: 'Bodega',
        required: [true, 'La bodega es nesesario']
    }
});


module.exports = mongoose.model('Distribucion', distribucionSchema);