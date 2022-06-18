import { createStore } from 'redux';
import CONSTANTS from './constants';

let initialState = {
    schedules: [],
    employees: [],
    activeTab: CONSTANTS.SCHEDULES_TAB
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
        default:
            break;
    }

    return state;
};

const store = createStore(reducer);

export default store;