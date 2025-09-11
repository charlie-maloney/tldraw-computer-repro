import React from 'react';
import './headerNavbar.css';

const HeaderNavbar: React.FC = () => {
  return (
    <nav className="header-navbar">
      <h1 className="header-title">
      ☕ tldraw Computer Simulator by{' '}
        <a 
          href="https://github.com/nicholastickle" 
          target="_blank" 
          rel="noopener noreferrer"
          className="author-link"
        >
          Nick
        </a>
        {' + '}
        <a 
          href="https://github.com/charlie-maloney" 
          target="_blank" 
          rel="noopener noreferrer"
          className="author-link"
        >
          Charlie
        </a>
      </h1>
    </nav>
  );
};

export default HeaderNavbar;