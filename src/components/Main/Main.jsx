import React from 'react'
import { useState, useContext, useEffect } from 'react'
import './Main.css'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer'
import CartWidget from '../CartWidget/CartWidget'
import { resumeCheckoutContext } from '../../App'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import CartContainer from '../CartContainer/CartContainer'
import SearchId from '../SearchId/SearchId'


const Body = () => {
   Router

   const {resumeDataCheckoutContext, setResumeDataCheckoutContext} = useContext(resumeCheckoutContext)
   const [chekoutActive, setChecoutActive] = useState(0)
 
/*     let {id} = useParams()  */

    useEffect(()=> {
        setChecoutActive(resumeDataCheckoutContext.activeChekout)        
      },[resumeDataCheckoutContext])   

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
                <Link to='/orderQuery' className="buttons">ORDER QUERY</Link>
            </div>

            <ul className={chekoutActive === false || !chekoutActive ? 'brands' : 'brands--blur' }>
                <li> <Link to='/Category'>All brands</Link> </li>
                <li> <Link to='/Category/Ford'>Ford</Link> </li>
                <li> <Link to='/Category/Fiat'>Fiat</Link> </li>
                <li> <Link to='/Category/Chevrolet'>Chevrolet</Link> </li>
                
            </ul>
        
            <Routes>
                    <Route exact path="/" element= {<ItemListContainer/> }/>
                    <Route exact path="/category/:modelo" element= {<ItemListContainer/>}/>
                    <Route exact path="/category" element= {<ItemListContainer/>}/>
                    <Route path="/item/:id" element={<DetailProductContainer/>}/>
                    <Route path="/CartContainer" element={<CartContainer/>}/>
                    <Route path="/orderQuery" element={<SearchId/>}/>
            </Routes>
          
        </main>
    );
                
}

export default Body;