
import { useParams } from "react-router-dom"
import "./DetailProductContainer.css"
import { useState, useEffect } from "react"
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const DetailProductContainer = () => {

    const {id} = useParams()
    const [apiData, setApiData] = useState(null)
    const [products, setProducts] = useState(null)
    const [quantity, setQuantity] = useState(0)
    let selectedProduct

    useEffect(() => { // Consulta a base de datos
     const fetchData = async () => {
      try {


        const collectionRef =  collection(db, 'products') // referencia a la coleccion
        const responseFireBase = await getDocs(collectionRef) // obtener todos los documentos
        const products = responseFireBase.docs.map((doc) => { // mapeo de los documentos para obtener de cada uno el id y data() que es un metodo de firebase para obtener la informacion de la base de datos.
            return {id: doc.id, ...doc.data()}
        })
        setProducts(products)
        console.log(products)
        
        const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=autos`)
        const data = await response.json()
        setApiData(data.results)

      }catch(err) 
        {console.error('Fallo Solicitud a Api ML. Posible error de conexion a internet. Error:', err)
      }
    }
    fetchData();
    },[])


        
    if (quantity < 0) {
        setQuantity(0)
    }
 

    if(products) { // cuando se obtienen datos
        selectedProduct = products.find(product => product.id === id);
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
                { products && (     
                    <div className="internalDetailProductContainer">
                            <h3 key={id}>{selectedProduct.title}</h3>
                            <img className="img" src={selectedProduct.img} alt={selectedProduct.title} />
                            <p>{selectedProduct.price}</p>
                            <div className='addCartButtons'>
                                <a  href="#">
                                    <button className='minusButton' onClick={() => setQuantity(quantity - 1)}>-</button>
                                </a>

                                <a  href="#">
                                    <button className='addButton'>Add</button>
                                </a>

                                <a  href="#" >
                                    <button className='plusButton' onClick={() => setQuantity(quantity + 1)}>+</button>
                                </a>

                                
                            </div>
                            <div>
                                <a className='quantity' href="">
                                        <h4>{quantity}</h4>
                                    </a>
                            </div>
                    </div>
                    )
                }  
            </div>
        )
    
}

export default DetailProductContainer

