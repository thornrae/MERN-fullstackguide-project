import React, {useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input.js'
import Button from '../../shared/components/FormElements/Button.js';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.js';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.js';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook.js';
import { useHttpClient } from '../../shared/hooks/http-hook.js';
import {AuthContext} from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card.js';

import './PlaceForm.css';




const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    }, 
    description: {
      value: '', 
      isValid: false
    }
  }, 
    false
  );

  useEffect( () => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setLoadedPlace(responseData.place);
        setFormData({
          title: {
            value: responseData.place.title,
            isValid: true
          }, 
          description: {
            value: responseData.place.description, 
            isValid: true
          }
        }, true
        );
      } catch(err) {}
    } 
    fetchPlace();
  }, [sendRequest, placeId, setFormData])



  

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`, 'PATCH', 
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/places');
      // console.log(formState.inputs);
    } catch(err) {}
  }

  if(isLoading) {
    return (
      <div className="center"> 
        <LoadingSpinner />
      </div>
    )
  }

  if(!loadedPlace && !error) {
    return (
      <div className="center"> 
      <Card>
        <h2> Could not find place</h2>
      </Card>
      </div>
    )
  }

  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
    {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input 
        id="title" 
        element="input" 
        type="text" 
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter valid title"
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initialValid={true}
      />
      <Input 
        id="description" 
        element="textarea" 
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="please enter valid description"
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
    </form>}
  </>
)
}

export default UpdatePlace;