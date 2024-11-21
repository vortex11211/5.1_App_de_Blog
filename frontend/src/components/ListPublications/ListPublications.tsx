import React, { useEffect, useState } from 'react';
import {useAuth} from '../../contexts/AuthContext';
import publicationService from '../../services/publicationService'
import '../../assets/styles/ListPublications.css'

const ListPublications: React.FC = () => {
const {userRole} = useAuth();
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
    if (userRole === 'simpleUser') {
       alert('No tienes permiso para realizar esta acción');
      return;
    }
    try {
      await publicationService.deletePublication(publicationId);
         const updatedPublications = await publicationService.getAllPublications();
      setPublications(updatedPublications);
    } catch (error:any) {
      console.error('Error al eliminar la publicación:', error);
      if (error.response && error.response.status === 403) {
         window.alert('No tienes permiso para eliminar esta publicación');
      } else {
        setError('Error al eliminar la publicación');
      }
    }
  };
  if (userRole === 'simpleUser') { 
    return <p>No tienes permiso para ver esta página</p>;
   };


  return (
    <div className="list-publications-container">
      <h2>Delete Publications</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="publication-list">
        {publications.map(publication => (
          <div className="publication-card" key={publication.props.id}>
            <h2>{publication.props.title}</h2>
            <p>{publication.props.content}</p>
            <button
              className="delete-publication-button"
              onClick={() => {
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
