import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SongList.css';
import EditSong from './EditSong';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSong, setEditingSong] = useState(null); // Estado para la canción que se está editando

  // Fetch de las canciones desde la API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/musica');
        console.log(response.data); // Verifica si estás recibiendo los datos correctamente
        setSongs(response.data); // Asegúrate de que response.data sea un array
      } catch (err) {
        console.error(err); // Imprime el error en la consola
        setError('Error al cargar las canciones');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar esta canción?');

    if (isConfirmed) {
      try {
        await axios.put(`http://localhost:8000/api/musica/eliminar/${id}`);
        // Actualizar la lista de canciones después de eliminar
        setSongs(songs.filter(song => song._id !== id));
      } catch (error) {
        console.error('Error eliminando la canción:', error);
      }
    }
  };


  // Función para guardar la canción editada
  const handleSave = (updatedSong) => {
    // Actualizar la canción en la lista
    setSongs(songs.map(song => song._id === updatedSong._id ? updatedSong : song));
    setEditingSong(null); // Cierra el formulario de edición
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setEditingSong(null); // Cancela la edición
  };

  if (loading) return <p className="loading">Cargando canciones...</p>;
  if (error) return <p className="error">{error}</p>;

  // Función para filtrar canciones según el término de búsqueda
  const filteredSongs = songs.filter(song => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      song.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
      song.album.toLowerCase().includes(lowerCaseSearchTerm) ||
      song.genero.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="song-list-container">
      {!editingSong && (
        <input
          type="text"
          placeholder="Buscar por título, álbum o género..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      )}
      {editingSong ? (
        <EditSong
          song={editingSong}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ul className="song-list">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <li key={song._id} className="song-item">
                <div className="song-details">
                  <strong>Título:</strong> {song.titulo || 'Desconocido'} <br />
                  <strong>Artista:</strong> {song.artista || 'Desconocido'} <br />
                  <strong>Álbum:</strong> {song.album || 'Desconocido'} <br />
                  <strong>Género:</strong> {song.genero || 'Desconocido'} <br />
                </div>
                <button className='edit-button' onClick={() => setEditingSong(song)}>Editar</button>
                <button className='delete-button' onClick={() => handleDelete(song._id)}>Eliminar</button>
              </li>
            ))
          ) : (
            <p>No hay canciones disponibles.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SongList;
