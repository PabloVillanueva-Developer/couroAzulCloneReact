import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

function App() {
    return (

     <>
   
     <div className="container">
        <div  className='videoContainer'>
          <video className='video' autoPlay muted src="../public/assets/videos/couro-landing.webm"></video>
          {/* <ReactPlayer url='../public/assets/videos/couro-landing.webm' className='react-player video' playing={true} muted={true} width='100%' height='100%'/> */}
        </div>
        <Header>
        </Header>
         <Body>
         </Body>
        <Footer />
      </div>
     </>

  )
}

export default App
