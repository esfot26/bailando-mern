import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SongList.css'; // Asegúrate de tener un archivo CSS para los estilos

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/musica');
        console.log(response.data); // Verifica si estás recibiendo los datos
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
      <h2 className="song-list-title">All Songs</h2>
      <input
        type="text"
        placeholder="Buscar por título, álbum o género..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
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
            </li>
          ))
        ) : (
          <p>No hay canciones disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default SongList;
