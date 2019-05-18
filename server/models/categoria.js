const mongoose = require('mongoose')
    // const uniqueValidator = require('mongoose-unique-validator')
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
    // categoriaSchema.methods.toJSON = function() {
    //     let categoria = this;
    //     let userObject = categoria.toObject();
    //     return userObject;
    // }

// categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })
module.exports = mongoose.model('Categoria', categoriaSchema);