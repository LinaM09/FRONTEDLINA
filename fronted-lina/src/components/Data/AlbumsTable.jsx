import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './AlbumsTable.css';

const AlbumsTable = () => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=10`
      );
      setAlbums(prev => [...prev, ...response.data]);
    } catch (err) {
      setError('Error al cargar los álbumes. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, [page]);

  return (
    <div className="albums-app-container">
      <Navbar isAuthenticated={true} onLogout={handleLogout} appTitle="Prueba de Front" version="1.1" />
      
      <div className="albums-content">
        <div className="albums-header">
          <h1 className="albums-title">
            <span className="app-version">1.1</span>
            <span className="app-name">PruebaFront</span>
            <span className="section-title">Álbumes</span>
          </h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="table-container">
          <table className="albums-table">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Título</th>
                <th className="table-header">User ID</th>
              </tr>
            </thead>
            <tbody>
              {albums.map(album => (
                <tr key={`${album.id}-${album.userId}`} className="table-row">
                  <td className="table-cell id-cell">{album.id}</td>
                  <td className="table-cell title-cell">{album.title}</td>
                  <td className="table-cell user-cell">{album.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="load-more-section">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <button 
              onClick={() => setPage(page + 1)}
              className="load-more-btn"
              disabled={loading}
            >
              Cargar más álbumes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumsTable;