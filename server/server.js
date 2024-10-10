import express from 'express';
import dotenv from 'dotenv';
import connectarDB from './config/music.config.js';
import routerMusic from './routes/musicRoutes.js';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
}));


connectarDB();

app.use('/api/musica', routerMusic);

app.listen(process.env.PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PUERTO}`);
});

