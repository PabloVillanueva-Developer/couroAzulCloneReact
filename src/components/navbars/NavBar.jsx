import React from 'react';
import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';

const NavBar  = () => {
    return (
        <nav className='nav'>
              <Link to="/" className="logo-link">
                <img src="#" alt="Logo" />
            </Link>
            <ul className='startUl'>
                <a href='#'>MARKETS</a>
                <a href='#'>PASSION FOR LEATHER</a>
                <a href='#'>INNOVATION</a>
                <a href='#'>LEGACY</a>
            </ul>
            <ul className='middleUl'>
                <a href='#'>ABOUT</a>
                <a href='#'>CONTACTS</a>
                <a href='#'>PT | EN</a>
            </ul>
            <ul className='endUl'>
                    <CartWidget />
            </ul>
          
        </nav>

    )

}

export default NavBar