import Publicaciones from './publicaciones.model.js';
import Comentarios from '../comentarios/comentarios.model.js';
import { format } from 'date-fns';

export const listarPublicaciones = async (req, res) => {
    try {
        const {curso} = req.query;
        let filtro = {};
        
        if(curso !== undefined){
            filtro.curso = curso; 
        }
        
        const sort = {fecha: -1};
        const publicaciones = await Publicaciones.find(filtro)
            .select('-_id -__v')
            .populate({
                path: 'comentarios',
                select: 'autor contenido fecha -_id',
                options: { sort: { fecha: -1 } }
            })
            .sort(sort);

        const publicacionesF = publicaciones.map(publicacion => ({
            ...publicacion.toObject(),
            fecha: format(new Date(publicacion.fecha), 'yyyy-MM-dd HH:mm'), 
            comentarios: publicacion.comentarios.map(comentario => ({
                ...comentario.toObject(),
                fecha: format(new Date(comentario.fecha), 'yyyy-MM-dd HH:mm') 
            }))
        }));
        
        res.status(200).json({
            message: "Publicaciones encontradas",
            publicaciones: publicacionesF
        });
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
        const nuevaPublicacion = await Publicaciones.create({
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

export const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicaciones.findByIdAndDelete(id);

        if (!publicacion) {
            return res.status(404).json({
                error: "Publicación no encontrada"
            });
        }

        await Comentarios.deleteMany({ _id: { $in: publicacion.comentarios } });

        res.status(200).json({
            message: "Publicación eliminada completamente",
            detalles: {
                titulo: publicacion.titulo,
                id: publicacion._id
            }
        });

    } catch (err) {
        console.error("Error en eliminarPublicacion:", err);
        res.status(500).json({
            error: "Error al eliminar la publicación",
            message: err.message
        });
    }
};