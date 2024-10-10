import React, { useState } from 'react';
import './Playlist.css'

const Playlist = ({ playlists = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlaylists = playlists.filter(playlist => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      playlist.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="playlist-list-container">
      <h2 className="text-2xl font-bold mb-4">All Playlists</h2>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input mb-4 p-2 border rounded"
      />
      {filteredPlaylists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul className="playlist-list">
          {filteredPlaylists.map((playlist, index) => (
            <li key={index} className="playlist-item">
              <div className="playlist-details">
                <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Playlist;
