import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGNUP_ERROR} from '../actions/constants';

export default function (state = { authenticated: false, error: null }, action) {
    switch (action.type) {
        case AUTH_USER:
            return {...state, authenticated: true, error: ''};
        case UNAUTH_USER:
            return {...state, authenticated: false, error: ''};
        case AUTH_ERROR:
            return {...state, error: action.payload}
    }
    return state;
}