import { createStore } from 'redux';

let initialState = {
    schedules: []
}

// TODO: use switch
const reducer = (state = initialState, action) => {
    if (action.type === 'setSchedules') {
        return {
            ...state,
            schedules: action.schedules
        }
    }

    return state;
};

const store = createStore(reducer);

export default store;