import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            titulo: "Blog de aprendizaje",
            version: "1.0.0",
            descripcion: "Blog de aprendizaje",
            contacto:{
                nombre: "Andres Artiga",
                correo: "aartiga-2020246@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/blog/v1"
            }
        ]
    },
    apis:[
        "./src/comentarios/comentarios.routes.js",
        "./src/publicaciones/publicaciones.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export {swaggerDocs, swaggerUi}