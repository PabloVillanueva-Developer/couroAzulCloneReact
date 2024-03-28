import './SearchId.css'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { formatCurrency } from '../DetailProductContainer/DetailProductContainer';

const SearchId = () => {
    const [orders, setOrders] = useState([])
    const [customerOrder, setCustomerOrder] = useState('')
    const [filteredOrder, setFilteredOrder] = useState(null)

    // Conexion con Coleccion de Ordenes en Firestore Database
    useEffect(() => { // Consulta a base de datos
        const fetchData = async () => {
            try {
                const collectionRef =  collection(db, 'ordersConfirmed') // referencia a la coleccion
                const responseFireBase = await getDocs(collectionRef) // obtener todos los documentos
                const orders = responseFireBase.docs.map((doc) => { // mapeo de los documentos para obtener de cada uno el id y data() que es un metodo de firebase para obtener la informacion de la base de datos.
                    return {id: doc.id, ...doc.data()}
                })
                setOrders(orders)

            } catch(err) {
                console.error('Error:', err)
            }
        }
        fetchData()
    },[])

  
    const catchInputId = (e) => {
        setCustomerOrder(e.target.value)
    }

    useEffect(() => {
        const selectedOrder = orders.find(order => order.id === customerOrder)
        if (selectedOrder) {
            setFilteredOrder(selectedOrder)
        } else {
            setFilteredOrder(null)
        }
    },[customerOrder, orders])

    return (
        <>
            <label htmlFor="inputId" className='inputContainer' >
                <input type="text" id='inputId' className='inputBox' placeholder='Enter your Id' onChange={catchInputId} />
            </label>
            <div className='orderContainer'>
                {filteredOrder ? (
                    <div>
                        <h2>Nombre: {filteredOrder.name}</h2>
                        <h2>Apellido: {filteredOrder.subName}</h2>
                        <h2>Método de Pago: {filteredOrder.payMethod}</h2>
                        <h2>Precio Total: {formatCurrency(filteredOrder.totalPrice, 'ARS')}</h2>
                        <h2>Cantidad Total: {filteredOrder.totalQuantity}</h2>
                        <h2>Productos:</h2>
                        <div>
                            {filteredOrder.productsList && filteredOrder.productsList.map(product => (
                                <div key={product.id}>
                                    <p>Nombre del Producto: {product.name}</p>
                                    <p>Cantidad: {product.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No hay órdenes disponibles.</p>
                )}
            </div>
        </>
    )
}

export default SearchId