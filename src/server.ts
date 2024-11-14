import express from 'express';
import router from './routes';
import db from './config/db';
import colors from 'colors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec, {SwaggerUiOptions} from './config/swagger';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import { corsConfig } from './config/cors';

//Conexión a la base de datos
async function connectDB(){
    try{
        await db.authenticate();
        db.sync();
        console.log(colors.magenta('Conexión a la base de datos exitosa'))
    }
    catch(error){
        //console.log(error)
        console.log(colors.bgRed.white('Error al conectar a la base de datos'))
    }
}
connectDB();

//Instancia de express
const server = express();

//Permitir CORS


server.use(cors(corsConfig));

//Leer datos del formulario
server.use(express.json());

//Routing 
server.use(morgan('dev'));
server.use('/api/auth', authRoutes);
server.use('/api/socios', router);

// Docs 
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, SwaggerUiOptions) )

export default server; 