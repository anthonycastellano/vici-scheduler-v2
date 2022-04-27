import { createStore } from 'redux';

let initialState = {
    loggedIn: false,
    schedules: []
}

const reducer = (state = initialState, action) => {
    if (action.type === 'setAllSchedules') {
        return {
            ...state,
            schedules: action.schedules
        }
    }

    return state;
};

const store = createStore(reducer);

export default store;