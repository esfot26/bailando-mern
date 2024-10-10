import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import AddPlaylist from './components/AddPlaylist';
import Playlist from './components/Playlist';
import Song from './components/Song';
import AddSong from './components/AddSong';
import Home from './components/Home';
import './App.css';

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/musica');
        setSongs(response.data);
      } catch (err) {
        setError('Error al cargar las canciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleAddPlaylist = (name, songIds) => {
    const newPlaylist = {
      name,
      songs: songs.filter(song => songIds.includes(song._id))
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  if (loading) return <p className="text-center">Cargando canciones...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto py-8">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addSong' element={<AddSong />} />
            <Route path="/song" element={<Song />} />
            <Route path="/add-playlist" element={<AddPlaylist onAdd={handleAddPlaylist} />} />
            <Route path="/playlist" element={<Playlist playlists={playlists} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;