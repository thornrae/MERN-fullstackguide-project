import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList.js';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.js';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.js';
import { useHttpClient } from '../../shared/hooks/http-hook.js';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError} = useHttpClient()

  const userId = useParams().userId;
  console.log('userId', userId);

  useEffect( () => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      }catch(err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId])

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  }

  return (
    <>
    <ErrorModal error={error} clearError={clearError}/>
    {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>)}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </>
  )
}

export default UserPlaces;
//fetches and renders all places that belong to a user