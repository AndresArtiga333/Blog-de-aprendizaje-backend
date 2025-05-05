import {Router} from 'express';
import { agregarPublicacionValidator } from '../middlewares/publicaciones-validator.js';
import { crearPublicacion, listarPublicaciones, eliminarPublicacion } from './publicaciones.controller.js';

const router = Router()

router.post("/crearPublicacion", crearPublicacion)

router.get("/", listarPublicaciones)

router.delete("/eliminarPublicacion/:id", eliminarPublicacion)

export default router