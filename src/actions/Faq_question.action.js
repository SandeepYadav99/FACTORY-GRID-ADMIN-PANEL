/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */

// import { serviceFetchProviderRequests } from '../services/ProviderRequest.service';
// import { fetchPRequests } from '../services/User.service';
import store from '../store';
import Constants from '../config/constants';
import {
    serviceCreateFaqQuestion,
    serviceDeleteFaqQuestion,
    serviceFetchFaqQuestion,
    serviceUpdateFaqQuestion
} from "../services/FaqQuestion.service";
import EventEmitter from "../libs/Events.utils";


export const FETCH_INIT = 'FETCH_INIT_FAQ_QUESTION';
export const FETCHED = 'FETCHED_FAQ_QUESTION';
export const FETCHED_FAIL = 'FETCHED_FAIL_FAQ_QUESTION';
export const FETCHED_FILTER = 'FETCHED_FILTER_FAQ_QUESTION';
export const FETCH_NEXT = 'FETCH_NEXT_FAQ_QUESTION';
export const FILTER = 'FILTER_FAQ_QUESTION';
export const RESET_FILTER = 'RESET_FILTER_FAQ_QUESTION';
export const SET_SORTING = 'SET_SORTING_FAQ_QUESTION';
export const SET_FILTER = 'SET_FILTER_FAQ_QUESTION';
export const SET_PAGE = 'SET_PAGE_FAQ_QUESTION';
export const CHANGE_PAGE = 'CHANGE_PAGE_FAQ_QUESTION';
export const CHANGE_STATUS= 'CHANGE_STATE_FAQ_QUESTION';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_FAQ_QUESTION';
export const CREATE_DATA = 'CREATE_FAQ_QUESTION';
export const UPDATE_DATA = 'UPDATE_FAQ_QUESTION';
export const DELETE_ITEM = 'DELETE_ITEM_FAQ_QUESTION';

export function actionFetchFaqQuestion(id,index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceFetchFaqQuestion({category_id:id, index, row: sorting.row, order: sorting.order, ...filter });
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
        }
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: { data: data.data, page: index }});
                dispatch({ type: SET_SERVER_PAGE, payload: index });
                if (index == 1) {
                    dispatch({type: CHANGE_PAGE, payload: index - 1});
                }
            } else {
                dispatch({type: FETCHED_FAIL, payload: null});
            }
        });
    };
}

export function actionCreateFaqQuestion(data) {
    const request = serviceCreateFaqQuestion(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            } else {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: data.message, type: 'error'});
            }
        })
    }
}

export function actionUpdateFaqQuestion(data) {
    const request = serviceUpdateFaqQuestion(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            } else {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: data.error, type: 'error'});
            }
        })
    }
}

export function actionDeleteFaqQuestion(id) {
    const request = serviceDeleteFaqQuestion({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}



export function actionChangePageFaqQuestion(page) {
    return (dispatch) => {
        dispatch({type: CHANGE_PAGE, payload: page})
    }
}

// export function nextPRequestsClick() {
//     return {
//         type: NEXT_PREQUESTS,
//         payload: null,
//     };
// }
//
// export function prevPRequestsClick() {
//     return {
//         type: PREV_PREQUESTS,
//         payload: null,
//     };
// }

export function actionFilterFaqQuestion(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusFaqQuestion(id, status) {
    // const request = serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
        // request.then((data) => {
        //     dispatch({type: FILTER_PREQUESTS, payload: data});
        //     dispatch({type: FETCHED_PREQUESTS, payload: null});
        // });
    };
}

export function actionResetFilterFaqQuestion() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageFaqQuestion(page) {
    const stateData = store.getState().faq_question;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchFaqQuestion(serverPage + 1, sortingData, {query, query_data: queryData}));
        // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    }


    return {
        type: CHANGE_PAGE,
        payload: page,
    };
    // if (this.props.totalUsers <= ((this.props.currentPage + 1) * 100)) {
    //         // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order);
    //         this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    //     }

}
