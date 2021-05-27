import React, { useEffect, useState } from "react";
import {ItemList} from "../ItemList"
import {useParams} from "react-router-dom";
import {getFirestore} from '../../firebase';
import './ItemListContainer.css';


export default function ItemListContainer() {
  const [items, setItems] = useState([])
  const {categoryId} = useParams()

  useEffect(()=>{

    const db = getFirestore();
    const itemsCollection = db.collection('items')
    let filtro
    if(categoryId){
      filtro = itemsCollection .where('category','==', categoryId)
    }else{
      filtro = itemsCollection;
    }

    const prom =  filtro.get();

    prom.then((snaptshot)=>{

      if(snaptshot.size > 0){
        console.log(snaptshot.docs.map(doc => doc.data()))
        console.log(snaptshot.docs.map(doc => doc.id))

        setItems(snaptshot.docs.map(doc => {
          return {id:doc.id,  ...doc.data()}
        }
          ))
      }
    })

  },[categoryId])

  return (
    <div className="container obras">
       <h1>{categoryId}</h1>
      <ItemList items={items}/>
    </div>
  );
}