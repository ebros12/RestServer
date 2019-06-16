const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Descripcion nesesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario es nesesario']
    }
})
module.exports = mongoose.model('Categoria', categoriaSchema);