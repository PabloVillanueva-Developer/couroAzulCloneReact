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
    

 
  
 
/* 
    useEffect(()=> {
       console.log(data)
    },[totalQuantityDataContext]) */
   

 /*    useEffect(()=> {
        let previewQuantity 
        for (let item of arrSelectedProducts) {
            console.log(item)
            previewQuantity = item.quantity
            if(item.id !== id) { 
             totalQuantity += item.quantity

            } else{ 
                totalQuantity = totalQuantity - previewQuantity
                totalQuantity += item.quantity}
             console.log(totalQuantity)
        }
        setQuantity(totalQuantity)
  
    
    },[arrSelectedProducts]) */

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