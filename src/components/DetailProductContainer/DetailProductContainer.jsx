
import { useParams } from "react-router-dom"
import "./DetailProductContainer.css"
import { useState, useEffect, useContext } from "react"
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { MiContexto } from "../../App";
import { totalQuantityContext } from "../../App";
import { Link } from "react-router-dom";

let actualizedQunatity


const DetailProductContainer = () => {

    const {id} = useParams()
    const { datoContext, setDatoContext } = useContext(MiContexto);
    const {totalQuantityDataContext, setTotalQuantityDataContext} = useContext(totalQuantityContext); 
    const [apiData, setApiData] = useState(null)
    const [products, setProducts] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [loadProduct, setLoadProduct] = useState(false)
    const [arrSelectedProducts, setArrSelectedProducts] = useState([]) // se define un objeto vacio
        
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

        
        const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=autos`)
        const data = await response.json()
        setApiData(data.results)
     

      }catch(err) 
        {console.error('Fallo Solicitud a Api ML. Posible error de conexion a internet. Error:', err)
      }
    }
    fetchData();
    },[])


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
        if (loadProduct === true) {
            // Verificar si el producto ya está en datoContext
            const productIndex = datoContext.findIndex(product => product.id === selectedProduct.id);
            if (productIndex !== -1) {
                // Si el producto ya está en datoContext, actualiza su cantidad
                const updatedProducts = [...datoContext];
                updatedProducts[productIndex].quantity += quantity; // Actualiza la cantidad del producto existente
                setDatoContext(updatedProducts);
                setTotalQuantityDataContext(totalQuantityDataContext + quantity); // Actualiza el total de la cantidad
            } else {
                // Si el producto no está en datoContext, agrégalo
                const updatedProduct = { ...selectedProduct, quantity: quantity };
                setArrSelectedProducts(prevArr => [...prevArr, updatedProduct]);
                setTotalQuantityDataContext(totalQuantityDataContext + quantity); // Actualiza el total de la cantidad
            }
        }
        setLoadProduct(false);
    }, [loadProduct]);
  

    useEffect(() => {
     
        if(datoContext && Object.keys(datoContext).length > 0) {
            setDatoContext(prevArr => [...prevArr, ...arrSelectedProducts]);
        } else {
            setDatoContext([...arrSelectedProducts]);
        }
    }, [arrSelectedProducts]);

    useEffect(() => {
   
    }, [loadProduct]);




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
            <>
             { products && (  
            <div className="gridDisplay">
                <div className='detailProductContainer' >
                      
                        <div className="internalDetailProductContainer">
                              
                                <div className="imgContainer">
                                    <img className="img" src={selectedProduct.img} alt={selectedProduct.title} />
                                </div>
                               
                                <div className='addCartButtons'>
                                    <a  href="#">
                                        <button className='minusButton' onClick={() => quantity > 0 && setQuantity(quantity - 1)}>-</button>
                                    </a>

                                
                                        <Link /* to='/CartContainer' */>
                                            <button className='addButton' onClick={()=> {setLoadProduct(true)}}>Add</button>
                                        </Link>
                                

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
                        
                  
                </div>
                <div className='detailProductContainer detailProductContainer--right'>
                    <h3 className="name" key={id}>{selectedProduct.name}</h3>
                    <h4 className="description">{selectedProduct.description}</h4>
                    <h5 className="price">{formatCurrency(selectedProduct.price, 'ARS')}</h5>
                    <h6 className="stock">Stock disponible: {selectedProduct.stock}</h6>
                    
                </div>
            </div>
                  )
                }  
            </>
            
        )
        
    
}

export default DetailProductContainer

