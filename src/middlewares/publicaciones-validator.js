import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";

export const agregarPublicacionValidator = [
    body("titulo").notEmpty().withMessage("El titulo es obligatorio"),
    body("contenido").notEmpty().withMessage("El contenido es obligatorio"),
    body("curso").notEmpty().withMessage("El curso es obligatorio"),
    validarCampos
]