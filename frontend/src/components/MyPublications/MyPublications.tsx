import React, { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/MyPublications.css';

const MyPublications: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPublications = async () => {
      try {
        const response = await publicationService.getUserPublications();
        setPublications(response);
      } catch (error) {
        setError('Error retrieving users posts');
        console.error('Error retrieving users posts:', error);
      }
    };

    fetchUserPublications();
  }, []);

  const handleToggleDelete = async (publicationId: number) => {
    try {
      await publicationService.togglePublicationDelete(publicationId);
     
      const response = await publicationService.getUserPublications();
      setPublications(response);
    } catch (error) {
      setError('Error al alternar el estado de eliminación de la publicación');
      console.error('Error al alternar el estado de eliminación de la publicación:', error);
    }
  };
  const handleEdit = (publicationId: number) => {
    navigate(`/edit-publication/${publicationId}`);
  };
  

  return (
    <div className="my-publications-container">
      <h1>My Posts</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="publication-list">
        {publications.map((publication: any) => (
          <div
            className={`publication-card ${publication.props.deleted ? 'deleted' : ''}`}
            key={publication.props.id}
          >
            <h2>{publication.props.title}</h2>
            <p>{publication.props.content}</p>
            <div className="publication-dates">
              <p>Created At: {new Date(publication.props.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(publication.props.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="publication-footer">
              <p className="publication-author">Author: {publication.props.authorName}</p>
              <p className="publication-popularity">Popularity: {publication.props.popularity}</p>
              <button 
                className="toggle-delete-button" 
                onClick={() => handleToggleDelete(publication.props.id)}
              >
                {publication.props.deleted ? 'Recover' : 'Delete'}
              </button>
              <button 
                className="edit-button" 
                onClick={() => handleEdit(publication.props.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPublications;
