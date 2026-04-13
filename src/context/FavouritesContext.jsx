import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem('favourites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (event) => {
    setFavourites((prev) => {
      if (prev.find((e) => e.id === event.id)) return prev;
      return [...prev, event];
    });
  };

  const removeFavourite = (eventId) => {
    setFavourites((prev) => prev.filter((e) => e.id !== eventId));
  };

  const isFavourite = (eventId) => favourites.some((e) => e.id === eventId);

  const toggleFavourite = (event) => {
    if (isFavourite(event.id)) {
      removeFavourite(event.id);
    } else {
      addFavourite(event);
    }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
