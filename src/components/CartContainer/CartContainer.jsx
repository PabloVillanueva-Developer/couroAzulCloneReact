
    import './CartContainer.css'
    import { MiContexto } from '../../App';
    import { totalQuantityContext } from '../../App'
    import React, { useContext, useEffect, useState } from 'react';

    
   
    const CartContainer = () => {

            
        const { datoContext, setDatoContext } = useContext(MiContexto);
        const {totalQuantityDataContext, setTotalQuantityDataContext} = useContext(totalQuantityContext); 
        const [arrSelectedProducts, setArrSelectedProducts] = useState([]) // se define un objeto vacio  
        const [quantity, setQuantity] = useState(0)
        const [totalQuantity, setTotalQuantity] = useState(0)
        const [totalPrice, setTotalPrice] = useState(0)
        let itemTotalQuantity = 0

        // Funcion para mostrar valores en pesos.
        const formatCurrency = (amount, currency) => {
            return new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: currency,
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0, 
            }).format(amount);
          };

        useEffect(() => {
           
            setArrSelectedProducts(datoContext)
          
        },[datoContext])

        useEffect(() => {
            itemTotalQuantity = 0
          
             for (let item of arrSelectedProducts) {
             
                itemTotalQuantity += item.quantity
             
           }
           setTotalQuantity(itemTotalQuantity)
           setTotalQuantityDataContext(itemTotalQuantity)
        
        },[arrSelectedProducts])

    
      

        useEffect (()=> {
            let totalPrice = 0
            for (let item of arrSelectedProducts) {
                console.log(item.price)
                console.log(item.quantity)
               totalPrice += (item.price*item.quantity)
            
          }
            setTotalPrice(totalPrice)
        },[arrSelectedProducts])

      
        useEffect(()=>{
        
        },[totalPrice])
       

        const updateQuantity = (id, newQuantity) => {
            if(newQuantity < 0) { // Si quantity es menor a 1 (o sea cero) que no haga nada.
                return
            }
            setArrSelectedProducts(prevArr => {
                return prevArr.map(item => {
                    if (item.id === id) {
                        return {...item, quantity:newQuantity}
                    }
                    return item
                })
            })

        }
    

      


        return (
            <>
            <div className='totalQuantityCartContainer'>
                <div className='totalQuantityInternalContainer' >
                    <p>Total: {formatCurrency(totalPrice, 'ARS')}</p>
                </div>
                <div  className='totalQuantityInternalContainer' >
                    <p>Quantity:  {totalQuantity} </p>
                </div>
            </div>
       

            <div className="cartContainer">    
                {arrSelectedProducts && arrSelectedProducts.length > 0 && arrSelectedProducts.map((item) => (
                <div  className='card'  key={item.id}>
                    <div className='imgAndQuantity'>
                        <div className='imgContainer'>
                            <img className='img' src={`${item.img}`} alt="" />
                        </div>

                        <div className='addCartButtons'>
                                <a  href="#">
                                    <button className='minusButton' onClick={ () => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                </a>         
                                <h4 className='quantity'>{item.quantity}</h4>    
                                <a  href="#" >
                                    <button className='plusButton' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </a>
                        </div>
                    </div>

                    <div className='descriptionCard'>
                        <h3 className='itemName'>{item.name  }</h3>
                        <p>Price: {item.price}</p>
                        <p>Category: {item.category}</p>
                    </div>


                </div>
                ))
              
               }
            </div>
            </>
        )

       
    }


    export default CartContainer