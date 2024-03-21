import React from 'react';
import './ItemListContainer.css';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
const ListProductContainer = () => {
    
  const [apiData, setApiData] = useState(null)
  const [products, setProducts] = useState(null)

  useEffect(() => { // Consulta a base de datos
   const fetchData = async () => {
    try {
        const collectionRef =  collection(db, 'products') // referencia a la coleccion
        const responseFireBase = await getDocs(collectionRef) // obtener todos los documentos
        const products = responseFireBase.docs.map((doc) => { // mapeo de los documentos para obtener de cada uno el id y data() que es un metodo de firebase para obtener la informacion de la base de datos.
            return {id: doc.id, ...doc.data()}
        })
        setProducts(products)
  


/* 
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=autos`)
    const data = await response.json()
 
    setApiData(data.results) */
  
    }catch(err) {console.error('Error:', err)
    }
  }
  fetchData();
  },[])

  
    const { modelo } = useParams();
    if (!products) {
        return <Loading />;
    } 
    
/*     const apiDataArray = Object.values(apiData); */
   /*  const apiDataArrayFlat = apiDataArray.flat(); */

    const filteredProducts = modelo 
    ? products.filter(product => product.category === modelo) 
    : products; // Si brand no está definido, se muestran todos los productos
    console.log('aca estamos')
    console.log(filteredProducts)



    return (
        
        <div className='productContainer'>
            <div className='ListProductContainer'>
                {filteredProducts.map((product) => (
                    <div className='cardContainer' key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.img} alt={product.title} />
                        <p>{product.price}</p>
                        <Link to={`/item/${product.id}`} className='cardButton'>Ver Detalles</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProductContainer;