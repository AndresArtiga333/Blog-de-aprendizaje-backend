import Publicaciones from './publicaciones.model.js';
import Comentarios from '../comentarios/comentarios.model.js';
import { format } from 'date-fns';

export const listarPublicaciones = async (req, res) => {
    try {
      const { categoria, curso } = req.body;
      let filtro = {};
  
      if (categoria) filtro.categoria = categoria;
      if (curso)     filtro.curso     = curso;
  
      // obtenemos los documentos crudos
      const publicacionesRaw = await Publicaciones
        .find(filtro)
        .populate({ path: 'comentarios', select: 'autor contenido fecha -_id' })
        .sort({ fecha: -1 });
  
      // formateamos fecha igual que en buscarPorId
      const publicaciones = publicacionesRaw.map(pub => {
        const obj = pub.toObject();
        return {
          ...obj,
          fecha: format(new Date(obj.fecha), 'yyyy-MM-dd HH:mm'),
          comentarios: (obj.comentarios || []).map(com => ({
            ...com,
            fecha: format(new Date(com.fecha), 'yyyy-MM-dd HH:mm')
          }))
        };
      });
  
      res.status(200).json({
        success: true,
        publicaciones
      });
    } 
    catch (err) {
      res.status(500).json({
        success: false,
        message: "Error al listar las publicaciones",
        error: err.message
      });
    }
  };

export const crearPublicacion = async (req, res) => {
    try{
        const {titulo, contenido, curso, categoria} = req.body
        const nuevaPublicacion = await Publicaciones.create({
            titulo,
            contenido,
            curso,
            categoria
        })
        res.status(201).json({
            message: "Publicacion creada",
            publicacion: nuevaPublicacion
        })
    }catch(err){
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
        res.status(500).json({
            error: "Error al eliminar la publicación",
            message: err.message
        });
    }
};

export const buscarPublicacionPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicaciones.findById(id)
            .populate({ path: 'comentarios', select: 'autor contenido fecha -_id' });
    
        if (!publicacion) {
            return res.status(404).json({
                error: "Publicación no encontrada"
            });
        }
        const publicacionF = {
            ...publicacion.toObject(),
            fecha: format(new Date(publicacion.fecha), 'yyyy-MM-dd HH:mm'), 
            comentarios: publicacion.comentarios.map(comentario => ({
                ...comentario.toObject(),
                fecha: format(new Date(comentario.fecha), 'yyyy-MM-dd HH:mm') 
            }))
        };
        res.status(200).json({
            message: "Publicación encontrada",
            publicacion: publicacionF
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Error al buscar la publicación",
            message: err.message
        });
    }    
}