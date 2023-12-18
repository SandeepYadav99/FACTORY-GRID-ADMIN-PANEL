/**
 * Created by charnjeetelectrovese@gmail.com on 9/20/2017.
 */
<<<<<<< HEAD
import {AUTH_USER, LOGOUT_USER, SET_PROFILE, GET_PROFILE_INIT} from "../actions/auth_index.action";

import {browserHistory} from 'react-router';
=======

// import { AUTH_USER } from "../actions/Auth.action";
>>>>>>> 38e58e5540a84ffb9735cc44390aed89c04b7d25

const initialState = {
    error: false,
    message: '',
    user: {},
    user_profile: {
        common: null,
        contact: null,
        kyc: null,
        account: null,
        tour: null,
        status: 'PENDING',
        is_verified: true,
        is_fetching: true,
        country_code:  'IN'
    },
    is_authenticated: false
};


export default function (state = JSON.parse(JSON.stringify(initialState)), action) {

    switch (action.type) {
        case 'AUTH_USER' : {
            return {...state, is_authenticated: true, user: action.payload}
        }
        case 'LOGOUT_USER': {
            return {...state, ...(JSON.parse(JSON.stringify(initialState)))};
        }
<<<<<<< HEAD
        
        case GET_PROFILE_INIT: {
=======
        case 'GET_PROFILE_INIT': {
>>>>>>> 38e58e5540a84ffb9735cc44390aed89c04b7d25
            const tempProfile = state.user_profile;
            tempProfile.is_fetching = true;
            return {
                ...state, user_profile: tempProfile
            };
        }
        case 'SET_PROFILE': {
            const tempProfile = action.payload;
            tempProfile.is_fetching = false;
            tempProfile.is_verified = true;
            return {...state, user_profile: tempProfile };
        }
        default: {
            return state;
        }
    }
<<<<<<< HEAD
    // return state;
=======
>>>>>>> 38e58e5540a84ffb9735cc44390aed89c04b7d25
}
