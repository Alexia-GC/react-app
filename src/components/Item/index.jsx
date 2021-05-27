import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css'

export const Item = ({ item }) => {
  return (
    <div className="col-lg-3 art__card">
      <img src={item.pictureUrl} alt="" style={{width: "20rem"}} />
      <div>
      <div><h2>{item.title}</h2></div>
        <div><h5 className="mt-4">{item.description}</h5></div>
        <div className="price"><h5 class="mt-4">Costo: ${item.price}</h5></div>
        <div><Link to={`/item/${item.id}`}>Elegir obra</Link></div>
      </div>
    </div>
  );
};