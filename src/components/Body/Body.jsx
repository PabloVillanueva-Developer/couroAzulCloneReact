import React from 'react'
import { useState } from 'react'
import './Body.css'
import ProductContainer from '../../components/ProductContainer/ProductContainer'
import CartContainer from '../CartContainer/CartContainer'


const Body = (apiData) => {

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
                {showProducts && <ProductContainer apiData={apiData}/>}
                {showCart && <CartContainer message="GREETING" />}     
            </ul>
        </main>
    )
}

export default Body