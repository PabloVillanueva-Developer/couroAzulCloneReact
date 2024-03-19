import React from 'react'
import { useState } from 'react'
import './Body.css'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer'
import Loading from '../Loading/Loading'

import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'


const Body = ({apiData}) => {
   
 
    let {id} = useParams() 
    if (!apiData) {
        return <Loading />;
    } 
    
    const apiDataArray = Object.values(apiData);
    const apiDataArrayFlat = apiDataArray.flat()
    const conditionsProductsData = [...new Set(apiDataArrayFlat.map( product => product.attributes[7].value_name))]
   

    return (
        <main className='main'>
            <div className='buttonsContainer'>
                <Link to={`/`} className="buttons">SHOW LIST PRODUCTS</Link>
            {/*     <Link to={`/product/${id}`} className="buttons" >SHOW DETAIL PRODUCTS</Link > */}
                <Link to='/cartContainer' className="buttons">SHOW CART</Link>
            </div>

            <div className='brands'>
                {conditionsProductsData.map((brand) => (
                   <Link to={`/category/${brand}`} key={brand}>
                    <h3 key={brand}>{brand}</h3>
                    </Link>
                    ))}
            </div>

            <div>
                <Routes>
                        <Route exact path="/" element= {<ItemListContainer apiData={apiData}/> }/>
                        <Route exact path="/category/:brand" element= {<ItemListContainer apiData={apiData}/> }/>
                        <Route path="/item/:id" element={<DetailProductContainer apiData={apiData}/>}/>
                </Routes>
            </div>
        </main>
    );
                
}

export default Body;