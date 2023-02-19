import React, { useCallback, useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { AppContext } from './AppContext';

const safeSearch = false;
const amount = 12;
const THEKEY = '31673863-7b4e2329a784886b2ded53b03&';
const getUrl = (search, page) =>
  `https://pixabay.com/api/?key=${THEKEY}&q=${search}&type=photo&orientation=horizontal&safesearch=${safeSearch}&per_page=${amount}&page=${page}`;

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [fetchingImages, setFetchingImages] = useState(false);
  const [actualSearch, setActualSearch] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFetchPictures = async value => {
    const parsedName = value.trim();
    if (parsedName.length === 0) return;
    const url = getUrl(parsedName, page);
    setFetchingImages(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw (
          (new Error(`Fetch failed with status ${response.status}`),
          Notiflix.Notify.failure(
            `Fetch failed with status ${response.status}`
          ))
        );
      }
      const data = await response.json();
      setFetchingImages(false);
      if (data.hits.length === 0) {
        throw Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      {
        const fechetPictures = data.hits.map(picture => ({
          id: picture.id,
          webformatURL: picture.webformatURL,
          largeImageURL: picture.largeImageURL,
          tags: picture.tags,
        }));
        const newPictures = [...pictures, ...fechetPictures];
        setPictures(newPictures);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleScrollPage = useCallback(cardHeight => {
    window.scrollBy({ top: cardHeight * 3, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (event, value) => {
    event.preventDefault();
    setActualSearch(value);
    setPictures([]);
    setTotalHits(0);
    setPage(1);
    const data = await handleFetchPictures(value);
    if (data) {
      setTotalHits(data.totalHits);
    } else return;
  };

  useEffect(() => {
    if (totalHits === 0) return;
    const totalPagesAmount = Math.ceil(totalHits / amount);
    setTotalPages(totalPagesAmount);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }, [totalHits]);

  const handlePaginationLoader = () => {
    if (page < totalPages) {
      setPage(page + 1);
      handleFetchPictures(actualSearch);
    }
  };

  return (
    <AppContext.Provider
      value={{
        handlePaginationLoader,
      }}
    >
      <div className={css.app}>
        <Searchbar onSubmit={handleSubmit} />
        {fetchingImages && <Loader />}
        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            page={page}
            totalPages={totalPages}
            onScroll={handleScrollPage}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};
