import React from 'react';
import './ItemListContainer.css'

const ItemListContainer = (props) => {
    
    const {message} = props 


    return (
    
      <ul className='ulProductsAndCart line'>
        <a href="#">PRODUCTS</a>
        <a href='#'>CART</a>
        {message}
      </ul>
       
  


    )


}

export default ItemListContainer