var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var HistorialOrdenSchema = new Schema({

    empresaPadre: {
        type: String,
        required: [true, 'la empresa Padre es necesaria']
    },
    DireccionPadre: {
        type: String,
        required: [true, 'la Direccion Padre es necesaria']
    },
    HoraCreacion: {
        type: String,
        required: [true, 'la Hora Creacion es necesaria']
    },
    HoraInicio: {
        type: String,
        required: [true, 'la Hora Inicio es necesaria']
    },
    HoraFin: {
        type: String,
        required: [true, 'la Hora Fin es necesaria']
    },
    DPTO: {
        type: String,
        required: [true, 'El DPTO es nesesario']
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'El proveedor es necesario']
    },
    Condicion: {
        type: String,
        required: [true, 'La Condicion es necesaria']
    },
    Importe: {
        type: String,
        required: [true, 'El Importe es necesario']
    },
    Productos: {
        type: String,
        required: [true, 'Los Productos son necesarios']
    },
    Usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario es nesesario']
    },
    Total: {
        type: String,
        required: [true, 'El Total es nesesario']
    },
    TotalIVA: {
        type: String,
        required: [true, 'El IVA es nesesario']
    },
    IVA: {
        type: String,
        required: [true, 'El IVA es nesesario']
    },
    OrdenCompra: {
        type: String,
        required: [true, 'El IVA es nesesario']
    }



});


module.exports = mongoose.model('HistorialOrden', HistorialOrdenSchema);