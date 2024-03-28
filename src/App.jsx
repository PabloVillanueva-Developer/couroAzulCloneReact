import './App.css'
import Header from './components/Header/Header'
import Body from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './services/firebase';

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
    const [email, setEmail] = useState('')
    const [repeatEemail, setRepeatEmail] = useState('')
    const [checkoutMessage, setCheckoutMessage] = useState()
    const [emailConfirmed, setEmailConfirmed] = useState (false)
    const [lastOrderId, setLastOrderId] = useState()
    const [selectedOption, setSelectedOption] = useState('Cash')
    const [inputName, setInmputName] = useState('')
    const [inputSubName, setInputSubName] = useState('')
    const [confirmedButtonClicked, setConfirmedButtonClicked ] = useState(false)
 
 
    const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0, 
    }).format(amount);
    };


// Funciones definidas para capturar cambios en los inputs y los asigna a las variables de estado
  const captureEmailChange = async(e) => {
    setEmail(e.target.value)
    }

const captureRepeatEmailChange = (e) => {
    setRepeatEmail(e.target.value)
}

const captureInputNameChange = (e) => {
    setInmputName(e.target.value)
}


const captureInputSubNameChange = (e) => {
    setInputSubName(e.target.value)
}

const capturePayMethodSelected = (e) => {
    setSelectedOption(e.target.value)
}


// Esta funcion se asocia al boton de confirm para verificar si los mails coinciden. Informa error si no coinciden o informa un Loading si coinciden
// dando tiempo al useEffec que esta atento a los cambios en lastOrderId a actualizarse con el neuvo Id.
  const emailChek = () => {
   
    if(email !== repeatEemail || (email === '' && repeatEemail === '') || !email.includes('@') ) {
            setEmailConfirmed(false)
            setCheckoutMessage('Invalid email: Please remember to enter an address that includes @')
    }else {
            setEmailConfirmed(true)
            setCheckoutMessage(`Loading your order Id..`)
            setConfirmedButtonClicked(false)
        }
}

// EFECTO SECUNDARIO QUE ESTA ATENTO A LA RECEPCION DEL ID DE FIREBASE PARA MOSTRAR EN EL MESSAGE.
useEffect(() => {
    if (lastOrderId) {
      setCheckoutMessage(`Purchase confirmed. Thank you very much. Please keep the ticket number to track your order. Your code is ${lastOrderId}`);
     /*  setEmailConfirmed(false) */
    } else {
      setCheckoutMessage(''); // Reiniciar el mensaje si lastOrderId no tiene un valor
    }
    
  }, [lastOrderId]);



const neworderStructure = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'ordersConfirmed'), orderData);
        return docRef.id; // Devuelve el ID del documento recién creado
    } catch (error) {
        console.error("Error al agregar nueva orden a Firestore:", error);
        throw error;
    }
};



  useEffect(()=> {
    setTotalPrice(resumeDataCheckoutContext.price)
    setTotalQuantity(resumeDataCheckoutContext.quantity)
    setChecoutActive(resumeDataCheckoutContext.activeChekout)
  },[resumeDataCheckoutContext])


  useEffect(()=> {
  },[chekoutActive])


  useEffect(()=> {
    const actualizedProducts = () => {
        datoContext.name = datoContext.name
        datoContext.quantity = datoContext.quantity
    }
  },[datoContext])

  // Conexion con Coleccion de Ordenes en Firestore Database
  useEffect(() => { // Consulta a base de datos
    const fetchData = async () => {
    try {
        const collectionRef =  collection(db, 'ordersConfirmed') // referencia a la coleccion
        const responseFireBase = await getDocs(collectionRef) // obtener todos los documentos
        const orders = responseFireBase.docs.map((doc) => { // mapeo de los documentos para obtener de cada uno el id y data() que es un metodo de firebase para obtener la informacion de la base de datos.
            return {id: doc.id, ...doc.data()}
        })
   

    }catch(err) {console.error('Error:', err)
    }
    }
    fetchData();
},[emailConfirmed])


