import React, { useState } from 'react'
import {
  Link
} from "react-router-dom";
import "./Header.css";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close'; 

function HeaderPages({ option, scroll }) {
  const [clicked, setClicked] = useState(false);
  const [scrolled, setScrolled] = useState(option);

  const changeNavbar = () => {
    if (window.scrollY > scroll) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  window.addEventListener('scroll', changeNavbar)

  const handleClick = () => {
    setClicked(true)
  }
  const closeClick = () => {
    setClicked(false)
  }
  return (
    <div className="Pagess">
      <nav className={scrolled ? `navbars activated` : 'navbars'}>
        <Link className="navbars-brand" to="/">
          <img
            src={scrolled ? 'https://i.postimg.cc/RFCcDcf6/Logo.png' : "https://i.postimg.cc/N0dQGq7y/Logo-White.png"}
            alt=""
          />
        </Link>
        <div className="navbars-collapse">
          <div className="menu__icon">
            <MenuIcon fontSize="large" className={`menu__burger ${clicked && 'menu__activated'}`} onClick={handleClick} />
            <CloseIcon fontSize="large" className={`menu__close ${clicked && 'menu__activated'}`} onClick={closeClick} />
          </div>
          <ul className={`navbars-nav ${clicked && 'nav-actived'}`}>
            <li className="navs-item">
              <Link to='/' className="navs-link">
                HOME
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/article' className="navs-link">
                BLOG
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/about-us' className="navs-link">
                TENTANG KAMI
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/contact-us' className="navs-link">
                HUBUNGI KAMI
              </Link>
            </li>
            <li className="navs-item">
              <Link to='/login' className="navs-link">
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default HeaderPages
