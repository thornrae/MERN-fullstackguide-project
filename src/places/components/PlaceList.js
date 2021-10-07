import React from 'react';

import Card from '../../shared/components/UIElements/Card.js';
import PlaceItem from './PlaceItem.js'
import './PlaceList.css'

const PlaceList = props => {
  if (props.items.length === 0) {
    return <div className="place-list center">
      <Card>
        <h2>No Place Found. Create one?</h2>
        <button>Share Place</button>
      </Card>
    </div>
  }
  
  return <ul className="place-list">
    {props.items.map(place => <PlaceItem 
      key={place.id} id={place.item} 
      imageUrl={place.imageUrl} 
      title={place.title} 
      description={place.description} 
      address={place.address} 
      creatorId={place.creator} 
      coordinates={place.location} />)}
  </ul>;

}

export default PlaceList;
