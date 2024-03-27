import './App.css'
import Header from './components/Header/Header'
import Body from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DetailProductContainer from './components/DetailProductContainer/DetailProductContainer'

//Crear Contexto
export const MiContexto = createContext();
export const totalQuantityContext = createContext()

function App() {
  const [apiData, setApiData] = useState(null)
  const [datoContext, setDatoContext] =useState(null) // estado y funcion para actualizar la info del Contexto
  const [totalQuantityDataContext, setTotalQuantityDataContext] = useState(0); 

  useEffect(() => {
   const fetchData = async () => {
    try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=autos`)
    const data = await response.json()
    console.log(data)
  
    setApiData(data.results)
 
    }catch(err) {console.error('Fallo Solicitud a Api ML. Posible error de conexion a internet. Error:', err)
    }
  }
  fetchData();
  },[])

  return (
    <>

<totalQuantityContext.Provider value={{ totalQuantityDataContext, setTotalQuantityDataContext }}>
    <MiContexto.Provider value={{datoContext, setDatoContext}} >
        <Router>
            <div className="container">
                <div  className='videoContainer'>
                    <video className='video' autoPlay muted loop src="/assets/videos/couro-landing.webm"></video>
                </div>

                <Header />
                <Body apiData={apiData}/>
                <Footer/>
            </div>
        </Router>
    </MiContexto.Provider>
    </totalQuantityContext.Provider>
    
      </>
  )
}

export default App

//Darle logica para que no te deje sumar mas que el stock disponible en detail y en cart
// Agregar alert para cuando ya tenes el elemento cargado en el carrito, que te avise que ya esta cargado.
// Agregar boton de cerrar Compra
// Armar un checkout sencillo con el resumen de la compra y un confirmar con un alert.
// Emprolijar el codigo.
// Revisar si 

// ALERT
//Si se ingresa a /item/:id y el producto no
//existe en firebase, debemos responder un mensaje adecuado que indique
//algo relacionado a que el producto no existe.

//Implementar al menos dos colecciones en firbase:
//orders: las órdenes generadas, que deben incluir los
//productos, descripciones y los precios al momento de la
//compra.
//Las órdenes deben poder tener items surtidos, cada uno
//con su cantidad. Por ejemplo: remeras x 2 y gorra x 1
//id, items, fecha, estado ( por defecto en ‘generada’)

//Checkout mínimo:
//Items con sus cantidades
//Total de la orden
//Input para nombre, apellido y teléfono
//Input para email y lógica de repetir el email 2 veces (a excepción de
//que realicen el desafío extra de auth, en ese caso no sería necesario)

//Por cada librería pública extra que utilices, deberás incluir en algún archivo el
//link al proyecto, y una justificación de por qué agrega valor.
//Readme.md: El archivo debe estar en el root del proyecto para dar una breve
//introducción acerca de su proyecto y qué ideas o enfoque eligió para el
//mismo. Si incluyó dependencias extra por npm (por fuera de las trabajadas en
//clase), aparte debe hacer un resumen explicando sus decisiones.


