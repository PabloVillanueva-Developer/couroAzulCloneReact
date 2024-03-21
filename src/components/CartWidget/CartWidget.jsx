import React from 'react'
import './CartWidget.css'

const CartWidget = () => {

    return (
        <>  
        <ul className='endUl'>
            <li className='endUl_cartNumber'>2</li>
           
                <img className='cartWidgetContainer__img' src="/assets/images/logoCarritoCompras.png" alt="Cart" />
          
        </ul>
        </>

    )
}

export default CartWidget