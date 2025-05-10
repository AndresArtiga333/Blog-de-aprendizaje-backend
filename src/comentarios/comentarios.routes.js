import { Router } from "express";
import { agregarComentariosValidator } from "../middlewares/comentarios-validator.js";
import { agregarComentarios, eliminarComentario, editarComentario } from "./comentarios.controller.js";

const router = Router();

/**
 * @swagger
 * /agregarComentarios/{pid}:
 *   post:
 *     summary: Agregar un comentario a una publicación
 *     description: Permite agregar un comentario a una publicación especificada por su ID.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID de la publicación a la que se le agrega el comentario
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - autor
 *               - contenido
 *             properties:
 *               autor:
 *                 type: string
 *                 example: "Juan Pérez"
 *               contenido:
 *                 type: string
 *                 example: "Este es un comentario."
 *     responses:
 *       201:
 *         description: Comentario agregado exitosamente
 *       400:
 *         description: Datos incorrectos o inválidos
 */
router.post("/agregarComentarios/:pid", agregarComentariosValidator, agregarComentarios);

/**
 * @swagger
 * /eliminarComentario/{cid}:
 *   delete:
 *     summary: Eliminar un comentario
 *     description: Permite eliminar un comentario especificado por su ID.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del comentario a eliminar
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       404:
 *         description: Comentario no encontrado
 */
router.delete("/eliminarComentario/:cid", eliminarComentario);

/**
 * @swagger
 * /editarComentario/{cid}:
 *   put:
 *     summary: Editar un comentario
 *     description: Permite editar el contenido de un comentario especificado por su ID.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del comentario a editar
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contenido
 *             properties:
 *               contenido:
 *                 type: string
 *                 example: "Este es el contenido actualizado del comentario."
 *     responses:
 *       200:
 *         description: Comentario editado exitosamente
 *       400:
 *         description: Datos incorrectos o inválidos
 *       404:
 *         description: Comentario no encontrado
 */
router.put("/editarComentario/:cid", editarComentario);

export default router;
