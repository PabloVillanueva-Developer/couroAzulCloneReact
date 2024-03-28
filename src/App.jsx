import './App.css'
import Header from './components/Header/Header'
import Body from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

//Crear Contexto
export const MiContexto = createContext();
export const totalQuantityContext = createContext()
export const resumeCheckoutContext = createContext()

function App() {
    const [apiData, setApiData] = useState(null)
    const [datoContext, setDatoContext] =useState(null) // estado y funcion para actualizar la info del Contexto
    const [totalQuantityDataContext, setTotalQuantityDataContext] = useState(0); 
    const [resumeDataCheckoutContext, setResumeDataCheckoutContext] = useState({}); 
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [chekoutActive, setChecoutActive] = useState(0)
    const [email, setEmail] = useState()
    const [repeatEemail, setRepeatEmail] = useState()
    const [checkoutMessage, setCheckoutMessage] = useState()

    const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0, 
    }).format(amount);
    };


// Estas funciones capturan cambios en los inputs y los asigna a las variables de estado
  const captureEmailChange = async(e) => {
    setEmail(e.target.value)
    }

const captureRepeatEmailChange = (e) => {
    setRepeatEmail(e.target.value)
}


// Esta funcion se asocia al boton de confirm para verificar si los mails coinciden.
  const emailChek = () => {
          
    if(email !== repeatEemail) {
            setCheckoutMessage('Los emails ingresados deben ser identicos. Por favor reintente.')
    }else {setCheckoutMessage('Compra confirmada. Muchas gracias.')}
}


  let checkoutState

  useEffect(()=> {
    setTotalPrice(resumeDataCheckoutContext.price)
    setTotalQuantity(resumeDataCheckoutContext.quantity)
    setChecoutActive(resumeDataCheckoutContext.activeChekout)

  },[resumeDataCheckoutContext])

  useEffect(()=> {
    console.log(chekoutActive)
/* console.log()
    console.log(totalQuantityDataContext) */
  },[chekoutActive])

  useEffect(()=> {
    const actualizedProducts = () => {
        datoContext.name = datoContext.name
        datoContext.quantity = datoContext.quantity
    }
  },[datoContext])


  return (
    <>
    <resumeCheckoutContext.Provider value={{resumeDataCheckoutContext, setResumeDataCheckoutContext}}> 
    <totalQuantityContext.Provider value={{ totalQuantityDataContext, setTotalQuantityDataContext }}>
    <MiContexto.Provider value={{datoContext, setDatoContext}} >
        <Router>
            <div className="container">
                <div  className='videoContainer'>
                    <video className='video' autoPlay muted loop src="/assets/videos/couro-landing.webm"></video>
                </div>
                
                <div className={chekoutActive === true ? 'chekoutContainer--display' : 'chekoutContainer--none'} >
                    <div className='checkoutInternalContainer'>
                        <h1>Checkout de Compra</h1>
                        <button className='closeCheckout' onClick={()=>{ setResumeDataCheckoutContext(prevObj => ({...prevObj, activeChekout: false}));
                        setEmail('') // reset de valores de input al cerrarse ventana de checkout
                        setRepeatEmail('')  //reset de valores de input al cerrarse ventana de checkout
                    
                    }}>
                            <p>X</p>
                        </button>

                        <div className='chekaoutContainer'>
                            <button  className='confirmButton' onClick={() =>  emailChek()}>Confirm Button</button>
                            <div className='checkoutMessagesContainer'>
                                <p className='checkoutMessage'>{checkoutMessage}</p>
                            </div>
                        </div>

                        <div className='payMethodContainer'>
                            <h2 className='payMethodTitle'>Seleccione un medio de pago</h2>
                            <select name="" id="" className='selectPaymethod'>Payment Method
                                <option value="Cash">CASH</option>
                                <option value="Credit Card">CREDIT CARD</option>
                                <option value="Electronic Bullet">ELECTRONIC BULLET</option>
                            </select>
                                
                            <label htmlFor="mail">
                                <input type="text" id="mail" placeholder='Ingrese su email' className='input' onChange={captureEmailChange} value={email} />
                            </label>
                            <label htmlFor="repeatMail">
                                <input type="text" id="repeatMail" placeholder='Reingrese su email' className='input' onChange={captureRepeatEmailChange} value={repeatEemail}/>
                            </label>
                        </div>

                        <div className='totalContainer'>
                            <h2>Total Price: {totalPrice ? formatCurrency(totalPrice, 'ARS'): '$ 0'}</h2>
                            <h2>Total Quantity: {totalQuantity ? totalQuantity : '0'  }</h2>
                            <h2>{chekoutActive}</h2>
                        </div>

                        <div >
                            {datoContext && datoContext.map(item => 
                                <div key='item.id' className='checkoutCard'>
                                    <h3>Product: {item.name}</h3>
                                    <h3>Quantity: {item.quantity}</h3>
                                </div>
                            )
                            /* LISTADO DE PRODUCTOS NOMBRE y CANTIDAD DE DATA CONTEXT*/}
                        </div>
                    </div>
                 </div>

                <Header />
                <Body/>
                <Footer/>
            </div>
        </Router>
    </MiContexto.Provider>
    </totalQuantityContext.Provider>
    </resumeCheckoutContext.Provider>
    
      </>
  )
}

export default App

//Darle logica para que no te deje sumar mas que el stock disponible en detail y en cart
// FALTA IMPACTAR STOCK EN FIREBASE
// Si al ingrear a item:id no existe el producto, debemos responder un mensaje adecuado que indique que no se encuentra el producto y listar todos los productos

//Implementar al menos dos colecciones en firbase:
// falta la coleccion de ordenes que debe guardar la orden con el id (el checkout deberia informar ese numero de orden)

//Checkout mínimo:
//Items con sus cantidades
//Total de la orden
//Input para nombre, apellido y teléfono

//Por cada librería pública extra que utilices, deberás incluir en algún archivo el
//link al proyecto, y una justificación de por qué agrega valor.
//Readme.md: El archivo debe estar en el root del proyecto para dar una breve
//introducción acerca de su proyecto y qué ideas o enfoque eligió para el
//mismo. Si incluyó dependencias extra por npm (por fuera de las trabajadas en
//clase), aparte debe hacer un resumen explicando sus decisiones.


