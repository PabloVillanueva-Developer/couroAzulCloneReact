import React from 'react';
import './ItemListContainer.css';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ListProductContainer = () => {
    
  const [apiData, setApiData] = useState(null)

  useEffect(() => { // Consulta a base de datos
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


    const { modelo } = useParams();
    if (!apiData) {
        return <Loading />;
    } 
    
    const apiDataArray = Object.values(apiData);
    const apiDataArrayFlat = apiDataArray.flat();

    const filteredProducts = modelo 
    ? apiDataArrayFlat.filter(product => product.attributes[7].value_name === modelo) 
    : apiDataArrayFlat; // Si brand no está definido, se muestran todos los productos

    

    return (
        <div className='productContainer'>
            <div className='ListProductContainer'>
                {filteredProducts.map((product) => (
                    <div className='cardContainer' key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p>{product.price}</p>
                        <Link to={`/item/${product.id}`} className='cardButton'>Ver Detalles</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProductContainer;