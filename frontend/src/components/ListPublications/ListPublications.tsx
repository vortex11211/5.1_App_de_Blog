import React, { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService'
import '../../assets/styles/ListPublications.css'

const ListPublications: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await publicationService.getAllPublications();
        setPublications(response);
      } catch (error) {
        setError('Error al obtener las publicaciones');
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublications();
  }, []);

  const handleDelete = async (publicationId: number) => {
    console.log('Trying to delete publication with ID:', publicationId);
    try {
      const response = await publicationService.deletePublication(publicationId);
      console.log('Delete response in component:', response); // Verificar la respuesta
      // Actualizar la lista de publicaciones después de eliminar
      const updatedPublications = await publicationService.getAllPublications();
      setPublications(updatedPublications);
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      setError('Error al eliminar la publicación');
    }
  };

  return (
    <div className="list-publications-container">
      <h2>All Publications</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="publication-list">
        {publications.map(publication => (
          <div className="publication-card" key={publication.props.id}>
            <h2>{publication.props.title}</h2>
            <p>{publication.props.content}</p>
            <button
              className="delete-publication-button"
              onClick={() => {
                console.log('Publication ID:', publication.props.id);
                handleDelete(publication.props.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPublications;
