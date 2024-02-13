import React from "react";
import NavBar from "./navbars/NavBar";
import ItemListContainer from "./ItemListContainer";
import './Header.css'

const Header = () => {
    return (
        <header className="header">
                  <NavBar />
                  <ItemListContainer message="GREETINGS">
            </ItemListContainer>

        </header>
    )
}

export default Header