useEffect(() => {
    if (emailConfirmed) {
        const addNewOrder = async () => {
            try {
                // Verificar si todas las variables necesarias tienen valores
                if (
                    resumeDataCheckoutContext.price &&
                    resumeDataCheckoutContext.quantity &&
                    inputName &&
                    inputSubName &&
                    datoContext &&
                    selectedOption 
                ) {
                    const productsDataForOrder = datoContext.map(item => ({
                        name: item.name,
                        quantity: item.quantity
                    }));

                    const orderData = {
                        payMethod: selectedOption,
                        totalPrice: resumeDataCheckoutContext.price,
                        totalQuantity: resumeDataCheckoutContext.quantity,
                        productsList: productsDataForOrder,
                        name: inputName,
                        subName: inputSubName
                    };

                    const orderId = await neworderStructure(orderData);
                    setLastOrderId(orderId); // Asigna el ID de la orden recién creada
                    // Resto del código...
                } else {
                    console.warn("Alguna de las variables necesarias para crear la orden está indefinida.");
                }
            } catch (error) {
                console.error("Error al agregar nueva orden:", error);
            }
        };
        addNewOrder();
    }
}, [emailConfirmed, selectedOption, resumeDataCheckoutContext, datoContext, inputName, inputSubName, confirmedButtonClicked]);




//FUNCION PARA ACTUALIZAR STOCK AL CONFIRMARSE LA COMPRA (SE ACTIVA POSTERIORMENTE CON USE EFFECT)
const updateProductStock = async () => {
    try {
        const productsInCart = datoContext; // Obtener los productos comprados del contexto
        for (const product of productsInCart) {// Iterar sobre los productos comprados
            const productDocRef = doc(db, 'products', product.id);
            const productDocSnapshot = await getDoc(productDocRef); // Obtener datos del producto actual
            const productData = productDocSnapshot.data();
            const newStock = productData.stock - product.quantity;
            await updateDoc(productDocRef, { stock: newStock });// Actualizar el stock en Firestore
        }
    } catch (error) {
        console.error("Error al actualizar el stock de los productos:", error);
        throw error;
    }
};

// EJECUCION FUNCION DE ACTUALIZACION DE STOCK CUANDO SE DA LA CONFIRMACION DE EMAIL.
useEffect(() => {
    if (emailConfirmed) {
        updateProductStock();
    }
}, [emailConfirmed]);


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
                            <button className='confirmButton' onClick={() => {  
                                emailChek(); 
                                setConfirmedButtonClicked(true)
                            }}>Confirm Button
                            </button>
                            <div className='checkoutMessagesContainer'>
                                <p className={emailConfirmed === true ? 'checkoutMessage' : 'checkoutMessage--operationConfirmed'}>{checkoutMessage}</p>
                            </div>
                        </div>

                        <div className='totalContainer'>
                            <h2>Total Price: {totalPrice ? formatCurrency(totalPrice, 'ARS'): '$ 0'}</h2>
                            <h2>Total Quantity: {totalQuantity ? totalQuantity : '0'  }</h2>
                            <h2>{chekoutActive}</h2>
                        </div>

                        <div className='payMethodContainer'>
                            <h2 className='payMethodTitle'>Seleccione un medio de pago</h2>
                            <select name="" id="" className='selectPaymethod' onChange={capturePayMethodSelected}>Payment Method
                                <option value="Cash">CASH</option>
                                <option value="Credit Card">CREDIT CARD</option>
                                <option value="Electronic Bullet">ELECTRONIC BULLET</option>
                            </select>
                                
                            <label htmlFor="name">
                                <input type="text" id="name" placeholder='Name' className='input' onChange={captureInputNameChange} value={inputName}/>
                            </label>
                            <label htmlFor="subMail">
                                <input type="text" id="subMail" placeholder='Subname' className='input' onChange={captureInputSubNameChange} value={inputSubName}/>
                            </label>
                            <label htmlFor="mail">
                                <input type="text" id="mail" placeholder='Enter your email' className='input' onChange={captureEmailChange} value={email} />
                            </label>
                            <label htmlFor="repeatMail">
                                <input type="text" id="repeatMail" placeholder='Re-enter your email' className='input' onChange={captureRepeatEmailChange} value={repeatEemail}/>
                            </label>

                        </div>

                       

                        <div className='productsListCheckout'>  
                                <h2>Products:</h2>
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

//JUEVES
//Darle logica para que no te deje sumar mas que el stock disponible en detail y en cart
// Si al ingrear a item:id no existe el producto, debemos responder un mensaje adecuado que indique que no se encuentra el producto y listar todos los productos

//Checkout mínimo:
//Items con sus cantidades
//Total de la orden
//Input para nombre, apellido y teléfono
// Cambiar las descripciones en ingles

//VIERNES
// Si se puede incluir variables de Estado
// Deployar

//Por cada librería pública extra que utilices, deberás incluir en algún archivo el
//link al proyecto, y una justificación de por qué agrega valor.
//Readme.md: El archivo debe estar en el root del proyecto para dar una breve
//introducción acerca de su proyecto y qué ideas o enfoque eligió para el
//mismo. Si incluyó dependencias extra por npm (por fuera de las trabajadas en
//clase), aparte debe hacer un resumen explicando sus decisiones.


