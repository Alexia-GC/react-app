import React, { useState, useEffect } from 'react';
import ItemDetail from '../ItemDetail';
import {useParams} from 'react-router-dom';
import { getFirestore } from '../../firebase';

const ItemDetailContainer = () => {

    const [item, setItem] = useState();
    const {id} = useParams();
    useEffect(() => {
        const db = getFirestore()
        const itemsColecction = db.collection("items")
        itemsColecction.doc(id).get().then(doc => {
            if(doc.exists) {
                setItem({id: doc.id, ...doc.data()});
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <>
            <div className="mt-5">
            {item
            ? <ItemDetail item={item}/> 
            : <p>Cargando la obra...</p>}
            </div>
        </>
    )
}

export default ItemDetailContainer

