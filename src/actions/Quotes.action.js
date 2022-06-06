/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2019.
 */

// import { serviceFetchProviderRequests } from '../services/ProviderRequest.service';
// import { fetchPRequests } from '../services/User.service';
import store from '../store';
import Constants from '../config/constants';
import {
    serviceGetQuotes,
    serviceGetQuoteDetail,
    serviceGetQuoteNotes,
    serviceChangeQuoteStatus, serviceChangeQuotePriority, serviceAssignUserToQuote, serviceAddQuoteNote
} from "../services/Quotes.service";

export const FETCH_INIT = 'FETCH_INIT_QUOTES';
export const FETCHED = 'FETCHED_QUOTES';
export const FETCHED_FAIL = 'FETCHED_FAIL_QUOTES';
export const FETCHED_FILTER = 'FETCHED_FILTER_QUOTES';
// export const NEXT_PREQUESTS = 'NEXT_PREQUESTS';
// export const PREV_PREQUESTS = 'PREV_PREQUESTS';
export const FETCH_NEXT = 'FETCH_NEXT_QUOTES';
export const FILTER = 'FILTER_QUOTES';
export const RESET_FILTER = 'RESET_FILTER_QUOTES';
export const SET_SORTING = 'SET_SORTING_QUOTES';
export const SET_FILTER = 'SET_FILTER_QUOTES';
export const SET_PAGE = 'SET_PAGE_QUOTES';
export const CHANGE_PAGE = 'CHANGE_PAGE_QUOTES';
export const CHANGE_STATUS= 'CHANGE_STATE_QUOTES';
export const SET_SERVER_PAGE = 'SET_SERVER_PAGE_QUOTES';
export const SET_QUOTE_REQUEST_TYPE = 'SET_QUOTE_REQUEST_TYPE';
export const CREATE_DATA = 'CREATE_QUOTES';
export const UPDATE_DATA = 'UPDATE_QUOTES';

export const QUOTE_DETAIL_INIT = 'QUOTE_DETAIL_INIT';
export const QUOTE_DETAIL_DONE = 'QUOTE_DETAIL_DONE';
export const CHANGE_QUOTE_STATUS = 'CHANGE_QUOTE_STATUS';
export const CHANGE_QUOTE_PRIORITY = 'CHANGE_QUOTE_PRIORITY';

export const QUOTE_NOTES_GET_INIT = 'QUOTE_NOTES_GET_INIT';
export const QUOTE_NOTES_GET_DONE = 'QUOTE_NOTES_GET_DONE';
export const ADD_QUOTE_NOTES = 'ADD_QUOTE_NOTES';
export const ASSIGN_QUOTE = 'ASSIGN_QUOTE';

export function actionFetchQuotes(index = 1, sorting = {}, filter = {}, shouldReset=false, status) {
    const request = serviceGetQuotes({ index, row: sorting.row, order: sorting.order, status, ...filter }); // GetQuotes
    return (dispatch) => {
        if (shouldReset) {
            dispatch({
                type: CHANGE_PAGE,
                payload: 1,
            });
            if (!status) {
                dispatch({type: SET_QUOTE_REQUEST_TYPE, payload: 'ALL'});
            }
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


export function actionUpdateQuotes(data) {
    // const request = serviceUpdateQuotes(data);
    return (dispatch) => {
        dispatch({type: UPDATE_DATA, payload: data.data})
    }
}

export function actionSetQuoteRequestType(type) {
    return (dispatch) => {
        dispatch({type: SET_QUOTE_REQUEST_TYPE, payload: type});
    }
}


export function actionChangePageQuotes(page) {
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

export function actionFilterQuotes(value) {
    const request = null;////serviceFetchProviderRequests(value);
    return (dispatch) => {
        dispatch({type: FETCH_INIT, payload: null});
        request.then((data) => {
            dispatch({type: FILTER, payload: data});
            dispatch({type: FETCHED, payload: null});
        });
    };
}


export function actionChangeStatusQuotes(params) {
    return (dispatch) => {
        dispatch({type: CHANGE_STATUS, payload: {id: params.id, status: params.type}});
    };
}

export function actionResetFilterQuotes() {
    return {
        type: RESET_FILTER,
        payload: null,
    };
}

export function actionSetPageQuotes(page) {
    const stateData = store.getState().quotes;
    const currentPage = stateData.currentPage;
    const totalLength = stateData.all.length;
    const sortingData = stateData.sorting_data;
    const query = stateData.query;
    const queryData = stateData.query_data;
    const serverPage = stateData.serverPage;

    if (totalLength <= ((page + 1) * Constants.DEFAULT_PAGE_VALUE)) {
        store.dispatch(actionFetchQuotes(serverPage + 1, sortingData, {query, query_data: queryData}));
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

export function actionGetQuoteDetails(quoteId) {
    const req = serviceGetQuoteDetail({ quote_id: quoteId });
    return (dispatch) => {
        dispatch({ type: QUOTE_DETAIL_INIT, payload: null });
        req.then((res) => {
            if (!res.error) {
                dispatch({ type: QUOTE_DETAIL_DONE, payload: res.data });
            }
        })
    }
}

export function actionGetQuoteNotes(quoteId) {
    const req = serviceGetQuoteNotes({ quote_id: quoteId });
    return (dispatch) => {
        dispatch({ type: QUOTE_NOTES_GET_INIT, payload: null });
        req.then((res) => {
            if (!res.error) {
                dispatch({ type: QUOTE_NOTES_GET_DONE, payload: res.data });
            }
        })
    }
}

export function actionChangeQuoteStatus(quoteId, status) {
    const req = serviceChangeQuoteStatus({quote_id: quoteId, status});
    return (dispatch) => {
        dispatch({ type: CHANGE_QUOTE_STATUS, payload: status });
    }
}

export function actionChangeQuotePriority(quoteId, priority) {
    const req = serviceChangeQuotePriority({quote_id: quoteId, priority});
    return (dispatch) => {
        dispatch({ type: CHANGE_QUOTE_PRIORITY, payload: priority });
    }
}

export function actionAddQuoteNote(quoteId, data) {
    const req = serviceAddQuoteNote({quote_id: quoteId, ...data});
    return (dispatch) => {
        req.then(res => {
            if (!res.error) {
                dispatch({ type: ADD_QUOTE_NOTES, payload: res.data });
            }
        })

    }
}

export function actionAssignQuote(quoteId, userId) {
    const req = serviceAssignUserToQuote({quote_id: quoteId, user_id: userId});
    return dispatch => {
        req.then(res => {
            if (!res.error) {
                dispatch({ type: ASSIGN_QUOTE, payload: res.data });
            }
        });
    }
}

