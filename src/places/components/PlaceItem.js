import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';


import Card from '../../shared/components/UIElements/Card.js';
import Button from '../../shared/components/FormElements/Button.js';
import Modal from '../../shared/components/UIElements/Modal.js';
import Map from '../../shared/components/UIElements/Map.js';
import {useHttpClient} from '../../shared/hooks/http-hook';

import {AuthContext} from '../../shared/context/auth-context.js';
import './PlaceItem.css'


const PlaceItem = props => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  }

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false)
  }

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('deleting...')
  }

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

  <Modal
    show={showConfirmModal}
    onCancel={cancelDeleteHandler} 
    header="Are you sure?" 
    footerClass="place-item__modal-actions" 
    footer={
      <>
        <Button inverse onClick={cancelDeleteHandler}>cancel</Button>
        <Button danger onClick={confirmDeleteHandler}>delete</Button>
      </>
    }>
    <p>do u wanna proceed and delete this place? cant be undone after.</p>
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
        {auth.isLoggedIn &&
        <Button component={Link}  to={`/places/${props.id}`}>edit</Button>}

        {auth.isLoggedIn && 
        <Button danger onClick={showDeleteWarningHandler}>delete</Button>}
    </div>
    </Card>
  </li>
  </>
  )

}

export default PlaceItem;
//fetches and renders all places that belong to a user