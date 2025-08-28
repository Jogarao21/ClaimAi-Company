import React, { useState, useEffect } from 'react';
import ClaimAi from './assets/ClaimAi.jpg';
import ImageAi from './assets/ImageAi.jpg';
import Login from './Login';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCookies, setShowCookies] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAllDays, setShowAllDays] = useState(false);

  const getCurrentDay = () => {
    return new Date().getDay();
  };

  const getBusinessHours = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = getCurrentDay();
    const businessHours = [];

    // Add all days in order starting from today
    for (let i = 0; i < 7; i++) {
      const dayIndex = (currentDay + i) % 7;
      const dayShort = days[dayIndex];
      const dayFull = fullDays[dayIndex];
      const isWeekend = dayIndex === 0 || dayIndex === 6;
      const isToday = i === 0;
      
      businessHours.push({
        day: dayShort,
        fullDay: dayFull,
        hours: isWeekend ? 'Closed' : '09:00 am – 05:00 pm',
        isToday: isToday,
        isWeekend: isWeekend
      });
    }
    
    return businessHours;
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setCurrentUser(email);
    setShowLogin(false);
    setShowRegister(false);
    setShowCookies(true);
    alert('Login successful!');
  };

  const handleRegister = (email) => {
    setIsLoggedIn(true);
    setCurrentUser(email);
    setShowLogin(false);
    setShowRegister(false);
    setShowCookies(true);
    alert('Registration successful!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowCookies(false);
    alert('Logged out successfully!');
  };

  const acceptCookies = () => {
    setShowCookies(false);
    alert('Cookies accepted!');
  };

  const toggleHoursDisplay = () => {
    setShowAllDays(!showAllDays);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="login-overlay">
          <div className="login-prompt">
            <div className="logo-large">ClaimAi</div>
            <p>Please Login or Register to access our AI-powered platform</p>
            <div className="login-buttons">
              <button className="btn btn-login" onClick={() => setShowLogin(true)}>Login</button>
              <button className="btn btn-register" onClick={() => setShowRegister(true)}>Register</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <header>
            <div className="logo">ClaimAi</div>
            <nav>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
              </ul>
            </nav>
            <div className="auth-section">
              <div className="user-info">Welcome, {currentUser}</div>
              <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          </header>

          <main>
            <div className="hero" id="home">
              <h1>Welcome to ClaimAi</h1>
              <p>AI-Powered Solution for Intelligent Claims Processing</p>
            </div>

            <section className="content-section" id="about">
              <h2>About ClaimAi Solutions</h2>
              <div className="section-image">
                <img src={ClaimAi} alt="ClaimAi Team" />
              </div>
              <center className='misson'>Our Mission</center>
              <p>
                ClaimAi is a cutting-edge artificial intelligence platform designed to revolutionize the claims processing industry. 
                Our advanced AI algorithms analyze, process, and manage insurance claims with unprecedented accuracy and speed. 
                We combine machine learning, natural language processing, and predictive analytics to streamline workflows, 
                reduce processing times, and minimize human error. Our platform helps insurance companies, healthcare providers, 
                and legal firms automate their claims management processes while maintaining the highest standards of accuracy and compliance.
                With ClaimAi, you can expect faster claim resolutions, improved customer satisfaction, and significant cost savings.
              </p>
            </section>

            <section className="content-section" id="contact">
              <h2>Contact Us</h2>
              <div className="section-image">
                <img src={ImageAi} alt="Contact Support" />
              </div>
              <center className='Communication'>Communication is the Key</center>
              <p>
                Need help or have questions about ClaimAi? We're here to assist you! Our dedicated support team is ready to help you 
                with any inquiries, technical support, or guidance you may need. Whether you're a new user looking to get started 
                or an existing client with specific questions, we're committed to providing you with excellent service.
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> support@claimai-solutions.com</p>
                <p><strong>Response Time:</strong> Within 24 hours during business days</p>
                <p><strong>Phone Support:</strong> Available during business hours</p>
              </div>

              {/* Updated Hours Section */}
              <div className="hours-section">
                <h3>Hours</h3>
                <div className="hours-container">
                  {showAllDays ? (
                    // Show all days when expanded
                    getBusinessHours().map((day, index) => (
                      <div key={index} className={`hour-card ${day.isToday ? 'today' : ''} ${day.isWeekend ? 'closed' : ''}`}>
                        <div className="day-info">
                          <span className="day-name">{day.day}</span>
                          {day.isToday && <span className="today-label">OPEN TODAY</span>}
                        </div>
                        <div className="time-info">
                          <span className="time">{day.hours}</span>
                          {day.isToday && (
                            <button 
                              className="today-arrow-btn" 
                              onClick={toggleHoursDisplay}
                              aria-label="Show less"
                            >
                              ▼
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Show only current day when collapsed
                    getBusinessHours().filter(day => day.isToday).map((day, index) => (
                      <div key={index} className={`hour-card ${day.isToday ? 'today' : ''} ${day.isWeekend ? 'closed' : ''}`}>
                        <div className="day-info">
                          <span className="day-name">{day.day}</span>
                          <span className="today-label">OPEN TODAY</span>
                        </div>
                        <div className="time-info">
                          <span className="time">{day.hours}</span>
                          <button 
                            className="today-arrow-btn" 
                            onClick={toggleHoursDisplay}
                            aria-label="Show all days"
                          >
                            ▲
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </main>

          {/* Updated Footer */}
          <footer className="new-footer">
            <div className="footer-container">
              <div className="footer-section footer-brand">
                <h3>ClaimAi</h3>
                <p>Revolutionizing claims processing with AI-powered solutions for better efficiency and accuracy.</p>
                <div className="footer-logo">
                  <span className="footer-logo-text">ClaimAi</span>
                </div>
              </div>
              
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
                  <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
                  <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#support">Support</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>Contact Info</h3>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <p><strong>Email</strong></p>
                    <p>support@claimai-solutions.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">⏰</span>
                  <div>
                    <p><strong>Response Time</strong></p>
                    <p>Within 24 hours</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <p><strong>Phone Support</strong></p>
                    <p>Business hours only</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <div className="copyright">
                  © 2025 ClaimAi. All rights reserved.
                </div>
                <div className="footer-links">
                  <a href="#privacy">Privacy Policy</a>
                  <span>•</span>
                  <a href="#terms">Terms of Service</a>
                  <span>•</span>
                  <a href="#cookies">Cookie Policy</a>
                </div>
                <div className="powered-by">
                  Powered by AI Solutions
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Login/Register Modals */}
      {(showLogin || showRegister) && (
        <Login
          isLogin={showLogin}
          isRegister={showRegister}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onClose={() => { setShowLogin(false); setShowRegister(false); }}
          onSwitchToLogin={() => { setShowLogin(true); setShowRegister(false); }}
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      )}

      {/* Cookies Banner */}
      {showCookies && isLoggedIn && (
        <div className="cookies-banner">
          <p>We use cookies to enhance your experience on ClaimAi. By continuing to use our site, you accept all cookies.</p>
          <button className="accept-cookies" onClick={acceptCookies}>Accept All Cookies</button>
        </div>
      )}
    </div>
  );
};

export default App;