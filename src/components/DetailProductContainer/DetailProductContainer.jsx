
import { useParams } from "react-router-dom"
import "./DetailProductContainer.css"
import { useState, useEffect } from "react"

const DetailProductContainer = () => {

    const {id} = useParams()
    const [apiData, setApiData] = useState(null)
    let selectedProduct

    useEffect(() => { // Consulta a base de datos
     const fetchData = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=autos`)
        const data = await response.json()
        setApiData(data.results)

      }catch(err) 
        {console.error('Fallo Solicitud a Api ML. Posible error de conexion a internet. Error:', err)
      }
    }
    fetchData();
    },[])
 

    if(apiData) { // cuando se obtienen datos
        selectedProduct = apiData.find(product => product.id === id);
        if(!selectedProduct) {
            return (
                <div className='productNull'>
                    <h3>Producto no encontrado...</h3>
                </div>
            )
        }
    } 
        return (
            <div className='detailProductContainer' >
                { apiData && (     
                    <div className="internalDetailProductContainer">
                            <h3 key={id}>{selectedProduct.title}</h3>
                            <img className="img" src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                            <p>{selectedProduct.price}</p>
                            <div className='addCartButtons'>
                                <a  href="#">
                                    <button className='plusButton'>-</button>
                                </a>

                                <a  href="#">
                                    <button className='addButton'>Add</button>
                                </a>

                                <a  href="#">
                                <button className='minusButton'>+</button>
                                </a>
                                    </div>
                            </div>
                    )
                }  
            </div>
        )
    
}

export default DetailProductContainer

