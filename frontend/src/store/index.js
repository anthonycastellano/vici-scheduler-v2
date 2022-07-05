import { createStore } from 'redux';
import CONSTANTS from './constants';

// devtools
import { composeWithDevTools } from 'redux-devtools-extension';

let initialState = {
    schedules: [],
    employees: [],
    activeTab: CONSTANTS.SCHEDULES_TAB,
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CONSTANTS.SET_SCHEDULES_ACTION:
            return {
                ...state,
                schedules: action.schedules
            }
        case CONSTANTS.SET_EMPLOYEES_ACTION:
            return {
                ...state,
                employees: action.employees
            }
        case CONSTANTS.SET_ACTIVE_TAB_ACTION:
            return {
                ...state,
                activeTab: action.activeTab
            }
        case CONSTANTS.SET_LOGGED_IN_ACTION:
            return {
                ...state,
                loggedIn: action.loggedIn
            }
        default:
            break;
    }

    return state;
};

const store = createStore(reducer, composeWithDevTools());

export default store;