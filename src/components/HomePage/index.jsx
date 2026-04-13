import React, { useState, useEffect, useCallback } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EventCard from '../EventCard'
import './index.css'

const API_BASE =
  'https://mi767o4rag.execute-api.eu-north-1.amazonaws.com/api/events'

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img" />
    <div className="skeleton-body">
      <div className="skeleton-line medium" />
      <div className="skeleton-line short" />
      <div className="skeleton-line short" />
    </div>
  </div>
)

const HomePage = () => {
  const [recommended, setRecommended] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loadingRec, setLoadingRec] = useState(true)
  const [loadingUpcoming, setLoadingUpcoming] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const token = Cookies.get('jwt_token')

  const fetchRecommended = useCallback(
    async (query = '') => {
      setLoadingRec(true)
      try {
        const url = `${API_BASE}?type=recommended${query ? `&eventName=${encodeURIComponent(query)}` : ''
          }`
        const res = await fetch(url, { headers: { Authorization: token } })
        const data = await res.json()
        setRecommended(data.data.events)
      } catch {
        setRecommended([])
      } finally {
        setLoadingRec(false)
      }
    },
    [token],
  )

  const fetchUpcoming = useCallback(
    async (page = 1, query = '') => {
      setLoadingUpcoming(true)
      try {
        const url = `${API_BASE}?type=upcoming&page=${page}&limit=9${query ? `&eventName=${encodeURIComponent(query)}` : ''
          }`
        const res = await fetch(url, { headers: { Authorization: token } })
        const data = await res.json()
        setUpcoming(data.data.events)
        setTotalPages(data.data.pagination.totalPages)
      } catch {
        setUpcoming([])
      } finally {
        setLoadingUpcoming(false)
      }
    },
    [token],
  )

  useEffect(() => {
    fetchRecommended('')
    fetchUpcoming(1, '')
  }, [])

  const handleSearch = query => {
    setSearchQuery(query)
    setCurrentPage(1)
    fetchRecommended(query)
    fetchUpcoming(1, query)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    fetchUpcoming(page, searchQuery)
  }

  return (
    <div className="home-page">
      <Header onSearch={handleSearch} />
      <div className="home-content">
        {/* Recommended Section */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Recommended shows</h2>
            {!loadingRec && (
              <span className="section-count">{recommended.length} events</span>
            )}
          </div>
          {loadingRec ? (
            <div className="events-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="events-grid">
              {recommended.length === 0 ? (
                <p className="no-results">No events found for your search.</p>
              ) : (
                recommended.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              )}
            </div>
          )}
        </div>

        {/* Upcoming Section */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Upcoming events</h2>
            {!loadingUpcoming && (
              <span className="section-count">{upcoming.length} events</span>
            )}
          </div>
          {loadingUpcoming ? (
            <div className="events-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="events-grid">
              {upcoming.length === 0 ? (
                <p className="no-results">No events found for your search.</p>
              ) : (
                upcoming.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              )}
            </div>
          )}

          {/* Pagination */}
          {/* Pagination - always render when data loaded */}
          {!loadingUpcoming && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              {totalPages > 1 &&
                Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-btn${currentPage === page ? ' active' : ''
                      }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                  ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
