import './App.css'
import Header from './components/Header/Header'
import Body from './components/Main/Main'
import Footer from './components/Footer/Footer'
import { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DetailProductContainer from './components/DetailProductContainer/DetailProductContainer'

//Crear Contexto
export const MiContexto = createContext();

function App() {
  const [apiData, setApiData] = useState(null)
  const [datoContext, setDatoContext] =useState(null) // estado y funcion para actualizar la info del Contexto

  useEffect(() => {
   const fetchData = async () => {
    try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=autos`)
    const data = await response.json()
  
    setApiData(data.results)
 
    }catch(err) {console.error('Fallo Solicitud a Api ML. Posible error de conexion a internet. Error:', err)
    }
  }
  fetchData();
  },[])

  return (
    <>
    
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
      </>
  )
}

export default App


