import React from 'react';
import { Phone, Mail, MapPin, ArrowRight, Send, Clock, Award, Truck, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';

const Footer = ({ currentPage, onPageChange }) => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const handleNavigation = (page, category = null) => {
    if (onPageChange) {
      onPageChange(page, category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="footer-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>{t('footer.newsletter.title', 'Stay Updated')}</h3>
              <p>{t('footer.newsletter.subtitle', 'Get the latest product updates and industry news.')}</p>
            </div>
            <div onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder', 'Your email')}
                  className="newsletter-input"
                  required
                />
                <button onClick={handleNewsletterSubmit} className="newsletter-button">
                  <Send className="newsletter-icon" />
                  <span className="newsletter-button-text">{t('footer.newsletter.subscribe', 'Subscribe')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Company Info */}
            <div className="footer-column footer-company">
              <div className="footer-logo">
                <img 
                  src="/logo.png" 
                  alt="Lenergy Logo" 
                  className="footer-logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="footer-logo-fallback" style={{ display: 'none' }}>
                  <span className="footer-logo-text">LENERGY</span>
                </div>
              </div>
              <p className="footer-description">
                {t('footer.description', 'Leading supplier of industrial hoses and fittings in Kazakhstan.')}
              </p>
              
              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-badge">
                  <Award className="trust-icon" />
                  <span>{t('footer.certified', 'ISO Certified')}</span>
                </div>
                <div className="trust-badge">
                  <Shield className="trust-icon" />
                  <span>{t('footer.experience', '15+ Years Experience')}</span>
                </div>
                <div className="trust-badge">
                  <Truck className="trust-icon" />
                  <span>{t('footer.clients', '500+ Clients')}</span>
                </div>
              </div>

              {/* CTA Button - Fixed Navigation */}
              <div className="footer-cta">
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('contact');
                  }}
                  className="cta-button"
                >
                  <span>{t('footer.cta', 'Get Quote')}</span>
                  <ArrowRight className="cta-icon" />
                </a>
              </div>
            </div>

            {/* Quick Links - Fixed Navigation */}
            <div className="footer-column">
              <h4 className="footer-heading">{t('footer.links', 'Quick Links')}</h4>
              <ul className="footer-links">
                <li>
                  <a 
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('home');
                    }}
                    className="footer-link"
                  >
                    {t('nav.home', 'Home')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('products');
                    }}
                    className="footer-link"
                  >
                    {t('nav.products', 'Products')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('about');
                    }}
                    className="footer-link"
                  >
                    {t('nav.about', 'About')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('contact');
                    }}
                    className="footer-link"
                  >
                    {t('nav.contact', 'Contact')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Products - Fixed Navigation with Category */}
            <div className="footer-column">
              <h4 className="footer-heading">{t('footer.products', 'Products')}</h4>
              <ul className="footer-links">
                <li>
                  <a 
                    href="#hoses"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('products', 'hoses');
                    }}
                    className="footer-link"
                  >
                    {t('products.hoses', 'Industrial Hoses')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#fittings"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('products', 'fittings');
                    }}
                    className="footer-link"
                  >
                    {t('products.fittings', 'Hydraulic Fittings')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#valves"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('products', 'valves');
                    }}
                    className="footer-link"
                  >
                    {t('products.valves', 'Control Valves')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#assemblies"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('products', 'assemblies');
                    }}
                    className="footer-link"
                  >
                    {t('products.assemblies', 'Custom Assemblies')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4 className="footer-heading">{t('footer.contact', 'Contact')}</h4>
              
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Phone className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">{t('footer.phone', 'Phone')}</span>
                    <a href="tel:+77771234567" className="contact-value">+7 (777) 123-45-67</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Mail className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">{t('footer.email', 'Email')}</span>
                    <a href="mailto:info@lenergy.kz" className="contact-value">info@lenergy.kz</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <MapPin className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">{t('footer.addressLabel', 'Address')}</span>
                    <span className="contact-value">{t('footer.address', 'Almaty, Kazakhstan')}</span>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Clock className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">{t('footer.hours', 'Business Hours')}</span>
                    <span className="contact-value">{t('footer.workingHours', 'Mon-Fri 9:00-18:00')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; 2024 Lenergy. {t('footer.rights', 'All rights reserved.')}</p>
            </div>
            <div className="footer-legal">
              <a href="#privacy" className="legal-link">{t('footer.privacy', 'Privacy')}</a>
              <a href="#terms" className="legal-link">{t('footer.terms', 'Terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;