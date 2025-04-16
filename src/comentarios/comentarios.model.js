import { Schema, model } from 'mongoose';

const comentariosSchema = Schema({
    autor: {
        type: String,
        required: [true, 'El autor es requerido'],
        trim: true,
        maxLength: [30, 'El autor no puede ser mayor a 30 caracteres']
    },
    contenido: {
        type: String,
        required: [true, 'El contenido es requerido'],
        trim: true,
        maxLength: [500, 'El contenido no puede ser mayor a 500 caracteres']
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

export default model("Comentarios", comentariosSchema)