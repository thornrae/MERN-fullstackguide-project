import React from 'react';

import Card from '../../shared/components/UIElements/Card.js';
import PlaceItem from './PlaceItem.js'
import './PlaceList.css'
import Button from '../../shared/components/FormElements/Button.js'


const PlaceList = props => {
  if (props.items.length === 0) {
    return <div className="place-list center">
      <Card>
        <h2>No Place Found. Create one?</h2>
        <Button to="/places/new">Share Place</Button>
      </Card>
    </div>
  }
  
  return <ul className="place-list">
    {props.items.map(place => <PlaceItem 
      key={place.id} 
      id={place.id} 
      imageUrl={place.image} 
      title={place.title} 
      description={place.description} 
      address={place.address} 
      creatorId={place.creator} 
      coordinates={place.location}
      onDelete={props.onDeletePlace} />)}
  </ul>;

}

export default PlaceList;
