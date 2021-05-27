import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import firebase from 'firebase/app'
import 'firebase/firestore'
import {getFirestore} from '../../firebase'
import './Cart.css';

export const Cart = () => {

    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')

    const {cart,removeItem,totalItems,totalPrecio,clear} = useContext(CartContext)
    console.log(cart)

    const generarOrden = () =>{
        const db = getFirestore();

        const ordersCol = db.collection('orders');

        let orden = {}
        orden.date = firebase.firestore.Timestamp.fromDate(new Date());

        orden.buyer = {name, phone, email}
        orden.total = totalPrecio;
        orden.items = cart.map(cartItem => {
            const id = cartItem.item.id;
            const title = cartItem.item.title;
            const price = cartItem.item.price * cartItem.quantity;

            return {id, title, price}
        })

        ordersCol.add(orden) .then((IdDocumento)=>{
            console.log(IdDocumento.id)
        }) .catch( err => {
            console.log(err);
        }) .finally(()=>{
            console.log('Finalizó')
        })

        const itemsToUpdate = db.collection('items').where(
            firebase.firestore.FieldPath.documentId(), 'in', cart.map(i=> i.item.id)
        )

        const batch = db.batch();

        itemsToUpdate.get() .then( collection=>{
            collection.docs.forEach(docSnapshot => {
                batch.update(docSnapshot.ref,{
                    stock: docSnapshot.data().stock - cart.find(item => item.item.id === docSnapshot.id).quantity
                })
            })

            batch.commit().then(res =>{
                console.log('resultado batch:', res)
            })
        })

        console.log(orden)
    }

    const noItemComp = 
        <div className="empty">
            <div>
                <h1>El carrito está vacío</h1>
            </div>
            <div>
                <h3><Link to='/'>Volver al inicio</Link></h3>
            </div>
        </div>
    if(totalItems === 0) return noItemComp

    return (
        <div className="orden">
           <ul>
                {cart.map(cartItem => {
                    return (
                        <li key={cartItem.item.id}>
                            <div>
                                <h3>Producto: {cartItem.item.title}</h3>
                            </div>
                            <div>
                                <h3>Cantidad: {cartItem.quantity}</h3>
                            </div>
                            <button className="btn" onClick={()=> removeItem(cartItem.item.id)}>Vaciar</button>
                        </li>
                    );
                }
                )}
           </ul>
            <div>
                <h4>Total: {totalItems} productos y {totalPrecio} costo final</h4>
            </div> 
            <button className="btn" onClick={clear}>Borrar todo</button>

            <h2 className="chkh2">Dejanos tus datos para generar la orden de compra</h2>
            <form className="checkout">
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
            </form>

            <Link to='/'><button className="btn" onClick={generarOrden}>Finalizar compra</button></Link>
        </div>
    );
}