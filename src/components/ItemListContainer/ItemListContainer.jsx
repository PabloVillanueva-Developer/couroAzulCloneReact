import React from 'react';
import './ItemListContainer.css';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';

const ListProductContainer = ({ apiData }) => {
    const { brand } = useParams();

    if (!apiData) {
        return <Loading />;
    } 
    
    const apiDataArray = Object.values(apiData);
    const apiDataArrayFlat = apiDataArray.flat();

    const filteredProducts = brand 
        ? apiDataArrayFlat.filter(product => product.attributes[7].value_name === brand) 
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