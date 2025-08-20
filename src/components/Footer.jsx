import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="author">Wenxi-v1.0.0</span>
        <a 
          href="https://github.com/Wenaixi/Algorithm-demonstration" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          GitHub Repository
        </a>
        <span className="license">MIT License</span>
      </div>
    </footer>
  );
};

export default Footer;