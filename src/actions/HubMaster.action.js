/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2019.
 */

// import { serviceFetchProviderRequests } from '../services/ProviderRequest.service';
// import { fetchPRequests } from '../services/User.service';
import store from '../store';
import Constants from '../config/constants';
import EventEmitter from "../libs/Events.utils";
import { serviceHubMasterCreate, serviceHubMasterDelete, serviceHubMasterList, serviceHubMasterUpdate } from '../services/HubMaster.service';


export const FETCH_INIT = 'FETCH_INIT_HUB_MASTER';
export const FETCHED = 'FETCHED_HUB_MASTER';
export const FETCHED_FAIL = 'FETCHED_FAIL_HUB_MASTER';
export const FETCHED_FILTER = 'FETCHED_FILTER_HUB_MASTER';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_HUB_MASTER';
export const FILTER = 'FILTER_HUB_MASTER';
export const RESET_FILTER = 'RESET_FILTER_HUB_MASTER';
export const SET_SORTING = 'SET_SORTING_HUB_MASTER';
export const SET_FILTER = 'SET_FILTER_HUB_MASTER';
export const SET_PAGE = 'SET_PAGE_HUB_MASTER';
export const CHANGE_PAGE = 'CHANGE_PAGE_HUB_MASTER';
export const CHANGE_STATUS= 'CHANGE_STATE_HUB_MASTER';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_HUB_MASTER';
export const CREATE_DATA = 'CREATE_HUB_MASTER';
export const UPDATE_DATA = 'UPDATE_HUB_MASTER';
export const DELETE_ITEM = 'DELETE_HUB_MASTER';

export function actionFetchHubMaster(index = 1, sorting = {}, filter = {}) {
    const request = serviceHubMasterList({ index, row: sorting.row, order: sorting.order, ...filter });
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

export function actionCreateHubMaster(data) {
    const request = serviceHubMasterCreate(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved', type: 'success'});
                dispatch({type: CREATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionUpdateHubMaster(data) {
    const request = serviceHubMasterUpdate(data);
    return (dispatch) => {
        request.then((data) => {
            if (!data.error) {
                dispatch({type: UPDATE_DATA, payload: data.data})
            }
        })
    }
}

export function actionDeleteMasterDelete(id) {
    const request = serviceHubMasterDelete({ id: id});
    return (dispatch) => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
}


export function actionChangePageHubMasterRequests(page) {
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

export function actionFilterHubMasterRequests(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});//dispatch function
        });
    };
}


export function actionChangeStatusHubMasterRequests(id, status) {
    // const request = serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id, status}});
        // request.then((data) => {
        //     dispatch({type: FILTER_PREQUESTS, payload: data});
        //     dispatch({type: FETCHED_PREQUESTS, payload: null});
        // });
    };
}

export function actionResetFilterHubMasterRequests() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageHubMasterRequests(page) {
    const stateData = store.getState().hubMaster;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchHubMaster(serverPage + 1, sortingData, {query, query_data: queryData}));
            // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
        }

    console.log(currentPage, totalLength);
    return {
        type: CHANGE_PAGE,
        payload: page,
    };
    // if (this.props.totalUsers <= ((this.props.currentPage + 1) * 100)) {
    //         // this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order);
    //         this.props.fetchNextUsers(this.props.serverPage + 1, this.props.sorting_data.row, this.props.sorting_data.order, { query: this.props.query, query_data: this.props.query_data });
    //     }

}
