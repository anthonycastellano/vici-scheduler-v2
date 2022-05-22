import { createStore } from 'redux';

const SET_SCHEDULES_ACTION = 'setSchedules';

let initialState = {
    schedules: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SCHEDULES_ACTION:
            return {
                ...state,
                schedules: action.schedules
            }
        default:
            break;
    }

    return state;
};

const store = createStore(reducer);

export default store;