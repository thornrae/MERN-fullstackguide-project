import React, {useState} from 'react';


import Card from '../../shared/components/UIElements/Card.js';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal.js';
import Map from '../../shared/components/UIElements/Map.js';
import './PlaceItem.css'


const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
  <>
  <Modal 
    show={showMap} 
    onCancel={closeMapHandler} 
    header={props.address} 
    contentClass="place-item__model-content" 
    footerClass="place-item__modal-actions" 
    footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
  >
    <div className="map-container">
      <Map center={props.coordinates} zoom={16} />
    </div>
  </Modal>
  <li className="place-item">
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
        <Button inverse onClick={openMapHandler}>view on map</Button>
        <Button to={`/places/${props.id}`}>edit</Button>
        <Button danger>delete</Button>
    </div>
    </Card>
  </li>
  </>
  )

}

export default PlaceItem;
//fetches and renders all places that belong to a user