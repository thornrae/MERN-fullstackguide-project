import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input.js';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button.js';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload.js';
import {useForm} from '../../shared/hooks/form-hook.js';
import {useHttpClient} from '../../shared/hooks/http-hook';
import {AuthContext} from '../../shared/context/auth-context';
import './PlaceForm.css';
// import Auth from '../../user/pages/Auth.js';


const NewPlace = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      }, 
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '', 
        isValid: false
      }, 
      image: {
        value: null, 
        isValid: false
      }
    }, false);

    const history = useHistory();

  
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);

      await sendRequest('http://localhost:5000/api/places', 
      'POST', formData)
    history.push('/');
    }catch(err) {}
    
  }


  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay/>}
      <Input
        id="title" 
        element="input"  
        type="text" 
        label="Title" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="please enter a valid title."
        onInput={inputHandler}
      />
      <Input 
        id="description"
        element="textarea"  
        label="Description" 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="please enter a valid description at least 5 characters."
        onInput={inputHandler}
      />
      <Input 
        id="address"
        element="input"  
        label="Address" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="please enter a valid address."
        onInput={inputHandler}
      />
      <ImageUpload 
        id="image" 
        onInput={inputHandler} 
        errorText="Please provide an image"
      />
      
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
       
    </form>
    </>
  )
}

export default NewPlace;