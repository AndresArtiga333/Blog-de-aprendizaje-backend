import Publicaciones from '../publicaciones/publicaciones.model.js'
import Comentarios from './comentarios.model.js'

export const agregarComentarios = async (req, res) => {
    try{
        const { autor, contenido } = req.body
        const { pid } = req.params
        const publicacion = await Publicaciones.findById(pid)
        if(!publicacion){
            return res.status(404).json({
                msg: 'Publicacion no encontrada'
            })
        }
        const comentario = new Comentarios({ autor, contenido })
        await comentario.save()
        publicacion.comentarios.push(comentario._id)
        await publicacion.save()

        res.status(201).json({
            success: true,
            msg: 'Comentario agregado exitosamente'
        });
    }catch(error){
        return res.status(500).json({
            msg: 'Error en el servidor',
            error: error.message
        })
    }
}

export const eliminarComentario = async (req, res) => {
    try {
        const { cid } = req.params;

        const comentarioEliminado = await Comentarios.findByIdAndDelete(cid);
        
        if (!comentarioEliminado) {
            return res.status(404).json({
                success: false,
                msg: 'Comentario no encontrado'
            });
        }

        await Publicaciones.updateMany(
            { comentarios: cid },
            { $pull: { comentarios: cid } }
        );

        res.status(200).json({
            success: true,
            msg: 'Comentario eliminado correctamente',
            data: {
                comentarioId: comentarioEliminado._id,
                autor: comentarioEliminado.autor,
                contenido: comentarioEliminado.contenido
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar el comentario',
            error: error.message
        });
    }
};

export const editarComentario = async (req, res) => {
    try {
        const { cid } = req.params;
        const  data  = req.body;

        const comentarioActualizado = await Comentarios.findByIdAndUpdate(
            cid,
            { $set: data },
            { new: true }
        );
        
        if (!comentarioActualizado) {
            return res.status(404).json({
                success: false,
                msg: 'Comentario no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            msg: 'Comentario actualizado correctamente',
            data: {
                comentarioId: comentarioActualizado._id,
                autor: comentarioActualizado.autor,
                contenido: comentarioActualizado.contenido
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el comentario',
            error: error.message
        });
    }
}