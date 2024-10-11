import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPlaylist.css';

const AddPlaylist = ({ onAdd }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/musica');
        setSongs(response.data);
        setLoading(false);
      } catch (error) {
        setModalMessage('Error en la conexión. Por favor, verifica tu conexión y vuelve a intentarlo.');
        setShowModal(true);
      }
    };

    fetchSongs();
  }, []);

  const handleCheckboxChange = (songId) => {
    setSelectedSongs((prevSelected) =>
      prevSelected.includes(songId)
        ? prevSelected.filter(id => id !== songId)
        : [...prevSelected, songId]
    );
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddClick = () => {
    if (playlistName.trim() === '') {
      alert('Por favor, ingrese un nombre para la playlist');
      return;
    }
    if (selectedSongs.length === 0) {
      alert('Por favor, seleccione al menos una canción para la playlist');
      return;
    }

    onAdd(playlistName, selectedSongs);

    setSelectedSongs([]);
    setPlaylistName('');
    setModalMessage('Playlist agregada exitosamente!');
    setShowModal(true);
  };

  if (loading) return <p className="text-center">Cargando canciones...</p>;

  return (
    <div className="add-playlist">
      <div className="card">
        <div className='card-body'>
          <h2 className="card-title text-center">Crear nueva Playlist</h2>
          <div className="mb-4">
            <label htmlFor="playlistName" className="form-label">
              Nombre de la Playlist:
            </label>
            <input
              type="text"
              id="playlistName"
              placeholder="Ingrese el nombre de la playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <ul className="list-group mb-4">
            {songs.map((song) => (
              <li key={song._id} className="list-group-item d-flex align-items-center">
                <input
                  type="checkbox"
                  id={`song-${song._id}`}
                  checked={selectedSongs.includes(song._id)}
                  onChange={() => handleCheckboxChange(song._id)}
                  className="form-check-input me-2"
                />
                <label htmlFor={`song-${song._id}`} className="form-check-label">
                  {song.titulo} - {song.artista}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddClick}
            className="btn btn-success"
          >
            Crear Playlist
          </button>
        </div>
      </div>

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden={!showModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">Mensaje</h5>
              <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AddPlaylist;
