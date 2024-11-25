import React, { useState, useEffect } from 'react';
import publicationService from '../../services/publicationService';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/styles/EditPublication.css';

const EditPublication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const publication = await publicationService.getPublicationById(Number(id));
        setTitle(publication.props.title);
        setContent(publication.props.content);
      } catch (error) {
        setError('Error fetching publication');
        console.error('Error fetching publication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublication();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await publicationService.editPublication(Number(id), title, content);
      navigate('/my-publications');
    } catch (error) {
      setError('Error editing publication');
      console.error('Error editing publication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/my-publications');
  };

  return (
    <div className="edit-publication-container">
      <h1>Edit Publication</h1>
      {error && <p className="error-message">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSave} className="edit-publication-form">
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
          <div className="button-container">
            <button type="submit" className="edit-publication-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPublication;
