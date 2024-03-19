import React from 'react'
import { useState } from 'react'
import './Body.css'
import ListProductContainer from '../ListContainer/ListProductContainer'
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer'

import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'


const Body = ({apiData}) => {
   
 
    let {id} = useParams() 
   

    return (
        <main className='body'>
            <div className='buttonsContainer'>
                <Link to={`/`} className="buttons">SHOW LIST PRODUCTS</Link>
            {/*     <Link to={`/product/${id}`} className="buttons" >SHOW DETAIL PRODUCTS</Link > */}
                <Link to='/cartContainer' className="buttons">SHOW CART</Link>
              
            </div>
            <div>
                <Routes>
                        <Route exact path="/" element= {<ListProductContainer apiData={apiData}/> }/>
                        <Route path="/product/:id" element={<DetailProductContainer apiData={apiData}/>}/>
                </Routes>
            </div>
        </main>
    );
                
}

export default Body;