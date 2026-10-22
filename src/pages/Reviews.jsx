import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initialReviews, flavors } from '../data'

export default function Reviews({ onOrderFlavor }) {
  const [reviewsList, setReviewsList] = useState(initialReviews)
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [helpfulCounts, setHelpfulCounts] = useState({})

  // Form state
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    flavorId: flavors[0].id,
    title: '',
    comment: '',
  })

  const filteredReviews = reviewsList.filter((r) => {
    if (filter === 'all') return true
    return r.flavorId === filter
  })

  const handleHelpful = (id) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newReview.name.trim() || !newReview.comment.trim()) return

    const selectedFlavorObj = flavors.find((f) => f.id === newReview.flavorId) || flavors[0]
    const createdReview = {
      id: Date.now(),
      name: newReview.name,
      location: 'Verified Customer',
      rating: Number(newReview.rating),
      flavorId: newReview.flavorId,
      flavorName: selectedFlavorObj.name,
      date: 'Just now',
      title: newReview.title || 'Incredible dessert!',
      comment: newReview.comment,
      verified: true,
    }

    setReviewsList([createdReview, ...reviewsList])
    setSubmitted(true)
    setTimeout(() => {
      setShowForm(false)
      setSubmitted(false)
      setNewReview({
        name: '',
        rating: 5,
        flavorId: flavors[0].id,
        title: '',
        comment: '',
      })
    }, 2200)
  }

  return (
    <section className="landing-section" id="reviews">
      <div className="section-container">
        <div className="reviews-header">
          <div>
            <h2 className="page-title">Loved by dessert lovers</h2>
            <p className="page-lead">
              Over 1,300+ spooners have unboxed and devoured Velvetspoon. Here is what real foodies are saying.
            </p>
          </div>
          <button
            type="button"
            className="btn reviews-write-btn"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? 'Close form' : '★ Write a review'}
          </button>
        </div>

        {/* Aggregate Ratings Overview Card */}
        <div className="reviews-summary-card glass">
          <div className="summary-score-col">
            <span className="summary-score">4.9</span>
            <div className="stars-group" aria-label="4.9 out of 5 stars">
              {'★★★★★'}
            </div>
            <span className="summary-count">Based on 1,322 verified reviews</span>
          </div>

          <div className="summary-bars-col">
            <div className="rating-bar-row">
              <span className="bar-label">5 stars</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '92%' }} />
              </div>
              <span className="bar-percent">92%</span>
            </div>
            <div className="rating-bar-row">
              <span className="bar-label">4 stars</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '7%' }} />
              </div>
              <span className="bar-percent">7%</span>
            </div>
            <div className="rating-bar-row">
              <span className="bar-label">3 stars</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '1%' }} />
              </div>
              <span className="bar-percent">1%</span>
            </div>
          </div>

          <div className="summary-badges-col">
            <div className="trust-badge">
              <span className="trust-icon">🥄</span>
              <div>
                <strong>100% Real Food</strong>
                <p>Pure fruit, cocoa &amp; cream</p>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">❄️</span>
              <div>
                <strong>Cold Delivery</strong>
                <p>Arrives chilled in 48 hours</p>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">⭐</span>
              <div>
                <strong>98% Repeat Rate</strong>
                <p>Customers reorder within 30 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Write-a-Review Form Modal/Box */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="review-form-wrap glass"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {submitted ? (
                <div className="review-submitted-msg">
                  <h3>🎉 Thank you for your review!</h3>
                  <p>Your feedback has been published below.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="review-form">
                  <h3>Share your Velvetspoon experience</h3>
                  <div className="review-form-row">
                    <label className="field">
                      <span>Your Name</span>
                      <input
                        required
                        placeholder="e.g. Maya R."
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      />
                    </label>

                    <label className="field">
                      <span>Flavor Enjoyed</span>
                      <select
                        value={newReview.flavorId}
                        onChange={(e) => setNewReview({ ...newReview, flavorId: e.target.value })}
                      >
                        {flavors.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field">
                      <span>Rating</span>
                      <div className="star-picker">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className={`star-pick-btn ${newReview.rating >= star ? 'selected' : ''}`}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            aria-label={`${star} star`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </label>
                  </div>

                  <label className="field">
                    <span>Review Title</span>
                    <input
                      placeholder="e.g. Beyond delicious, loved the spoon!"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    />
                  </label>

                  <label className="field">
                    <span>Your Review</span>
                    <textarea
                      required
                      rows="3"
                      placeholder="Tell us what you liked about the flavor, texture, and packaging..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    />
                  </label>

                  <div className="review-form-actions">
                    <button type="submit" className="btn">
                      Submit Review
                    </button>
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Pills */}
        <div className="reviews-filter-bar">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Flavors ({reviewsList.length})
          </button>
          {flavors.map((f) => {
            const count = reviewsList.filter((r) => r.flavorId === f.id).length
            return (
              <button
                type="button"
                key={f.id}
                className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.name} ({count})
              </button>
            )
          })}
        </div>

        {/* Reviews Cards Grid */}
        <div className="reviews-grid">
          {filteredReviews.map((r) => (
            <motion.article
              key={r.id}
              className="review-card glass"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="review-top-row">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="reviewer-name-row">
                      <h4>{r.name}</h4>
                      {r.verified && <span className="verified-pill">✓ Verified</span>}
                    </div>
                    <span className="reviewer-meta">{r.location} · {r.date}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {'★'.repeat(r.rating)}
                  {'☆'.repeat(5 - r.rating)}
                </div>
              </div>

              <div className="review-flavor-tag">
                <span>Flavor: <strong>{r.flavorName}</strong></span>
              </div>

              <h4 className="review-card-title">{r.title}</h4>
              <p className="review-comment">"{r.comment}"</p>

              <div className="review-card-foot">
                <button
                  type="button"
                  className="helpful-btn"
                  onClick={() => handleHelpful(r.id)}
                >
                  👍 Helpful ({helpfulCounts[r.id] || 8})
                </button>
                <button
                  type="button"
                  className="quick-order-flavor-btn"
                  onClick={() => onOrderFlavor?.(r.flavorId)}
                >
                  Order {r.flavorName} →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
