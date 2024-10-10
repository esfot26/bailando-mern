import React from "react";
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Bienvenido a Bailando con MERN</h1>
        <p className="home-subtitle">Tu lugar para crear y gestionar playlists de canciones.</p>
      </header>

      <section className="home-features">
        <div className="feature-card">
          <h2 className="feature-title">Agregar Canciones</h2>
          <p className="feature-description">Añade tus canciones favoritas a listas de reproducción personalizadas.</p>
          <a href="/addSong" className="feature-button">Agregar Canción</a>
        </div>

        <div className="feature-card">
          <h2 className="feature-title">Crear Playlists</h2>
          <p className="feature-description">Crea listas de reproducción para disfrutar de tu música en cualquier momento.</p>
          <a href="/add-playlist" className="feature-button">Crear Playlist</a>
        </div>

        <div className="feature-card">
          <h2 className="feature-title">Explorar Playlists</h2>
          <p className="feature-description">Descubre playlists creadas por otros usuarios y encuentra nueva música.</p>
          <a href="/playlist" className="feature-button">Explorar Playlists</a>
        </div>

        <div className="feature-card">
          <h2 className="feature-title">Explorar Songs</h2>
          <p className="feature-description">Descubre las canciones más populares y descubre nuevas canciones.</p>
          <a href="/song" className="feature-button">Explorar Songs</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
