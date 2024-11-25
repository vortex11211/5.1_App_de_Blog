import React, { useEffect, useState, useCallback } from 'react';
import publicationService from '../../services/publicationService';
import '../../assets/styles/Home.css';

const convertNewLinesToBreaks = (text: string): string => {
  return text.replace(/\n/g, '<br>');
};

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Home: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortCriterion, setSortCriterion] = useState<string>('default');
  const [filteredPublications, setFilteredPublications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await publicationService.getAllPublications();
        setPublications(response);
        setFilteredPublications(response);
      } catch (error) {
        setError('Error retrieving posts');
        console.error('Error retrieving posts:', error);
      }
    };

    fetchPublications();
  }, []);

  const handleLike = async (publicationId: number) => {
      try {
      await publicationService.likePublication(publicationId);
      const response = await publicationService.getAllPublications();
      setPublications(response);
      setFilteredPublications(response);
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
    } else if (criterion === 'authorName_asc') {
      sortedPublications.sort((a, b) => a.props.authorName.localeCompare(b.props.authorName));
    } else if (criterion === 'authorName_desc') {
      sortedPublications.sort((a, b) => b.props.authorName.localeCompare(a.props.authorName));
    }
    return sortedPublications;
  };

  const handleSearch = useCallback(
    debounce((term: string) => {
      if (term === '') {
        setFilteredPublications(publications);
      } else {
        const filtered = publications.filter((publication) =>
          publication.props.title.toLowerCase().includes(term.toLowerCase()) ||
          publication.props.content.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredPublications(filtered);
      }
    }, 300),
    [publications]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    if (sortCriterion !== 'default') {
      setFilteredPublications(sortPublications(filteredPublications, sortCriterion));
    }
  }, [sortCriterion, filteredPublications]);
  

  return (
    <div className="home-container">
      <h1>Latest Publications</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search publications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <i className="fas fa-search search-icon"></i>
      </div>
      <div className="sort-dropdown">
        <select onChange={(e) => setSortCriterion(e.target.value)} value={sortCriterion}>
          <option value="default">Select Sorting Option</option>
          <option value="title_asc">Sort by Title (A-Z ⬇)</option>
          <option value="title_desc">Sort by Title (Z-A ⬇)</option>
          <option value="popularity_asc">Sort by Popularity (Low to High ⬇)</option>
          <option value="popularity_desc">Sort by Popularity (High to Low ⬇)</option>
          <option value="authorName_asc">Sort by Author (A-Z ⬇)</option>
          <option value="authorName_desc">Sort by Author (Z-A ⬇)</option>
        </select>
      </div>
      <div className="publication-list">
        {filteredPublications.map((publication: any) => (
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

