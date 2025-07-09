import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid3X3, List, ArrowRight, Eye, Download, Star, Award, Shield, Zap, CheckCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/Products.css';

const Products = ({ onPageChange, initialCategory = 'all' }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update category when initialCategory changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Product categories
  const categories = [
    { id: 'all', name: t('products.categories.all', 'All Products'), count: 48 },
    { id: 'hoses', name: t('products.categories.hoses', 'Industrial Hoses'), count: 18 },
    { id: 'fittings', name: t('products.categories.fittings', 'Hydraulic Fittings'), count: 15 },
    { id: 'valves', name: t('products.categories.valves', 'Control Valves'), count: 12 },
    { id: 'assemblies', name: t('products.categories.assemblies', 'Custom Assemblies'), count: 8 }
  ];

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: t('products.featured.highPressureHose.name', 'High-Pressure Hydraulic Hose'),
      category: 'hoses',
      image: '/api/placeholder/400/300',
      rating: 4.9,
      reviews: 127,
      badges: ['bestseller', 'iso'],
      description: t('products.featured.highPressureHose.desc', 'Premium hydraulic hose designed for extreme pressure applications with superior flexibility and durability.'),
      features: [
        t('products.features.pressure', 'High pressure resistance'),
        t('products.features.flexibility', 'Superior flexibility'),
        t('products.features.durability', 'Long-lasting construction')
      ]
    },
    {
      id: 2,
      name: t('products.featured.hydraulicFitting.name', 'Precision Hydraulic Fitting'),
      category: 'fittings',
      image: '/api/placeholder/400/300',
      rating: 4.8,
      reviews: 94,
      badges: ['premium', 'warranty'],
      description: t('products.featured.hydraulicFitting.desc', 'Precision-engineered fittings ensuring leak-proof connections in demanding industrial environments.'),
      features: [
        t('products.features.leakproof', 'Leak-proof design'),
        t('products.features.corrosion', 'Corrosion resistant'),
        t('products.features.precision', 'Precision threading')
      ]
    },
    {
      id: 3,
      name: t('products.featured.controlValve.name', 'Smart Control Valve'),
      category: 'valves',
      image: '/api/placeholder/400/300',
      rating: 4.9,
      reviews: 156,
      badges: ['smart', 'energy'],
      description: t('products.featured.controlValve.desc', 'Advanced control valve with smart monitoring capabilities for precise flow regulation and energy efficiency.'),
      features: [
        t('products.features.smart', 'Smart monitoring'),
        t('products.features.precision', 'Precise control'),
        t('products.features.efficiency', 'Energy efficient')
      ]
    },
    {
      id: 4,
      name: t('products.featured.customAssembly.name', 'Custom Hydraulic Assembly'),
      category: 'assemblies',
      image: '/api/placeholder/400/300',
      rating: 5.0,
      reviews: 73,
      badges: ['custom', 'engineering'],
      description: t('products.featured.customAssembly.desc', 'Fully customized hydraulic assemblies designed and manufactured to meet your specific application requirements.'),
      features: [
        t('products.features.custom', 'Custom design'),
        t('products.features.testing', 'Factory tested'),
        t('products.features.support', 'Technical support')
      ]
    },
    {
      id: 5,
      name: t('products.featured.industrialHose.name', 'Heavy-Duty Industrial Hose'),
      category: 'hoses',
      image: '/api/placeholder/400/300',
      rating: 4.7,
      reviews: 203,
      badges: ['heavy-duty', 'weather'],
      description: t('products.featured.industrialHose.desc', 'Robust industrial hose perfect for construction and mining applications with excellent weather resistance.'),
      features: [
        t('products.features.robust', 'Heavy-duty construction'),
        t('products.features.weather', 'Weather resistant'),
        t('products.features.versatile', 'Versatile applications')
      ]
    },
    {
      id: 6,
      name: t('products.featured.quickConnect.name', 'Quick-Connect Coupling'),
      category: 'fittings',
      image: '/api/placeholder/400/300',
      rating: 4.6,
      reviews: 118,
      badges: ['quick', 'safety'],
      description: t('products.featured.quickConnect.desc', 'Fast and secure quick-connect couplings designed for rapid equipment changes and maintenance operations.'),
      features: [
        t('products.features.quick', 'Fast connection'),
        t('products.features.secure', 'Secure locking'),
        t('products.features.maintenance', 'Easy maintenance')
      ]
    }
  ];

  // Filter products based on search and category
  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Badge configurations
  const badgeConfig = {
    bestseller: { label: t('products.badges.bestseller', 'Bestseller'), color: '#FF5722', icon: Star },
    iso: { label: t('products.badges.iso', 'ISO Certified'), color: '#4CAF50', icon: Award },
    premium: { label: t('products.badges.premium', 'Premium'), color: '#9C27B0', icon: Shield },
    warranty: { label: t('products.badges.warranty', '2Y Warranty'), color: '#2196F3', icon: Shield },
    smart: { label: t('products.badges.smart', 'Smart'), color: '#FF9800', icon: Zap },
    energy: { label: t('products.badges.energy', 'Energy+'), color: '#4CAF50', icon: Zap },
    custom: { label: t('products.badges.custom', 'Custom'), color: '#607D8B', icon: Star },
    engineering: { label: t('products.badges.engineering', 'Engineered'), color: '#795548', icon: Award },
    'heavy-duty': { label: t('products.badges.heavyDuty', 'Heavy Duty'), color: '#424242', icon: Shield },
    weather: { label: t('products.badges.weather', 'Weather+'), color: '#00BCD4', icon: Shield },
    quick: { label: t('products.badges.quick', 'Quick'), color: '#FFC107', icon: Zap },
    safety: { label: t('products.badges.safety', 'Safety+'), color: '#F44336', icon: Shield }
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="products-hero-content">
            <h1 className="products-hero-title">
              {t('products.hero.title', 'Our Products')}
            </h1>
            <p className="products-hero-subtitle">
              {t('products.hero.subtitle', 'Discover our comprehensive range of premium industrial hydraulic solutions designed to power your operations with reliability and efficiency.')}
            </p>
            
            {/* Hero Search */}
            <div className="hero-search">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder={t('products.hero.searchPlaceholder', 'Search products, categories, specifications...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button className="search-btn">
                  {t('products.hero.search', 'Search')}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">{t('products.hero.stats.products', 'Products')}</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">ISO</span>
                <span className="stat-label">{t('products.hero.stats.certified', 'Certified')}</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">2Y</span>
                <span className="stat-label">{t('products.hero.stats.warranty', 'Warranty')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          
          {/* Filters & Controls */}
          <div className="products-controls">
            <div className="controls-left">
              <button 
                className={`filter-toggle ${isFilterOpen ? 'active' : ''}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="filter-icon" />
                {t('products.controls.filters', 'Filters')}
              </button>
              
              <div className="category-tabs">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="controls-right">
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="view-icon" />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="view-icon" />
                </button>
              </div>
              
              <div className="results-count">
                {filteredProducts.length} {t('products.controls.results', 'results')}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`products-grid ${viewMode}`}>
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  
                  {/* Badges */}
                  <div className="product-badges">
                    {product.badges.slice(0, 2).map(badge => {
                      const config = badgeConfig[badge];
                      return (
                        <span 
                          key={badge}
                          className="product-badge"
                          style={{ backgroundColor: config.color }}
                        >
                          <config.icon className="badge-icon" />
                          {config.label}
                        </span>
                      );
                    })}
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="product-overlay">
                    <button 
                      className="overlay-btn primary"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="btn-icon" />
                      {t('products.actions.view', 'Quick View')}
                    </button>
                    <button className="overlay-btn secondary">
                      <Download className="btn-icon" />
                      {t('products.actions.datasheet', 'Datasheet')}
                    </button>
                  </div>
                </div>
                
                <div className="product-info">
                  <div className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      <Star className="rating-star filled" />
                      <span className="rating-value">{product.rating}</span>
                      <span className="rating-reviews">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-footer">
                    <button className="product-cta">
                      {t('products.actions.inquiry', 'Get Quote')}
                      <ArrowRight className="cta-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="load-more-section">
            <button className="load-more-btn">
              {t('products.loadMore', 'Load More Products')}
            </button>
            <p className="load-more-text">
              {t('products.loadMoreText', 'Showing 6 of 48 products')}
            </p>
          </div>
        </div>
      </section>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="close-icon" />
            </button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-info">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedProduct.name}</h2>
                  <div className="modal-rating">
                    <Star className="rating-star filled" />
                    <span className="rating-value">{selectedProduct.rating}</span>
                    <span className="rating-reviews">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="modal-badges">
                  {selectedProduct.badges.map(badge => {
                    const config = badgeConfig[badge];
                    return (
                      <span 
                        key={badge}
                        className="modal-badge"
                        style={{ backgroundColor: config.color }}
                      >
                        <config.icon className="badge-icon" />
                        {config.label}
                      </span>
                    );
                  })}
                </div>
                
                <p className="modal-description">{selectedProduct.description}</p>
                
                <div className="modal-features">
                  <h4>{t('products.modal.features', 'Key Features')}</h4>
                  <ul className="features-list">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <CheckCircle className="feature-check" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-actions">
                  <button className="modal-btn primary">
                    {t('products.modal.getQuote', 'Get Quote')}
                    <ArrowRight className="btn-icon" />
                  </button>
                  <button className="modal-btn secondary">
                    <Download className="btn-icon" />
                    {t('products.modal.download', 'Download Specs')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="products-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              {t('products.cta.title', 'Need a Custom Solution?')}
            </h2>
            <p className="cta-subtitle">
              {t('products.cta.subtitle', 'Our engineering team can design and manufacture custom hydraulic solutions tailored to your specific requirements.')}
            </p>
            <div className="cta-actions">
              <button className="cta-btn primary">
                {t('products.cta.discuss', 'Discuss Your Project')}
                <ArrowRight className="btn-icon" />
              </button>
              <button className="cta-btn secondary">
                {t('products.cta.catalog', 'Download Full Catalog')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;