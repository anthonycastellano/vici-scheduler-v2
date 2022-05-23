import { createStore } from 'redux';
import CONSTANTS from './constants';

let initialState = {
    schedules: [],
    employees: []
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
        default:
            break;
    }

    return state;
};

const store = createStore(reducer);

export default store;