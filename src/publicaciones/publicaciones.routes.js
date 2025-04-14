import {Router} from 'express';
import { agregarPublicacionValidator } from '../middlewares/publicaciones-validator.js';
import { crearPublicacion, listarPublicaciones } from './publicaciones.controller.js';

const router = Router()

router.post("/agregarPublicacion", agregarPublicacionValidator, crearPublicacion)
router.get("/", listarPublicaciones)

export default router