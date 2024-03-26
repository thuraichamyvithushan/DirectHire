import React, { useState, useEffect } from 'react';
import { Link} from "react-router-dom";
import logo from '../src/assets/img/logodir.png';


function Header() {
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("email");
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${email}`);
        const data = await response.json();
        console.log(data)
        if (data.success) {
          localStorage.setItem("userId", data.response._id);
          setUser(data.response);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  useEffect(() => {
    const navbarLinks = document.querySelectorAll("#navbar ul li a");

    navbarLinks.forEach(link => {
      link.addEventListener("click", function(event) {
        navbarLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }, []);

  

  return (
    <div className="Header">
      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo-img">
            <Link to='/'>
              <img src={logo} width="100px" height="50px" alt="Logo" />
            </Link>
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li><Link className="nav-link scrollto" to="/">Home</Link></li>
              <li><Link className="nav-link scrollto" to="/Workdisplay">Job</Link></li>
              <li><Link className="nav-link scrollto" to="/display">Workers</Link></li>
              <li><Link className="nav-link scrollto" to="#contact">Contact</Link></li>
              {user && user.isAdmin === "true" && (
                <li><Link to="/admin" className="nav-link scrollto">Admin</Link></li>
              )}
              {email ?
                (<li><a href="/login" className="nav-link scrollto" onClick={handleLogout}>Logout</a></li>) :
                (<li><a href="/login" className="nav-link scrollto">Login</a></li>)
              }
            </ul>
          
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
