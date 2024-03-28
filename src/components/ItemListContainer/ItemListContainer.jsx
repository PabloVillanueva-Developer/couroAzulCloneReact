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

    }catch(err) {console.error('Error:', err)
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

    
    const { modelo } = useParams();
    if (!products) {
        return <Loading />;
    } 

    const filteredProducts = modelo 
    ? products.filter(product => product.category === modelo) 
    : products; // Si brand no está definido, se muestran todos los productos
 
    return (
        <div className='productContainer'>
            <div className='ListProductContainer'>
                {filteredProducts.map((product) => (
                    <div className='cardContainer' key={product.id}>
                        <h3 className='titleCard'>{product.name}</h3>
                        <div className='imgContainer'>
                            <img src={product.img} alt={product.title} className='img'/>
                        </div>
                        <Link to={`/item/${product.id}`} className='cardButton'>Ver Detalles</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProductContainer;