var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'El precio únitario es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    Umedida: { type: String, required: [true, 'La Unidad de medida es necesaria'] },
    distribucion: { type: Schema.Types.ObjectId, ref: 'Distribucion', required: true },
    NivelStock: {
        type: Number,
        //debe ser un numero vs un total (EJ: De 100 productos debe haber 20 de este)
        default: 20,
        required: [true, 'Nivel de Stock nesesario']
    }
});


module.exports = mongoose.model('Producto', productoSchema);