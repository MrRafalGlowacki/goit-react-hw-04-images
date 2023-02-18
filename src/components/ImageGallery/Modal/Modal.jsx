import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ onClick, src, tags }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
