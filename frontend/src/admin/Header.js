import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/img/logodir.png';

function Header() {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  // Update active link based on current location
  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className='admin'>
      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo-img">
            <Link to='/'>
              <img src={logo} width="100px" height="50px" alt="Logo" />
            </Link>
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li><Link to='/admin' className={activeLink === '/admin' ? 'active' : ''}style={{ textDecoration: 'none' }}>Home</Link></li>
              <li><Link to='/admin/worker' className={activeLink === '/admin/worker' ? 'active' : ''}style={{ textDecoration: 'none' }}>Workers</Link></li>
              <li><Link to='/admin/job' className={activeLink === '/admin/job' ? 'active' : ''}style={{ textDecoration: 'none' }}>Jobs</Link></li>
              <li><Link to='/admin/userlist' className={activeLink === '/admin/userlist' ? 'active' : ''}style={{ textDecoration: 'none' }}>User</Link></li>
              <li><Link to='/admin/payment' className={activeLink === '/admin/userlist' ? 'active' : ''}style={{ textDecoration: 'none' }}>Payment</Link></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
