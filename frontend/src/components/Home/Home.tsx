import React, { useEffect, useState } from 'react';
import publicationService from '../../services/publicationService';
import '../../assets/styles/Home.css';

const convertNewLinesToBreaks = (text: string): string => {
  return text.replace(/\n/g, '<br>');
};

const Home: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortCriterion, setSortCriterion] = useState<string>('default');

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await publicationService.getAllPublications();
        setPublications(response);
      } catch (error) {
        setError('Error retrieving posts');
        console.error('Error retrieving posts:', error);
      }
    };

    fetchPublications();
  }, []);

  const handleLike = async (publicationId: number) => {
    console.log('ID de la publicación que se va a enviar:', publicationId);
    try {
      await publicationService.likePublication(publicationId);
      const response = await publicationService.getAllPublications();
      setPublications(response);
    } catch (error) {
      setError('Error liking the post');
      console.error('Error liking the post:', error);
    }
  };

  const sortPublications = (publications: any[], criterion: string) => {
    let sortedPublications = [...publications];
    if (criterion === 'title_asc') {
      sortedPublications.sort((a, b) => a.props.title.localeCompare(b.props.title));
    } else if (criterion === 'title_desc') {
      sortedPublications.sort((a, b) => b.props.title.localeCompare(a.props.title));
    } else if (criterion === 'popularity_asc') {
      sortedPublications.sort((a, b) => parseFloat(a.props.popularity) - parseFloat(b.props.popularity));
    } else if (criterion === 'popularity_desc') {
      sortedPublications.sort((a, b) => parseFloat(b.props.popularity) - parseFloat(a.props.popularity));
    }
    return sortedPublications;
  };

  useEffect(() => {
    if (sortCriterion !== 'default') {
      setPublications(sortPublications(publications, sortCriterion));
    }
  }, [sortCriterion]);

  return (
    <div className="home-container">
      <h1>Latest Publications</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="sort-dropdown">
        <select onChange={(e) => setSortCriterion(e.target.value)} value={sortCriterion}>
          <option value="default">Select Sorting Option</option>
          <option value="title_asc">Sort by Title (A-Z)</option>
          <option value="title_desc">Sort by Title (Z-A)</option>
          <option value="popularity_asc">Sort by Popularity (Low to High ⬇)</option>
          <option value="popularity_desc">Sort by Popularity (High to Low ⬇)</option>
        </select>
      </div>
      <div className="publication-list">
        {publications.map((publication: any) => (
          <div className={`publication-card ${publication.props.deleted ? 'deleted' : ''}`} key={publication.props.id}>
            <h2>{publication.props.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: convertNewLinesToBreaks(publication.props.content) }}></p>
            <div className="publication-dates">
              <p>Created At: {new Date(publication.props.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(publication.props.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="publication-footer">
              <p className="publication-author">Author: {publication.props.authorName}</p>
              <p className="publication-popularity">Popularity: {publication.props.popularity}</p>
            </div>
            <i
              className="fas fa-regular fa-star like-icon"
              onClick={() => handleLike(publication.props.id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

