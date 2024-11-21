import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import publicationService from '../services/publicationService';
import '../assets/styles/EditPublication.css';

const EditPublicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await publicationService.getPublicationById(Number(id));
        setTitle(response.props.title); 
        setContent(response.props.content); 
      } catch (error) {
        setError('Error al cargar la publicación');
        console.error('Error al cargar la publicación:', error);
      }
    };

    fetchPublication();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await publicationService.editPublication(Number(id), title, content);
      navigate('/my-publications'); // Redirigir a My Posts después de guardar
    } catch (error) {
      setError('Error al editar la publicación');
      console.error('Error al editar la publicación:', error);
    }
  };

  return (
    <div className="edit-publication-container">
      <h2>Edit Publication</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-publication-form">
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="edit-publication-button">Save Changes</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/my-publications')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPublicationPage;
