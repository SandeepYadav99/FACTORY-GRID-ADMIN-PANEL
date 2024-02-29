/**
 * Created by charnjeetelectrovese@gmail.com on 4/30/2020.
 */
import {DASHBOARD_INIT, DASHBOARD_DONE, DASHBOARD_ADD_DRIVER, DASHBOARD_REMOVE_DRIVER} from "../actions/Dashboard.action";

const initialState = {
    error: false,
    is_calling: true,
    weekly_data: [],
    total_orders: 0,
    total_customers: 0,
    total_revenue: 0,
    total_products: 0,
    drivers: [],
    dashboard:null
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        case DASHBOARD_INIT: {
           
            return {...state, is_calling: true };
        }
        case DASHBOARD_DONE: {
          
        const dashboardData = {...action?.payload}
            return {
                ...state,
                // ...action.payload,
                dashboard:dashboardData,
                is_calling: false
            }
        }
        case DASHBOARD_ADD_DRIVER: {
            if (action.payload) {
                const prevState = state.drivers;
                prevState.push(action.payload);
                return {...state, drivers: prevState};
            }
        }
        case DASHBOARD_REMOVE_DRIVER: {
            if (action.payload) {
                const prevState = state.drivers;
                let tIndex = null;
                prevState.some((val, index) => {
                    if (val.driver_id == action.payload.driver_id) {
                        tIndex = index;
                        return true;
                    }
                });
                if (tIndex != null) {
                    prevState.splice(tIndex, 1);
                }
                return {...state, drivers: prevState};
            }
        }
        default: {
            return state;
        }
    }
    return state;
}
