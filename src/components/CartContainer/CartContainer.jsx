
    import './CartContainer.css'
    import { MiContexto } from '../../App';
    import { totalQuantityContext } from '../../App'
    import { resumeCheckoutContext } from '../../App';
    import React, { useContext, useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';

// datContexto trae de detailContainer un array con los productos elegidos como objetos.
/* (2) [{…}, {…}]
        0:
            category: "Ford"
            description: " La Ford F-150 Raptor combina potencia todoterreno, estilo agresivo y tecnología avanzada para dominar cualquier terreno con confianza y estilo incomparable."
            id: "2RccLdOd7Ja5b9VbpXd9"
            img: "http://http2.mlstatic.com/D_877013-MLA75256488722_032024-I.jpg"
            name: "Ford F-150 Raptor"
            price: "15500000"
            quantity: 3
            stock: "200"
            [[Prototype]]: Object
        1: 
            {id: 'Roe909JtnMGVLzomY9em', price: '21500000', img: 'https://http2.mlstatic.com/D_970664-MLA75124265866_032024-I.jpg', description: 'La Ford Ranger XLT ofrece potencia, durabilidad y … aventuras tanto en la ciudad como fuera de ella.', stock: '200', …}
            length: 2
 */

    
   
    const CartContainer = () => {

            
        const { datoContext, setDatoContext } = useContext(MiContexto);
        const {totalQuantityDataContext, setTotalQuantityDataContext} = useContext(totalQuantityContext); 
        const {resumeDataCheckoutContext, setResumeDataCheckoutContext} = useContext(resumeCheckoutContext)
        const [arrSelectedProducts, setArrSelectedProducts] = useState([]) // se define un objeto vacio  
        const [quantity, setQuantity] = useState(0)
        const [totalQuantity, setTotalQuantity] = useState(0)
        const [totalPrice, setTotalPrice] = useState(0)
        const [chekoutActive, setChecoutActive] = useState(0)
        
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
           if(datoContext){
            setArrSelectedProducts(datoContext)
        }
     
          
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
               totalPrice += (item.price*item.quantity)
               
            
          }
            setTotalPrice(totalPrice)
        },[arrSelectedProducts])

      
        useEffect(()=>{
            setResumeDataCheckoutContext({price: totalPrice, quantity: totalQuantity})
        },[totalQuantityDataContext])

        useEffect(()=> {
            setChecoutActive(resumeDataCheckoutContext.activeChekout)
            
        },[resumeDataCheckoutContext])
       

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

        const removeProductCart = (itemId) => {
            const arrWithoutDeletedProduct = arrSelectedProducts.filter(item => item.id !== itemId);
            setArrSelectedProducts(arrWithoutDeletedProduct)
            setDatoContext(arrWithoutDeletedProduct)
        }

        return (
            <>
            <div className={chekoutActive === false || !chekoutActive ? 'totalQuantityCartContainer' : 'totalQuantityInternalContainer--blur' }>
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
                        <div></div>
                        <div className='dataContainer'>
                            <h3 className='itemName'>{item.name  }</h3>
                                <p>Price: {formatCurrency(item.price, 'ARS')}</p>
                                <p>Category: {item.category}</p>
                                <p>Stock disponble: {item.stock}</p>
                            </div>
                        
                            <button key={item.id} onClick={() => removeProductCart(item.id)}>    
                                <p className='removeProduct'>X</p>
                            </button>
                    </div>


                </div> 
                ))
             
               }
                <button className='confirmButton' onClick={() => setResumeDataCheckoutContext(prevObj => ({ ...prevObj, activeChekout: true }))}>By Now !</button>
            </div>
            </>
        )
    }


    export default CartContainer