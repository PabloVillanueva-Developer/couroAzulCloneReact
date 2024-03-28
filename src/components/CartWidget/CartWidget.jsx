import React, { useContext, useEffect, useState } from 'react'
import './CartWidget.css'
import { MiContexto } from '../../App'
import { totalQuantityContext } from '../../App'
import { useParams } from "react-router-dom"


const CartWidget = () => {

    const  {datoContext, setDatoContext} = useContext(MiContexto) 
    const {totalQuantityDataContext, setTotalQuantityDataContext} = useContext(totalQuantityContext); 
    const [arrSelectedProducts, setArrSelectedProducts] = useState([])
    const [quantity, setQuantity] = useState(0)
    const id = useParams()
    
    useEffect(() => {
    },[quantity])

    return (
        <>  
        <ul className='endUl'>
            <li className='endUl_cartNumber'>{totalQuantityDataContext}</li>
                <img className='cartWidgetContainer__img' src="/assets/images/logoCarritoCompras.png" alt="Cart" />
        </ul>
        </>

    )
}

export default CartWidget