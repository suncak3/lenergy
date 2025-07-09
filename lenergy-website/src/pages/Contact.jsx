import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, Building, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/Contacts.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t('contact.phone', 'Phone'),
      value: '+7 (777) 123-45-67',
      link: 'tel:+77771234567',
      description: t('contact.phoneDesc', 'Call us during business hours')
    },
    {
      icon: Mail,
      label: t('contact.email', 'Email'),
      value: 'info@lenergy.kz',
      link: 'mailto:info@lenergy.kz',
      description: t('contact.emailDesc', 'Send us your inquiry anytime')
    },
    {
      icon: MapPin,
      label: t('contact.address', 'Address'),
      value: t('contact.addressValue', 'Almaty, Kazakhstan'),
      link: '#',
      description: t('contact.addressDesc', 'Visit our main office')
    },
    {
      icon: Clock,
      label: t('contact.hours', 'Business Hours'),
      value: t('contact.hoursValue', 'Mon-Fri 9:00-18:00'),
      link: '#',
      description: t('contact.hoursDesc', 'We are here to help you')
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="contact-hero-content">
            <div className="contact-hero-text">
              <h1 className="contact-hero-title">
                {t('contact.hero.title', 'Get in Touch')}
              </h1>
              <p className="contact-hero-subtitle">
                {t('contact.hero.subtitle', 'Ready to discuss your project? Our team of experts is here to help you find the perfect industrial solutions.')}
              </p>
              <div className="contact-hero-stats">
                <div className="hero-stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">{t('contact.hero.support', 'Support')}</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">2h</span>
                  <span className="stat-label">{t('contact.hero.response', 'Response')}</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">{t('contact.hero.years', 'Years')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2 className="form-title">
                  {t('contact.form.title', 'Send us a Message')}
                </h2>
                <p className="form-subtitle">
                  {t('contact.form.subtitle', 'Fill out the form below and we\'ll get back to you within 24 hours.')}
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <User className="label-icon" />
                      {t('contact.form.name', 'Full Name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('contact.form.namePlaceholder', 'Enter your full name')}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Mail className="label-icon" />
                      {t('contact.form.email', 'Email Address')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('contact.form.emailPlaceholder', 'Enter your email')}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      <Building className="label-icon" />
                      {t('contact.form.company', 'Company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('contact.form.companyPlaceholder', 'Your company name')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      <Phone className="label-icon" />
                      {t('contact.form.phone', 'Phone Number')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder={t('contact.form.phonePlaceholder', '+7 (777) 123-45-67')}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    <MessageSquare className="label-icon" />
                    {t('contact.form.subject', 'Subject')} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>{t('contact.form.selectSubject', 'Select a subject')}</option>
                    <option value="general">{t('contact.form.general', 'General Inquiry')}</option>
                    <option value="quote">{t('contact.form.quote', 'Request Quote')}</option>
                    <option value="support">{t('contact.form.support', 'Technical Support')}</option>
                    <option value="partnership">{t('contact.form.partnership', 'Partnership')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <MessageSquare className="label-icon" />
                    {t('contact.form.message', 'Message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder={t('contact.form.messagePlaceholder', 'Tell us about your project requirements...')}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`form-submit ${formStatus}`}
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading' && (
                    <div className="loading-spinner"></div>
                  )}
                  {formStatus === 'success' && (
                    <CheckCircle className="status-icon" />
                  )}
                  {formStatus === 'error' && (
                    <AlertCircle className="status-icon" />
                  )}
                  {formStatus === 'idle' && (
                    <Send className="submit-icon" />
                  )}
                  
                  <span className="submit-text">
                    {formStatus === 'loading' && t('contact.form.sending', 'Sending...')}
                    {formStatus === 'success' && t('contact.form.sent', 'Message Sent!')}
                    {formStatus === 'error' && t('contact.form.error', 'Try Again')}
                    {formStatus === 'idle' && t('contact.form.send', 'Send Message')}
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-header">
                <h3 className="info-title">
                  {t('contact.info.title', 'Contact Information')}
                </h3>
                <p className="info-subtitle">
                  {t('contact.info.subtitle', 'Reach out to us through any of these channels')}
                </p>
              </div>

              <div className="contact-cards">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-card-icon">
                      <item.icon className="card-icon" />
                    </div>
                    <div className="contact-card-content">
                      <h4 className="card-label">{item.label}</h4>
                      <a href={item.link} className="card-value">
                        {item.value}
                      </a>
                      <p className="card-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="map-section">
                <h4 className="map-title">
                  {t('contact.map.title', 'Find Us')}
                </h4>
                <div className="map-container">
                  <div className="map-placeholder">
                    <MapPin className="map-icon" />
                    <p>{t('contact.map.placeholder', 'Interactive map will be here')}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="contact-cta">
                <h4 className="cta-title">
                  {t('contact.cta.title', 'Need Immediate Assistance?')}
                </h4>
                <p className="cta-description">
                  {t('contact.cta.description', 'Call us directly for urgent inquiries')}
                </p>
                <a href="tel:+77771234567" className="cta-button">
                  <Phone className="cta-icon" />
                  {t('contact.cta.call', 'Call Now')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;