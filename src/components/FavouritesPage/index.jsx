import React from 'react'
import Header from '../Header'
import EventCard from '../EventCard'
import { useFavourites } from '../../context/FavouritesContext'
import './index.css'

const FavouritesPage = () => {
  const { favourites } = useFavourites()

  return (
    <div className="favourites-page">
      <Header onSearch={() => { }} />
      <div className="favourites-content">
        <div className="favourites-header">
          <h2 className="favourites-heading">My Favourites</h2>
          {favourites.length > 0 && (
            <span className="favourites-count">{favourites.length} saved</span>
          )}
        </div>
        {favourites.length === 0 ? (
          <div className="favourites-empty">
            <span className="favourites-empty-icon">🤍</span>
            <p>No favourites yet</p>
            <span className="empty-hint">
              Browse events and tap the heart icon to save them here.
            </span>
          </div>
        ) : (
          <div className="favourites-grid">
            {favourites.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavouritesPage
