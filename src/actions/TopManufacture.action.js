/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2019.
 */


import store from '../store';
import Constants from '../config/constants';
import EventEmitter from "../libs/Events.utils";

import { serviceCreateTopManufacture, serviceDeleteTopManufacture, serviceGetTopManufacture, serviceUpdateTopManufacture } from '../services/TopManufacture.service';


export const FETCH_INIT = 'FETCH_INIT_TOP_MANUFACTURE';
export const FETCHED = 'FETCHED_TOP_MANUFACTURE';
export const FETCHED_FAIL = 'FETCHED_FAIL_TOP_MANUFACTURE';
export const FETCHED_FILTER = 'FETCHED_FILTER_TOP_MANUFACTURE';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_TOP_MANUFACTURE';
export const FILTER = 'FILTER_TOP_MANUFACTURE';
export const RESET_FILTER = 'RESET_FILTER_TOP_MANUFACTURE';
export const SET_SORTING = 'SET_SORTING_TOP_MANUFACTURE';
export const SET_FILTER = 'SET_FILTER_TOP_MANUFACTURE';
export const SET_PAGE = 'SET_PAGE_TOP_MANUFACTURE';
export const CHANGE_PAGE = 'CHANGE_PAGE_TOP_MANUFACTURE';
export const CHANGE_STATUS= 'CHANGE_STATE_TOP_MANUFACTURE';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_TOP_MANUFACTURE';
export const CREATE_DATA = 'CREATE_TOP_MANUFACTURE';
export const UPDATE_DATA = 'UPDATE_TOP_MANUFACTURE';
export const DELETE_ITEM = 'DELETE_TOP_MANUFACTURE';

export function actionFetchTopManufacture(index = 1, sorting = {}, filter = {}) {
    const request = serviceGetTopManufacture({ index, row: sorting.row, order: sorting.order, ...filter });
    return (dispatch) => {
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

export function actionCreateTopManufacture(data) {
    const request = serviceCreateTopManufacture(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateTopManufacture(data) {
    const request = serviceUpdateTopManufacture(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteMasterDelete(id) {
    const request = serviceDeleteTopManufacture({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageTopManufactureRequests(page) {
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

export function actionFilterTopManufactureRequests(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusTopManufactureRequests(id, status) {
    // const request = serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
        // request.then((data) => {
        //     dispatch({type: FILTER_PREQUESTS, payload: data});
        //     dispatch({type: FETCHED_PREQUESTS, payload: null});
        // });
    };
}

export function actionResetFilterTopManufactureRequests() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageTopManufactureRequests(page) {
    const stateData = store.getState().topManufacture;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchTopManufacture(serverPage + 1, sortingData, {query, query_data: queryData}));
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
