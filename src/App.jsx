import './App.css'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'

function App() {

  
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
   const fetchData = async () => {
    try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=autos`)
    const data = await response.json()
    setApiData(data.results)
    }catch(err) {console.error('Fallo Solicitud a Api ML. Error:', err)}
  }
  fetchData();

  },[])



    return (

     <>
   
     <div className="container">
        <div  className='videoContainer'>
          <video className='video' autoPlay muted loop src="/assets/videos/couro-landing.webm"></video>
          {/* <ReactPlayer url='../public/assets/videos/couro-landing.webm' className='react-player video' playing={true} muted={true} width='100%' height='100%'/> */}
        </div>
        <Header />
         <Body apiData={apiData}/>
        <Footer/>
      </div>
     </>

  )
}

export default App
