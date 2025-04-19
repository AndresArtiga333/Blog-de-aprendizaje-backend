import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";

export const agregarComentariosValidator = [

    body("autor").notEmpty().withMessage("El autor es obligatorio"),
    body("contenido").notEmpty().withMessage("El contenido es obligatorio"),
    validarCampos
]