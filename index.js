import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import allRoutes from './routes/index.js';
import { dbConnection } from './databases/config.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Conexión Base de datos
dbConnection();

// CORS
app.use(cors());

//Directorio público
app.use(express.static('public'));

// Lectura y parseo de body
app.use(express.json());


//rutas
app.use('/',allRoutes);

//TODO: CRUD : Eventos

app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}...`);
});