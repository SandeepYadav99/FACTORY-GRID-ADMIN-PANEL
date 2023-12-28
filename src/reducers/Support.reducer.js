/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */

import {
    FETCH_NEXT,
    FETCH_INIT,
    FETCHED,
    FILTER,
    RESET_FILTER,
    SET_SORTING,
    SET_FILTER,
    SET_PAGE,
    CHANGE_PAGE,
    CHANGE_STATUS,
    SET_SERVER_PAGE,
    CREATE_DATA,
    UPDATE_DATA,
    CLEAN_LIST, UPDATE_STATUS,
    SUPPORT_DETAIL_INIT,
    SUPPORT_DETAIL_DONE,
    SUPPORT_NOTES_GET_INIT,
    SUPPORT_NOTES_GET_DONE,
    CHANGE_SUPPORT_STATUS,
    CHANGE_SUPPORT_PRIORITY, ASSIGN_SUPPORT, ADD_SUPPORT_NOTES,
    SET_SUPPORT_REQUEST_TYPE,CHANGE_SUPPORT_CONCERN,
    USER_MANAGER,
    USER_PROFILE
} from '../actions/Support.action';
import Constants from '../config/constants';


function mapPresetPRequest(all, pageId) {
    return all.filter((val, index) => {
        if (index >= (((pageId + 1) * Constants.DEFAULT_PAGE_VALUE) - Constants.DEFAULT_PAGE_VALUE) && index < (((pageId + 1) * Constants.DEFAULT_PAGE_VALUE))) {
            return val;
        }
    });
}

