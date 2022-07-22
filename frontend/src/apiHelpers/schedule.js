import axios from 'axios';

const SCHEDULES_ENDPOINT = '/api/schedules';

const getSchedules = () => {
    return axios.get(SCHEDULES_ENDPOINT);
};

const deleteSchedule = (id, token) => {
    return axios.delete(SCHEDULES_ENDPOINT, { data: { _id: id, token } });
};

export {
    getSchedules,
    deleteSchedule
};