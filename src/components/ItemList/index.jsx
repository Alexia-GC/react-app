import React from 'react';
import { Item } from '../Item';
import { Link } from 'react-router-dom';

export const ItemList = ({items=[]}) => {

    return (
        <div className="row d-flex justify-content-center">
            {items.map(item => <Item key={item.id}  item={item}/> )}
        </div>
    )
}