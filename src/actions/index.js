import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './constants';

const ROOT_URL = 'http://localhost:3090';

export function signInUser ({ email, password }) {
    email = email.toLowerCase();
    return function (dispatch) {
    // Submit email/password
    axios.post(`${ROOT_URL}/signin`, { email, password })
        // If Request is good..
        .then( response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
    // If Request is bad. .
        .catch(() => {
        console.log('bad Request');
        dispatch(authError('Bad Login Information'))
        })
    }
}

export function signUpUser ({ email, password }) {
    email = email.toLowerCase();
    return function (dispatch) {
        // Submit email/password
        axios.post(`${ROOT_URL}/signup`, { email, password })
        // If Request is good..
            .then( response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            // If Request is bad..
            .catch(response => {
                dispatch(authError(response.error))
            })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}


export function signOutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}