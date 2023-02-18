import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const ImageGallery = ({ onScroll, totalPages, page, pictures }) => {
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [selectedImage, SetSelectedImage] = useState('');
  const [selectedTags, SetSelectedTags] = useState('');

  const galleryRef = useRef();

  useEffect(() => {
    const cardHeight =
      galleryRef.current &&
      galleryRef.current.firstElementChild.getBoundingClientRect().height;
    onScroll(cardHeight);
  }, [onScroll, pictures.length]);

  const handleModalOpen = (largeImageURL, tags) => {
    SetIsModalOpen(true);
    SetSelectedImage(largeImageURL);
    SetSelectedTags(tags);
  };
  const handleModalClose = () => {
    SetIsModalOpen(false);
  };

  const imagesList = pictures.map((pic, index) => (
    <ImageGalleryItem
      key={pic.id + '-' + index}
      id={pic.id}
      webformatURL={pic.webformatURL}
      largeImageURL={pic.largeImageURL}
      tags={pic.tags}
      onClick={handleModalOpen}
    />
  ));
  return (
    <>
      <ul className={css.gallery} ref={galleryRef}>
        {imagesList}
      </ul>
      {isModalOpen && (
        <Modal
          src={selectedImage}
          tags={selectedTags}
          onClick={handleModalClose}
        />
      )}
      {page < totalPages && <Button />}
    </>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  page: PropTypes.number,
  onScroll: PropTypes.func,
  totalPages: PropTypes.number,
  onButtonClick: PropTypes.func,
};
