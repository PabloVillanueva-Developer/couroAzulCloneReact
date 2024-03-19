import React from 'react'
import './ListProductContainer.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer';
import Loading from '../Loading/Loading';


const ListProductContainer = (props) => {
    const {apiData} = props
    if (!apiData) {
        return <Loading />;
    } 

    const apiDataArray = Object.values(apiData);
    const apiDataArrayFlat = apiDataArray.flat()
      

    return (
        <div className='productContainer'>
           { <div className='ListProductContainer'>
                {apiDataArrayFlat.map((product) => (
                    <div className='cardContainer' key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p>{product.price}</p>
                        <Link to={`/product/${product.id}`} className='cardButton' >
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default ListProductContainer;