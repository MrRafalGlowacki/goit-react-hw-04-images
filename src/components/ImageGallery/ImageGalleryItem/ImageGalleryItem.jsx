import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  largeImageURL,
  tags,
  onClick,
  webformatURL,
  id,
}) => {
  const handleModalOpen = () => {
    onClick(largeImageURL, tags);
  };

  return (
    <li key={id} className={css.galleryItem}>
      <img
        className={css['galleryItem-image']}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={handleModalOpen}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  onClick: PropTypes.func,
  tags: PropTypes.string,
};
