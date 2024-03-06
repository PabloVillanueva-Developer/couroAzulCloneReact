import React from 'react'
import './ProductContainer.css'


const ProductContainer = (props) => {

    const {apiData} = props
    const apiDataArray = Object.values(apiData);
    const apiDataArrayFlat = apiDataArray.flat()
   
    console.log(apiDataArrayFlat)

    return (
        <div className='productContainer'>
            
            {apiDataArrayFlat.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <img src={product.thumbnail} alt={product.title} />
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductContainer