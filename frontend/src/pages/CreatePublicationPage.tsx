import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import publicationService from '../services/publicationService';
import '../assets/styles/CreatePublication.css';

const CreatePublicationPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await publicationService.createPublication(title, content);
      navigate('/my-publications'); // Redirigir a My Posts después de crear la publicación
    } catch (error) {
      setError('Error al crear la publicación');
      console.error('Error al crear la publicación:', error);
    }
  };

  return (
    <div className="create-publication-container">
      <h2>Create Publication</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-publication-form">
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
        <button type="submit" className="create-publication-button">Post</button>
        <button type="button" className="cancel-button" onClick={() => navigate('/my-publications')}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePublicationPage;
