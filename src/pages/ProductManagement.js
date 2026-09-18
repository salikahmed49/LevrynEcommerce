import React, { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useProducts, mapToSupabase } from '../context/ProductsContext';
import { logger } from '../utils/logger';
import './ProductManagement.css';

// ─── Image Uploader ────────────────────────────────────────────────────────────
const ImageUploader = ({ previewUrl, onFileSelect, onUrlChange, urlValue }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) onFileSelect(file);
  }, [onFileSelect]);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="image-uploader">
      {/* Drop zone */}
      <div
        className={`drop-zone ${dragging ? 'drop-zone--active' : ''} ${previewUrl ? 'drop-zone--has-image' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="drop-zone-preview" />
        ) : (
          <div className="drop-zone-placeholder">
            <span className="drop-zone-icon">🖼️</span>
            <p className="drop-zone-text">Drag & drop image here</p>
            <p className="drop-zone-sub">or click to browse · JPG, PNG, WebP · max 5MB</p>
          </div>
        )}
        {previewUrl && (
          <div className="drop-zone-overlay">
            <span>Click to change</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />

      {/* Fallback: manual URL input (for existing /images/ paths) */}
      <div className="url-fallback">
        <label className="url-fallback-label">Or paste existing image URL / path</label>
        <input
          type="text"
          className="url-fallback-input"
          placeholder="/images/product.png or https://..."
          value={urlValue}
          onChange={(e) => onUrlChange(e.target.value)}
        />
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const defaultForm = () => ({
  name: '',
  price: '',
  discount: 0,
  onSale: false,
  size: '50ml',
  image: '',
  bestSelling: false,
  description: '',
  rendition: '',
  notes: '',
  pricing: {
    '30ml':  { price: 0, inStock: false },
    '50ml':  { price: 0, inStock: true  },
    '100ml': { price: 0, inStock: false },
  },
});

const ProductManagement = () => {
  const navigate = useNavigate();
  const { products, loading: productsLoading } = useProducts();
  // Note: products list auto-updates via the realtime subscription in
  // ProductsContext — no manual refresh needed after add/edit/delete.

  const [formData, setFormData]       = useState(defaultForm());
  const [selectedFile, setSelectedFile] = useState(null);   // File object to upload
  const [previewUrl, setPreviewUrl]   = useState('');       // Local blob URL for preview
  const [editingId, setEditingId]     = useState(null);     // null = add mode
  const [showForm, setShowForm]       = useState(false);
  const [saving, setSaving]           = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ── Filtered product list ──────────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.rendition?.toLowerCase().includes(q);
  });

  // ── Input handlers ─────────────────────────────────────────────────────────
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePricingChange = (size, field, value) => {
    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [size]: {
          ...prev.pricing[size],
          [field]: field === 'inStock' ? value : parseFloat(value) || 0,
        },
      },
    }));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    // Instant local preview — no upload yet
    setPreviewUrl(URL.createObjectURL(file));
    // Clear manual URL if a file is chosen
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const handleUrlChange = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
    // Clear file selection if URL is typed
    setSelectedFile(null);
    setPreviewUrl(url);
  };

  // ── Open form in Add mode ─────────────────────────────────────────────────
  const openAddForm = () => {
    setFormData(defaultForm());
    setSelectedFile(null);
    setPreviewUrl('');
    setEditingId(null);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  // ── Open form in Edit mode ────────────────────────────────────────────────
  const openEditForm = (product) => {
    setFormData({
      ...product,
      pricing: product.pricing || defaultForm().pricing,
    });
    setSelectedFile(null);
    setPreviewUrl(product.image || '');
    setEditingId(product.id);
    setError('');
    setSuccess('');
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(defaultForm());
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
    setSuccess('');
    setUploadProgress('');
  };

  // ── Upload image to Supabase Storage ─────────────────────────────────────
  const uploadImage = async (file) => {
    setUploadProgress('Uploading image…');
    const ext      = file.name.split('.').pop().toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filename, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

    const { data } = supabase.storage.from('product-images').getPublicUrl(filename);
    setUploadProgress('');
    return data.publicUrl;
  };

  // ── Save (Add or Update) ──────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      setError('Product name and base price are required.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      let imageUrl = formData.image;

      // Upload file if one was selected via the drop zone
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const payload = mapToSupabase({
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
      });

      if (editingId) {
        // ── UPDATE existing product ──────────────────────────────────────────
        const { error: updateError } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingId);
        if (updateError) throw updateError;
        setSuccess(`✓ "${formData.name}" updated — storefront reflects the change instantly.`);
      } else {
        // ── INSERT new product ───────────────────────────────────────────────
        const { error: insertError } = await supabase
          .from('products')
          .insert([payload]);
        if (insertError) throw insertError;
        setSuccess(`✓ "${formData.name}" added — it's now live on the storefront.`);
      }

      // The realtime subscription in ProductsContext will automatically
      // re-fetch the product list. No manual refresh needed.
      closeForm();
      setSuccess(editingId
        ? `✓ "${formData.name}" updated — visible on storefront immediately.`
        : `✓ "${formData.name}" added — visible on storefront immediately.`
      );
    } catch (err) {
      logger.error('[PM] Save error:', err);
      setError(err.message || 'Failed to save product. Check your Supabase connection.');
    } finally {
      setSaving(false);
      setUploadProgress('');
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;

    setSaving(true);
    setError('');
    try {
      const { error: delError } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);
      if (delError) throw delError;
      // Realtime subscription handles the UI update automatically
      setSuccess(`✓ "${product.name}" removed from the storefront.`);
    } catch (err) {
      setError(err.message || 'Failed to delete product.');
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle sale ─────────────────────────────────────────────────────────────
  const handleToggleSale = async (product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ on_sale: !product.onSale, discount: !product.onSale ? (product.discount || 10) : 0 })
        .eq('id', product.id);
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Product Management — Levryn Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="pm-shell">

        {/* ── Top bar ── */}
        <header className="pm-topbar">
          <div className="pm-topbar-left">
            <button className="pm-back-btn" onClick={() => navigate('/levryn-admin')}>
              ← Dashboard
            </button>
            <div>
              <h1 className="pm-title">Product Management</h1>
              <p className="pm-sub">
                Changes save to Supabase and appear on the storefront
                <span className="pm-live-dot" title="Realtime sync active" />
                instantly.
              </p>
            </div>
          </div>
          <div className="pm-topbar-right">
            <input
              className="pm-search"
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {!showForm && (
              <button className="pm-add-btn" onClick={openAddForm}>
                + Add Product
              </button>
            )}
          </div>
        </header>

        {/* ── Global messages ── */}
        {success && (
          <div className="pm-banner pm-banner--success" onClick={() => setSuccess('')}>
            {success} <span className="pm-banner-dismiss">✕</span>
          </div>
        )}

        {/* ── Add / Edit Form ── */}
        {showForm && (
          <div className="pm-form-wrapper">
            <div className="pm-form-card">
              <div className="pm-form-header">
                <h2>{editingId ? '✏️ Edit Product' : '+ New Product'}</h2>
                <button className="pm-form-close" onClick={closeForm}>✕ Cancel</button>
              </div>

              {error && <div className="pm-banner pm-banner--error">{error}</div>}
              {uploadProgress && <div className="pm-banner pm-banner--info">{uploadProgress}</div>}

              <form onSubmit={handleSave} className="pm-form">
                <div className="pm-form-body">

                  {/* Left column: image + core fields */}
                  <div className="pm-form-left">
                    <div className="pm-field-label">Product Image</div>
                    <ImageUploader
                      previewUrl={previewUrl}
                      onFileSelect={handleFileSelect}
                      onUrlChange={handleUrlChange}
                      urlValue={formData.image}
                    />
                  </div>

                  {/* Right column: all other fields */}
                  <div className="pm-form-right">
                    <div className="pm-field-row">
                      <div className="pm-field">
                        <label className="pm-field-label">Product Name *</label>
                        <input className="pm-input" type="text" name="name" value={formData.name} onChange={handleInput} required placeholder="e.g. Midnight Oud" />
                      </div>
                      <div className="pm-field">
                        <label className="pm-field-label">Base Price (Rs.) *</label>
                        <input className="pm-input" type="number" name="price" value={formData.price} onChange={handleInput} required min="0" placeholder="2500" />
                      </div>
                    </div>

                    <div className="pm-field-row">
                      <div className="pm-field">
                        <label className="pm-field-label">Default Size</label>
                        <select className="pm-input" name="size" value={formData.size} onChange={handleInput}>
                          <option value="30ml">30ml</option>
                          <option value="50ml">50ml</option>
                          <option value="100ml">100ml</option>
                          <option value="55ml">55ml</option>
                        </select>
                      </div>
                      <div className="pm-field">
                        <label className="pm-field-label">Discount (%)</label>
                        <input className="pm-input" type="number" name="discount" value={formData.discount} onChange={handleInput} min="0" max="100" />
                      </div>
                    </div>

                    <div className="pm-field">
                      <label className="pm-field-label">Rendition</label>
                      <input className="pm-input" type="text" name="rendition" value={formData.rendition} onChange={handleInput} placeholder="Rendition of Creed Aventus" />
                    </div>

                    <div className="pm-field">
                      <label className="pm-field-label">Description</label>
                      <textarea className="pm-input pm-textarea" name="description" value={formData.description} onChange={handleInput} rows="3" placeholder="Short product description…" />
                    </div>

                    <div className="pm-field">
                      <label className="pm-field-label">Fragrance Notes</label>
                      <textarea className="pm-input pm-textarea" name="notes" value={formData.notes} onChange={handleInput} rows="2" placeholder="Top: Bergamot, Lemon | Middle: Rose | Base: Musk" />
                    </div>

                    {/* Checkboxes */}
                    <div className="pm-checkboxes">
                      <label className="pm-checkbox-label">
                        <input type="checkbox" name="bestSelling" checked={formData.bestSelling} onChange={handleInput} />
                        <span>⭐ Best Selling</span>
                      </label>
                      <label className="pm-checkbox-label">
                        <input type="checkbox" name="onSale" checked={formData.onSale} onChange={handleInput} />
                        <span>🏷️ On Sale</span>
                      </label>
                    </div>

                    {/* Size Pricing */}
                    <div className="pm-field-label" style={{ marginTop: 16 }}>Size Pricing</div>
                    <div className="pm-pricing-grid">
                      {['30ml', '50ml', '100ml'].map((size) => (
                        <div key={size} className="pm-pricing-card">
                          <div className="pm-pricing-size">{size}</div>
                          <input
                            className="pm-input pm-pricing-input"
                            type="number"
                            placeholder="Price"
                            value={formData.pricing[size]?.price || ''}
                            onChange={(e) => handlePricingChange(size, 'price', e.target.value)}
                            min="0"
                          />
                          <label className="pm-checkbox-label pm-pricing-stock">
                            <input
                              type="checkbox"
                              checked={formData.pricing[size]?.inStock || false}
                              onChange={(e) => handlePricingChange(size, 'inStock', e.target.checked)}
                            />
                            <span>In Stock</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <div className="pm-form-footer">
                  <button type="submit" className="pm-save-btn" disabled={saving}>
                    {saving
                      ? (uploadProgress || 'Saving…')
                      : (editingId ? '✓ Update Product' : '✓ Add Product — Go Live')
                    }
                  </button>
                  <button type="button" className="pm-cancel-btn" onClick={closeForm} disabled={saving}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Products grid ── */}
        <section className="pm-products-section">
          <div className="pm-products-header">
            <h2 className="pm-products-title">
              All Products
              <span className="pm-count-badge">{filtered.length}</span>
            </h2>
          </div>

          {productsLoading ? (
            <div className="pm-loading">
              <div className="pm-spinner" />
              <p>Loading products…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="pm-empty">
              <p>No products found. {searchQuery ? 'Try a different search.' : 'Click "+ Add Product" to get started.'}</p>
            </div>
          ) : (
            <div className="pm-grid">
              {filtered.map((product) => (
                <div key={product.id} className="pm-card">
                  {/* Image */}
                  <div className="pm-card-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.opacity = '0.2';
                        e.target.src = '';
                        e.target.parentNode.setAttribute('data-broken', 'true');
                      }}
                    />
                    <div className="pm-card-badges">
                      {product.bestSelling && <span className="pm-badge pm-badge--gold">⭐ Best</span>}
                      {product.onSale && <span className="pm-badge pm-badge--sale">🏷️ Sale</span>}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pm-card-body">
                    <div className="pm-card-name">{product.name}</div>
                    <div className="pm-card-rendition">{product.rendition || '—'}</div>

                    <div className="pm-card-price-row">
                      {product.discount > 0 ? (
                        <>
                          <span className="pm-card-original">Rs. {product.price.toLocaleString()}</span>
                          <span className="pm-card-discounted">
                            Rs. {Math.round(product.price - product.price * product.discount / 100).toLocaleString()}
                          </span>
                          <span className="pm-card-off">{product.discount}% OFF</span>
                        </>
                      ) : (
                        <span className="pm-card-price">Rs. {product.price.toLocaleString()}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pm-card-actions">
                      <button
                        className="pm-btn pm-btn--edit"
                        onClick={() => openEditForm(product)}
                        disabled={saving}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={`pm-btn ${product.onSale ? 'pm-btn--onsale' : 'pm-btn--ghost'}`}
                        onClick={() => handleToggleSale(product)}
                        disabled={saving}
                        title={product.onSale ? 'Click to remove sale' : 'Click to mark as on sale'}
                      >
                        {product.onSale ? '🏷 On Sale' : 'Set Sale'}
                      </button>
                      <button
                        className="pm-btn pm-btn--delete"
                        onClick={() => handleDelete(product)}
                        disabled={saving}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </>
  );
};

export default ProductManagement;
