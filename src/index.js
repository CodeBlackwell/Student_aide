import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import {AUTH_USER} from './actions/constants';

import App from './components/app';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import SignUp from './components/auth/SignUp';
import Instructors from './components/Instructors/Instructors';
import reducers from './reducers';

import RequireAuth from './components/auth/requireAuth';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
        store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={SignIn} />
              <Route path="signout" component={SignOut} />
              <Route path="signup" component={SignUp} />
              <Route path="instructors" component={RequireAuth(Instructors)} />
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
