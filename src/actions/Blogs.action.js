/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */

// import { serviceFetchProviderRequests } from '../services/ProviderRequest.service';
// import { fetchPRequests } from '../services/User.service';
import store from '../store';
import Constants from '../config/constants';
import {
    serviceCreateBlogs,
    serviceDeleteBlogs,
    serviceFetchBlogs,
    serviceUpdateBlogs
} from "../services/Blogs.service";
import EventEmitter from "../libs/Events.utils";


export const FETCH_INIT = 'FETCH_INIT_BLOGS';
export const FETCHED = 'FETCHED_BLOGS';
export const FETCHED_FAIL = 'FETCHED_FAIL_BLOGS';
export const FETCHED_FILTER = 'FETCHED_FILTER_BLOGS';
export const FETCH_NEXT = 'FETCH_NEXT_BLOGS';
export const FILTER = 'FILTER_BLOGS';
export const RESET_FILTER = 'RESET_FILTER_BLOGS';
export const SET_SORTING = 'SET_SORTING_BLOGS';
export const SET_FILTER = 'SET_FILTER_BLOGS';
export const SET_PAGE = 'SET_PAGE_BLOGS';
export const CHANGE_PAGE = 'CHANGE_PAGE_BLOGS';
export const CHANGE_STATUS= 'CHANGE_STATE_BLOGS';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_BLOGS';
export const CREATE_DATA = 'CREATE_BLOGS';
export const UPDATE_DATA = 'UPDATE_BLOGS';
export const DELETE_ITEM = 'DELETE_ITEM_BLOGS';

export function actionFetchBlogs(index = 1, sorting = {}, filter = {}, shouldReset=false) {
    const request = serviceFetchBlogs({ index, row: sorting.row, order: sorting.order, ...filter });
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

export function actionCreateBlogs(data) {
    const request = serviceCreateBlogs(data);
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

export function actionUpdateBlogs(data) {
    const request = serviceUpdateBlogs(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Edited Successfully', type: 'success'});
                dispatch({type: UPDATE_DATA, payload: data.data})
            } else {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: data.error, type: 'error'});
            }
        })
    }
}

export function actionDeleteBlogs(id) {
    const request = serviceDeleteBlogs({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}



export function actionChangePageBlogs(page) {
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

export function actionFilterBlogs(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusBlogs(id, status) {
    // const request = serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
        // request.then((data) => {
        //     dispatch({type: FILTER_PREQUESTS, payload: data});
        //     dispatch({type: FETCHED_PREQUESTS, payload: null});
        // });
    };
}

export function actionResetFilterBlogs() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageBlogs(page) {
    const stateData = store.getState().blogs;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchBlogs(serverPage + 1, sortingData, {query, query_data: queryData}));
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
