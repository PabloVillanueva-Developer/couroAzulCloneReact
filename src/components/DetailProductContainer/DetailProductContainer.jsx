
import { useParams } from "react-router-dom"
import "./DetailProductContainer.css"

const DetailProductContainer = ({apiData}) => {

    const {id} = useParams()
    const selectedProduct = apiData.find(product => product.id === id);
  

return (
<div className='detailProductContainer' >
                    { apiData && (     
                          
                        <div className='' key={id}>
                            <h3>{selectedProduct.title}</h3>
                            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                            <p>{selectedProduct.price}</p>
                            <div className='addCartButtons'>
                                <a  href="#">
                                    <button className='plusButton'>-</button>
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