const initialState = {
    all: [],
    present: [], //{case:'CA/2021/AA2021',name:'Pranav Bhasin',concern:'Concern from Dropdown',assigned:'Ashutosh',status:'PENDING',updatedAt:'21/10/2021',priority:'High'}
    currentPage: 0,
    serverPage: 0,
    query: null, // search text data
    query_data: null, // popover filter data change
    sorting_data: {row: null, order: null},
    is_fetching: false,
    is_support_detail: false,
    support_detail: null,
    is_support_notes: false,
    support_notes: [],
    type: 'ALL',
    user_manager_detail:null,
    is_user_manager_detail:false,
    userProfile:null
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        case CLEAN_LIST: {
            return { ...state, ...JSON.parse(JSON.stringify(initialState)) };
        }
        case FETCH_INIT: {
            return {...state, is_fetching: true};
        }

        case FETCHED: {
            const newData = (action.payload).data;
            const page = action.payload.page;
            let newAll = [];
            if (page == 1) {
                newAll = [...newData];
            } else {
                newAll = [...state.all, ...newData];
                console.log(newAll)
            }
            const tableData = mapPresetPRequest(newAll, state.currentPage);
            return {...state, all: newAll, present: tableData, is_fetching: false}; // { ...state , all: newAll, present: tableData, serverPage: 1, currentPage: 1 };
        }
        case SET_SORTING: {
            return {...state, sorting_data: action.payload};
        }
        case SET_SUPPORT_REQUEST_TYPE: {
            return {
                ...state,
                type: action.payload
            };
        }
        case UPDATE_STATUS: {
            if (action.payload) {
                let tempIndex = null;
                const prevState = state.all;
                prevState.some((val, index) => {
                    if (val.id == action.payload.id) {
                        tempIndex = index;
                        return true;
                    }
                });
                if (tempIndex != null) {
                    prevState[tempIndex].status = action.payload.status
                }
                // const newState = state.all.map((val) => {
                //     if (val.id == action.payload.id) {
                //         return { ...val, status: action.payload.status == 'SUSPEND' ? 'SUSPEND' : 'ACTIVE' };
                //     } return { ...val };
                // });
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, all: prevState, present: tableData};
            }
            return state;
        }
        case CHANGE_STATUS: {
            if (action.payload) {
                let tempIndex = null;
                const prevState = state.all;
                prevState.some((val, index) => {
                    if (val.id == action.payload) {
                        tempIndex = index;
                        return true;
                    }
                });
                if (tempIndex != null) {
                    prevState.splice(tempIndex, 1);
                }
                // const newState = state.all.map((val) => {
                //     if (val.id == action.payload.id) {
                //         return { ...val, status: action.payload.status == 'SUSPEND' ? 'SUSPEND' : 'ACTIVE' };
                //     } return { ...val };
                // });
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, all: prevState, present: tableData};
            }
            return state;
        }
        // case NEX: {
        //     const tableData = mapPresetPRequest(state.all, state.currentPage + 1);
        //     return { ...state, present: tableData, currentPage: (state.currentPage + 1) };
        // }
        // case PREV_PREQUESTS: {
        //     const tableData = mapPresetPRequest(state.all, state.currentPage - 1);
        //     return { ...state, present: tableData, currentPage: (state.currentPage - 1) };
        // }
        case CHANGE_PAGE: {
            const tempPage = action.payload;
            const tableData = mapPresetPRequest(state.all, tempPage);
            return {...state, present: tableData, currentPage: tempPage};
        }
        case FETCH_NEXT: {
            const newAll = state.all.concat(action.payload);
            return {...state, all: newAll, serverPage: (state.serverPage + 1)};
        }
        case FILTER: {
            return {...state, present: action.payload};
        }
        case SET_FILTER: {
            return {...state, query: action.payload.query, query_data: action.payload.query_data};
        }
        case RESET_FILTER: {
            const tableData = mapPresetPRequest(state.all, state.currentPage);
            return {...state, present: tableData};
        }
        case SET_PAGE: {
            return {...state, currentPage: action.payload};
        }
        case SET_SERVER_PAGE: {
            return {...state, serverPage: action.payload};
        }

        case CREATE_DATA: {
            if (action.payload) {
                const prevState = state.all;
                prevState.unshift(action.payload);
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, all: prevState, present: tableData};
            }
            return state;
        }
        case UPDATE_DATA: {
            if (action.payload) {
                const prevState = state.all;
                let tIndex = null;
                prevState.some((val, index) => {
                    if (val.id == action.payload.id) {
                        tIndex = index;
                        return true;
                    }
                });
                if (tIndex != null) {
                    const newData = action.payload;
                    const oldData = prevState[tIndex];
                    if (newData.type == 'STATUS_UPDATE') {
                        const timeStamps = oldData.timestamps;
                        timeStamps[newData.status] = newData.current_timestamp;
                        newData.timestamps = timeStamps;
                    }
                    prevState[tIndex] = {
                        ...oldData,
                        ...newData,
                    };
                }
                const tableData = mapPresetPRequest(prevState, state.currentPage);
                return {...state, all: prevState, present: tableData};
            }
            return state;
        }

        case SUPPORT_DETAIL_INIT: {
            return {
                ...state,
                is_support_detail: true
            }
        }
        case SUPPORT_DETAIL_DONE: {
            return {
                ...state,
                is_support_detail: false,
                support_detail: action.payload
            }
        }
        case SUPPORT_NOTES_GET_INIT: {
            return {
                ...state,
                is_support_notes: true
            }
        }
        case SUPPORT_NOTES_GET_DONE: {
            return {
                ...state,
                is_support_notes: false,
                support_notes: action.payload
            }
        }
        case CHANGE_SUPPORT_STATUS: {
            if (state.support_detail) {
                const tempData = JSON.parse(JSON.stringify(state.support_detail));
                tempData.status = action.payload;
                return {
                    ...state,
                    support_detail: tempData,
                };
            }
            return {
                ...state,
            };
        }
        case CHANGE_SUPPORT_PRIORITY: {
            if (state.support_detail) {
                const tempData = JSON.parse(JSON.stringify(state.support_detail));
                tempData.priority = action.payload;
                return {
                    ...state,
                    support_detail: tempData,
                };
            }
            return {
                ...state,
            };
        }
        case CHANGE_SUPPORT_CONCERN: {
            if (state.support_detail) {
                const tempData = JSON.parse(JSON.stringify(state.support_detail));
                tempData.concern = action.payload;
                return {
                    ...state,
                    support_detail: tempData,
                };
            }
            return {
                ...state,
            };
        }
        case ADD_SUPPORT_NOTES: {
            const temp = JSON.parse(JSON.stringify(state.support_notes));
            temp.unshift(action.payload);

            return {
                ...state,
                support_notes: temp,
            };
        }
        case ASSIGN_SUPPORT: {
            return {
                ...state,
                support_detail: {
                    ...state.support_detail,
                    ...action.payload,
                },
            }
        }
        case USER_MANAGER: {
            return {
                ...state,
                user_manager_detail: {
                    ...state.user_manager_detail,
                    ...action.payload,
                },
            }
        }
        case USER_PROFILE: {
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    ...action.payload,
                },
            }
        }
        default: {
            return state;
        }
    }
}
