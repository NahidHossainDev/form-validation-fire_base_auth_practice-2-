import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const style = {
        nav: {
            padding: '20px',
            background: 'yellow',
            position: 'fixed',
            top:'0'
        },
        navLink: {
            padding: '20px',
            textDecoration:'none'
        }
    }
    return (
      <div>
        <nav style={style.nav}>
          <Link style={style.navLink} to="/reactHookForm">React hook form</Link>
          <Link style={style.navLink} to="/defaultForm">Default form</Link>
        </nav>
      </div>
    );
};

export default NavBar;