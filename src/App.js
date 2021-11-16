import React, {useState, useCallback} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users.js';
import NewPlace from './places/pages/NewPlace.js';
import UserPlaces from './places/pages/UserPlaces.js';
import UpdatePlace from './places/pages/UpdatePlace.js';
import Auth from './user/pages/Auth.js';
import MainNavigation from './shared/components/Navigation/MainNavigation.js';
import {AuthContext} from './shared/context/auth-context.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = useCallback( () => {
    setIsLoggedIn(true);
  }, [])

  const logout = useCallback( () => {
    setIsLoggedIn(false);
  }, [])

  let routes;

  if(isLoggedIn) {
    routes = (
      <Switch>
      <Route path="/" exact> 
        <Users />
      </Route>

      <Route path="/:userId/places" exact> 
        <UserPlaces />
      </Route>

      <Route path="/places/new" exact> 
        <NewPlace />
      </Route>

      <Route path="/places/:placeId"> 
        <UpdatePlace />
      </Route>

      <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
      <Route path="/" exact> 
        <Users />
      </Route>

      <Route path="/:userId/places" exact> 
        <UserPlaces />
      </Route>

      <Route path="/auth" exact> 
        <Auth />
      </Route>
      <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
<AuthContext.Provider 
  value={{isLoggedIn: isLoggedIn, login: login, logout:logout}}
>
    <Router>
      <MainNavigation />
      <main>
        {routes}
      </main>
    </Router>
  </AuthContext.Provider>
    )
}

export default App;
