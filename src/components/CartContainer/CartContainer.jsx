
    import './CartContainer.css'
    import { MiContexto } from '../../App';
    import React, { useContext, useEffect, useState } from 'react';


    let arrSelectedProducts = []
    const CartContainer = () => {


    
        const { datoContext, setDatoContext } = useContext(MiContexto);
        const [dataSelectedProduct, setDataSelectedProduct] = useState({}) // se define un objeto vacio
        
    

        useEffect (() => {
            setDataSelectedProduct(datoContext)
                },[datoContext])

        useEffect (() => {
            if(Object.keys(dataSelectedProduct).length !== 0)  {

            arrSelectedProducts.push(dataSelectedProduct)
            console.log(arrSelectedProducts)
            }
        }, [dataSelectedProduct])


    if(arrSelectedProducts) {
        const arrDataSelectedProduct = [dataSelectedProduct]
        return (
            <div className="cartContainer">
                {arrDataSelectedProduct.map((item) => (
                     
                <div key={item.id}>
                    { console.log(item.id)}
                    <img src={`${item.img}`} alt="" />
                </div>
                ))
              
               }
            </div>
        
        )

    }
    }

    export default CartContainer