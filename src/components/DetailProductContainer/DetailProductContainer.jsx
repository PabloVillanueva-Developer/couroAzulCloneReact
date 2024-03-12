
import "./DetailProductContainer.css"

const DetailProductContainer = (props) => {

    const {selectedProduct} = props
   
return (
<div className='detailProductContainer' >
                    { selectedProduct && (     
                        <div className='' key={selectedProduct.id}>
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

