import {  SwaggerUiOptions } from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        tags:[
            {
                name: 'Patners',
                description: 'API Operations related to partners' 
            }
        ],
        info:{
            title: 'REST API for Caja Reyes / Express / Sequelize / Swagger / Typescript',
            version: '1.0.0',
            description: 'This is a REST API application made with Express, Sequelize, Swagger and Typescript for Caja Reyes in order to manage partners'  

        }
    },
    apis: ['./src/routes.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const SwaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url('../logo/logo-caja-reyes-optimizado.webp');
            height: 50px;
            width: auto;
        }
    `
}

export default swaggerSpec;

export {SwaggerUiOptions};