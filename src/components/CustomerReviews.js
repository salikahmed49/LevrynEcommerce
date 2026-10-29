'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Star, CheckCircle } from 'lucide-react';

export default function CustomerReviews({ productSlug, productName }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    title: '',
    reviewText: '',
  });

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('product_reviews')
          .select('*')
          .eq('product_name', productName)
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [productSlug, productName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.name.trim().length < 2) {
      setErrorMessage('Please provide your genuine name.');
      return;
    }

    if (formData.reviewText.trim().length < 8) {
      setErrorMessage('Please provide your wear review details (at least 8 characters).');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('product_reviews').insert([
        {
          product_name: productName,
          reviewer_name: formData.name.trim(),
          rating: Number(formData.rating),
          title: formData.title.trim() || null,
          review_text: formData.reviewText.trim(),
          approved: true,
          verified_purchase: true,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      const newReview = {
        id: `rev-${Date.now()}`,
        reviewer_name: formData.name.trim(),
        rating: Number(formData.rating),
        title: formData.title.trim(),
        review_text: formData.reviewText.trim(),
        verified_purchase: true,
        created_at: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);
      setSubmitted(true);
      setShowForm(false);
      setFormData({ name: '', rating: 5, title: '', reviewText: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <section
      style={{
        marginTop: '80px',
        paddingTop: '64px',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Header Summary */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '18px',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Verified Customer Impressions
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>
              Customer Reviews ({reviews.length})
            </h2>

            {avgRating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <div style={{ display: 'flex', color: '#EAB308' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#EAB308" />
                  ))}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {avgRating} out of 5
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="btn btn-secondary"
            style={{ padding: '10px 22px', fontSize: '0.85rem' }}
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {submitted && (
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'rgba(21, 128, 61, 0.08)',
              border: '1px solid #86efac',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '24px',
              color: '#15803d',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle size={18} />
            <span>Thank you! Your verified review has been published.</span>
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'var(--color-bg-alt)',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '32px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '16px' }}>
              Review {productName}
            </h3>

            {errorMessage && (
              <div style={{ color: '#b91c1c', fontSize: '0.82rem', marginBottom: '14px' }}>
                {errorMessage}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Asad Siddiqui"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Rating *
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                >
                  <option value={5}>5 Stars - Outstanding</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Below Expectations</option>
                  <option value={1}>1 Star - Unsatisfied</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                Headline (Optional)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Long lasting sillage and rich drydown"
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                Review *
              </label>
              <textarea
                required
                rows={3}
                value={formData.reviewText}
                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                placeholder="How does it smell on your skin and clothes? Longevity and compliments?"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.85rem' }}
            >
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
          </form>
        )}

        {/* Reviews Listing */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-muted)' }}>
            Loading reviews…
          </div>
        ) : reviews.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '36px 20px',
              backgroundColor: 'var(--color-bg-alt)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0 0 14px' }}>
              No customer reviews yet for {productName}.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-secondary"
              style={{ fontSize: '0.82rem', padding: '8px 18px' }}
            >
              Be the first to review
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px 24px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
                        {rev.reviewer_name}
                      </span>
                      {rev.verified_purchase && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: '#15803d',
                            backgroundColor: 'rgba(21, 128, 61, 0.08)',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <CheckCircle size={10} /> Verified Customer
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', color: '#EAB308', gap: '2px' }}>
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#EAB308" />
                      ))}
                    </div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {new Date(rev.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {rev.title && (
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '8px 0 6px', color: 'var(--color-text-main)' }}>
                    {rev.title}
                  </h4>
                )}

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {rev.review_text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
