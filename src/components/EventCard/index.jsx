import React from 'react';
import { useFavourites } from '../../context/FavouritesContext';
import { IconHeartOutline, IconHeartFilled, IconPin } from '../Icons';
import './index.css';

const EventCard = ({ event }) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourited = isFavourite(event.id);

  return (
    <div className="event-card">
      <div className="event-card-img-wrap">
        {event.img_url ? (
          <img src={event.img_url} alt={event.eventName} />
        ) : (
          <div className="event-card-img-placeholder">No Image</div>
        )}
        <button
          className={`event-card-heart${favourited ? ' is-fav' : ''}`}
          aria-label={favourited ? 'Remove from favourites' : 'Add to favourites'}
          onClick={() => toggleFavourite(event)}
        >
          {favourited ? <IconHeartFilled size={18} /> : <IconHeartOutline size={18} />}
        </button>
      </div>
      <div className="event-card-body">
        <h3 className="event-card-name">{event.eventName}</h3>
        <div className="event-card-meta">
          <div className="event-card-row">
            <span className="pin-icon"><IconPin size={13} /></span>
            <span>{event.cityName}</span>
            {event.distanceKm && (
              <span className="event-card-distance">· {parseFloat(event.distanceKm).toFixed(0)} km</span>
            )}
          </div>
        </div>
        <div className="event-card-bottom">
          <span className="event-card-date">{event.date}</span>
          {event.weather && (
            <span className="event-card-weather">{event.weather}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
