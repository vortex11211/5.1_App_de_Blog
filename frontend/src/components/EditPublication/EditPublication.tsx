import React, { useState } from 'react';
import publicationService from '../../services/publicationService';
import '../../assets/styles/EditPublication.css';

interface EditPublicationProps {
  publicationId: number;
  initialTitle: string;
  initialContent: string;
  onClose: () => void;
  onSave: (editedPublication: { publicationId: number; title: string; content: string; }) => void;
}

const EditPublication: React.FC<EditPublicationProps> = ({ publicationId, initialTitle, initialContent, onClose, onSave }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await publicationService.editPublication(publicationId, title, content);
      onSave({ publicationId, title, content }); // Llama a la función onSave con los datos editados
      onClose(); // Cierra el formulario después de guardar los cambios
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
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPublication;
