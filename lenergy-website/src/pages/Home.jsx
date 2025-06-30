import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Zap, Shield, Wrench, Target, ChevronDown, Star, Users, Award, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Hero slides data
  const heroSlides = [
    {
      title: t('home.hero.slide1.title', 'Industrial Excellence'),
      subtitle: t('home.hero.slide1.subtitle', 'Premium hydraulic solutions for modern industry'),
      bgImage: '/api/placeholder/1920/1080',
      accent: '#FF5722'
    },
    {
      title: t('home.hero.slide2.title', 'Quality Guaranteed'),
      subtitle: t('home.hero.slide2.subtitle', 'ISO certified products with 2-year warranty'),
      bgImage: '/api/placeholder/1920/1080',
      accent: '#2196F3'
    },
    {
      title: t('home.hero.slide3.title', 'Global Reach'),
      subtitle: t('home.hero.slide3.subtitle', 'Serving 25+ countries worldwide'),
      bgImage: '/api/placeholder/1920/1080',
      accent: '#4CAF50'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simple intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Section with Dynamic Slides */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-background">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.bgImage})`,
                '--accent-color': slide.accent
              }}
            />
          ))}
          <div className="hero-overlay" />
        </div>
        
        <div className="hero-content">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge">
                <Zap className="hero-badge-icon" />
                <span>{t('home.hero.badge', 'Industry Leader')}</span>
              </div>
              
              <h1 className="hero-title">
                {heroSlides[currentSlide].title}
              </h1>
              
              <p className="hero-subtitle">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-number">15+</span>
                  <span className="hero-stat-label">{t('home.hero.years', 'Years')}</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">500+</span>
                  <span className="hero-stat-label">{t('home.hero.clients', 'Clients')}</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">25+</span>
                  <span className="hero-stat-label">{t('home.hero.countries', 'Countries')}</span>
                </div>
              </div>
              
              <div className="hero-actions">
                <button className="btn-hero-primary">
                  <span>{t('home.hero.explore', 'Explore Products')}</span>
                  <ArrowRight className="btn-icon" />
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-3d-element">
                <div className="floating-card">
                  <Shield className="floating-icon" />
                  <span>{t('home.hero.certified', 'ISO Certified')}</span>
                </div>
                <div className="floating-card">
                  <Award className="floating-icon" />
                  <span>{t('home.hero.quality', 'Premium Quality')}</span>
                </div>
                <div className="floating-card">
                  <Globe className="floating-icon" />
                  <span>{t('home.hero.global', 'Global Delivery')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-slide-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        <button 
          className="scroll-indicator"
          onClick={() => scrollToSection('features')}
        >
          <ChevronDown className="scroll-icon" />
        </button>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="features-section animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {t('home.features.title', 'Why Choose Lenergy')}
            </h2>
            <p className="section-subtitle">
              {t('home.features.subtitle', 'Industry-leading solutions backed by expertise and innovation')}
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card premium">
              <div className="feature-icon-wrapper">
                <Shield className="feature-icon" />
              </div>
              <h3 className="feature-title">
                {t('home.features.quality.title', 'Premium Quality')}
              </h3>
              <p className="feature-description">
                {t('home.features.quality.desc', 'ISO certified products with rigorous quality control and 2-year warranty coverage.')}
              </p>
              <div className="feature-stats">
                <div className="feature-stat">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">{t('home.features.quality.reliability', 'Reliability')}</span>
                </div>
              </div>
            </div>
            
            <div className="feature-card expertise">
              <div className="feature-icon-wrapper">
                <Wrench className="feature-icon" />
              </div>
              <h3 className="feature-title">
                {t('home.features.expertise.title', 'Technical Expertise')}
              </h3>
              <p className="feature-description">
                {t('home.features.expertise.desc', 'Professional engineering team providing custom solutions and technical support.')}
              </p>
              <div className="feature-stats">
                <div className="feature-stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">{t('home.features.expertise.support', 'Support')}</span>
                </div>
              </div>
            </div>
            
            <div className="feature-card innovation">
              <div className="feature-icon-wrapper">
                <Target className="feature-icon" />
              </div>
              <h3 className="feature-title">
                {t('home.features.innovation.title', 'Innovation Focus')}
              </h3>
              <p className="feature-description">
                {t('home.features.innovation.desc', 'Cutting-edge technology integration and continuous product development.')}
              </p>
              <div className="feature-stats">
                <div className="feature-stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">{t('home.features.innovation.patents', 'Patents')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="products-showcase animate-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {t('home.products.title', 'Our Product Range')}
            </h2>
            <p className="section-subtitle">
              {t('home.products.subtitle', 'Comprehensive industrial solutions for every need')}
            </p>
          </div>
          
          <div className="products-grid">
            <div className="product-category">
              <div className="product-image">
                <img src="./images/industrial_hoses.jpeg" alt="Industrial Hoses" />
                <div className="product-overlay">
                  <button className="product-btn">
                    {t('home.products.explore', 'Explore')}
                    <ArrowRight className="btn-icon" />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{t('products.hoses', 'Industrial Hoses')}</h3>
                <p>{t('home.products.hoses.desc', 'High-pressure hydraulic hoses for demanding applications')}</p>
                <div className="product-features">
                  <span className="product-feature">High Pressure</span>
                  <span className="product-feature">Temperature Resistant</span>
                </div>
              </div>
            </div>
            
            <div className="product-category">
              <div className="product-image">
                <img src="./images/hydraulic_fittings.webp" alt="Hydraulic Fittings" />
                <div className="product-overlay">
                  <button className="product-btn">
                    {t('home.products.explore', 'Explore')}
                    <ArrowRight className="btn-icon" />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{t('products.fittings', 'Hydraulic Fittings')}</h3>
                <p>{t('home.products.fittings.desc', 'Precision-engineered fittings for secure connections')}</p>
                <div className="product-features">
                  <span className="product-feature">Leak-Proof</span>
                  <span className="product-feature">Corrosion Resistant</span>
                </div>
              </div>
            </div>
            
            <div className="product-category">
              <div className="product-image">
                <img src="./images/control_valves.jpg" alt="Control Valves" />
                <div className="product-overlay">
                  <button className="product-btn">
                    {t('home.products.explore', 'Explore')}
                    <ArrowRight className="btn-icon" />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{t('products.valves', 'Control Valves')}</h3>
                <p>{t('home.products.valves.desc', 'Advanced flow control and regulation systems')}</p>
                <div className="product-features">
                  <span className="product-feature">Precise Control</span>
                  <span className="product-feature">Energy Efficient</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section animate-on-scroll">
        <div className="container">
          <div className="trust-content">
            <div className="trust-text">
              <h2 className="section-title">
                {t('home.trust.title', 'Trusted by Industry Leaders')}
              </h2>
              <p className="section-subtitle">
                {t('home.trust.subtitle', 'Join 500+ companies who rely on our expertise')}
              </p>
              
              <div className="trust-stats">
                <div className="trust-stat">
                  <Users className="trust-icon" />
                  <div className="trust-stat-content">
                    <span className="trust-stat-number">500+</span>
                    <span className="trust-stat-label">{t('home.trust.clients', 'Active Clients')}</span>
                  </div>
                </div>
                
                <div className="trust-stat">
                  <Star className="trust-icon" />
                  <div className="trust-stat-content">
                    <span className="trust-stat-number">4.9/5</span>
                    <span className="trust-stat-label">{t('home.trust.rating', 'Client Rating')}</span>
                  </div>
                </div>
                
                <div className="trust-stat">
                  <Globe className="trust-icon" />
                  <div className="trust-stat-content">
                    <span className="trust-stat-number">25+</span>
                    <span className="trust-stat-label">{t('home.trust.countries', 'Countries Served')}</span>
                  </div>
                </div>
              </div>
              
              <button className="btn-trust">
                {t('home.trust.cta', 'Start Your Project')}
                <ArrowRight className="btn-icon" />
              </button>
            </div>
            
            <div className="trust-visual">
              <div className="trust-badges">
                <div className="trust-badge">
                  <Award className="badge-icon" />
                  <span>ISO 9001</span>
                </div>
                <div className="trust-badge">
                  <Shield className="badge-icon" />
                  <span>CE Certified</span>
                </div>
                <div className="trust-badge">
                  <Target className="badge-icon" />
                  <span>Quality Assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              {t('home.cta.title', 'Ready to Get Started?')}
            </h2>
            <p className="cta-subtitle">
              {t('home.cta.subtitle', 'Get a free consultation and quote for your project')}
            </p>
            
            <div className="cta-actions">
              <button className="btn-cta-primary">
                {t('home.cta.quote', 'Get Free Quote')}
                <ArrowRight className="btn-icon" />
              </button>
              
              <button className="btn-cta-secondary">
                {t('home.cta.call', 'Call Now: +7 (777) 123-45-67')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;