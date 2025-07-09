import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Globe, TrendingUp, Shield, Zap, Target, CheckCircle, ArrowRight, Play, Factory, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/About.css';

const About = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('mission');
  const [countersVisible, setCountersVisible] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState({
    experience: 0,
    clients: 0,
    countries: 0,
    projects: 0
  });
  const countersRef = useRef(null);

  // Counter animation data
  const counterData = {
    experience: { target: 15, suffix: '+', label: t('about.stats.experience', 'Years Experience') },
    clients: { target: 500, suffix: '+', label: t('about.stats.clients', 'Happy Clients') },
    countries: { target: 25, suffix: '+', label: t('about.stats.countries', 'Countries Served') },
    projects: { target: 1000, suffix: '+', label: t('about.stats.projects', 'Projects Completed') }
  };

  // Animate counters when visible
  useEffect(() => {
    if (countersVisible) {
      Object.keys(counterData).forEach((key) => {
        const target = counterData[key].target;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedCounts(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, duration / steps);
      });
    }
  }, [countersVisible]);

  // Intersection Observer for counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCountersVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tabData = {
    mission: {
      title: t('about.mission.title', 'Our Mission'),
      content: t('about.mission.content', 'To provide world-class industrial solutions that empower businesses to achieve operational excellence while maintaining the highest standards of safety and reliability.'),
      icon: Target
    },
    vision: {
      title: t('about.vision.title', 'Our Vision'),
      content: t('about.vision.content', 'To be the leading global provider of innovative industrial solutions, setting new standards for quality, sustainability, and customer satisfaction across all markets we serve.'),
      icon: TrendingUp
    },
    values: {
      title: t('about.values.title', 'Our Values'),
      content: t('about.values.content', 'Quality, Innovation, Integrity, and Customer Success drive everything we do. We believe in building lasting partnerships through trust, transparency, and exceptional service.'),
      icon: Shield
    }
  };

  const achievementData = [
    {
      icon: Award,
      title: t('about.achievements.iso.title', 'ISO 9001:2015 Certified'),
      description: t('about.achievements.iso.desc', 'International quality management standards')
    },
    {
      icon: Users,
      title: t('about.achievements.team.title', '50+ Expert Team'),
      description: t('about.achievements.team.desc', 'Highly skilled engineers and specialists')
    },
    {
      icon: Shield,
      title: t('about.achievements.warranty.title', '2-Year Warranty'),
      description: t('about.achievements.warranty.desc', 'Comprehensive coverage on all products')
    },
    {
      icon: Globe,
      title: t('about.achievements.delivery.title', 'Global Delivery'),
      description: t('about.achievements.delivery.desc', 'Fast and reliable worldwide shipping')
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="about-hero-content">
            <div className="hero-badge">
              <Factory className="badge-icon" />
              <span>{t('about.hero.badge', 'Since 2008')}</span>
            </div>
            <h1 className="about-hero-title">
              {t('about.hero.title', 'About Lenergy')}
            </h1>
            <p className="about-hero-subtitle">
              {t('about.hero.subtitle', 'Leading the industrial revolution with innovative hydraulic solutions and uncompromising quality standards that power industries across the globe.')}
            </p>
            <div className="hero-actions">
              <button className="btn-hero-primary">
                <span>{t('about.hero.story', 'Our Story')}</span>
                <ArrowRight className="btn-icon" />
              </button>
              <button className="btn-hero-secondary">
                <Play className="btn-icon" />
                <span>{t('about.hero.video', 'Company Video')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={countersRef}>
        <div className="container">
          <div className="stats-grid">
            {Object.entries(counterData).map(([key, data]) => (
              <div key={key} className="stat-card">
                <div className="stat-number">
                  {animatedCounts[key]}{data.suffix}
                </div>
                <div className="stat-label">{data.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="mvv-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {t('about.mvv.title', 'What Drives Us')}
            </h2>
            <p className="section-subtitle">
              {t('about.mvv.subtitle', 'Our core principles that guide every decision and innovation')}
            </p>
          </div>
          
          <div className="mvv-content">
            <div className="mvv-tabs">
              {Object.entries(tabData).map(([key, tab]) => (
                <button
                  key={key}
                  className={`mvv-tab ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <tab.icon className="tab-icon" />
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>
            
            <div className="mvv-content-area">
              <div className="mvv-text">
                <h3 className="mvv-title">{tabData[activeTab].title}</h3>
                <p className="mvv-description">{tabData[activeTab].content}</p>
                <div className="mvv-features">
                  <div className="feature-item">
                    <CheckCircle className="feature-icon" />
                    <span>{t('about.features.commitment', 'Unwavering Commitment')}</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="feature-icon" />
                    <span>{t('about.features.innovation', 'Continuous Innovation')}</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="feature-icon" />
                    <span>{t('about.features.excellence', 'Operational Excellence')}</span>
                  </div>
                </div>
              </div>
              <div className="mvv-visual">
                <div className="visual-card">
                  {React.createElement(tabData[activeTab].icon, { className: "visual-icon" })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {t('about.whyChoose.title', 'Why Choose Lenergy')}
            </h2>
            <p className="section-subtitle">
              {t('about.whyChoose.subtitle', 'What sets us apart in the industrial solutions market')}
            </p>
          </div>
          
          <div className="why-choose-grid">
            <div className="choose-card">
              <div className="choose-icon">
                <Shield className="icon" />
              </div>
              <h3 className="choose-title">
                {t('about.whyChoose.quality.title', 'Uncompromising Quality')}
              </h3>
              <p className="choose-description">
                {t('about.whyChoose.quality.desc', 'Every product undergoes rigorous testing and quality control to ensure maximum reliability and performance.')}
              </p>
              <div className="choose-feature">
                <CheckCircle className="feature-check" />
                <span>{t('about.whyChoose.quality.feature', 'ISO 9001:2015 Certified')}</span>
              </div>
            </div>

            <div className="choose-card">
              <div className="choose-icon">
                <Wrench className="icon" />
              </div>
              <h3 className="choose-title">
                {t('about.whyChoose.expertise.title', 'Technical Expertise')}
              </h3>
              <p className="choose-description">
                {t('about.whyChoose.expertise.desc', 'Our engineering team provides comprehensive technical support and custom solutions for complex applications.')}
              </p>
              <div className="choose-feature">
                <CheckCircle className="feature-check" />
                <span>{t('about.whyChoose.expertise.feature', '24/7 Technical Support')}</span>
              </div>
            </div>

            <div className="choose-card">
              <div className="choose-icon">
                <Globe className="icon" />
              </div>
              <h3 className="choose-title">
                {t('about.whyChoose.delivery.title', 'Global Reach')}
              </h3>
              <p className="choose-description">
                {t('about.whyChoose.delivery.desc', 'Fast and reliable delivery network covering 25+ countries with local support and service.')}
              </p>
              <div className="choose-feature">
                <CheckCircle className="feature-check" />
                <span>{t('about.whyChoose.delivery.feature', 'Express Delivery Available')}</span>
              </div>
            </div>

            <div className="choose-card">
              <div className="choose-icon">
                <Zap className="icon" />
              </div>
              <h3 className="choose-title">
                {t('about.whyChoose.innovation.title', 'Continuous Innovation')}
              </h3>
              <p className="choose-description">
                {t('about.whyChoose.innovation.desc', 'Investment in R&D ensures we stay ahead of industry trends and technological advancements.')}
              </p>
              <div className="choose-feature">
                <CheckCircle className="feature-check" />
                <span>{t('about.whyChoose.innovation.feature', 'Latest Technology')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="industry-solutions">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {t('about.industries.title', 'Industries We Serve')}
            </h2>
            <p className="section-subtitle">
              {t('about.industries.subtitle', 'Trusted solutions across diverse industrial sectors')}
            </p>
          </div>
          
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-content">
                <h3 className="industry-title">{t('about.industries.manufacturing.title', 'Manufacturing')}</h3>
                <p className="industry-description">{t('about.industries.manufacturing.desc', 'Production line automation and hydraulic systems')}</p>
                <div className="industry-stats">
                  <span className="stat">200+ {t('about.industries.manufacturing.projects', 'Projects')}</span>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-content">
                <h3 className="industry-title">{t('about.industries.construction.title', 'Construction')}</h3>
                <p className="industry-description">{t('about.industries.construction.desc', 'Heavy machinery and equipment hydraulics')}</p>
                <div className="industry-stats">
                  <span className="stat">150+ {t('about.industries.construction.projects', 'Projects')}</span>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-content">
                <h3 className="industry-title">{t('about.industries.mining.title', 'Mining')}</h3>
                <p className="industry-description">{t('about.industries.mining.desc', 'Heavy-duty solutions for extreme conditions')}</p>
                <div className="industry-stats">
                  <span className="stat">100+ {t('about.industries.mining.projects', 'Projects')}</span>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-content">
                <h3 className="industry-title">{t('about.industries.agriculture.title', 'Agriculture')}</h3>
                <p className="industry-description">{t('about.industries.agriculture.desc', 'Farm equipment and irrigation systems')}</p>
                <div className="industry-stats">
                  <span className="stat">80+ {t('about.industries.agriculture.projects', 'Projects')}</span>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-content">
                <h3 className="industry-title">{t('about.industries.energy.title', 'Energy')}</h3>
                <p className="industry-description">{t('about.industries.energy.desc', 'Power generation and distribution systems')}</p>
                <div className="industry-stats">
                  <span className="stat">60+ {t('about.industries.energy.projects', 'Projects')}</span>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-content">
                <h3 className="industry-title">{t('about.industries.marine.title', 'Marine')}</h3>
                <p className="industry-description">{t('about.industries.marine.desc', 'Marine vessels and offshore platforms')}</p>
                <div className="industry-stats">
                  <span className="stat">40+ {t('about.industries.marine.projects', 'Projects')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {t('about.achievements.title', 'Our Achievements')}
            </h2>
            <p className="section-subtitle">
              {t('about.achievements.subtitle', 'Recognition and certifications that validate our commitment to excellence')}
            </p>
          </div>
          
          <div className="achievements-grid">
            {achievementData.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">
                  <achievement.icon className="icon" />
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              {t('about.cta.title', 'Ready to Partner with Us?')}
            </h2>
            <p className="cta-subtitle">
              {t('about.cta.subtitle', 'Join hundreds of companies who trust Lenergy for their industrial needs')}
            </p>
            <div className="cta-actions">
              <button className="btn-cta-primary">
                {t('about.cta.contact', 'Contact Our Team')}
                <ArrowRight className="btn-icon" />
              </button>
              <button className="btn-cta-secondary">
                {t('about.cta.catalog', 'Download Catalog')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;