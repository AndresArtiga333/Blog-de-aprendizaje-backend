import { Router } from 'express';
import { agregarPublicacionValidator, buscarPublicacionPorIdValidator } from '../middlewares/publicaciones-validator.js';
import { crearPublicacion, listarPublicaciones, eliminarPublicacion, buscarPublicacionPorId } from './publicaciones.controller.js';

const router = Router();

/**
 * @swagger
 * /crearPublicacion:
 *   post:
 *     summary: Crear una nueva publicación
 *     description: Crea una nueva publicación en el sistema.
 *     tags:
 *       - Publicaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nuevo artículo"
 *               contenido:
 *                 type: string
 *                 example: "Este es el contenido del nuevo artículo."
 *               categoria:
 *                 type: string
 *                 example: "Tecnología"
 *               curso:
 *                 type: string
 *                 example: "React"
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: Datos incorrectos o inválidos
 */
router.post("/crearPublicacion", agregarPublicacionValidator, crearPublicacion);

/**
 * @swagger
 * /listar:
 *   post:
 *     summary: Listar publicaciones
 *     description: Obtiene una lista de todas las publicaciones.
 *     tags:
 *       - Publicaciones
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   titulo:
 *                     type: string
 *                   contenido:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 */
router.post("/listar", listarPublicaciones);

/**
 * @swagger
 * /eliminarPublicacion/{id}:
 *   delete:
 *     summary: Eliminar una publicación
 *     description: Elimina una publicación del sistema por su ID.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicación a eliminar
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente
 *       404:
 *         description: Publicación no encontrada
 */
router.delete("/eliminarPublicacion/:id", eliminarPublicacion);

/**
 * @swagger
 * /buscarPublicacionPorId/{id}:
 *   get:
 *     summary: Buscar publicación por ID
 *     description: Obtiene los detalles de una publicación por su ID.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicación que se quiere obtener
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Detalles de la publicación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *                 fecha:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Publicación no encontrada
 */
router.get("/buscarPublicacionPorId/:id", buscarPublicacionPorIdValidator, buscarPublicacionPorId);

export default router;
