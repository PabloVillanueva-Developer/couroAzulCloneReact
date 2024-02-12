import React from 'react'
import './CartWidget.css'

const CartWidget = () => {
    return (
        <>
            <li className='endUl_cartNumber'>2</li>
            <a href='#' className='cartContainer'>
                <img className='cartContainer__img' src="../public/assets/images/logoCarritoCompras.png" alt="Cart" />
            </a>
        </>

    )
}

export default CartWidget