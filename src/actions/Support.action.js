/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */
import store from '../store';
import Constants from '../config/constants';
import {
    serviceAddSupportNote,
    serviceAssignUserToSupport, serviceChangeSupportConcern, serviceChangeSupportPriority, serviceChangeSupportStatus,
    serviceGetSupport,
    serviceGetSupportDetail,
    serviceGetSupportNotes
} from "../services/Support.service";
import { serviceProviderUserManager } from '../services/ProviderUser.service';
import { serviceGetCustomersProfile } from '../services/CustomersRequest.service';

export const FETCH_INIT = 'FETCH_INIT_SUPPORT';
export const FETCHED = 'FETCHED_SUPPORT';
export const FETCHED_FAIL = 'FETCHED_FAIL_SUPPORT';
export const FETCHED_FILTER = 'FETCHED_FILTER_SUPPORT';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_SUPPORT';
export const FILTER = 'FILTER_SUPPORT';
export const RESET_FILTER = 'RESET_FILTER_SUPPORT';
export const SET_SORTING = 'SET_SORTING_SUPPORT';
export const SET_FILTER = 'SET_FILTER_SUPPORT';
export const SET_PAGE = 'SET_PAGE_SUPPORT';
export const CHANGE_PAGE = 'CHANGE_PAGE_SUPPORT';
export const CHANGE_STATUS = 'CHANGE_STATE_SUPPORT';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_SUPPORT';
export const SET_SUPPORT_REQUEST_TYPE = 'SET_SUPPORT_REQUEST_TYPE';
export const CREATE_DATA = 'CREATE_SUPPORT';
export const UPDATE_DATA = 'UPDATE_SUPPORT';
export const CLEAN_LIST = 'CLEAN_LIST_SUPPORT';
export const UPDATE_STATUS = 'UPDATE_STATUS_SUPPORT';

export const SUPPORT_DETAIL_INIT = 'SUPPORT_DETAIL_INIT';
export const SUPPORT_DETAIL_DONE = 'SUPPORT_DETAIL_DONE';
export const CHANGE_SUPPORT_STATUS = 'CHANGE_SUPPORT_STATUS';
export const CHANGE_SUPPORT_PRIORITY = 'CHANGE_SUPPORT_PRIORITY';
export const CHANGE_SUPPORT_CONCERN = 'CHANGE_SUPPORT_CONCERN';

export const SUPPORT_NOTES_GET_INIT = 'SUPPORT_NOTES_GET_INIT';
export const SUPPORT_NOTES_GET_DONE = 'SUPPORT_NOTES_GET_DONE';
export const ADD_SUPPORT_NOTES = 'ADD_SUPPORT_NOTES';
export const ASSIGN_SUPPORT = 'ASSIGN_SUPPORT';
export const USER_MANAGER = 'USER_MANAGER';
export const USER_PROFILE ="USER_PROFILE"
export function actionFetchSupport(index = 1, sorting = {}, filter = {}, shouldReset = false, status) {
    const request = serviceGetSupport({index, row: sorting.row, order: sorting.order, ...filter}); // GetOrder
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
            if (!status) {
                dispatch({type: SET_SUPPORT_REQUEST_TYPE, payload: 'ALL'});
            }
        }
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: SET_FILTER, payload: filter});
            dispatch({type: SET_SORTING, payload: sorting});
            if (!data.error) {
                dispatch({type: FETCHED, payload: {data: data.data, page: index}});
                dispatch({type: SET_SERVER_PAGE, payload: index});
                if (index == 1) {
                    dispatch({type: CHANGE_PAGE, payload: index - 1});
                }
            } else {
                dispatch({type: FETCHED_FAIL, payload: null});
            }
        });
    };
}

export function actionCreateSupport(data) {
    return (dispatch) => {
        dispatch({type: CREATE_DATA, payload: data})
    }
}

export function actionUpdateSupport(data) {
    return (dispatch) => {
        dispatch({type: UPDATE_DATA, payload: data})
    }
}

export function actionUpdateJobStatus(status) {
    return (dispatch) => {
        dispatch({ type: UPDATE_STATUS, payload: status })
    }
}


export function actionChangePageSupport(page) {
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

export function actionFilterSupport(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusSupport(params) {
    // const request = serviceUpdateSupport({id: params.id, status: params.type});
    // return (dispatch) => {
    //     request.then((data) => {
    //         dispatch({type: CHANGE_STATUS, payload: {id: params.id, status: params.type}});
    //     });
    // };
}

export function actionResetFilterSupport() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionCleanSupport() {
    return {
        type: CLEAN_LIST,
        payload: null,
    };
}

export function actionSetPageSupport(page) {
    const stateData = store.getState().support;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchSupport(serverPage + 1, sortingData, {query, query_data: queryData}));
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

export function actionGetSupportDetails(supportId) {
    const req = serviceGetSupportDetail({ support_id: supportId });
    return (dispatch) => {
        dispatch({ type: SUPPORT_DETAIL_INIT, payload: null });
        req.then((res) => {
            if (!res.error) {
                dispatch({ type: SUPPORT_DETAIL_DONE, payload: res.data });
            }
        })
    }
}

export function actionGetSupportNotes(supportId) {
    const req = serviceGetSupportNotes({ support_id: supportId });
    return (dispatch) => {
        dispatch({ type: SUPPORT_NOTES_GET_INIT, payload: null });
        req.then((res) => {
            if (!res.error) {
                dispatch({ type: SUPPORT_NOTES_GET_DONE, payload: res.data });
            }
        })
    }
}

export function actionChangeSupportStatus(supportId, status) {
    const req = serviceChangeSupportStatus({support_id: supportId, status});
    return (dispatch) => {
        dispatch({ type: CHANGE_SUPPORT_STATUS, payload: status });
    }
}

export function actionChangeSupportPriority(supportId, priority) {
    const req = serviceChangeSupportPriority({support_id: supportId, priority});
    return (dispatch) => {
        dispatch({ type: CHANGE_SUPPORT_PRIORITY, payload: priority });
    }
}

export function actionChangeSupportConcern(supportId, concern) {
    const req = serviceChangeSupportConcern({support_id: supportId, concern});
    return (dispatch) => {
        dispatch({ type: CHANGE_SUPPORT_CONCERN, payload: concern });
    }
}

export function actionAddSupportNote(supportId, data) {
    const req = serviceAddSupportNote({support_id: supportId, ...data});
    return (dispatch) => {
        req.then(res => {
            if (!res.error) {
                dispatch({ type: ADD_SUPPORT_NOTES, payload: res.data });
            }
        })

    }
}

export function actionAssignSupport(supportId, userId) {
    const req = serviceAssignUserToSupport({support_id: supportId, user_id: userId});
    return dispatch => {
        req.then(res => {
            if (!res.error) {
                dispatch({ type: ASSIGN_SUPPORT, payload: res.data });
            }
        });
    }
}


export function actionManageAccountQuelity(supportId, userId) {
    const req = serviceProviderUserManager({manager_id: supportId, user_id: userId});
    return dispatch => {
        req.then(res => {
            if (!res.error) {
              
                dispatch({ type: USER_MANAGER, payload: res.data });
            }
        });
    }
}

export function actionUserProfile(id) {
    const req = serviceGetCustomersProfile({ id: id});
    return dispatch => {
        req.then(res => {
            if (!res.error) {
              
                dispatch({ type: USER_PROFILE, payload: res.data });
            }
        });
    }
}
