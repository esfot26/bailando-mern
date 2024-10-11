import React, { useState } from 'react';
import axios from 'axios';
import './EditSong.css';

const EditSong = ({ song, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: song.titulo || '',
    artista: song.artista || '',
    album: song.album || '',
    genero: song.genero || ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Envía los datos actualizados al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/musica/actualizar/${song._id}`, formData);
      onSave(formData); 
    } catch (error) {
      console.error('Error actualizando la canción:', error);
    }
  };

  return (
    <div className="edit-song">
      <h3>Editar Canción</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Artista:</label>
          <input
            type="text"
            name="artista"
            value={formData.artista}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Álbum:</label>
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Género:</label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
          />
        </div>
        <div className="edit-song-actions">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditSong;
