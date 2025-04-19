import Publicaciones from './publicaciones.model.js';
import Comentarios from '../comentarios/comentarios.model.js';
import { format } from 'date-fns';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pdfDir = path.join(__dirname, '../../public/pdfs');
const zipDir = path.join(__dirname, '../../public/zips');

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
        const pdfFile = req.files?.pdf?.[0];
        const zipFile = req.files?.zip?.[0];
        const nuevaPublicacion = await Publicaciones.create({
            titulo,
            contenido,
            curso,
            pdfPath: pdfFile?.filename, 
            zipPath: zipFile?.filename
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

export const descargarArchivo = async (req, res) => {
    const { tipo, nombreArchivo } = req.params;
    const folder = tipo === 'pdf' ? 'pdfs' : 'zips';
    const filePath = path.join(__dirname, `../../../public/${folder}/${nombreArchivo}`);
  
    const decodedFileName = decodeURIComponent(nombreArchivo);

    if (!['pdf', 'zip'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo de archivo no válido' });
    }
  
    res.download(filePath, decodedFileName, (err) => {
      if (err) {
        res.status(404).json({ error: 'Archivo no encontrado' });
      }
    });
  };

  export const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicaciones.findById(id);
        
        if (!publicacion) {
            return res.status(404).json({
                error: "Publicación no encontrada"
            });
        }

        await Comentarios.deleteMany({ _id: { $in: publicacion.comentarios } });

        const eliminarArchivo = async (filePath, tipo) => {
            if (!filePath) return;
            
            try {
                let fullPath;
                if (tipo === 'pdf') {
                    fullPath = path.join(pdfDir, path.basename(filePath));
                } else if (tipo === 'zip') {
                    fullPath = path.join(zipDir, path.basename(filePath));
                } else {
                    return;
                }

                await fs.unlink(fullPath);
                console.log(`Archivo ${tipo} eliminado: ${fullPath}`);
            } catch (err) {
                console.error(`Error al eliminar archivo ${tipo}:`, err.message);
            }
        };

        await Promise.all([
            eliminarArchivo(publicacion.pdfPath, 'pdf'),
            eliminarArchivo(publicacion.zipPath, 'zip')
        ]);
        
        await Publicaciones.findByIdAndDelete(id);

        res.status(200).json({
            message: "Publicación eliminada completamente",
            detalles: {
                titulo: publicacion.titulo,
                id: publicacion._id,
                archivosEliminados: {
                    pdf: !!publicacion.pdfPath,
                    zip: !!publicacion.zipPath
                }
            }
        });

    } catch(err) {
        console.error("Error en eliminarPublicacion:", err);
        res.status(500).json({
            error: "Error al eliminar la publicación",
            message: err.message
        });
    }
};