import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={onClick}>
        load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
