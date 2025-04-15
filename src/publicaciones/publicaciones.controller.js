import Publicaciones from './publicaciones.model.js';
import {format} from 'date-fns';

export const listarPublicaciones = async (req, res) => {
    try{
        const {curso} = req.query;
        let filtro = {}
        if(curso !== undefined){
            filtro.curso = {curso} 
        }
        const sort = {fecha: -1}
        const publicaciones = await Publicaciones.find(filtro).select('-_id -__v ').sort(sort)

        const publicacionesF = publicaciones.map(publi => ({...publi.toObject(), 
            fecha: format(new Date(publi.fecha), 'yyyy-MM-dd HH:mm'),
          }))
        res.status(200).json({
            message: "Publicaciones encontradas",
            publicacionesF
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
        const pdfFile = req.files?.pdf?.[0];
        const zipFile = req.files?.zip?.[0];
        const nuevaPublicacion = await Publicaciones.create({
            titulo,
            contenido,
            curso,
            pdfPath: pdfFile?.filename, 
            zipPath: zipFile?.filename
        })
        console.log(nuevaPublicacion)
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