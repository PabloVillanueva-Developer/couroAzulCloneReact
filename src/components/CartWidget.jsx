import React from 'react'
import './CartWidget.css'

const CartWidget = () => {

    return (
        <>
            <li className='endUl_cartNumber'>2</li>
            <a href='#' >
                <img className='cartWidgetContainer__img' src="/assets/images/logoCarritoCompras.png" alt="Cart" />
            </a>
        </>

    )
}

export default CartWidget