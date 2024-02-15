import React from 'react'
import { useState } from 'react'
import './Body.css'
import ProductContainer from './ProductContainer'
import CartContainer from './CartContainer'


const Body = () => {

    const [showProducts, setShowProducts] = useState(false)
    const [showCart, setShowCart] = useState(false)

    const selectProducts = () => {
        setShowProducts(true)
        setShowCart(false)
    }

    const selectCart = () => {
        setShowProducts(false)
        setShowCart(true)
    }


     return (
        <main className='body'>
           
            <div className='buttonsContainer'>
                <a href='#' className="buttons" onClick={selectProducts}>SHOW PRODUCTS</a>
                <a href='#' className="buttons" onClick={selectCart}>SHOW CART</a>
            </div>

            <ul>
                {showProducts && <ProductContainer />}
                {showCart && <CartContainer message="GREETING" />}     
            </ul>
        </main>
    )
}

export default Body