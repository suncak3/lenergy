import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/Header.css';

const Header = ({ currentPage = 'home', onPageChange }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handlePageChange = (page, category = null) => {
    if (onPageChange) {
      onPageChange(page, category);
    }
    setIsMenuOpen(false);
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: t('nav.home', 'Home') },
    { 
      id: 'products',
      label: t('nav.products', 'Products'),
      hasDropdown: true,
      dropdownItems: [
        { label: t('products.hoses', 'Industrial Hoses'), category: 'hoses' },
        { label: t('products.fittings', 'Hydraulic Fittings'), category: 'fittings' },
        { label: t('products.valves', 'Control Valves'), category: 'valves' },
        { label: t('products.assemblies', 'Custom Assemblies'), category: 'assemblies' }
      ]
    },
    { id: 'about', label: t('nav.about', 'About') },
    { id: 'contact', label: t('nav.contact', 'Contact') }
  ];

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          
          {/* Logo */}
          <div className="header-logo" onClick={() => handlePageChange('home')}>
            <img 
              src="/logo.png" 
              alt="Lenergy Logo" 
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="logo-fallback" style={{ display: 'none' }}>
              <span className="logo-text">LENERGY</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <div key={item.id} className="nav-item-container">
                <button
                  onClick={() => handlePageChange(item.id)}
                  className={`nav-item ${currentPage === item.id ? 'nav-item-active' : ''}`}
                >
                  {item.label}
                  {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
                </button>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <button
                          key={index}
                          className="dropdown-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('products', dropdownItem.category);
                          }}
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="search-bar">
            <div className="search-input-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder={t('search.placeholder', 'Search products...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="header-actions">

            {/* Language Toggle */}
            <button onClick={toggleLanguage} className="language-toggle">
              {i18n.language === 'en' ? 'RU' : 'EN'}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            
            {/* Mobile Search */}
            <div className="mobile-search">
              <div className="search-input-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder={t('search.placeholder', 'Search products...')}
                  className="search-input"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="mobile-nav">
              {navItems.map((item) => (
                <div key={item.id} className="mobile-nav-container">
                  <button
                    onClick={() => handlePageChange(item.id)}
                    className={`mobile-nav-item ${currentPage === item.id ? 'mobile-nav-item-active' : ''}`}
                  >
                    {item.label}
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && currentPage === item.id && (
                    <div className="mobile-dropdown">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <button
                          key={index}
                          className="mobile-dropdown-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('products', dropdownItem.category);
                          }}
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              <button 
                className="mobile-action-btn"
                onClick={() => handlePageChange('contact')}
              >
                <span>{t('nav.contact', 'Contact Us')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;