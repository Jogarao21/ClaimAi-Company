
import React, { useState } from 'react';
import './Login.css';

const Login = ({ 
  isLogin, 
  isRegister, 
  onLogin, 
  onRegister, 
  onClose, 
  onSwitchToLogin, 
  onSwitchToRegister 
}) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      onLogin(loginData.email);
      setLoginData({ email: '', password: '', rememberMe: false });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    if (!registerData.agreeTerms) {
      alert('Please agree to Terms & Conditions');
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (registerData.email && registerData.password) {
      onRegister(registerData.email);
      setRegisterData({ email: '', password: '', confirmPassword: '', agreeTerms: false });
    }
  };

  const handleLoginChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegisterChange = (field, value) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  return (
    <div className={`modal ${(isLogin || isRegister) ? 'show' : ''}`} onClick={handleModalClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {isLogin && (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={loginData.email}
                  onChange={(e) => handleLoginChange('email', e.target.value)}
                  required 
                />
                <span className="input-icon">📧</span>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => handleLoginChange('password', e.target.value)}
                  required 
                />
                <span className="input-icon">🔒</span>
              </div>
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={(e) => handleLoginChange('rememberMe', e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" className="form-btn">Login</button>
            </form>
            <div className="form-link">
              Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Register</a>
            </div>
          </>
        )}

        {isRegister && (
          <>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={(e) => handleRegisterChange('email', e.target.value)}
                  required 
                />
                <span className="input-icon">📧</span>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={(e) => handleRegisterChange('password', e.target.value)}
                  required 
                />
                <span className="input-icon">🔒</span>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={(e) => handleRegisterChange('confirmPassword', e.target.value)}
                  required 
                />
                <span className="input-icon">🔒</span>
              </div>
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="agreeTerms"
                  checked={registerData.agreeTerms}
                  onChange={(e) => handleRegisterChange('agreeTerms', e.target.checked)}
                  required 
                />
                <label htmlFor="agreeTerms">I agree to Terms & Conditions</label>
              </div>
              <button type="submit" className="form-btn">Register</button>
            </form>
            <div className="form-link">
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Login</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;