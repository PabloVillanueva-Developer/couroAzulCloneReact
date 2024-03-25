
    import './CartContainer.css'
    import { MiContexto } from '../../App';
    import React, { useContext, useEffect, useState } from 'react';


   
    const CartContainer = () => {

            
        const { datoContext, setDatoContext } = useContext(MiContexto);
        const [arrSelectedProducts, setArrSelectedProducts] = useState([]) // se define un objeto vacio  

        useEffect(() => {
         
            setArrSelectedProducts(datoContext)
            
          
        },[datoContext])

        useEffect(() => {

           console.log(datoContext)
        },[datoContext])


        return (
            
            <div className="cartContainer">
                {arrSelectedProducts && arrSelectedProducts.length > 0 && arrSelectedProducts.map((item) => (
                <div className='card' key={item.id}>
                    <img src={`${item.img}`} alt="" />
                    <h3>{item.name  }</h3>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                    <p>{item.category}</p>
                  
                </div>
                ))
              
               }
            </div>
        
        )

    
    }

    export default CartContainer