import axios from 'axios';

const SCHEDULES_ENDPOINT = '/api/schedules';

const getSchedules = () => {
    return axios.get(SCHEDULES_ENDPOINT);
};

const deleteSchedule = (id, token) => {
    return axios.delete(SCHEDULES_ENDPOINT, { data: { _id: id, token } });
};

const updateSchedule = (id, token, leads, backups) => {
    return axios.put(SCHEDULES_ENDPOINT, { _id: id, token, leads, backups })
};

export {
    getSchedules,
    deleteSchedule,
    updateSchedule
};