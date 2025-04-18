import {Router} from 'express';
import { agregarPublicacionValidator } from '../middlewares/publicaciones-validator.js';
import { crearPublicacion, listarPublicaciones, descargarArchivo, eliminarPublicacion } from './publicaciones.controller.js';
import { upload } from '../middlewares/multer-uploads.js';

const router = Router()

router.post("/crearPublicacion", upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'zip', maxCount: 1 }
]) ,agregarPublicacionValidator, crearPublicacion)
router.get("/", listarPublicaciones)

router.get('/descargar/:tipo/:nombreArchivo', descargarArchivo);
export default router

router.delete("/eliminarPublicacion/:id", eliminarPublicacion)