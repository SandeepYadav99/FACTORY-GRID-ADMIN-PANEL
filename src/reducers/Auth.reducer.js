/**
 * Created by charnjeetelectrovese@gmail.com on 9/20/2017.
 */

import {browserHistory} from 'react-router';

// import { AUTH_USER } from "../actions/Auth.action";

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
        case 'GET_PROFILE_INIT': {
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
}
