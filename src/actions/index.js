import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './constants';

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

        dispatch(authError('Bad Login Information'))
        })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}