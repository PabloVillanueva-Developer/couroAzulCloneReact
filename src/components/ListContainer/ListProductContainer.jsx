import React from 'react'
import './ListProductContainer.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer';


const ListProductContainer = (props) => {

    const {apiData, selectedProduct,setSelectedProduct} = props
    const apiDataArray = Object.values(apiData);
    const apiDataArrayFlat = apiDataArray.flat()

   

    const detailsClick = (product) => {
        setSelectedProduct(product)
    }
   
    return (
        <div className='productContainer'>
            <div className='ListProductContainer'>
                {apiDataArrayFlat.map((product) => (
                    <div className='cardContainer' key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p>{product.price}</p>
                        <Link to={`/item/${product.id}`} className='cardButton' onClick={() => detailsClick(product)}>
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProductContainer;