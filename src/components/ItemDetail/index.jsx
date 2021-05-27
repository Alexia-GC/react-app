import React, {useState,useContext}from 'react'
import {ItemCount} from '../ItemCount'
import {Link} from 'react-router-dom';
import { CartContext } from "../../context/CartContext";


export default function ItemDetail({ item }) {
    const [count, setCount] = useState(0)

    const {addItem} = useContext(CartContext);

    const addHandler = (contador)=>{
        console.log('La obra se agregó correctamente', contador)
        addItem(item, contador)
        setCount(contador)
    }

    if (!item) return null;

    return <div className="container obras">

            <img src={item.pictureUrl} alt=""/>
            <h2 className="mt-3">{item.title}</h2>
            <p>Por favor, elegí la cantidad</p>
            <div className="handler">
                { count === 0  ?
                    <ItemCount stock="6" initial="2" onAdd={addHandler} />
                        :
                        <Link to='/cart' >
                            <button className="btn">Terminar mi compra</button>
                        </Link> 
                }
            </div>

        </div>;
}