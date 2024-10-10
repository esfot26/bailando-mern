import music from '../models/music.model.js';
import mongoose from 'mongoose';

const musicController = {
  crearMusica: async (req, res) => {
    try {
      const { titulo, artista, genero, album } = req.body;
      if (!titulo || !artista || !album || !genero) {
        return res.status(400).json({ error: 'Faltan datos' });
      }
      const nuevaMusica = await music.create(req.body);
      return res.status(201).json(nuevaMusica);
    } catch (error) {
      return res.status(400).json({ error: 'Error al crear la música' });
    }
  },

  obtenerMusica: async (req, res) => {
    try {
      const musica = await music.find();
      res.json(musica);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las músicas' });
    }
  },

  obtenerMusicaById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID no válido' });
      }
      const musica = await music.findById(id);
      if (!musica) {
        res.status(404).json({ mensaje: "Música no encontrada" });
        return;
      }
      res.json(musica);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener la música' });
    }
  },

  actualizarMusica: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID no válido' });
      }
      const musicaActualizada = await music.findByIdAndUpdate(id, req.body, { new: true });
      if (!musicaActualizada) {
        res.status(404).json({ mensaje: "Música no encontrada" });
        return;
      }
      res.json(musicaActualizada);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al actualizar la música' });
    }
  },

  eliminarMusica: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID no válido' });
      }
      const musicaEliminada = await music.findByIdAndDelete(id);
      if (!musicaEliminada) {
        res.status(404).json({ mensaje: "Música no encontrada" });
        return;
      }
      res.json({ mensaje: "Música eliminada correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al eliminar la música' });
    }
  },

  buscarMusica: async (req, res) => {
    try {
      const { titulo, artista } = req.query; // Puedes enviar los parámetros por query

      const query = {};
      if (titulo) query.titulo = titulo; // Agregar filtro por título si se proporciona
      if (artista) query.artista = artista; // Agregar filtro por artista si se proporciona

      const canciones = await music.find(query);

      if (canciones.length > 0) {
        res.json(canciones);
      } else {
        res.status(404).json({ mensaje: "No se encontraron canciones con esos criterios." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al buscar las músicas' });
    }
  },
};

export default musicController;
