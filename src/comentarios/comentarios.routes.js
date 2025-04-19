import { Router } from "express";
import { agregarComentariosValidator } from "../middlewares/comentarios-validator.js";
import { agregarComentarios, eliminarComentario, editarComentario } from "./comentarios.controller.js";

const router = Router()

router.post("/agregarComentarios/:pid", agregarComentariosValidator, agregarComentarios)

router.delete("/eliminarComentario/:cid", eliminarComentario)

router.put("/editarComentario/:cid", editarComentario)

export default router