import React from 'react';

import Card from '../../shared/components/UIElements/Card.js';
import Button from '../../shared/components/FormElements/Button';
import './PlaceItem.css'


const PlaceItem = props => {
  return <li className="place-item">
    <Card className="place-item__content">
      <div className="place-item__image">
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className="place-item__info">
        <h2>{props.title}</h2>
        <h3>{props.address}</h3>
        <p>{props.description}</p>
      </div>
      <div className="place-item__actions">
        <Button inverse>view on map</Button>
        <Button to={`/places/${props.id}`}>edit</Button>
        <Button danger>delete</Button>
    </div>
    </Card>
  </li>

}

export default PlaceItem;
//fetches and renders all places that belong to a user