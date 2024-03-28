import React from 'react'
import { useState, useContext, useEffect } from 'react'
import './Main.css'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import DetailProductContainer from '../DetailProductContainer/DetailProductContainer'
import Loading from '../Loading/Loading'
import CartWidget from '../CartWidget/CartWidget'
import { resumeCheckoutContext } from '../../App'

import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import CartContainer from '../CartContainer/CartContainer'


const Body = ({apiData}) => {
   Router

   const {resumeDataCheckoutContext, setResumeDataCheckoutContext} = useContext(resumeCheckoutContext)
   const [chekoutActive, setChecoutActive] = useState(0)
 
    let {id} = useParams() 


    useEffect(()=> {
        setChecoutActive(resumeDataCheckoutContext.activeChekout)        
      },[resumeDataCheckoutContext])
    /* if (!apiData) {
        return <Loading />;
    }  */
    
/*     const apiDataArray = Object.values(apiData);
    const apiDataArrayFlat = apiDataArray.flat()
    const conditionsProductsData = [...new Set(apiDataArrayFlat.map( product => product.attributes[7].value_name))] */
   

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
                </Routes>
          
        </main>
    );
                
}

export default Body;