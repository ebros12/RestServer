var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoBodegaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'la empresa Padre es necesaria']
    },
    IVA: {
        type: String,
        required: [false, 'La IVA es necesaria']
    },
    ValorTotal: {
        type: String,
        required: [false, 'La ValorTotal es necesaria']
    },
    ValorIVA: {
        type: String,
        required: [false, 'La ValorIVA es necesaria']
    },
    cantidad: {
        type: String,
        required: [true, 'La cantidad es necesaria']
    },
    ValorUnidad: {
        type: String,
        required: [true, 'La valorUnidad es necesaria']
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    bodega: {
        type: Schema.Types.ObjectId,
        ref: 'Bodega',
        required: true
    },
    OrdenCompra: {
        type: String,
        required: [true, 'OrdenCompra es nesesario']
    },
    NumeroCorrelativo: {
        type: String,
        required: [true, 'Numero Correlativo es nesesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    CodigoProductoBodega: {
        type: String,
        required: [true, 'Codigo Producto Bodega es nesesario']
    },
    concepto: {
        type: String,
        required: [true, 'concepto Producto Bodega es nesesario']
    },
    disponible: {
        type: Boolean,
        required: true,
        default: true
    }
});


module.exports = mongoose.model('productoBodega', productoBodegaSchema);