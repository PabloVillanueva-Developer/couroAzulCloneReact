import React from 'react';
import './NavBar.css'

const NavBar  = () => {
    return (
        <nav className='nav'>
            <ul className='startUl'>
                <li>MARKETS</li>
                <li>PASSION FOR LEATHER</li>
                <li>INNOVATION</li>
                <li>LEGACY</li>
            </ul>
            <ul className='middleUl'>
                <li>About</li>
                <li>Contacts</li>
                <li>PT | EN</li>
            </ul>
            <ul className='endUl'>
                <li className='endLi'>CartLogo</li>
            </ul>

        </nav>

    )

}

export default NavBar