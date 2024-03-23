
    import './CartContainer.css'
    import { MiContexto } from '../../App';
    import React, { useContext, useEffect, useState } from 'react';


    let arrSelectedProducts = []
    const CartContainer = () => {


    
        const { datoContext, setDatoContext } = useContext(MiContexto);
        const [dataSelectedProduct, setDataSelectedProduct] = useState({})
    

        useEffect (() => {
            setDataSelectedProduct(datoContext)
                },[datoContext])

        useEffect (() => {
            if(Object.values(dataSelectedProduct).length !== 0)  {

            arrSelectedProducts.push(dataSelectedProduct)
            console.log(arrSelectedProducts)
            }
        }, [dataSelectedProduct])

    if(dataSelectedProduct) {
        return (
            <div className="cartContainer">
                <img src={`${dataSelectedProduct.img}`} alt="" />
            </div>
        )

    }
    }

    export default CartContainer