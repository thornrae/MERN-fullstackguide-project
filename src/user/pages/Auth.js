import React, {useState} from 'react';

import Card from '../../shared/components/UIElements/Card.js';
import Input from '../../shared/components/FormElements/Input.js';
import Button from '../../shared/components/FormElements/Button.js';
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators.js';
import {useForm} from '../../shared/hooks/form-hook.js';
import './Auth.css';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value:'',
      isValid: false
    }
  }, false)

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  }

  const switchModeHandler = () => {
    if(!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false)
    }
    setIsLoginMode(prevMode => !prevMode)
  }
 
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && 
          <Input 
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a name"
            onInput={inputHandler}
          />}
        <Input 
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()] }
          errorText="please enter valid email"
          onInput={inputHandler}
        />
        <Input 
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(4)] }
          errorText="please enter valid password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}> SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN' }
      </Button>
    </Card>
  )

}

export default Auth;