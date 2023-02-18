import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';
import { AppContext } from 'components/AppContext';

export const Button = () => {
  const { handlePaginationLoader } = useContext(AppContext);
  return (
    <div className={css.container}>
      <button className={css.button} onClick={handlePaginationLoader}>
        load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
