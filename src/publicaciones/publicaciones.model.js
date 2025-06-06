import {Schema, model} from 'mongoose';
import '../comentarios/comentarios.model.js'

const publicacionesSchema = Schema({
    titulo:{
        type: String,
        required: [true, 'El titulo es requerido'],
        trim: true,
        maxLength: [50, 'El titulo no puede ser mayor a 30 caracteres']
    },
    contenido:{
        type: String,
        required: [true, 'El contenido es requerido'],
        trim: true,
        maxLength: [500, 'El contenido no puede ser mayor a 500 caracteres']
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    curso:{
        type: String,
        required: [true, 'El curso es requerido'],
        enum: ['TALLER', 'TECNOLOGIA', 'PRACTICA SUPERVISADA']
    },
    categoria:{
        type: String,
        required: [true, 'La categoria es requerida'],
        enum: ['CODIGO', 'INVESTIGACION', 'INFOGRAFIA', 'MAPA CONCEPTUAL', 'MAPA MENTAL']
    },
      comentarios: [{  
        type: Schema.ObjectId,
        ref: "Comentarios",
        default: []  
      }]
    },
    {
        versionKey: false, 
        timestamps: false
    }
)

publicacionesSchema.methods.toJSON = function(){
    const {_id, ...publicaciones} = this.toObject()
    publicaciones.pid = _id
    return publicaciones
}

export default model('Publicaciones', publicacionesSchema)