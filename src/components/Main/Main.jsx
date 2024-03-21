import React from 'react'
import { useState } from 'react'
import './Main.css'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer'
import Loading from '../Loading/Loading'
import CartWidget from '../CartWidget/CartWidget'

import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'


const Body = ({apiData}) => {
   Router
 
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
                <ul >
                    <Link to='/cartContainer'>
                        <CartWidget/>
                    </Link>
                </ul>
            </div>

           
                <ul className='brands'>
                    <li> <Link to='/Category'>All brands</Link> </li>
                    <li> <Link to='/Category/Ford'>Ford</Link> </li>
                    <li> <Link to='/Category/Fiat'>Fiat</Link> </li>
                    <li> <Link to='/Category/Chevrolet'>Chevrolet</Link> </li>
                </ul>
        
                <Routes>
                        <Route exact path="/" element= {<ItemListContainer apiData={apiData}/> }/>
                        <Route exact path="/category/:modelo" element= {<ItemListContainer apiData={apiData}/> }/>
                        <Route exact path="/category" element= {<ItemListContainer apiData={apiData}/> }/>
                        <Route path="/item/:id" element={<DetailProductContainer apiData={apiData}/>}/>
                </Routes>
          
        </main>
    );
                
}

export default Body;