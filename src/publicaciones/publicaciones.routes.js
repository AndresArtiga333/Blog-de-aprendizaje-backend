import {Router} from 'express';
import { agregarPublicacionValidator, buscarPublicacionPorIdValidator } from '../middlewares/publicaciones-validator.js';
import { crearPublicacion, listarPublicaciones, eliminarPublicacion, buscarPublicacionPorId } from './publicaciones.controller.js';

const router = Router()

router.post("/crearPublicacion", agregarPublicacionValidator, crearPublicacion)

router.post("/listar", listarPublicaciones)

router.delete("/eliminarPublicacion/:id", eliminarPublicacion)

router.get("/buscarPublicacionPorId/:id",buscarPublicacionPorIdValidator, buscarPublicacionPorId)

export default router