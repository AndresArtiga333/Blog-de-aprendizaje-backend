import Publicaciones from './publicaciones.model.js';

export const listarPublicaciones = async (req, res) => {
    try{
        const {curso} = req.query;
        let filtro = {}
        if(curso !== undefined){
            filtro.curso = {curso}
        }
        const sort = {fecha: -1}
        const publicaciones = await Publicaciones.find(filtro).sort(sort)
        res.status(200).json({
            message: "Publicaciones encontradas",
            publicaciones
        })
    }catch(err){
        res.status(500).json({
            error: "Error al listar las publicaciones",
            message: err.message   
        })
    }
}

export const crearPublicacion = async (req, res) => {
    try{
        const {titulo, contenido, curso} = req.body
        const nuevaPublicacion = Publicaciones.create({
            titulo,
            contenido,
            curso
        })
        res.status(201).json({
            message: "Publicacion creada",
            publicacion: nuevaPublicacion
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error: "Error al crear la publicacion",
            message: err.message   
        })
    }
}