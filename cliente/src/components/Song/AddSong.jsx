import React, { useState } from 'react';
import './Song.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AddSong = () => {
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [genero, setGenero] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSong = { titulo, artista, album, genero };

    try {
      const response = await fetch('http://localhost:8000/api/musica/nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSong)
      });

      if (response.ok) {
        setModalMessage('Canción agregada exitosamente!');
        setTitulo('');
        setArtista('');
        setAlbum('');
        setGenero('');
      } else {
        setModalMessage('Error al agregar la canción. Inténtalo de nuevo.');
      }
      setShowModal(true); // Mostrar el modal
    } catch (error) {
      setModalMessage('Error en la conexión. Por favor, verifica tu conexión y vuelve a intentarlo.');
      setShowModal(true); // Mostrar el modal
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <form onSubmit={handleSubmit} className="song-form">
        <h1>New Song</h1>
        <div className="form-group">
          <label className='labelBuscar' htmlFor="titulo">Song Title:</label>
          <input className='inputBuscar'
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='labelBuscar' htmlFor="artista">Artista:</label>
          <input className='inputBuscar'
            type="text"
            id="artista"
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='labelBuscar' htmlFor="album">Album:</label>
          <input className='inputBuscar'
            type="text"
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className='labelBuscar' htmlFor="genero">Genero:</label>
          <input className='inputBuscar'
            type="text"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Add Song</button>
      </form>

      {/* Modal de Bootstrap */}
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

      {/* Fondo oscuro del modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default AddSong;
