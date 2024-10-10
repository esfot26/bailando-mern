import {Router} from 'express';
import musicController from '../controllers/musicController.js';

const routerMusic = Router();

routerMusic.get('/', musicController.obtenerMusica);
routerMusic.get('/buscar/:id', musicController.obtenerMusicaById);
routerMusic.post('/nuevo', musicController.crearMusica);
routerMusic.put('/eliminar/:id', musicController.eliminarMusica);
routerMusic.put('/actualizar/:id', musicController.actualizarMusica);
routerMusic.get('/buscar', musicController.buscarMusica);

export default routerMusic;