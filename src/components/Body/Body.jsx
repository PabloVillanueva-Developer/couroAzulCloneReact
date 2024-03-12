import React from 'react'
import { useState } from 'react'
import './Body.css'
import ListProductContainer from '../ListContainer/ListProductContainer'
import CartContainer from '../CartContainer/CartContainer'
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


const Body = (apiData) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(selectedProduct)




    return (
        <main className='body'>
            <div className='buttonsContainer'>
                <Link to='/category/:id' className="buttons">SHOW LIST PRODUCTS</Link>
                <Link to='/item/:id' className="buttons">SHOW DETAIL PRODUCTS</Link>
                <Link to='/cartContainer' className="buttons">SHOW CART</Link>
            </div>

    
            <Routes>
                <Route exact path="/category/:id" element={<ListProductContainer apiData={apiData} setSelectedProduct={setSelectedProduct} />} />
                <Route path="/item/:id" element={<DetailProductContainer selectedProduct={selectedProduct} />} />
                <Route path="/cartContainer" element={<CartContainer message="GREETING" />} />
            </Routes>
        </main>
    );
                
}

export default Body;