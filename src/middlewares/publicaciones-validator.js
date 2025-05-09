import { body, param } from "express-validator";
import { validarCampos } from "./validar-campos.js";

export const agregarPublicacionValidator = [
    body("titulo").notEmpty().withMessage("El titulo es obligatorio"),
    body("contenido").notEmpty().withMessage("El contenido es obligatorio"),
    body("curso").notEmpty().withMessage("El curso es obligatorio"),
    body("categoria").notEmpty().withMessage("La categoria es obligatoria"),
    body("categoria").isIn(['CODIGO', 'INVESTIGACION', 'INFOGRAFIA', 'MAPA CONCEPTUAL', 'MAPA MENTAL'])
    .withMessage("La categoria no es valida"),
    validarCampos
]

export const buscarPublicacionPorIdValidator = [
    param("id").notEmpty().isMongoId(),
    validarCampos
]
