import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useFavourites } from '../../context/FavouritesContext';
import { IconSearch } from '../Icons';
import './index.css';

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favourites } = useFavourites();
  const [searchValue, setSearchValue] = useState('');

  const handleSignOut = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch && onSearch(searchValue.trim());
    }
  };

  const handleLogoClick = () => {
    setSearchValue('');
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-inner">
        <button className="header-logo" onClick={handleLogoClick}>
          BookUsNow
        </button>

        <div className="header-search">
          <span className="header-search-icon">
            <IconSearch />
          </span>
          <input
            type="text"
            placeholder="Search events"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="header-actions">
          <button className="btn-favourites" onClick={() => navigate('/favourites')}>
            Favorites
            {favourites.length > 0 && (
              <span className="fav-badge">{favourites.length}</span>
            )}
          </button>
          <button className="btn-signout" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
