import { createStore } from 'redux';
import CONSTANTS from './constants';

// TODO: fix schedule page issue
let initialState = {
    schedules: [],
    employees: [],
    activeTab: CONSTANTS.SCHEDULES_TAB,
    loggedIn: false,
    modal: {
        modalOpen: false
    }
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
        case CONSTANTS.SET_MODAL_OPEN_ACTION:
            return {
                ...state,
                modal: {
                    modalOpen: action.modalOpen,
                    modalType: action.modalType,
                    data: action.data
                }
            }
        default:
            break;
    }

    return state;
};

const store = createStore(reducer);

export default store;
