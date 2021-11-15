import React from 'react';
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input.js'
import Button from '../../shared/components/FormElements/Button.js';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook.js';
import './PlaceForm.css';

const PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'tall ass building',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York',
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    creator: 'u1'
  }, 
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'tall ass building',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St, New York',
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    creator: 'u2'
  },
]

const UpdatePlace = () => {
  // console.log(useParams());
  const placeId = useParams().placeId;

  const identifiedPlace = PLACES.find(p => p.id === placeId);

  const [formState, inputHandler] = useForm({
    title: {
      value: identifiedPlace.title,
      isValid: true
    }, 
    description: {
      value: identifiedPlace.description, 
      isValid: true
    }
  }, 
    true
  );

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if(!identifiedPlace) {
    return (
      <div className="center"> 
        <h2> Could not find place</h2>
      </div>
    )
  }
  return (

    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input 
        id="title" 
        element="input" 
        type="text" 
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="please enter valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input 
        id="description" 
        element="textarea" 
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="please enter valid description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
    </form>
)
  

}

export default UpdatePlace;