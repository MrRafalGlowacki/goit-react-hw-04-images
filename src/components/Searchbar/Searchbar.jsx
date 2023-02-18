import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const handleChange = event => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    onSubmit(e, value);
    setValue('');
  };
  return (
    <header className={css.searchbar}>
      <form onSubmit={handleOnSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.label}>Search</span>
          <BsSearch style={{ verticalAlign: 'middle' }} />
        </button>

        <input
          onChange={handleChange}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="img"
          value={value}
          required
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
