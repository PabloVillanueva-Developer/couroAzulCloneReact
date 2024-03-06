import React from 'react'
import './CartContainer.css'

const CartContainer = (props) => {

    const {message} = props

    return (
        <div className="cartContainer">
            {message}
        </div>
       
    
    )

}

export default CartContainer