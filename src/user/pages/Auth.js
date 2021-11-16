import React from 'react';

import Card from '../../shared/components/UIElements/Card.js';
import Input from '../../shared/components/FormElements/Input.js';
import Button from '../../shared/components/FormElements/Button.js';
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators.js';
import {useForm} from '../../shared/hooks/form-hook.js';
import './Auth.css';

const Auth = () => {
  const [formState, inputHandler] = useForm({
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

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
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
        <Button type="submit" disabled={!formState.isValid}>log in</Button>
      </form>
    </Card>
  )

}

export default Auth;